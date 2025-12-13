from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Dict, Any, List


@dataclass(frozen=True)
class FinanceInputs:
    price_per_month: float
    gross_margin_pct: float  # 0..100
    cac: float
    fixed_costs_per_month: float
    leads_per_month: float
    conversion_rate_pct: float  # 0..100
    monthly_churn_pct: float  # 0..100
    initial_customers: float = 0.0
    horizon_months: int = 12


def _clamp_pct(value: float) -> float:
    return max(0.0, min(100.0, value))


def compute_financials(inputs: FinanceInputs) -> Dict[str, Any]:
    """Deterministic mini-model for MVP demos.

    Simulates months 1..N with:
    - new_customers = leads_per_month * conversion_rate
    - active_customers decay by churn
    - revenue = active_customers * price_per_month
    - gross_profit = revenue * gross_margin
    - marketing_cost = new_customers * CAC
    - net_profit = gross_profit - fixed_costs - marketing_cost

    Returns metrics + month-by-month series + break-even month (if any).
    """

    horizon = max(1, int(inputs.horizon_months))
    gross_margin = _clamp_pct(inputs.gross_margin_pct) / 100.0
    conversion_rate = _clamp_pct(inputs.conversion_rate_pct) / 100.0
    churn = _clamp_pct(inputs.monthly_churn_pct) / 100.0

    new_customers_per_month = max(0.0, inputs.leads_per_month) * conversion_rate

    active_customers = max(0.0, inputs.initial_customers)
    cumulative_profit = 0.0
    break_even_month: Optional[int] = None

    series: List[Dict[str, float]] = []

    for month in range(1, horizon + 1):
        active_customers = active_customers * (1.0 - churn) + new_customers_per_month

        revenue = active_customers * inputs.price_per_month
        gross_profit = revenue * gross_margin
        marketing_cost = new_customers_per_month * inputs.cac
        fixed_costs = inputs.fixed_costs_per_month
        net_profit = gross_profit - marketing_cost - fixed_costs

        cumulative_profit += net_profit

        if break_even_month is None and cumulative_profit >= 0:
            break_even_month = month

        series.append(
            {
                "month": float(month),
                "active_customers": float(active_customers),
                "new_customers": float(new_customers_per_month),
                "revenue": float(revenue),
                "gross_profit": float(gross_profit),
                "marketing_cost": float(marketing_cost),
                "fixed_costs": float(fixed_costs),
                "net_profit": float(net_profit),
                "cumulative_profit": float(cumulative_profit),
            }
        )

    total_marketing = sum(m["marketing_cost"] for m in series)
    total_fixed = sum(m["fixed_costs"] for m in series)
    total_costs = total_marketing + total_fixed

    roi = None
    if total_costs > 0:
        roi = cumulative_profit / total_costs

    # simple unit metrics
    contribution_per_customer_month = inputs.price_per_month * gross_margin
    payback_months = None
    if contribution_per_customer_month > 0:
        payback_months = inputs.cac / contribution_per_customer_month

    ltv = None
    if churn > 0 and contribution_per_customer_month > 0:
        ltv = contribution_per_customer_month / churn

    ltv_cac = None
    if ltv is not None and inputs.cac > 0:
        ltv_cac = ltv / inputs.cac

    return {
        "inputs": {
            "price_per_month": inputs.price_per_month,
            "gross_margin_pct": inputs.gross_margin_pct,
            "cac": inputs.cac,
            "fixed_costs_per_month": inputs.fixed_costs_per_month,
            "leads_per_month": inputs.leads_per_month,
            "conversion_rate_pct": inputs.conversion_rate_pct,
            "monthly_churn_pct": inputs.monthly_churn_pct,
            "initial_customers": inputs.initial_customers,
            "horizon_months": horizon,
        },
        "metrics": {
            "new_customers_per_month": new_customers_per_month,
            "break_even_month": break_even_month,
            "cumulative_profit": cumulative_profit,
            "roi": roi,
            "contribution_per_customer_month": contribution_per_customer_month,
            "payback_months": payback_months,
            "ltv": ltv,
            "ltv_cac": ltv_cac,
        },
        "series": series,
    }
