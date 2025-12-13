from app.services.llm_service import get_llm_response


def _format_financials_from_code(financials: dict) -> str:
    if not financials:
        return "N/A"

    inputs = financials.get("inputs", {})
    metrics = financials.get("metrics", {})
    break_even = metrics.get("break_even_month")
    break_even_str = str(break_even) if break_even is not None else "❌ (не досягнуто в горизонті)"

    roi = metrics.get("roi")
    roi_str = "N/A" if roi is None else f"{roi*100:.1f}%"

    ltv = metrics.get("ltv")
    ltv_str = "N/A" if ltv is None else f"${ltv:,.0f}"

    ltv_cac = metrics.get("ltv_cac")
    ltv_cac_str = "N/A" if ltv_cac is None else f"{ltv_cac:.2f}"

    payback = metrics.get("payback_months")
    payback_str = "N/A" if payback is None else f"{payback:.1f}"

    return f"""
### 🧮 Розрахунок (кодом, детерміновано)

**Вхідні припущення (від користувача):**
- Price (MRR/customer): ${inputs.get('price_per_month', 'N/A')}
- Gross margin: {inputs.get('gross_margin_pct', 'N/A')}%
- CAC: ${inputs.get('cac', 'N/A')}
- Fixed costs: ${inputs.get('fixed_costs_per_month', 'N/A')}/міс
- Leads/month: {inputs.get('leads_per_month', 'N/A')}
- Conversion: {inputs.get('conversion_rate_pct', 'N/A')}%
- Churn: {inputs.get('monthly_churn_pct', 'N/A')}%/міс
- Horizon: {inputs.get('horizon_months', 'N/A')} міс

**Ключові метрики:**
- Break-even: {break_even_str}
- ROI (за горизонт): {roi_str}
- Payback (місяців): {payback_str}
- LTV: {ltv_str}
- LTV/CAC: {ltv_cac_str}
"""

async def run_financial_projection(
    framing: str,
    market_data: str,
    competitors: str,
    *,
    computed_financials: dict | None = None,
) -> str:
    """
    Генерує фінансову модель (Unit Economics та P&L) на основі ринкових даних.
    """
    print("   [Finance Agent] Crunching numbers...")
    
    computed_block = _format_financials_from_code(computed_financials) if computed_financials else "N/A"

    prompt = f"""
    Ти - Financial Modeling Agent. Ти відповідаєш за ГРОШІ клієнта.
    
    ⚠️ КРИТИЧНО ВАЖЛИВО:
    - Твої помилкові розрахунки можуть призвести до ВТРАТИ РЕАЛЬНИХ ГРОШЕЙ.
    - НІКОЛИ не видавай вигадані цифри за факти.
    - Краще сказати "невідомо" ніж вигадати число.
    - Завжди показуй ПЕСИМІСТИЧНИЙ сценарій.
    
    Вхідні дані:
    1. Ідея: {framing}
    2. Ринок: {market_data}
    3. Конкуренти: {competitors}

    Додатково (якщо є): фінансові розрахунки, зроблені КОДОМ (це джерело правди для чисел):
    {computed_block}
    
    ### ФОРМАТ ВІДПОВІДІ (КОРОТКО!):
    
    ## 💰 Фінанси
    
    ### Припущення
    | Параметр | Значення | Впевненість |
    |----------|----------|-------------|
    | Середній чек | $X | 🟢/🟡/🔴 |
    | CAC | $X | 🟢/🟡/🔴 |
    | LTV | $X | 🟢/🟡/🔴 |
    | Маржа | X% | 🟢/🟡/🔴 |
    
    ### Unit Economics
    - **Revenue/клієнт:** $X
    - **Contribution Margin:** $X (X%)
    - **LTV/CAC:** X (норма >3)
    
    ### Сценарії
    | Сценарій | Маржа | Break-even |
    |----------|-------|------------|
    | 🟢 Оптимістичний | X% | X міс |
    | 🟡 Реалістичний | X% | X міс |
    | 🔴 Песимістичний | X% | X міс / ❌ |
    
    ### Стартовий капітал
    - **Мінімум:** $X
    - **Рекомендовано:** $X
    - **Burn rate:** $X/міс
    
    ### 🎯 Вердикт
    - **Прибутковість:** Так / Ні / Невідомо
    - **Ризик:** 🟢 Низький / 🟡 Середній / 🔴 Високий
    - **Рекомендація:** 1 речення
    
    ⚠️ Цифри можуть відрізнятися на ±30-50%.
    
    Будь ЛАКОНІЧНИМ. Максимум 200 слів.
    """
    
    return await get_llm_response(prompt, temperature=0.2, agent="finance_agent")