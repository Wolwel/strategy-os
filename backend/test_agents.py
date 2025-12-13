import sys
import os
import asyncio

# --- ДОДАЄМО КОРІНЬ ПРОЄКТУ В ШЛЯХ ---
# Це дозволяє Python бачити папку 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
# -------------------------------------

from app.services.search_service import search_web
from app.agents.problem_agent import run_problem_framing

async def main():
    print("--- TEST 1: Search Service (Tavily) ---")
    # Шукаємо щось просте
    try:
        search_res = await search_web("Тренди кав'ярень Київ 2024", max_results=2)
        print(f"Результат пошуку (перші 200 символів):\n{search_res[:200]}...\n")
    except Exception as e:
        print(f"Помилка пошуку: {e}")

    print("--- TEST 2: Problem Agent (Groq) ---")
    try:
        agent_res = await run_problem_framing("Хочу відкрити кав'ярню в центрі Києва, є 50к доларів")
        print("Відповідь агента:")
        print(agent_res)
    except Exception as e:
        print(f"Помилка агента: {e}")

if __name__ == "__main__":
    asyncio.run(main())