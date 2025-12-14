from datetime import datetime
import asyncio
import os
from dotenv import load_dotenv
from app.agents.clarifier_agent import get_clarifying_questions
from app.agents.problem_agent import run_problem_framing
from app.agents.hypothesis_agent import decompose_hypotheses, format_hypotheses_for_report
from app.agents.router_agent import plan_execution
from app.agents.market_agent import run_market_analysis
from app.agents.competitor_agent import run_competitor_analysis
from app.agents.frameworks_agent import run_strategic_frameworks
from app.agents.finance_agent import run_financial_projection
from app.agents.risk_agent import run_risk_assessment
from app.agents.scenario_agent import run_scenario_planning
from app.agents.synthesizer_agent import run_synthesis
from app.agents.advocate_agent import run_advocate_challenge
from app.agents.output_agent import run_final_formatting
from app.services.finance_service import FinanceInputs, compute_financials

load_dotenv()


def _env_flag(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "y", "on"}


# ============================================================
# SSE STREAMING VERSION (live updates для фронтенду)
# ============================================================

async def stream_strategy_pipeline(user_request: str, finance_inputs: dict | None = None, audience: str = "c-level", skip_clarification: bool = False, context: list[dict] | None = None):
    """
    Генератор для SSE - емітить події про прогрес кожного агента.
    skip_clarification=True якщо це follow-up запит (після уточнень)
    context - попередні повідомлення для контексту розмови
    """
    results = {}
    results['_audience'] = audience  # Зберігаємо для output agent
    results['_context'] = context or []  # Зберігаємо контекст
    
    # Формуємо enriched запит з контекстом
    enriched_request = user_request
    if context and len(context) > 0:
        context_summary = "\n".join([
            f"{'Користувач' if msg.get('role') == 'user' else 'Асистент'}: {msg.get('content', '')[:200]}"
            for msg in context[-4:]  # Останні 4 повідомлення
        ])
        enriched_request = f"Попередній контекст розмови:\n{context_summary}\n\nПоточний запит: {user_request}"

    # 0. Clarification gate
    yield {"agent": "clarifier", "name": "❓ Clarifier", "status": "running"}
    if skip_clarification or _env_flag("SKIP_CLARIFICATION", default=False):
        clarification = {"needs_clarification": False, "questions": [], "notes": "skipped"}
    else:
        clarification = await get_clarifying_questions(enriched_request)
    results["clarification"] = clarification
    if clarification.get("needs_clarification"):
        yield {"agent": "clarifier", "name": "❓ Clarifier", "status": "done", "preview": "Потрібні уточнення", "content": "Потрібні додаткові дані для аналізу"}
        questions_md = "\n".join(
            [f"- {q.get('question', '')}" for q in clarification.get("questions", [])]
        )
        final_doc = (
            "# ❓ Потрібні уточнення\n\n"
            "Щоб не робити небезпечних припущень, відповідай на ці питання:\n\n"
            f"{questions_md}\n"
        )
        results["final_doc"] = final_doc
        yield {
            "agent": "complete",
            "status": "needs_clarification",
            "markdown": final_doc,
            "data": results,
        }
        return
    if skip_clarification or _env_flag("SKIP_CLARIFICATION", default=False):
        yield {"agent": "clarifier", "name": "❓ Clarifier", "status": "done", "preview": "Пропущено", "content": "Уточнення пропущено"}
    else:
        yield {"agent": "clarifier", "name": "❓ Clarifier", "status": "done", "preview": "Даних достатньо", "content": "Даних достатньо для аналізу"}
    
    # 1. Problem Framing
    yield {"agent": "framing", "name": "🚀 Problem Framing", "status": "running"}
    framing = await run_problem_framing(enriched_request)
    results['framing'] = framing
    yield {"agent": "framing", "name": "🚀 Problem Framing", "status": "done", "preview": (framing[:150] + "...") if len(str(framing)) > 150 else framing, "content": framing}
    
    # 2. Hypothesis
    yield {"agent": "hypothesis", "name": "🔬 Hypothesis Analysis", "status": "running"}
    hypotheses = await decompose_hypotheses(enriched_request, framing)
    results['hypotheses'] = hypotheses
    results['hypotheses_report'] = format_hypotheses_for_report(hypotheses)
    hyp_count = len(hypotheses.get('hypotheses', [])) if isinstance(hypotheses, dict) else 0
    yield {"agent": "hypothesis", "name": "🔬 Hypothesis Analysis", "status": "done", "preview": f"{hyp_count} гіпотез", "content": results['hypotheses_report']}
    
    # 3. Routing
    yield {"agent": "routing", "name": "🚦 Router", "status": "running"}
    plan = await plan_execution(enriched_request, framing)
    if hypotheses.get("recommended_agents"):
        for agent in hypotheses["recommended_agents"]:
            if agent in ["market", "competitors", "finance", "risks", "frameworks"]:
                plan[agent] = True
    active = sum(1 for v in plan.values() if v)
    yield {"agent": "routing", "name": "🚦 Router", "status": "done", "preview": f"{active} агентів активовано", "content": f"Активовані агенти: {', '.join([k for k, v in plan.items() if v])}"}
    
    # Init
    market = "N/A"
    competitors = "N/A"
    frameworks = "N/A"
    finance = "N/A"
    risks = "N/A"
    scenarios = "N/A"

    # 4. Market
    if plan.get('market', False):
        yield {"agent": "market", "name": "📈 Market Research", "status": "running"}
        market = await run_market_analysis(framing)
        yield {"agent": "market", "name": "📈 Market Research", "status": "done", "preview": (market[:100] + "...") if len(str(market)) > 100 else market, "content": market}
    results['market'] = market
    
    # 5. Competitors
    if plan.get('competitors', False):
        yield {"agent": "competitors", "name": "⚔️ Competitors", "status": "running"}
        competitors = await run_competitor_analysis(framing, market if plan.get('market') else "N/A")
        yield {"agent": "competitors", "name": "⚔️ Competitors", "status": "done", "preview": (competitors[:100] + "...") if len(str(competitors)) > 100 else competitors, "content": competitors}
    results['competitors'] = competitors

    # 6. Frameworks
    if plan.get('frameworks', False):
        yield {"agent": "frameworks", "name": "🧩 Frameworks", "status": "running"}
        frameworks = await run_strategic_frameworks(framing, market if plan.get('market') else "N/A", competitors if plan.get('competitors') else "N/A")
        yield {"agent": "frameworks", "name": "🧩 Frameworks", "status": "done", "preview": (frameworks[:100] + "...") if len(str(frameworks)) > 100 else frameworks, "content": frameworks}
    results['frameworks'] = frameworks

    # 7. Finance
    if plan.get('finance', False):
        yield {"agent": "finance", "name": "💰 Finance", "status": "running"}
        computed = None
        if finance_inputs:
            try:
                computed = compute_financials(FinanceInputs(**finance_inputs))
                results["computed_financials"] = computed
            except Exception:
                results["computed_financials"] = "N/A"
                computed = None
        finance = await run_financial_projection(
            framing,
            market if plan.get('market') else "N/A",
            competitors if plan.get('competitors') else "N/A",
            computed_financials=computed,
        )
        yield {"agent": "finance", "name": "💰 Finance", "status": "done", "preview": (finance[:100] + "...") if len(str(finance)) > 100 else finance, "content": finance}
    results['finance'] = finance
    
    # 8. Risks
    if plan.get('risks', False):
        yield {"agent": "risks", "name": "⚖️ Risk Assessment", "status": "running"}
        risks = await run_risk_assessment(framing, market, competitors, finance)
        yield {"agent": "risks", "name": "⚖️ Risk Assessment", "status": "done", "preview": (risks[:100] + "...") if len(str(risks)) > 100 else risks, "content": risks}
    results['risks'] = risks

    # 9. Scenarios
    if plan.get('risks', False) or plan.get('frameworks', False):
        yield {"agent": "scenarios", "name": "🔮 Scenarios", "status": "running"}
        scenarios = await run_scenario_planning(framing, market, risks)
        yield {"agent": "scenarios", "name": "🔮 Scenarios", "status": "done", "preview": (scenarios[:100] + "...") if len(str(scenarios)) > 100 else scenarios, "content": scenarios}
    results['scenarios'] = scenarios

    # 10. Synthesis
    yield {"agent": "synthesis", "name": "🏁 Synthesis", "status": "running"}
    synthesis = await run_synthesis(framing, market, competitors, finance, risks)
    results['synthesis'] = synthesis
    yield {"agent": "synthesis", "name": "🏁 Synthesis", "status": "done", "preview": (synthesis[:100] + "...") if len(str(synthesis)) > 100 else synthesis, "content": synthesis}

    # 11. Advocate Challenge (Devil's Advocate)
    yield {"agent": "advocate", "name": "😈 Advocate", "status": "running"}
    advocate_challenge = await run_advocate_challenge(synthesis, market, finance, risks)
    results['advocate_challenge'] = advocate_challenge
    yield {"agent": "advocate", "name": "😈 Advocate", "status": "done", "preview": (advocate_challenge[:100] + "...") if len(str(advocate_challenge)) > 100 else advocate_challenge, "content": advocate_challenge}

    results['_generated_at'] = datetime.now().strftime("%d.%m.%Y %H:%M")
    
    # 12. Output
    yield {"agent": "output", "name": "📄 Report", "status": "running"}
    final_doc = await run_final_formatting(results, audience=audience)
    results['final_doc'] = final_doc
    yield {"agent": "output", "name": "📄 Report", "status": "done", "preview": "Звіт готовий", "content": final_doc}
    
    # FINAL - весь результат
    yield {
        "agent": "complete",
        "status": "finished",
        "markdown": final_doc,
        "data": results
    }


# ============================================================
# ORIGINAL VERSION (для POST без стрімінгу)
# ============================================================

async def run_strategy_pipeline(user_request: str, finance_inputs: dict | None = None, audience: str = "c-level") -> dict:
    results = {}
    results['_audience'] = audience  # Зберігаємо для output agent

    # 0. Clarification gate
    if _env_flag("SKIP_CLARIFICATION", default=False):
        clarification = {"needs_clarification": False, "questions": [], "notes": "skipped by SKIP_CLARIFICATION"}
    else:
        clarification = await get_clarifying_questions(user_request)
    results["clarification"] = clarification
    if clarification.get("needs_clarification"):
        questions_md = "\n".join(
            [f"- {q.get('question', '')}" for q in clarification.get("questions", [])]
        )
        final_doc = (
            "# ❓ Потрібні уточнення\n\n"
            "Щоб не робити небезпечних припущень, відповідай на ці питання:\n\n"
            f"{questions_md}\n"
        )
        results["final_doc"] = final_doc
        results["_generated_at"] = datetime.now().strftime("%d.%m.%Y %H:%M")
        return results
    
    # 1. Problem Framing
    print("🚀 1. Problem Framing...")
    framing = await run_problem_framing(user_request)
    results['framing'] = framing
    
    # 2. Hypothesis Decomposition (NEW!)
    print("🔬 2. Hypothesis Decomposition...")
    hypotheses = await decompose_hypotheses(user_request, framing)
    results['hypotheses'] = hypotheses
    results['hypotheses_report'] = format_hypotheses_for_report(hypotheses)
    
    # 3. Routing (використовує рекомендації від Hypothesis Agent)
    print("🚦 3. Routing...")
    plan = await plan_execution(user_request, framing)
    
    # Якщо Hypothesis Agent порекомендував агентів, враховуємо це
    if hypotheses.get("recommended_agents"):
        for agent in hypotheses["recommended_agents"]:
            if agent in ["market", "competitors", "finance", "risks", "frameworks"]:
                plan[agent] = True
    
    # Ініціалізація заглушок
    market = "N/A"
    competitors = "N/A"
    frameworks = "N/A"
    finance = "N/A"
    risks = "N/A"
    scenarios = "N/A"

    # 4. Виконання аналітичних агентів
    
    # Market
    if plan.get('market', False):
        print("📈 Market Agent...")
        market = await run_market_analysis(framing)
    results['market'] = market
    
    # Competitors
    if plan.get('competitors', False):
        print("⚔️ Competitor Agent...")
        m_ctx = market if plan.get('market') else "N/A"
        competitors = await run_competitor_analysis(framing, m_ctx)
    results['competitors'] = competitors

    # Frameworks
    if plan.get('frameworks', False):
        print("🧩 Frameworks Agent...")
        m_ctx = market if plan.get('market') else "N/A"
        c_ctx = competitors if plan.get('competitors') else "N/A"
        frameworks = await run_strategic_frameworks(framing, m_ctx, c_ctx)
    results['frameworks'] = frameworks

    # Finance
    if plan.get('finance', False):
        print("💰 Finance Agent...")
        m_ctx = market if plan.get('market') else "N/A"
        c_ctx = competitors if plan.get('competitors') else "N/A"
        computed = None
        if finance_inputs:
            try:
                computed = compute_financials(FinanceInputs(**finance_inputs))
                results["computed_financials"] = computed
            except Exception:
                results["computed_financials"] = "N/A"
                computed = None
        finance = await run_financial_projection(framing, m_ctx, c_ctx, computed_financials=computed)
    results['finance'] = finance
    
    # Advocate (Risks)
    if plan.get('risks', False):
        print("⚖️ Risk Agent...")
        risks = await run_risk_assessment(framing, market, competitors, finance)
    results['risks'] = risks

    # --- Scenarios ---
    # Запускаємо, якщо є ризики або запит на стратегію
    if plan.get('risks', False) or plan.get('frameworks', False):
        print("🔮 Scenario Agent...")
        scenarios = await run_scenario_planning(framing, market, risks)
    results['scenarios'] = scenarios

    # 5. Synthesis (Синтез рішення)
    print("🏁 5. Synthesizer Agent...")
    synthesis = await run_synthesis(framing, market, competitors, finance, risks)
    results['synthesis'] = synthesis

    # 6. Advocate Challenge (Devil's Advocate)
    print("😈 6. Advocate Agent (Challenge)...")
    advocate_challenge = await run_advocate_challenge(synthesis, market, finance, risks)
    results['advocate_challenge'] = advocate_challenge

    results['_generated_at'] = datetime.now().strftime("%d.%m.%Y %H:%M")
    
    # 7. Output Formatting (Підготовка документу)
    print("📄 7. Output Agent...")
    final_doc = await run_final_formatting(results, audience=audience)
    results['final_doc'] = final_doc # Зберігаємо готовий Markdown
    
    return results