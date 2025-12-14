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
  SkipForward,
  Trash2,
  LucideIcon
} from "lucide-react";
import { ChatMessage } from "@/components/chat/chat-message";
import { AgentCard } from "@/components/chat/agent-card";
import { WelcomeScreen } from "@/components/chat/welcome-screen";

// Custom SVG icons for specific agents
const FrameIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="22" x2="2" y1="6" y2="6" />
    <line x1="22" x2="2" y1="18" y2="18" />
    <line x1="6" x2="6" y1="2" y2="22" />
    <line x1="18" x2="18" y1="2" y2="22" />
  </svg>
);

const ScenariosIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
    <path d="m6.2 5.3 3.1 3.9" />
    <path d="m12.4 3.4 3.1 4" />
    <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
  </svg>
);

const SynthesisIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M17 12h-2l-2 5-2-10-2 5H7" />
  </svg>
);

const AdvocateIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3v18" />
    <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
    <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
    <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
    <path d="M7 21h10" />
  </svg>
);

const ReportIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
  </svg>
);

const ClarifierIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const FrameworksIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
    <path d="M4 6h.01" />
    <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
    <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
    <path d="M12 18h.01" />
    <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
    <circle cx="12" cy="12" r="2" />
    <path d="m13.41 10.59 5.66-5.66" />
  </svg>
);

const RouterIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
    <path d="M12 12v3" />
  </svg>
);

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
  const [needsClarification, setNeedsClarification] = useState(false);
  const [originalQuery, setOriginalQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Завантаження історії з localStorage при старті
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('strategy-os-messages');
      const savedClarification = localStorage.getItem('strategy-os-clarification');
      const savedOriginalQuery = localStorage.getItem('strategy-os-original-query');
      
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        // Відновлюємо іконки для агентів
        const agentIconsMap: Record<string, LucideIcon> = {
          clarifier: ClarifierIcon,
          framing: FrameIcon,
          hypothesis: MessageCircleWarning,
          routing: RouterIcon,
          market: Store,
          competitors: ShieldAlert,
          frameworks: FrameworksIcon,
          finance: HandCoins,
          risks: TriangleAlert,
          scenarios: ScenariosIcon,
          synthesis: SynthesisIcon,
          advocate: AdvocateIcon,
          output: ReportIcon,
        };
        
        const restoredMessages = parsed.map((msg: Message & { agentResults?: (AgentResult & { agentType?: string })[] }) => ({
          ...msg,
          agentResults: msg.agentResults?.map(agent => ({
            ...agent,
            icon: agentIconsMap[agent.agentType || 'clarifier'] || MessageCircleWarning
          }))
        }));
        
        setMessages(restoredMessages);
      }
      if (savedClarification === 'true') {
        setHasAskedClarification(true);
      }
      if (savedOriginalQuery) {
        setOriginalQuery(savedOriginalQuery);
      }
    } catch (e) {
      console.error('Error loading chat history:', e);
    }
  }, []);

  // Збереження в localStorage при зміні повідомлень
  useEffect(() => {
    if (messages.length > 0) {
      try {
        // Зберігаємо без іконок (вони не серіалізуються)
        const toSave = messages.map(msg => ({
          ...msg,
          agentResults: msg.agentResults?.map(agent => {
            // Визначаємо тип агента для відновлення іконки
            const agentType = agent.name.toLowerCase().includes('clarif') ? 'clarifier' :
                             agent.name.toLowerCase().includes('fram') ? 'framing' :
                             agent.name.toLowerCase().includes('hypoth') ? 'hypothesis' :
                             agent.name.toLowerCase().includes('rout') ? 'routing' :
                             agent.name.toLowerCase().includes('market') ? 'market' :
                             agent.name.toLowerCase().includes('compet') ? 'competitors' :
                             agent.name.toLowerCase().includes('frame') ? 'frameworks' :
                             agent.name.toLowerCase().includes('financ') ? 'finance' :
                             agent.name.toLowerCase().includes('risk') ? 'risks' :
                             agent.name.toLowerCase().includes('scen') ? 'scenarios' :
                             agent.name.toLowerCase().includes('synth') ? 'synthesis' :
                             agent.name.toLowerCase().includes('advoc') ? 'advocate' :
                             agent.name.toLowerCase().includes('output') ? 'output' : 'clarifier';
            return {
              name: agent.name,
              preview: agent.preview,
              content: agent.content,
              status: agent.status,
              agentType
            };
          })
        }));
        localStorage.setItem('strategy-os-messages', JSON.stringify(toSave));
        localStorage.setItem('strategy-os-clarification', hasAskedClarification.toString());
        if (originalQuery) {
          localStorage.setItem('strategy-os-original-query', originalQuery);
        }
      } catch (e) {
        console.error('Error saving chat history:', e);
      }
    }
  }, [messages, hasAskedClarification, originalQuery]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Очистити чат
  const handleClearChat = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setHasAskedClarification(false);
    setNeedsClarification(false);
    setOriginalQuery("");
    localStorage.removeItem('strategy-os-messages');
    localStorage.removeItem('strategy-os-clarification');
    localStorage.removeItem('strategy-os-original-query');
  };

  // Отримати контекст для бекенду (останні повідомлення)
  const getContextForBackend = () => {
    // Беремо останні 6 повідомлень для контексту
    const recentMessages = messages.slice(-6);
    return recentMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  };

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
    setNeedsClarification(false);
    
    // Зберігаємо оригінальний запит для можливого пропуску clarification
    if (!hasAskedClarification) {
      setOriginalQuery(query);
    }

    // Маппінг агентів до іконок
    const agentIcons: Record<string, LucideIcon> = {
      clarifier: ClarifierIcon,
      framing: FrameIcon,
      hypothesis: MessageCircleWarning,
      routing: RouterIcon,
      market: Store,
      competitors: ShieldAlert,
      frameworks: FrameworksIcon,
      finance: HandCoins,
      risks: TriangleAlert,
      scenarios: ScenariosIcon,
      synthesis: SynthesisIcon,
      advocate: AdvocateIcon,
      output: ReportIcon,
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
          skip_clarification: hasAskedClarification,
          context: getContextForBackend()
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
                  setNeedsClarification(true);
                } else {
                  setNeedsClarification(false);
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
                content: "Помилка з'єднання з сервером. Бекенд потух?",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Пропустити уточнення і продовжити з оригінальним запитом
  const handleSkipClarification = async () => {
    if (!originalQuery || isLoading) return;
    
    setIsLoading(true);
    setNeedsClarification(false);
    setHasAskedClarification(true);

    // Маппінг агентів до іконок
    const agentIcons: Record<string, LucideIcon> = {
      clarifier: ClarifierIcon,
      framing: FrameIcon,
      hypothesis: MessageCircleWarning,
      routing: RouterIcon,
      market: Store,
      competitors: ShieldAlert,
      frameworks: FrameworksIcon,
      finance: HandCoins,
      risks: TriangleAlert,
      scenarios: ScenariosIcon,
      synthesis: SynthesisIcon,
      advocate: AdvocateIcon,
      output: ReportIcon,
    };

    // Створюємо повідомлення асистента
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "Продовжую аналіз без уточнень...",
      agentResults: [],
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/strategy/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query: originalQuery,
          skip_clarification: true,
          context: getContextForBackend()
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
              
              if (data.agent === "complete") {
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

              if (data.agent && data.status) {
                setMessages((prev) =>
                  prev.map((msg) => {
                    if (msg.id !== assistantMessageId) return msg;

                    const existingAgent = msg.agentResults?.find(
                      (a) => a.name === data.name
                    );

                    if (existingAgent) {
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
                content: "Помилка з'єднання з сервером.",
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

        <div className="flex items-center gap-4">
          {/* Clear chat button */}
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-1.5 text-xs text-neutral-400 transition-all hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
              title="Очистити чат"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Новий чат</span>
            </button>
          )}
          
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-xs text-neutral-500">13 агентів онлайн</span>
          </div>
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
            
            {/* Skip clarification button */}
            {needsClarification && !isLoading && (
              <div className="mt-3 flex justify-center">
                <button
                  onClick={handleSkipClarification}
                  className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-4 py-2 text-sm text-neutral-400 transition-all duration-200 hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
                >
                  <SkipForward className="h-4 w-4" />
                  <span>Пропустити уточнення</span>
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
