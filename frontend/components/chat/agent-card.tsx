"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Loader2, LucideIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AgentCardProps {
  name: string;
  icon: LucideIcon;
  preview: string;
  content: string;
  status: "pending" | "running" | "done";
}

// Прибираємо смайлики з назви агента
function cleanAgentName(name: string): string {
  return name.replace(/[🚀🔬🚦📈⚔️🧩💰⚖️🔮🏁😈📄❓]/g, "").trim();
}

// Генеруємо прев'ю з контенту
function generatePreview(content: string, fallback: string): string {
  if (!content || content.length === 0) return fallback;
  // Прибираємо markdown символи і беремо перші 100 символів
  const cleanText = content
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\|/g, '')
    .replace(/-{3,}/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  return cleanText.length > 80 ? cleanText.slice(0, 80) + "..." : cleanText;
}

export function AgentCard({ name, icon: Icon, preview, content, status }: AgentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isRunning = status === "running";
  const cleanName = cleanAgentName(name);
  // Показуємо прев'ю з контенту як тільки він з'явився
  const displayPreview = content && content.length > 0 ? generatePreview(content, preview) : preview;
  const hasContent = Boolean(content && content.length > 0);

  const handleClick = () => {
    console.log("AgentCard clicked:", { name, hasContent, content: content?.slice(0, 100) });
    if (hasContent) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`
        rounded-lg border transition-all duration-300
        ${isRunning
          ? "animate-pulse border-neutral-700 bg-neutral-900"
          : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
        }
      `}
    >
      {/* Header */}
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        className={`flex w-full items-start gap-3 p-3 text-left ${hasContent ? 'cursor-pointer hover:bg-neutral-800/30' : 'cursor-default'}`}
      >
        {/* Icon container */}
        <div
          className={`
            flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm
            ${isRunning ? "bg-neutral-700" : "bg-neutral-800"}
          `}
        >
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
          ) : (
            <Icon className="h-4 w-4 text-neutral-400" />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-100">{cleanName}</span>
            {isRunning && (
              <span className="text-xs text-neutral-500">працює...</span>
            )}
            {status === "done" && (
              <span className="text-xs text-green-500">✓</span>
            )}
          </div>
          <p className="mt-1 truncate text-xs text-neutral-500">{displayPreview}</p>
        </div>

        {/* Expand icon */}
        {hasContent && (
          isExpanded ? (
            <ChevronUp className="h-4 w-4 shrink-0 text-neutral-500" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500" />
          )
        )}
      </div>

      {/* Expanded content with Markdown */}
      {isExpanded && content && (
        <div className="px-3 pb-3">
          <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3 max-h-96 overflow-y-auto custom-scrollbar">
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-lg font-bold text-white mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-semibold text-white mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold text-neutral-200 mb-1">{children}</h3>,
                  p: ({ children }) => <p className="text-sm text-neutral-300 mb-2">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside text-sm text-neutral-300 mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside text-sm text-neutral-300 mb-2">{children}</ol>,
                  li: ({ children }) => <li className="text-sm text-neutral-300">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                  em: ({ children }) => <em className="italic text-neutral-400">{children}</em>,
                  code: ({ children }) => <code className="bg-neutral-800 px-1 py-0.5 rounded text-xs text-green-400">{children}</code>,
                  table: ({ children }) => <div className="overflow-x-auto my-3"><table className="w-full border-collapse text-xs border border-neutral-700">{children}</table></div>,
                  thead: ({ children }) => <thead className="bg-neutral-800">{children}</thead>,
                  tbody: ({ children }) => <tbody className="divide-y divide-neutral-700">{children}</tbody>,
                  tr: ({ children }) => <tr className="border-b border-neutral-700 hover:bg-neutral-800/50">{children}</tr>,
                  th: ({ children }) => <th className="p-2 text-left text-neutral-200 font-semibold border border-neutral-700">{children}</th>,
                  td: ({ children }) => <td className="p-2 text-neutral-300 border border-neutral-700">{children}</td>,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
