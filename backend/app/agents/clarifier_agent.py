import json
from app.services.llm_service import get_llm_response


async def get_clarifying_questions(user_request: str) -> dict:
    """Clarifier Agent.

    Визначає, чи достатньо даних для коректного аналізу.
    Якщо ні — повертає короткий список критичних уточнюючих питань.

    Output contract (dict):
      {
        "needs_clarification": bool,
        "questions": [
          {"id": 1, "field": "...", "question": "...", "reason": "...", "required": true}
        ],
        "notes": "..."
      }
    """

    system_prompt = """
Ти — Clarifier Agent для Strategy OS.
Твоя задача: вирішити, чи можна робити стратегічний аналіз без небезпечних припущень.

Правила:
- Якщо запит нечіткий або бракує критичних полів — поверни needs_clarification=true і 5–8 найважливіших питань.
- Якщо даних достатньо — needs_clarification=false і questions=[]
- Питання мають бути короткі, прикладні, без води.
- Не вигадуй дані.
- Відповідь ТІЛЬКИ JSON, без markdown.

Критичні поля (вибери релевантні):
- geography, customer (хто платить), b2b_b2c, business_model, pricing, distribution, constraints (budget/time/team), stage (idea/MVP/revenue), compliance, unit_economics.

Порада:
- Якщо користувач просить фінмодель, але не дав price/margin/CAC/fixed_costs/churn/conversion — майже завжди треба уточнення.
"""

    user_prompt = f"""
Запит користувача: {user_request}

Поверни JSON у форматі:
{{
  "needs_clarification": true/false,
  "questions": [
    {{"id": 1, "field": "geography", "question": "...", "reason": "...", "required": true}}
  ],
  "notes": "1 коротке речення"
}}

Обмеження:
- questions: 0 або 5–8 пунктів
- required: true для критичних
"""

    response_text = await get_llm_response(
      user_prompt,
      system_message=system_prompt,
      temperature=0.2,
      agent="clarifier_agent",
    )
    cleaned = response_text.replace("```json", "").replace("```", "").strip()

    # Best-effort JSON extraction: if the model added extra text, try to slice the first JSON object.
    first_brace = cleaned.find("{")
    last_brace = cleaned.rfind("}")
    if first_brace != -1 and last_brace != -1 and last_brace > first_brace:
        cleaned = cleaned[first_brace : last_brace + 1]

    try:
        data = json.loads(cleaned)
        # normalize
        data.setdefault("needs_clarification", False)
        data.setdefault("questions", [])
        data.setdefault("notes", "")
        if not isinstance(data.get("questions"), list):
            data["questions"] = []
        return data
    except json.JSONDecodeError:
        # If parsing fails, do NOT block the user; proceed with analysis.
        return {"needs_clarification": False, "questions": [], "notes": ""}
