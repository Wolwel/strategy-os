"use client";

import { useState } from "react";
import { Store, ShieldAlert, HandCoins, TriangleAlert, ChevronDown, ChevronUp } from "lucide-react";

interface WelcomeScreenProps {
  onExampleClick: (text: string) => void;
}

interface ExamplePrompt {
  company: string;
  shortDescription: string;
  fullPrompt: string;
}

const examples: ExamplePrompt[] = [
  {
    company: "Kness (Енергетика/BESS)",
    shortDescription: "Партнерство з Kness — 1.44 GW сонячних, BESS $40M, ROI>25%, стратегія Blue Ocean EMS...",
    fullPrompt: "Аналізуй партнерство з Kness (1.44 GW сонячних, BESS $40M 2025). Problem Framing: scale-up BESS/O&M, ROI>25%. Hypothesis: TAM UA-енергія $2B, пріоритет EMS. Market Intel: blackout тренди, Ukrenergo регуляції/API. Competitive: SWOT vs DTEK. Financial: P&L 100 MWh ($60M rev base, ROI 28%). Risk: військові 30%, мітигація UPS. Стратегія: Blue Ocean EMS. Advocate: контраргументи логістики. Scenario: 4 опції (агресивний BESS/пілот/партнерство ITVN/консервативний). Decision: Go агресивний (75% впевненість), next steps: 1. Due diligence; 2. Ліцензії; 3. Пілот 20 MWh; 4. Recruit; 5. Funding. Output: 1-стор PDF summary з ROI-графіком/table для C-Level. Вимоги: Ukrenergo API real-time, worst-case blackout (-50% rev), Excel чутливість inflation 15%."
  },
  {
    company: "PlasmaTec (Промисловість)",
    shortDescription: "Бізнес-план PlasmaTec 2026 — 80k т/рік, $50M rev, експорт UA/CIS, маржа>25%...",
    fullPrompt: "Аналізуй бізнес-план PlasmaTec 2026: Problem Framing (80k т/рік, $50M rev UA/Узбекистан/CIS, маржа>25%, break-even Q3). Hypothesis: TAM зварювання $300M, пріоритет B2B експорт. Market Intel: +15% recovery, Держстат UA. Competitive: SWOT vs ESAB (лідер CIS-пудри). Financial: P&L 60k т ($70M/$50M/$30M rev, ROI 22%). Risk: логістика 35%, мітигація сировини. Стратегія: Porter's CIS, Ansoff machine. Advocate: залежність Узбекистан. Scenario: 4 опції (агресивний порошок/пілот B2B/партнерство Kness/експорт). Decision: Go агресивний (75% впевненість), next steps: 1. Аудит сировини; 2. Сертифікація Канада; 3. Пілот 10k т; 4. Recruit 100; 5. Q2 funding $10M. Output: 1-стор PDF P&L/ROI для CFO/COO. Вимоги: Excel supply chain (санкції 20%), worst-case локдаун 2 міс, milestones Q1 завод/Q4 80k т."
  },
  {
    company: "SalesBox (Loyalty/E-com)",
    shortDescription: "Бізнес-план SalesBox 2026 — 2.5M клієнтів, 5B грн, AI-push loyalty, ARR>30%...",
    fullPrompt: "Аналізуй бізнес-план SalesBox 2026: Problem Framing (2.5M клієнтів, 5B грн, +50% uplift, ARR>30%, churn<10%). Hypothesis: TAM loyalty $500M, пріоритет push. Market Intel: +25% e-com, Google Analytics. Competitive: SWOT vs Rozetka (+43% продажів). Financial: P&L 1.5M ($80M/$55M/$35M rev, ROI 26%). Risk: churn 20%, мітигація A/B. Стратегія: JTBD чеки, Ansoff B2B. Advocate: насичення 1.5M. Scenario: 4 опції (агресивний AI-push/пілот OrthoMax/партнерство ITVN/ритейл). Decision: Go агресивний (82% впевненість), next steps: 1. A/B loyalty; 2. GDPR-аудит; 3. Пілот 500k; 4. Recruit data; 5. Q1 funding $7M. Output: 1-стор PDF дашборд/ROI для CMO/CEO. Вимоги: Excel A/B чутливість, worst-case data leak, milestones Q2 2M/Q4 B2B."
  },
  {
    company: "ITVN (IT-кластер)",
    shortDescription: "Бізнес-план ITVN 2026 — 40 компаній, 50 подій/рік, $20M outsourcing, IT-хаб...",
    fullPrompt: "Аналізуй бізнес-план ITVN 2026: Problem Framing (40 компаній, 50 подій/рік, $20M outsourcing, ROI подій>15%). Hypothesis: TAM IT $5B, пріоритет хакатони. Market Intel: +20% outsourcing, DOU.ua. Competitive: SWOT vs Lviv (Crystal Park). Financial: P&L 20 компаній ($30M/$20M/$12M rev, ROI 18%). Risk: talent 30%, мітигація remote. Стратегія: Blue Ocean кластер, Ansoff партнерства. Advocate: малий scale. Scenario: 4 опції (агресивний хаб 2.0/пілот хакатони/колаб Kness-SalesBox/події). Decision: Go агресивний (78% впевненість), next steps: 1. Мапінг компаній; 2. Event pipeline; 3. Пілот хакатон; 4. Recruit 200 devs; 5. Q1 funding $3M. Output: 1-стор PDF мережа/ROI для CEO/Board. Вимоги: Excel мапінг компаній, worst-case talent outflow, milestones Q1 30 подій/Q4 40 компаній."
  },
];

const features = [
  { icon: Store, label: "Ринок" },
  { icon: ShieldAlert, label: "Конкуренти" },
  { icon: HandCoins, label: "Фінанси" },
  { icon: TriangleAlert, label: "Ризики" },
];

function ExampleCard({ example, onExampleClick }: { example: ExamplePrompt; onExampleClick: (text: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900">
      {/* Header with company name */}
      <div className="border-b border-neutral-800 px-4 py-2">
        <span className="text-xs font-medium text-neutral-500">{example.company}</span>
      </div>
      
      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-sm text-neutral-400 leading-relaxed">
          {isExpanded ? example.fullPrompt : example.shortDescription}
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between border-t border-neutral-800 px-4 py-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Згорнути
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Розгорнути
            </>
          )}
        </button>
        
        <button
          onClick={() => onExampleClick(example.fullPrompt)}
          className="rounded-md bg-neutral-800 px-3 py-1 text-xs text-neutral-300 hover:bg-neutral-700 hover:text-white transition-all"
        >
          Використати
        </button>
      </div>
    </div>
  );
}

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
        <div className="grid gap-3 sm:grid-cols-2">
          {examples.map((example, idx) => (
            <ExampleCard
              key={idx}
              example={example}
              onExampleClick={onExampleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
