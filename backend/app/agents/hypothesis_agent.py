from app.services.llm_service import get_llm_response
import json

async def decompose_hypotheses(user_request: str, framing_context: str) -> dict:
    """
    Hypothesis Decomposer Agent.
    Розкладає задачу на перевірювані гіпотези, пріоритезує за Impact/Ризик.
    """
    print("🔬 [Hypothesis Agent] Decomposing into testable hypotheses...")

    prompt = f"""
    Ти - Hypothesis Decomposer Agent. Твоя задача - розкласти бізнес-ідею на КОНКРЕТНІ перевірювані гіпотези.

    Вхідні дані:
    - Запит користувача: "{user_request}"
    - Контекст (Problem Framing): {framing_context}

    ⚠️ ПРАВИЛА:
    1. Кожна гіпотеза має бути ТЕСТОВАНОЮ (можна довести або спростувати).
    2. Пріоритезуй за Impact (вплив на успіх) × Uncertainty (невизначеність).
    3. Вкажи, який агент має перевірити кожну гіпотезу.
    4. Будь конкретним, уникай загальних фраз.

    ФОРМАТ ВІДПОВІДІ (JSON):
    {{
        "hypotheses": [
            {{
                "id": 1,
                "text": "Конкретна гіпотеза для перевірки",
                "category": "market|product|finance|competition|regulation",
                "impact": "high|medium|low",
                "uncertainty": "high|medium|low",
                "priority": 1,
                "agent_to_verify": "market_agent|competitor_agent|finance_agent|advocate_agent",
                "how_to_test": "Короткий опис як перевірити"
            }}
        ],
        "critical_assumptions": [
            "Припущення 1, яке має бути правдивим для успіху",
            "Припущення 2"
        ],
        "recommended_agents": ["market", "competitors", "finance", "risks", "frameworks"]
    }}

    Поверни 4-7 гіпотез, відсортованих за пріоритетом (1 = найважливіша).
    Відповідь ТІЛЬКИ JSON, без markdown, без пояснень.
    """

    response_text = await get_llm_response(prompt, temperature=0.3, agent="hypothesis_agent")
    
    # Чистимо відповідь
    cleaned_text = response_text.replace("```json", "").replace("```", "").strip()
    
    try:
        result = json.loads(cleaned_text)
        return result
    except json.JSONDecodeError:
        print("⚠️ Hypothesis Agent failed to produce JSON, returning default structure.")
        return {
            "hypotheses": [
                {
                    "id": 1,
                    "text": "Ринок має достатній попит для цього продукту",
                    "category": "market",
                    "impact": "high",
                    "uncertainty": "high",
                    "priority": 1,
                    "agent_to_verify": "market_agent",
                    "how_to_test": "Аналіз TAM/SAM/SOM та трендів"
                },
                {
                    "id": 2,
                    "text": "Конкуренція не є критичним бар'єром",
                    "category": "competition",
                    "impact": "high",
                    "uncertainty": "medium",
                    "priority": 2,
                    "agent_to_verify": "competitor_agent",
                    "how_to_test": "Мапінг конкурентів та їх позицій"
                },
                {
                    "id": 3,
                    "text": "Unit Economics дозволяє досягти прибутковості",
                    "category": "finance",
                    "impact": "high",
                    "uncertainty": "high",
                    "priority": 3,
                    "agent_to_verify": "finance_agent",
                    "how_to_test": "Розрахунок маржі, CAC, LTV"
                }
            ],
            "critical_assumptions": [
                "Клієнти готові платити за цей продукт",
                "Команда має необхідні компетенції"
            ],
            "recommended_agents": ["market", "competitors", "finance", "risks", "frameworks"]
        }


def format_hypotheses_for_report(hypotheses_data: dict) -> str:
    """
    Форматує гіпотези у Markdown для включення у фінальний звіт.
    """
    if not hypotheses_data or "hypotheses" not in hypotheses_data:
        return "N/A"
    
    report = "### 🔬 Ключові гіпотези для перевірки\n\n"
    report += "| # | Гіпотеза | Impact | Невизначеність | Як перевірити |\n"
    report += "|---|----------|--------|----------------|---------------|\n"
    
    for h in hypotheses_data.get("hypotheses", []):
        impact_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}.get(h.get("impact", ""), "")
        uncert_emoji = {"high": "❓❓", "medium": "❓", "low": "✓"}.get(h.get("uncertainty", ""), "")
        report += f"| {h.get('priority', '-')} | {h.get('text', '')} | {impact_emoji} {h.get('impact', '')} | {uncert_emoji} {h.get('uncertainty', '')} | {h.get('how_to_test', '')} |\n"
    
    if hypotheses_data.get("critical_assumptions"):
        report += "\n### ⚠️ Критичні припущення\n"
        for assumption in hypotheses_data["critical_assumptions"]:
            report += f"- {assumption}\n"
    
    return report
