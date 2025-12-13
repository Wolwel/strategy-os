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
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
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
              Валідуй бізнес-ідеї за секунди
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
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
                <div className="text-sm font-medium">Strategy report preview</div>
                <div className="text-xs text-muted-foreground">
                  SSE streaming · multi-agent synthesis
                </div>
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="border-b border-border p-4 sm:border-b-0 sm:border-r sm:p-6">
                  <div className="text-xs font-medium text-muted-foreground">
                    INPUT
                  </div>
                  <div className="mt-3 rounded-lg border border-border bg-background px-4 py-3 text-sm">
                    "Запусти SaaS для автоматизації фінансових звітів малого бізнесу
                    в Україні. Хочу зрозуміти ринок, конкурентів, unit economics і
                    стратегію go-to-market."
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs">
                      Market
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs">
                      Competitors
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs">
                      Finance
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs">
                      Risk
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-xs font-medium text-muted-foreground">
                    OUTPUT
                  </div>
                  <div className="mt-3 space-y-3 text-sm">
                    <div className="rounded-lg border border-border bg-background px-4 py-3">
                      <div className="font-medium">Висновок</div>
                      <div className="mt-1 text-muted-foreground">
                        Попит підтверджується сегментом SMB; ключовий ризик —
                        канали продажу та довіра до даних.
                      </div>
                    </div>
                    <div className="rounded-lg border border-border bg-background px-4 py-3">
                      <div className="font-medium">Що робити далі</div>
                      <div className="mt-1 text-muted-foreground">
                        Перевірити 2–3 канали acquisition, зібрати 10 інтерв'ю,
                        прогнати 3 сценарії churn і CAC.
                      </div>
                    </div>
                    <div className="rounded-lg border border-border bg-background px-4 py-3">
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
                Оркестрація 10 спеціалізованих агентів
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

        {/* Features */}
        <section id="features" className="border-t border-border">
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
        <section id="architecture" className="border-t border-border">
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
                <div className="text-sm font-medium">Агенти (приклад складу)</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Problem",
                    "Hypothesis",
                    "Router",
                    "Market",
                    "Competitor",
                    "Finance",
                    "Frameworks",
                    "Risk",
                    "Scenario",
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
        <section className="border-t border-border">
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
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span>© {new Date().getFullYear()} Strategy OS</span>
            <span className="hidden sm:inline">·</span>
            <span>Розроблено командою <span className="font-medium text-foreground">Tetra</span></span>
          </div>
          <div className="flex gap-4">
            <a className="transition-colors duration-200 hover:text-foreground" href="#features">
              Можливості
            </a>
            <a className="transition-colors duration-200 hover:text-foreground" href="#architecture">
              Архітектура
            </a>
            <a className="transition-colors duration-200 hover:text-foreground" href="/chat">
              Чат
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
