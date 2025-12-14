from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from app.orchestrator import run_strategy_pipeline, stream_strategy_pipeline
import json

app = FastAPI(title="Strategy OS API")

# --- НАЛАШТУВАННЯ CORS (Обов'язково для зв'язку з фронтендом) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ---------------------------------------------------------------

class StrategyRequest(BaseModel):
    query: str


class FinanceInputsModel(BaseModel):
    price_per_month: float = Field(..., description="Subscription price per customer per month")
    gross_margin_pct: float = Field(..., ge=0, le=100)
    cac: float = Field(..., ge=0)
    fixed_costs_per_month: float = Field(..., ge=0)
    leads_per_month: float = Field(..., ge=0)
    conversion_rate_pct: float = Field(..., ge=0, le=100)
    monthly_churn_pct: float = Field(..., ge=0, le=100)
    initial_customers: float = Field(0, ge=0)
    horizon_months: int = Field(12, ge=1, le=60)


class StrategyRequestV2(StrategyRequest):
    finance_inputs: FinanceInputsModel | None = None
    audience: str = Field("c-level", description="Target audience: c-level, investor, ops")

class StreamRequest(BaseModel):
    request: str


class StreamRequestV2(BaseModel):
    query: str
    finance_inputs: FinanceInputsModel | None = None
    audience: str = Field("c-level", description="Target audience: c-level, investor, ops")
    skip_clarification: bool = Field(False, description="Skip clarifier if this is a follow-up request")
    context: list[dict] | None = Field(None, description="Previous conversation context")


# Endpoint 1: Звичайний POST (чекає весь результат)
@app.post("/api/strategy/create")
async def create_strategy(request: StrategyRequest | StrategyRequestV2):
    query = getattr(request, "query")
    finance_inputs = None
    audience = getattr(request, "audience", "c-level")
    if hasattr(request, "finance_inputs") and getattr(request, "finance_inputs") is not None:
        finance_inputs = request.finance_inputs.model_dump()

    data = await run_strategy_pipeline(query, finance_inputs=finance_inputs, audience=audience)
    
    full_report = data.get('final_doc', "Помилка генерації звіту.")
    
    if full_report == "N/A":
         full_report = data.get('synthesis', "Дані відсутні.")

    status = "needs_clarification" if data.get("clarification", {}).get("needs_clarification") else "success"
    return {"status": status, "markdown": full_report, "data": data}


# Endpoint 2: SSE Streaming (live updates агентів)
@app.post("/api/strategy/stream")
async def stream_strategy(request: StreamRequest | StreamRequestV2):
    """
    SSE endpoint - фронтенд бачить які агенти працюють в реальному часі.
    """
    async def event_generator():
        query = getattr(request, "query", None) or getattr(request, "request", "")
        finance_inputs = None
        audience = getattr(request, "audience", "c-level")
        skip_clarification = getattr(request, "skip_clarification", False)
        context = getattr(request, "context", None) or []
        if hasattr(request, "finance_inputs") and getattr(request, "finance_inputs") is not None:
            finance_inputs = request.finance_inputs.model_dump()

        async for event in stream_strategy_pipeline(query, finance_inputs=finance_inputs, audience=audience, skip_clarification=skip_clarification, context=context):
            yield f"data: {json.dumps(event, ensure_ascii=False)}\n\n"
    
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )


# Endpoint 3: Health check
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Strategy OS is running"}