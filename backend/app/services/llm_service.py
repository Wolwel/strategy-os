import os
from functools import lru_cache
from dotenv import load_dotenv

from app.core.config import get_llm_settings

load_dotenv()


def _clean_api_key(value: str | None) -> str:
    api_key = (value or "").strip()
    # Users sometimes paste full header value: "Bearer xai-..."
    if api_key.lower().startswith("bearer "):
        api_key = api_key[7:].strip()
    # Users sometimes wrap keys in quotes in .env
    if len(api_key) >= 2 and ((api_key[0] == api_key[-1] == '"') or (api_key[0] == api_key[-1] == "'")):
        api_key = api_key[1:-1].strip()
    return api_key


@lru_cache(maxsize=4)
def _get_groq_client():
    from groq import AsyncGroq

    api_key = _clean_api_key(os.environ.get("GROQ_API_KEY"))
    if not api_key:
        raise RuntimeError("Missing GROQ_API_KEY")
    return AsyncGroq(api_key=api_key)


@lru_cache(maxsize=4)
def _get_openai_client():
    try:
        from openai import AsyncOpenAI
    except Exception as e:  # pragma: no cover
        raise RuntimeError("OpenAI provider selected but package 'openai' is not installed") from e

    api_key = _clean_api_key(os.environ.get("OPENAI_API_KEY"))
    if not api_key:
        raise RuntimeError("Missing OPENAI_API_KEY")
    return AsyncOpenAI(api_key=api_key)


@lru_cache(maxsize=4)
def _get_anthropic_client():
    try:
        from anthropic import AsyncAnthropic
    except Exception as e:  # pragma: no cover
        raise RuntimeError("Anthropic provider selected but package 'anthropic' is not installed") from e

    api_key = _clean_api_key(os.environ.get("ANTHROPIC_API_KEY"))
    if not api_key:
        raise RuntimeError("Missing ANTHROPIC_API_KEY")
    return AsyncAnthropic(api_key=api_key)

@lru_cache(maxsize=4)
def _get_xai_client():
    """xAI is OpenAI-compatible (chat/completions)."""
    try:
        from openai import AsyncOpenAI
    except Exception as e:  # pragma: no cover
        raise RuntimeError("xAI provider selected but package 'openai' is not installed") from e

    api_key = _clean_api_key(os.environ.get("XAI_API_KEY"))
    if not api_key:
        raise RuntimeError("Missing XAI_API_KEY")

    base_url = (os.environ.get("XAI_BASE_URL") or "https://api.x.ai/v1").strip()
    return AsyncOpenAI(api_key=api_key, base_url=base_url)


async def get_llm_response(
    prompt: str,
    system_message: str = "You are a helpful assistant.",
    temperature: float = 0.6,
    retries: int = 2,
    *,
    provider: str | None = None,
    model: str | None = None,
    agent: str | None = None,
) -> str:
    """
    Асинхронна функція для запиту до Groq з простою retry-логікою.
    Не блокує сервер під час очікування відповіді.
    """
    import asyncio

    resolved = get_llm_settings(agent)
    provider_name = (provider or resolved.provider).strip().lower()
    model_id = (model or resolved.model).strip()
    
    for attempt in range(retries):
        try:
            if provider_name == "groq":
                client = _get_groq_client()
                chat_completion = await client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": system_message},
                        {"role": "user", "content": prompt},
                    ],
                    model=model_id,
                    temperature=temperature,
                    max_tokens=1024,
                )
                return chat_completion.choices[0].message.content

            if provider_name == "openai":
                client = _get_openai_client()
                chat_completion = await client.chat.completions.create(
                    model=model_id,
                    messages=[
                        {"role": "system", "content": system_message},
                        {"role": "user", "content": prompt},
                    ],
                    temperature=temperature,
                    max_tokens=1024,
                )
                return chat_completion.choices[0].message.content

            if provider_name == "anthropic":
                client = _get_anthropic_client()
                msg = await client.messages.create(
                    model=model_id,
                    system=system_message,
                    messages=[{"role": "user", "content": prompt}],
                    temperature=temperature,
                    max_tokens=1024,
                )
                # msg.content is a list of content blocks (TextBlock, etc.)
                parts = []
                for block in getattr(msg, "content", []) or []:
                    text = getattr(block, "text", None)
                    if text:
                        parts.append(text)
                return "".join(parts).strip() or "N/A"

            if provider_name == "xai":
                client = _get_xai_client()
                chat_completion = await client.chat.completions.create(
                    model=model_id,
                    messages=[
                        {"role": "system", "content": system_message},
                        {"role": "user", "content": prompt},
                    ],
                    temperature=temperature,
                    max_tokens=1024,
                )
                return chat_completion.choices[0].message.content

            raise RuntimeError(f"Unsupported provider: {provider_name}")

        except Exception as e:
            error_str = str(e)
            
            # Якщо 429 (Rate Limit) і є спроби — чекаємо й пробуємо знову
            if "429" in error_str and attempt < retries - 1:
                print(f"⏳ Rate limit (429), retry {attempt + 1}/{retries}...")
                await asyncio.sleep(5)  # Чекаємо 5 секунд перед повтором
                continue

            # If we are still rate-limited, return a readable marker instead of plain N/A
            if "429" in error_str and "rate limit" in error_str.lower():
                import re

                m = re.search(r"try again in ([0-9a-zA-Z\.]+s)", error_str)
                wait_hint = m.group(1) if m else None
                hint = f" (try again in {wait_hint})" if wait_hint else ""
                return f"RATE_LIMIT: {provider_name}:{model_id}{hint}"

            # Transient upstream/network errors: brief backoff then retry
            transient_markers = (
                "timeout",
                "timed out",
                "temporarily unavailable",
                "connection",
                "502",
                "503",
                "504",
                "server error",
            )
            if any(m in error_str.lower() for m in transient_markers) and attempt < retries - 1:
                await asyncio.sleep(2 + attempt)
                continue
            
            # Інші помилки або остання спроба
            print(
                f"❌ Error in LLM service (attempt {attempt + 1}/{retries}) [{provider_name}:{model_id} | agent={agent}]: {e}"
            )
            
            # Повертаємо "N/A" замість пустого рядка, щоб агенти знали, що дані недоступні
            return "N/A"
    
    return "N/A"