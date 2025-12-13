"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  User, 
  Loader2,
  MessageCircleWarning,
  Store,
  ShieldAlert,
  HandCoins,
  TriangleAlert,
  LucideIcon
} from "lucide-react";
import { ChatMessage } from "@/components/chat/chat-message";
import { AgentCard } from "@/components/chat/agent-card";
import { WelcomeScreen } from "@/components/chat/welcome-screen";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agentResults?: AgentResult[];
}

interface AgentResult {
  name: string;
  icon: LucideIcon;
  preview: string;
  content: string;
  status: "pending" | "running" | "done";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAskedClarification, setHasAskedClarification] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = input.trim();
    setInput("");
    setIsLoading(true);

    // Маппінг агентів до іконок
    const agentIcons: Record<string, LucideIcon> = {
      clarifier: MessageCircleWarning,
      framing: MessageCircleWarning,
      hypothesis: MessageCircleWarning,
      routing: MessageCircleWarning,
      market: Store,
      competitors: ShieldAlert,
      frameworks: MessageCircleWarning,
      finance: HandCoins,
      risks: TriangleAlert,
      scenarios: MessageCircleWarning,
      synthesis: MessageCircleWarning,
      advocate: ShieldAlert,
      output: MessageCircleWarning,
    };

    // Створюємо повідомлення асистента
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "Аналізую вашу бізнес-ідею...",
      agentResults: [],
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // SSE streaming від бекенду
      // Якщо вже було уточнення - пропускаємо Clarifier
      const response = await fetch("http://127.0.0.1:8000/api/strategy/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query,
          skip_clarification: hasAskedClarification 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              
              // Фінальна відповідь
              if (data.agent === "complete") {
                // Якщо були уточнення - запам'ятовуємо
                if (data.status === "needs_clarification") {
                  setHasAskedClarification(true);
                }
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? {
                          ...msg,
                          content: data.markdown || "Аналіз завершено",
                          agentResults: msg.agentResults?.map((a) => ({
                            ...a,
                            status: "done" as const,
                          })),
                        }
                      : msg
                  )
                );
                continue;
              }

              // Оновлення прогресу агента
              if (data.agent && data.status) {
                setMessages((prev) =>
                  prev.map((msg) => {
                    if (msg.id !== assistantMessageId) return msg;

                    const existingAgent = msg.agentResults?.find(
                      (a) => a.name === data.name
                    );

                    if (existingAgent) {
                      // Оновлюємо існуючого агента
                      return {
                        ...msg,
                        agentResults: msg.agentResults?.map((a) =>
                          a.name === data.name
                            ? {
                                ...a,
                                status: data.status as "pending" | "running" | "done",
                                preview: data.preview || a.preview,
                                content: data.content || a.content,
                              }
                            : a
                        ),
                      };
                    } else {
                      // Додаємо нового агента
                      return {
                        ...msg,
                        agentResults: [
                          ...(msg.agentResults || []),
                          {
                            name: data.name || data.agent,
                            icon: agentIcons[data.agent] || MessageCircleWarning,
                            preview: data.preview || "Обробка...",
                            content: data.content || "",
                            status: data.status as "pending" | "running" | "done",
                          },
                        ],
                      };
                    }
                  })
                );
              }
            } catch {
              // Пропускаємо некоректний JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: "❌ Помилка з'єднання з сервером. Переконайтеся, що бекенд запущено на http://127.0.0.1:8000",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-black">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Strategy OS logo">
                <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M64 22v24"/>
                  <path d="M64 46L32 64"/>
                  <path d="M64 46L96 64"/>
                  <path d="M32 64L32 92"/>
                  <path d="M96 64L96 92"/>
                  <path d="M64 46L64 92" opacity="0.55"/>
                  <path d="M32 92L50 106"/>
                  <path d="M96 92L78 106"/>
                </g>
                <g fill="currentColor">
                  <circle cx="64" cy="22" r="7"/>
                  <circle cx="64" cy="46" r="6"/>
                  <circle cx="32" cy="64" r="6"/>
                  <circle cx="96" cy="64" r="6"/>
                  <circle cx="50" cy="106" r="6"/>
                  <circle cx="78" cy="106" r="6"/>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Strategy OS</h1>
              <p className="text-xs text-neutral-500">AI-powered business analysis</p>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-xs text-neutral-500">13 агентів онлайн</span>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <WelcomeScreen onExampleClick={(text: string) => setInput(text)} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((message) => {
              const isComplete = message.agentResults?.every(a => a.status === "done") ?? false;
              const hasFinalReport = message.content && message.content !== "Аналізую вашу бізнес-ідею..." && message.role === "assistant";
              
              return (
                <div key={message.id}>
                  {/* Показуємо повідомлення користувача */}
                  {message.role === "user" && (
                    <ChatMessage
                      role={message.role}
                      content={message.content}
                    />
                  )}
                  
                  {/* Спочатку показуємо карточки агентів */}
                  {message.agentResults && message.agentResults.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {message.agentResults.map((agent, idx) => (
                        <AgentCard
                          key={idx}
                          name={agent.name}
                          icon={agent.icon}
                          preview={agent.preview}
                          content={agent.content}
                          status={agent.status}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Фінальний звіт показуємо в кінці */}
                  {message.role === "assistant" && hasFinalReport && isComplete && (
                    <div className="mt-6">
                      <ChatMessage
                        role="assistant"
                        content={message.content}
                        showFinalReport={true}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-300">
                  <svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Strategy OS logo">
                    <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M64 22v24"/>
                      <path d="M64 46L32 64"/>
                      <path d="M64 46L96 64"/>
                      <path d="M32 64L32 92"/>
                      <path d="M96 64L96 92"/>
                      <path d="M64 46L64 92" opacity="0.55"/>
                      <path d="M32 92L50 106"/>
                      <path d="M96 92L78 106"/>
                    </g>
                    <g fill="currentColor">
                      <circle cx="64" cy="22" r="7"/>
                      <circle cx="64" cy="46" r="6"/>
                      <circle cx="32" cy="64" r="6"/>
                      <circle cx="96" cy="64" r="6"/>
                      <circle cx="50" cy="106" r="6"/>
                      <circle cx="78" cy="106" r="6"/>
                    </g>
                  </svg>
                </div>
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Генерую відповідь...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-800 bg-gradient-to-t from-neutral-950 to-transparent p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="group relative">
            {/* Main input container */}
            <div className="relative overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-neutral-600 focus-within:border-white/20 focus-within:bg-neutral-900/80">
              {/* Gradient border effect on focus */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-focus-within:opacity-20" />
              
              <div className="relative flex items-end gap-3 p-4">
                {/* Textarea */}
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as any);
                    }
                  }}
                  placeholder="Опишіть вашу бізнес-ідею... (Shift+Enter для нового рядка)"
                  disabled={isLoading}
                  className="flex-1 resize-none bg-transparent text-base text-white placeholder-neutral-500 focus:outline-none disabled:opacity-50 max-h-48"
                  rows={1}
                  style={{
                    minHeight: "24px",
                    height: input ? `${Math.min(input.split("\n").length * 24, 192)}px` : "24px",
                  }}
                />
                
                {/* Send button */}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-200 hover:scale-110 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Helper text */}
            <p className="mt-2 text-xs text-neutral-500 px-2">
              Натисніть Enter для відправки, Shift+Enter для нового рядка
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
