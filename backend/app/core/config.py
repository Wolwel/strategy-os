
import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class LLMSettings:
	provider: str
	model: str


_DEFAULT = LLMSettings(
	provider=os.getenv("LLM_PROVIDER", "groq").strip().lower(),
	model=os.getenv("LLM_MODEL", "llama-3.3-70b-versatile").strip(),
)


# Lightweight per-agent defaults. Can be overridden via env vars:
#   LLM_PROVIDER_PROBLEM_AGENT=openai
#   LLM_MODEL_PROBLEM_AGENT=gpt-4o-mini
AGENT_LLM_DEFAULTS: dict[str, LLMSettings] = {
	"clarifier_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"problem_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"hypothesis_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"router_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"market_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"competitor_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"frameworks_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"finance_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"risk_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"advocate_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"scenario_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"synthesizer_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
	"output_agent": LLMSettings(provider=_DEFAULT.provider, model=_DEFAULT.model),
}


def get_llm_settings(agent: str | None = None) -> LLMSettings:
	"""Resolve provider/model for an agent.

	Priority:
	1) Explicit per-agent env overrides: LLM_PROVIDER_<AGENT>, LLM_MODEL_<AGENT>
	2) In-code defaults in AGENT_LLM_DEFAULTS
	3) Global defaults: LLM_PROVIDER, LLM_MODEL
	"""

	if not agent:
		return _DEFAULT

	key = agent.strip().upper()
	provider = os.getenv(f"LLM_PROVIDER_{key}")
	model = os.getenv(f"LLM_MODEL_{key}")

	base = AGENT_LLM_DEFAULTS.get(agent.strip().lower(), _DEFAULT)
	return LLMSettings(
		provider=(provider.strip().lower() if provider else base.provider),
		model=(model.strip() if model else base.model),
	)
