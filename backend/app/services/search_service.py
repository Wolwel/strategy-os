import os
import asyncio
from tavily import TavilyClient
from dotenv import load_dotenv

load_dotenv()

# Ініціалізація клієнта
# Переконайтеся, що в .env є TAVILY_API_KEY
tavily_client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))

async def search_web(query: str, max_results: int = 5) -> str:
    """
    Асинхронна обгортка для пошуку Tavily.
    Повертає відформатований рядок з результатами.
    """
    try:
        print(f"🔎 Searching Web for: {query}")
        
        # Запускаємо синхронний Tavily в окремому потоці, щоб не блокувати FastAPI
        response = await asyncio.to_thread(
            tavily_client.search,
            query=query,
            search_depth="advanced", # "advanced" дає глибший аналіз, ідеально для стратегій
            max_results=max_results
        )
        
        # Форматуємо результати в один зручний текст для LLM
        context_parts = []
        for result in response.get('results', []):
            title = result.get('title', 'No Title')
            content = result.get('content', 'No Content')
            url = result.get('url', '#')
            context_parts.append(f"Source: {title} ({url})\nContent: {content}\n")
            
        return "\n---\n".join(context_parts)

    except Exception as e:
        print(f"❌ Error in Search service: {e}")
        return "Не вдалося отримати дані з інтернету."