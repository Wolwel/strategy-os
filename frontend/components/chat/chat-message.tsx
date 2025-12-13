"use client";

import { User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
  showFinalReport?: boolean;
}

export function ChatMessage({ role, content, isLoading, showFinalReport }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex flex-row-reverse gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black">
          <User className="h-5 w-5" />
        </div>
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm text-black">
          {content}
        </div>
      </div>
    );
  }

  // Якщо це проміжне повідомлення (не фінальний звіт) - не показуємо
  if (!showFinalReport) {
    return null;
  }

  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-neutral-300">
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
      <div className="w-full rounded-2xl rounded-bl-md border border-neutral-800 bg-neutral-900 px-5 py-4">
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-xl font-bold text-white mb-3 mt-4 first:mt-0">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-semibold text-white mb-2 mt-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-semibold text-neutral-200 mb-2 mt-3">{children}</h3>,
              p: ({ children }) => <p className="text-sm text-neutral-300 mb-2 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside text-sm text-neutral-300 mb-3 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-sm text-neutral-300 mb-3 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="text-sm text-neutral-300">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
              em: ({ children }) => <em className="italic text-neutral-400">{children}</em>,
              code: ({ children }) => <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-xs text-green-400">{children}</code>,
              hr: () => <hr className="border-neutral-700 my-4" />,
              table: ({ children }) => <div className="overflow-x-auto my-3"><table className="w-full border-collapse text-sm border border-neutral-700">{children}</table></div>,
              thead: ({ children }) => <thead className="bg-neutral-800">{children}</thead>,
              tbody: ({ children }) => <tbody className="divide-y divide-neutral-700">{children}</tbody>,
              tr: ({ children }) => <tr className="border-b border-neutral-700 hover:bg-neutral-800/50">{children}</tr>,
              th: ({ children }) => <th className="p-2 text-left text-neutral-200 font-semibold text-xs border border-neutral-700">{children}</th>,
              td: ({ children }) => <td className="p-2 text-neutral-300 text-xs border border-neutral-700">{children}</td>,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
