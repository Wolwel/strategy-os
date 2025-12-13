"use client";

import { Store, ShieldAlert, HandCoins, TriangleAlert } from "lucide-react";

interface WelcomeScreenProps {
  onExampleClick: (text: string) => void;
}

const examples = [
  "Запусти SaaS для автоматизації фінансових звітів малого бізнесу в Україні",
  "Створи маркетплейс для оренди спортивного обладнання",
  "Додаток для менторства в IT-індустрії",
  "Платформа для онлайн-курсів з української мови для іноземців",
];

const features = [
  { icon: Store, label: "Ринок" },
  { icon: ShieldAlert, label: "Конкуренти" },
  { icon: HandCoins, label: "Фінанси" },
  { icon: TriangleAlert, label: "Ризики" },
];

export function WelcomeScreen({ onExampleClick }: WelcomeScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      {/* Floating icon */}
      <div className="mb-6">
        <svg width="60" height="60" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Strategy OS logo">
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

      <h2 className="mb-2 text-2xl font-semibold text-white">
        Вітаю в Strategy OS
      </h2>

      <p className="mb-8 max-w-md text-neutral-500">
        Опишіть вашу бізнес-ідею, і система з 13 AI-агентів проаналізує ринок,
        конкурентів, фінанси та ризики.
      </p>

      {/* Feature chips */}
      <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-400"
          >
            <feature.icon className="h-4 w-4" />
            <span>{feature.label}</span>
          </div>
        ))}
      </div>

      {/* Example prompts */}
      <div className="w-full max-w-2xl">
        <p className="mb-3 text-xs text-neutral-600">Спробуйте приклади:</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => onExampleClick(example)}
              className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-left text-sm text-neutral-400 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900 hover:text-neutral-200"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
