"use client";

import { MorphingText } from "@/components/ui/morphing-text";

const heroTitles = [
  "Валідуй бізнес-ідеї за секунди",
  "Аналізуй ринок з AI-агентами",
  "Будуй стратегію без консультантів",
  "Перевіряй гіпотези миттєво",
  "Знаходь слабкі місця конкурентів",
  "Рахуй Unit Economics автоматично",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              Strategy OS
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Multi-agent strategy engine
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="transition-colors duration-200 hover:text-foreground" href="#how">
              Як працює
            </a>
            <a className="transition-colors duration-200 hover:text-foreground" href="#features">
              Можливості
            </a>
            <a className="transition-colors duration-200 hover:text-foreground" href="#architecture">
              Архітектура
            </a>
            <a className="transition-colors duration-200 hover:text-foreground" href="/chat">
              Чат
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/chat"
              className="hidden rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground sm:inline-flex"
            >
              Відкрити чат
            </a>
            <a
              href="#how"
              className="inline-flex rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90"
            >
              Дивитись як працює
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative w-full px-4 py-16 sm:px-6 sm:py-24 overflow-hidden">
          {/* Moon gradient */}
          <div 
            className="animate-moon-glow pointer-events-none absolute inset-x-0 bottom-0 h-[600px]"
            style={{
              background: "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.02) 55%, transparent 75%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
                FastAPI · Next.js · Tailwind
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
                Multi-agent system
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
                Live market data (Tavily)
              </span>
            </div>

            <h1 className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <MorphingText texts={heroTitles} interval={3000} />
            </h1>
            <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
              Strategy OS — мульти-агентна система для валідації бізнес-ідей.
              Аналізує ринок і конкурентів, рахує фінансові моделі та формує
              комплексну стратегію за лічені секунди.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/chat"
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 sm:w-auto"
              >
                Відкрити чат
              </a>
              <a
                href="#features"
                className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground sm:w-auto"
              >
                Подивитися можливості
              </a>
            </div>
          </div>

          {/* Preview Card */}
          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
                <div className="text-sm font-medium">Strategy report preview</div>
                <div className="text-xs text-muted-foreground">
                  SSE streaming · multi-agent synthesis
                </div>
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r sm:p-6">
                  <div className="text-xs font-medium text-muted-foreground">
                    INPUT
                  </div>
                  <div className="mt-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm">
                    "Запусти SaaS для автоматизації фінансових звітів малого бізнесу
                    в Україні. Хочу зрозуміти ринок, конкурентів, unit economics і
                    стратегію go-to-market."
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs">
                      Market
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs">
                      Competitors
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs">
                      Finance
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs">
                      Risk
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-xs font-medium text-muted-foreground">
                    OUTPUT
                  </div>
                  <div className="mt-3 space-y-3 text-sm">
                    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3">
                      <div className="font-medium">Висновок</div>
                      <div className="mt-1 text-muted-foreground">
                        Попит підтверджується сегментом SMB; ключовий ризик —
                        канали продажу та довіра до даних.
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3">
                      <div className="font-medium">Що робити далі</div>
                      <div className="mt-1 text-muted-foreground">
                        Перевірити 2–3 канали acquisition, зібрати 10 інтерв'ю,
                        прогнати 3 сценарії churn і CAC.
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3">
                      <div className="font-medium">Фреймворки</div>
                      <div className="mt-1 text-muted-foreground">
                        SWOT, Porter's 5 Forces, ризик-матриця.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-3 flex justify-center">
                <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
                  Як це працює
                </span>
              </div>
              <h2 className="text-pretty text-2xl font-semibold tracking-tight sm:text-3xl">
                Оркестрація 13 спеціалізованих агентів
              </h2>
              <p className="mt-3 text-pretty text-base leading-7 text-muted-foreground">
                Замість одного "універсального" промпта система декомпозує задачу,
                запускає потрібних експертів, підтягує дані та синтезує звіт.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  k: "01",
                  t: "Декомпозиція",
                  d: "Розклад ідею на гіпотези для перевірки.",
                },
                {
                  k: "02",
                  t: "Роутинг",
                  d: "Визначає потрібних експертів під запит.",
                },
                {
                  k: "03",
                  t: "Пошук",
                  d: "Збирає живі сигнали про тренди й конкурентів.",
                },
                {
                  k: "04",
                  t: "Математика",
                  d: "Рахує unit economics, P&L, break-even.",
                },
                {
                  k: "05",
                  t: "Синтез",
                  d: "Формує фінальний документ зі фреймворками.",
                },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="text-xs font-medium text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="mt-2 text-sm font-medium">{s.t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gradient wrapper for Features, Architecture, CTA */}
        <div className="relative overflow-hidden">
          {/* Left gradient orb */}
          <div 
            className="pointer-events-none absolute -left-[400px] top-1/4 h-[1200px] w-[900px] animate-moon-glow"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)",
            }}
          />
          {/* Right gradient orb */}
          <div 
            className="pointer-events-none absolute -right-[400px] top-2/3 h-[1200px] w-[900px] animate-moon-glow"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)",
              animationDelay: "2s",
            }}
          />

        {/* Features */}
        <section id="features" className="relative border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-3 flex justify-center">
                <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
                  Ключові можливості
                </span>
              </div>
              <h2 className="text-pretty text-2xl font-semibold tracking-tight sm:text-3xl">
                Від "ідеї" до рішення, яке можна захистити цифрами
              </h2>
              <p className="mt-3 text-pretty text-base leading-7 text-muted-foreground">
                Ринок, конкуренти, фінанси, ризики та сценарії — в одному
                узгодженому потоці.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  t: "Розумний роутинг",
                  d: "Економить ресурси: запускає тільки потрібних агентів.",
                },
                {
                  t: "Живі дані ринку",
                  d: "Tavily API для актуальної інформації в реальному часі.",
                },
                {
                  t: "Фінансове моделювання",
                  d: "CAC, LTV, маржинальність, Burn Rate, break-even.",
                },
                {
                  t: "Перевірка гіпотез",
                  d: "Науковий підхід до ризиків і невизначеності.",
                },
                {
                  t: "Адвокат диявола",
                  d: "Критично оцінює ідею та шукає 'підводні камені'.",
                },
                {
                  t: "Сценарне планування",
                  d: "Оптимістичний, реалістичний і песимістичний сценарії.",
                },
              ].map((f) => (
                <div key={f.t} className="rounded-xl border border-border bg-card p-5">
                  <div className="text-sm font-medium">{f.t}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="relative border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-3 flex justify-center">
                <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
                  Архітектура
                </span>
              </div>
              <h2 className="text-pretty text-2xl font-semibold tracking-tight sm:text-3xl">
                Hub-and-spoke: оркестратор керує потоком
              </h2>
              <p className="mt-3 text-pretty text-base leading-7 text-muted-foreground">
                Оркестратор запускає агентів паралельно, збирає їх результати та
                віддає фінальний звіт у фронтенд.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="text-sm font-medium">Потік обробки</div>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="text-foreground">1.</span> Problem Framing →
                    Hypotheses
                  </li>
                  <li>
                    <span className="text-foreground">2.</span> Router запускає
                    Market / Competitor / Finance / Frameworks
                  </li>
                  <li>
                    <span className="text-foreground">3.</span> Risk + Scenario
                    planning
                  </li>
                  <li>
                    <span className="text-foreground">4.</span> Synthesis → Output
                    (Markdown)
                  </li>
                  <li>
                    <span className="text-foreground">5.</span> Frontend отримує
                    результат або стрім подій (SSE)
                  </li>
                </ol>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Агенти (13 спеціалізованих)</div>
                  <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-medium">
                    13 агентів
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Problem",
                    "Clarifier",
                    "Hypothesis",
                    "Router",
                    "Market",
                    "Competitor",
                    "Finance",
                    "Frameworks",
                    "Risk",
                    "Scenario",
                    "Advocate",
                    "Synthesizer",
                    "Output",
                  ].map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Склад агентів і логіка оркестрації масштабуються під продукт.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-5xl rounded-xl border border-border bg-card px-5 py-8 sm:px-8">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <div className="text-sm font-medium">Спробувати Strategy OS</div>
                  <div className="mt-1 max-w-2xl text-sm text-muted-foreground">
                    Відкрийте чат і отримайте структурований звіт по ідеї: ринок,
                    конкуренти, фінанси, ризики та сценарії — в одному потоці.
                  </div>
                </div>
                <div className="flex w-full gap-2 sm:w-auto">
                  <a
                    href="#how"
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground sm:flex-none"
                  >
                    Як працює
                  </a>
                  <a
                    href="/chat"
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 sm:flex-none"
                  >
                    Відкрити чат
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {/* Top section */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Strategy OS</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Мульти-агентна система для валідації бізнес-ідей. Аналізуй, рахуй, плануй — за секунди.
              </p>
              {/* Social links */}
              <div className="mt-4 flex gap-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Twitter"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a 
                  href="https://t.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Telegram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <div className="text-sm font-medium text-foreground">Продукт</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
                    Можливості
                  </a>
                </li>
                <li>
                  <a href="#how" className="text-muted-foreground transition-colors hover:text-foreground">
                    Як працює
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="text-muted-foreground transition-colors hover:text-foreground">
                    Архітектура
                  </a>
                </li>
                <li>
                  <a href="/chat" className="text-muted-foreground transition-colors hover:text-foreground">
                    Відкрити чат
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-sm font-medium text-foreground">Ресурси</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Документація
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="text-sm font-medium text-foreground">Правова інформація</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Політика конфіденційності
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Умови використання
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Ліцензія
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground sm:flex-row sm:gap-3">
              <span>© 2025 Strategy OS. Усі права захищено.</span>
              <span className="hidden sm:inline">·</span>
              <span>Розроблено командою <span className="font-medium text-foreground">Tetra</span></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Всі системи працюють
              </span>
              <span>·</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
