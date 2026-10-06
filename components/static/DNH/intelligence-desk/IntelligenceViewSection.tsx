import Link from "next/link";
import {
  ArrowLeft,
  ArrowDownLeft,
  CircleDot,
  Landmark,
  Layers3,
  Droplets,
  ShieldAlert,
} from "lucide-react";

const INTELLIGENCE_AREAS = [
  {
    key: "01",
    en: "MACRO RISK",
    title: "ریسک کلان",
    description:
      "شرایط اقتصادی و ریسک‌های کلان که می‌توانند زمینه یک تصمیم مالی را تغییر دهند.",
    note: "اثر بر سناریو، زمان و مسیر تصمیم",
    icon: Landmark,
  },
  {
    key: "02",
    en: "ASSET VIEW",
    title: "نمای دارایی",
    description:
      "نگاهی به بازارها و دارایی‌ها در نسبت با ساختار کلی تصمیم، نه به‌صورت جدا و تک‌بعدی.",
    note: "اثر بر ترکیب نگاه و کیفیت ارزیابی",
    icon: Layers3,
  },
  {
    key: "03",
    en: "LIQUIDITY",
    title: "نقدشوندگی",
    description:
      "بررسی نقش نقدشوندگی و دسترسی به منابع در کیفیت و انعطاف تصمیم.",
    note: "اثر بر امکان اجرا و قدرت واکنش",
    icon: Droplets,
  },
  {
    key: "04",
    en: "POLICY / FX / INFLATION",
    title: "تورم، ارز و سیاست‌گذاری",
    description:
      "متغیرهایی که می‌توانند بر قدرت خرید، ریسک و شرایط تصمیم اثر بگذارند.",
    note: "اثر بر ریسک، هزینه و پایداری تصمیم",
    icon: ShieldAlert,
  },
] as const;

export function IntelligenceViewSection() {
  return (
    <section
      id="intelligence-view"
      dir="rtl"
      aria-labelledby="intelligence-view-title"
      className="
        relative isolate overflow-hidden border-b border-line bg-white
        scroll-mt-24 sm:scroll-mt-28
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell relative z-10 mx-auto w-full max-w-[1536px]
          px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16 xl:py-28 2xl:px-20
        "
      >
        {/* Header */}
        <div
          className="
            grid gap-8 border-b border-line/80 pb-10
            lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 lg:pb-12
          "
        >
          <div className="order-2 lg:order-2">
            <p
              className="
                max-w-[760px]
                text-[14px] leading-[2.25] text-ink-muted
                sm:text-[15px]
              "
            >
              میز هوشمندی DNH چند زاویه از محیط تصمیم را کنار هم قرار می‌دهد تا
              متغیرهای مهم، ریسک‌ها و زمینه تصمیم واضح‌تر دیده شوند؛ نه برای
              تولید سیگنال یا پیش‌بینی قطعی، بلکه برای روشن‌تر کردن معنای داده
              در مسیر تصمیم.
            </p>

            <div
              className="
                mt-7 flex flex-wrap items-center gap-x-5 gap-y-3
                text-[10px] font-bold text-brand-primary/80
              "
            >
              <MetaDot label="ریسک کلان" />
              <MetaDot label="نمای دارایی" />
              <MetaDot label="نقدشوندگی" />
              <MetaDot label="متغیرهای اثرگذار" />
            </div>
          </div>

          <div className="order-1 text-right lg:order-1">
            <div className="mb-4 flex items-center justify-start gap-3">
              <span className="h-px w-10 bg-brand-accent" aria-hidden="true" />
              <span className="text-[11px] font-black text-brand-primary">
                نمای هوشمندی DNH
              </span>
            </div>

            <h2
              id="intelligence-view-title"
              className="
                max-w-[640px] mr-0 ml-auto
                text-[34px] font-black leading-[1.45] tracking-[-0.045em] text-ink
                sm:text-[44px]
                lg:text-[56px] lg:leading-[1.35]
              "
            >
              پیش از تصمیم،
              <br />
              باید بدانیم{" "}
              <span className="text-brand-primary">چه چیزی اهمیت دارد.</span>
            </h2>
          </div>
        </div>

        {/* Main content */}
        <div
          className="
            mt-10 grid gap-8
            lg:grid-cols-[1.05fr_0.95fr]
            xl:gap-10
          "
        >
          {/* Cards side */}
          <div className="grid gap-5 sm:grid-cols-2">
            {INTELLIGENCE_AREAS.map((item, index) => (
              <AreaCard key={item.key} item={item} index={index} />
            ))}
          </div>

          {/* Summary side */}
          <aside
            className="
              relative overflow-hidden border border-line bg-[linear-gradient(180deg,white_0%,var(--dnh-bg-soft)_100%)]
              p-5 sm:p-7 lg:p-8
              shadow-[0_18px_60px_rgba(18,37,62,0.06)]
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute inset-x-0 top-0 h-[2px]
                bg-[linear-gradient(90deg,var(--dnh-primary)_0%,var(--dnh-accent)_100%)]
              "
            />

            <div className="flex items-center justify-between gap-4">
              <div>
                <p
                  dir="ltr"
                  className="
                    text-[9px] font-black tracking-[0.18em] text-brand-primary/45
                  "
                >
                  INTELLIGENCE VIEW
                </p>
                <h3
                  className="
                    mt-3 text-[24px] font-black leading-[1.7] text-ink
                    sm:text-[28px]
                  "
                >
                  داده زمانی ارزش پیدا می‌کند
                  <br />
                  که معنای آن برای تصمیم روشن شود.
                </h3>
              </div>

              <span
                aria-hidden="true"
                className="hidden h-16 w-px bg-line lg:block"
              />
            </div>

            {/* visual block */}
            <div
              className="
                mt-7 overflow-hidden border border-line bg-white/70 p-4 sm:p-5
              "
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] font-black text-brand-primary">
                  نمای ساده از منطق بررسی
                </p>
                <span
                  dir="ltr"
                  className="text-[8px] font-bold tracking-[0.14em] text-ink-muted"
                >
                  WHAT TO WATCH → IMPLICATION
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-3">
                  <MiniSignal title="Context" width="w-[82%]" />
                  <MiniSignal title="Risk" width="w-[68%]" />
                  <MiniSignal title="Liquidity" width="w-[56%]" />
                  <MiniSignal title="Asset View" width="w-[74%]" />
                </div>

                <div
                  className="
                    flex min-h-[170px] flex-col justify-between
                    border border-dashed border-line p-4
                  "
                >
                  <div>
                    <p
                      className="
                        text-[9px] font-black text-brand-accent
                      "
                    >
                      خروجی مورد انتظار
                    </p>
                    <p
                      className="
                        mt-3 text-[16px] font-black leading-[1.9] text-brand-primary
                      "
                    >
                      چه چیزی را باید زیر نظر داشت
                      <br />و چرا برای تصمیم مهم است؟
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <MicroLabel>What to Watch</MicroLabel>
                    <MicroDivider />
                    <MicroLabel>Strategic Implications</MicroLabel>
                  </div>
                </div>
              </div>
            </div>

            {/* summary bullets */}
            <div className="mt-7 grid gap-3">
              <SummaryPoint>
                این بخش به کاربر کمک می‌کند بفهمد دقیقاً کدام متغیرها باید
                جدی‌تر دیده شوند.
              </SummaryPoint>
              <SummaryPoint>
                معنا و اهمیت داده‌ها را در بستر تصمیم توضیح می‌دهد، نه در خلأ.
              </SummaryPoint>
              <SummaryPoint>
                خروجی آن «درک بهتر محیط تصمیم» است، نه توصیه معاملاتی.
              </SummaryPoint>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#intelligence-layers"
                className="
                  group inline-flex min-h-12 items-center justify-center gap-2
                  bg-brand-primary px-5 text-sm font-bold text-white
                  transition duration-300 hover:bg-brand-secondary
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20
                  sm:min-w-[220px]
                "
              >
                ساختار این نگاه را ببینید
                <ArrowDownLeft
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:-translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>

              <Link
                href="/financial-decision-assessment"
                className="
                  inline-flex min-h-12 items-center justify-center gap-2
                  border border-line bg-white px-5 text-sm font-bold text-ink
                  transition duration-300 hover:border-brand-primary/25 hover:bg-brand-primary/[0.04]
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/15
                  sm:min-w-[220px]
                "
              >
                ارزیابی اولیه تصمیم مالی
                <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function AreaCard({
  item,
  index,
}: {
  item: (typeof INTELLIGENCE_AREAS)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <article
      className="
        group relative overflow-hidden border border-line bg-white
        p-5 sm:p-6
        shadow-[0_12px_40px_rgba(18,37,62,0.04)]
        transition duration-300
        hover:-translate-y-1 hover:border-brand-primary/18 hover:shadow-[0_18px_56px_rgba(18,37,62,0.08)]
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 top-0 h-[2px]
          bg-[linear-gradient(90deg,var(--dnh-primary)_0%,transparent_85%)]
          opacity-0 transition-opacity duration-300 group-hover:opacity-100
        "
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-brand-primary">
              {item.key}
            </span>
            <span
              dir="ltr"
              className="
                text-[8px] font-black tracking-[0.16em] text-brand-primary/42
              "
            >
              {item.en}
            </span>
          </div>

          <h3 className="mt-4 text-[20px] font-black text-ink">{item.title}</h3>
        </div>

        <div
          className="
            flex h-11 w-11 items-center justify-center
            border border-line bg-[var(--dnh-bg-soft)]
            text-brand-primary
            transition duration-300
            group-hover:border-brand-accent/30 group-hover:text-brand-accent
          "
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
      </div>

      <p
        className="
          mt-4 text-[13px] leading-[2.05] text-ink-muted
        "
      >
        {item.description}
      </p>

      <div
        className="
          mt-5 border-t border-line pt-4
        "
      >
        <p className="text-[10px] font-black text-brand-accent">چرا مهم است؟</p>
        <p className="mt-2 text-[12px] leading-7 text-brand-primary">
          {item.note}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="
          mt-5 h-[2px] w-8 bg-brand-primary/16
          transition-all duration-300 group-hover:w-16 group-hover:bg-brand-accent
        "
      />

      <span className="sr-only">کارت شماره {index + 1}</span>
    </article>
  );
}

function MiniSignal({ title, width }: { title: string; width: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span
          dir="ltr"
          className="text-[8px] font-black tracking-[0.14em] text-ink-muted"
        >
          {title}
        </span>
        <span className="h-[5px] w-[5px] bg-brand-accent" />
      </div>

      <div className="h-9 border border-line bg-[var(--dnh-bg-soft)] p-1.5">
        <div
          className={`h-full ${width} bg-[linear-gradient(90deg,var(--dnh-primary)_0%,color-mix(in_srgb,var(--dnh-primary)_38%,white)_100%)]`}
        />
      </div>
    </div>
  );
}

function SummaryPoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <CircleDot
        className="mt-1 h-4 w-4 shrink-0 text-brand-accent"
        strokeWidth={1.8}
      />
      <p className="text-[13px] leading-[2.05] text-ink-muted">{children}</p>
    </div>
  );
}

function MetaDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="h-[5px] w-[5px] bg-brand-accent" />
      <span>{label}</span>
    </span>
  );
}

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      dir="ltr"
      className="text-[8px] font-black tracking-[0.14em] text-brand-primary/42"
    >
      {children}
    </span>
  );
}

function MicroDivider() {
  return (
    <span aria-hidden="true" className="h-[4px] w-[4px] bg-brand-accent" />
  );
}

function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg,color-mix(in srgb,var(--dnh-primary) 3%,white) 0%,white 56%,white 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 5%,transparent) 1px,transparent 1px), linear-gradient(to bottom,color-mix(in srgb,var(--dnh-primary) 4%,transparent) 1px,transparent 1px)",
          backgroundSize: "120px 100%, 100% 120px",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-[-140px] top-[140px]
          h-[280px] w-[280px] rounded-full opacity-[0.08]
        "
        style={{
          background:
            "radial-gradient(circle, var(--dnh-primary) 0%, transparent 72%)",
        }}
      />
    </>
  );
}
