from app.services.llm_service import get_llm_response


# Шаблони для різних аудиторій
AUDIENCE_CONFIGS = {
    "c-level": {
        "title": "Executive Strategy Brief",
        "focus": "GO/NO GO рішення, ключові метрики, top-3 ризики, next steps",
        "depth": "Високорівневий огляд без технічних деталей",
        "length": "1 сторінка (executive summary)",
    },
    "investor": {
        "title": "Investment Memo",
        "focus": "Unit Economics, TAM/SAM/SOM, конкурентні переваги, ROI, exit strategy",
        "depth": "Фінансові метрики та потенціал росту",
        "length": "2-3 сторінки з фокусом на числа",
    },
    "ops": {
        "title": "Operational Playbook",
        "focus": "Детальний план дій, ресурси, таймлайни, залежності, ризики",
        "depth": "Максимальна деталізація для виконання",
        "length": "Повний звіт з усіма секціями",
    },
}


async def run_final_formatting(data: dict, audience: str = "c-level") -> str:
    """
    Збирає всі шматки у фінальний професійний звіт.
    Адаптує формат під цільову аудиторію (C-level, інвестори, операційна команда).
    """
    print(f"   📄 [Output Agent] Formatting for audience: {audience}...")

    # Визначаємо рівень впевненості на основі кількості "N/A" або RATE_LIMIT
    sections = ['synthesis', 'scenarios', 'frameworks', 'market', 'competitors', 'finance', 'risks']
    na_count = sum(1 for s in sections if _is_missing(data.get(s, 'N/A')))
    
    confidence_note = ""
    if na_count >= 3:
        confidence_note = "⚠️ **Увага:** Частина даних відсутня, рівень впевненості в аналізі знижений."
    elif na_count >= 1:
        confidence_note = "ℹ️ Деякі секції не було проаналізовано."

    # Отримуємо конфіг аудиторії
    config = AUDIENCE_CONFIGS.get(audience, AUDIENCE_CONFIGS["c-level"])
    
    # Базовий звіт
    if audience == "c-level":
        report = _format_clevel_report(data, config, confidence_note)
    elif audience == "investor":
        report = _format_investor_report(data, config, confidence_note)
    else:  # ops
        report = _format_ops_report(data, config, confidence_note)
    
    return report


def _is_missing(value: str) -> bool:
    """Перевіряє чи значення відсутнє або помилкове."""
    if not value:
        return True
    value_str = str(value).strip().upper()
    return value_str == "N/A" or value_str.startswith("RATE_LIMIT")


def _format_clevel_report(data: dict, config: dict, confidence_note: str) -> str:
    """Executive Summary для C-Level (1 сторінка)."""
    return f"""
# 📑 {config['title']}

{confidence_note}

---

## 🎯 Executive Summary & GO/NO GO
{data.get('synthesis', 'N/A')}

---

## � Devil's Advocate (Challenge)
{data.get('advocate_challenge', 'N/A')}

---

## �🔬 Key Hypotheses
{data.get('hypotheses_report', 'N/A')}

---

## 🔭 Strategic Options
{data.get('scenarios', 'N/A')}

---

## ⚖️ Top Risks
{data.get('risks', 'N/A')}

---

## ⚠️ Disclaimer
Цей звіт згенеровано автоматично системою Strategy OS. Рекомендації не є інвестиційною порадою.

---
*Згенеровано системою Strategy OS • {data.get('_generated_at', 'N/A')} • Аудиторія: C-Level*
    """


def _format_investor_report(data: dict, config: dict, confidence_note: str) -> str:
    """Investment Memo для інвесторів (фокус на Unit Economics)."""
    return f"""
# 📑 {config['title']}

{confidence_note}

---

## 🎯 Investment Thesis
{data.get('synthesis', 'N/A')}

---

## � Devil's Advocate (Critical Review)
{data.get('advocate_challenge', 'N/A')}

---

## �📊 Market Opportunity

### TAM/SAM/SOM Analysis
{data.get('market', 'N/A')}

### Competitive Landscape
{data.get('competitors', 'N/A')}

---

## 💰 Financial Model & Unit Economics
{data.get('finance', 'N/A')}

---

## 🔬 Key Hypotheses to Validate
{data.get('hypotheses_report', 'N/A')}

---

## ⚖️ Risk Assessment
{data.get('risks', 'N/A')}

---

## 🔭 Strategic Options & Exit Paths
{data.get('scenarios', 'N/A')}

---

## ⚠️ Disclaimer
1. Цей звіт згенеровано автоматично системою Strategy OS на базі LLM.
2. Фінансові розрахунки базуються на припущеннях і можуть відхилятися на ±30-50%.
3. Рекомендації не є інвестиційною порадою.

---
*Згенеровано системою Strategy OS • {data.get('_generated_at', 'N/A')} • Аудиторія: Investors*
    """


def _format_ops_report(data: dict, config: dict, confidence_note: str) -> str:
    """Повний операційний звіт з усіма деталями."""
    return f"""
# 📑 {config['title']}

{confidence_note}

---

## 🎯 1. Executive Summary & GO/NO GO
{data.get('synthesis', 'N/A')}

---

## � 2. Devil's Advocate (Challenge)
{data.get('advocate_challenge', 'N/A')}

---

## 🔬 3. Hypothesis Analysis
{data.get('hypotheses_report', 'N/A')}

---

## 🔭 4. Scenario Planning & Strategic Options
{data.get('scenarios', 'N/A')}

---

## 🧩 5. Strategic Frameworks
{data.get('frameworks', 'N/A')}

---

## 📊 6. Market & Competition

### Market Intelligence
{data.get('market', 'N/A')}

### Competitive Analysis
{data.get('competitors', 'N/A')}

---

## 💰 7. Financial Model
{data.get('finance', 'N/A')}

---

## ⚖️ 8. Risk Assessment
{data.get('risks', 'N/A')}

---

## ⚠️ Disclaimer
1. Цей звіт згенеровано автоматично системою Strategy OS на базі LLM.
2. Фінансові розрахунки базуються на припущеннях і можуть відхилятися на ±30-50%.
3. Ринкові дані отримані з відкритих джерел і можуть бути неповними або застарілими.
4. Рекомендації не є інвестиційною порадою. Перед прийняттям рішень проконсультуйтеся з фахівцями.
5. Strategy OS не несе відповідальності за фінансові втрати, пов'язані з використанням цього звіту.

---
*Згенеровано системою Strategy OS • {data.get('_generated_at', 'N/A')} • Аудиторія: Operations*
    """