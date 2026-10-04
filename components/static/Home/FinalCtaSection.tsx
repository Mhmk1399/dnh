import { ArrowLeft } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";

type ConversionPath = {
  id: "assessment" | "consultation";
  order: "01" | "02";
  title: string;
  englishTitle: string;
  description: string;
  cta: string;
  href: string;
  micro: string;
  emphasis: "primary" | "secondary";
};

const PATHS: ConversionPath[] = [
  {
    id: "consultation",
    order: "02",
    title: "درخواست مشاوره راهبردی",
    englishTitle: "Strategic Consultation",
    description:
      "برای زمانی که مسئله مشخص‌تر است و نیاز به گفت‌وگوی تخصصی و بررسی راهبردی وجود دارد.",
    cta: "درخواست مشاوره راهبردی",
    href: "/consultation",
    micro: "برای ورود مستقیم به گفت‌وگوی تخصصی",
    emphasis: "secondary",
  },
  {
    id: "assessment",
    order: "01",
    title: "ارزیابی اولیه تصمیم مالی",
    englishTitle: "Financial Decision Assessment",
    description:
      "برای زمانی که لازم است ابتدا مسئله، سطح پیچیدگی و مسیر مناسب همکاری روشن‌تر شود.",
    cta: "ارزیابی اولیه تصمیم مالی",
    href: "/assessment",
    micro: "برای تشخیص نقطه شروع مناسب",
    emphasis: "primary",
  },
];

export function FinalCtaSection() {
  const consultation = PATHS.find((item) => item.id === "consultation")!;
  const assessment = PATHS.find((item) => item.id === "assessment")!;

  return (
    <section
      dir="rtl"
      aria-labelledby="final-cta-title"
      className="
        relative
        isolate
        overflow-hidden
        border-t
        border-b
        border-[color:color-mix(in_srgb,var(--dnh-primary)_20%,transparent)]
        bg-[#042D3B]
        text-[var(--dnh-text-on-brand)]
      "
    >
      <BackgroundLayers />

      <div
        className="
          relative
          z-10
          dnh-site-shell
          mx-auto
          w-full
          max-w-[1536px]
          px-5
          py-14
          sm:px-8
          sm:py-16
          lg:px-12
          lg:py-20
          xl:px-16
          2xl:px-20
        "
      >
        {/* Heading */}
        <header
          className="
            mx-auto
            max-w-[900px]
            text-center
          "
        >
          <div
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />
            <span
              className="
                text-[10px]
                font-black
                tracking-[0.08em]
                text-[color-mix(in_srgb,var(--dnh-text-on-brand)_88%,transparent)]
                sm:text-[11px]
              "
            >
              گام بعدی
            </span>
          </div>

          <h2
            id="final-cta-title"
            className="
              text-balance
              text-[31px]
              font-black
              leading-[1.45]
              tracking-[-0.04em]
              text-[var(--dnh-text-on-brand)]
              sm:text-[42px]
              lg:text-[56px]
            "
          >
            برای هر موقعیت،
            <br />
            یک نقطه شروع مناسب وجود دارد.
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[760px]
              text-[13px]
              font-medium
              leading-[2]
              text-[color-mix(in_srgb,var(--dnh-text-on-brand)_72%,transparent)]
              sm:text-[14px]
              lg:text-[15px]
            "
          >
            اگر هنوز نمی‌دانید کدام مسیر برای مسئله شما مناسب‌تر است، ارزیابی
            اولیه می‌تواند نقطه شروع باشد. اگر مسئله و نیاز شما مشخص‌تر است،
            می‌توانید درخواست مشاوره راهبردی ثبت کنید.
          </p>
        </header>

        {/* Mobile / Tablet cards */}
        <div
          className="
            mt-10
            grid
            gap-4
            lg:hidden
          "
        >
          <PathCardMobile item={consultation} />
          <PathCardMobile item={assessment} />
        </div>

        {/* Desktop composition */}
        <div
          className="
            relative
            mt-12
            hidden
            min-h-[420px]
            lg:block
          "
        >
          <DecisionAxis />

          <div
            className="
              grid
              min-h-[420px]
              grid-cols-[1fr_520px_1fr]
              items-center
              gap-8
            "
          >
            {" "}
            <PathPanelDesktop
              item={assessment}
              align="right"
              className="pr-2 xl:pr-6"
            />{" "}
            <CenterArchitecture />
            <PathPanelDesktop
              item={consultation}
              align="left"
              className="pl-2 xl:pl-6"
            />
          </div>
        </div>

        {/* Bottom trust line */}
        <div
          className="
            mt-10
            border-t
            border-[color:color-mix(in_srgb,var(--dnh-text-on-brand)_14%,transparent)]
            pt-4
            sm:mt-12
            sm:pt-5
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3
              text-center
              sm:flex-row
              sm:flex-wrap
              sm:items-center
              sm:justify-between
            "
          >
            <div
              className="
                hidden
                items-center
                gap-5
                sm:flex
              "
            >
              <TrustItem>DNH</TrustItem>
              <TrustItem>Structured Analysis</TrustItem>
              <TrustItem>Strategic Advisory</TrustItem>
              <TrustItem>Confidential Approach</TrustItem>
            </div>

            <p
              className="
                w-full
                text-[11px]
                font-medium
                tracking-[0.02em]
                text-[color-mix(in_srgb,var(--dnh-text-on-brand)_72%,transparent)]
                sm:w-auto
                sm:text-right
              "
            >
              شروع همکاری، با شناخت مسئله آغاز می‌شود.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PathPanelDesktop({
  item,
  align,
  className = "",
}: {
  item: ConversionPath;
  align: "left" | "right";
  className?: string;
}) {
  const isPrimary = item.emphasis === "primary";

  return (
    <article
      className={`
        relative
        z-10
        flex
        h-full
        flex-col
        justify-center
        ${align === "left" ? "items-start text-right" : "items-end text-right"}
        ${className}
      `}
    >
      <div
        className={`
          relative
          w-full
          max-w-[360px]
          border
          px-7
          py-7
          backdrop-blur-[2px]
          transition-[transform,border-color,background-color,box-shadow]
          duration-300
          ease-[cubic-bezier(.22,1,.36,1)]
          hover:-translate-y-px
          ${
            isPrimary
              ? `
                border-[color:color-mix(in_srgb,var(--dnh-accent)_75%,transparent)]
                bg-[color:color-mix(in_srgb,var(--dnh-primary)_13%,transparent)]
                shadow-[0_24px_50px_color-mix(in_srgb,var(--dnh-accent)_14%,transparent)]
              `
              : `
                border-[color:color-mix(in_srgb,var(--dnh-text-on-brand)_24%,transparent)]
                bg-[color:color-mix(in_srgb,var(--dnh-text-on-brand)_4%,transparent)]
                shadow-[0_18px_40px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]
                hover:border-[color:color-mix(in_srgb,var(--dnh-text-on-brand)_38%,transparent)]
                hover:bg-[color:color-mix(in_srgb,var(--dnh-text-on-brand)_6%,transparent)]
              `
          }
        `}
      >
        <span
          dir="ltr"
          className={`
            mb-5
            block
            text-[72px]
            font-light
            leading-none
            tracking-[-0.07em]
            ${
              isPrimary
                ? "text-[color:color-mix(in_srgb,var(--dnh-primary)_78%,white)]"
                : "text-[color:color-mix(in_srgb,var(--dnh-primary)_70%,white)]"
            }
          `}
        >
          {item.order}
        </span>

        <div
          className={`
            mb-4
            h-px
            w-14
            ${isPrimary ? "bg-brand-accent" : "bg-white/35"}
          `}
        />

        <h3
          className="
            text-[30px]
            font-black
            leading-[1.55]
            tracking-[-0.035em]
            text-[var(--dnh-text-on-brand)]
          "
        >
          {item.title}
        </h3>

        <p
          dir="ltr"
          className="
            mt-2
            text-[10px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-[color-mix(in_srgb,var(--dnh-text-on-brand)_68%,transparent)]
          "
        >
          {item.englishTitle}
        </p>

        <p
          className="
            mt-6
            text-[14px]
            font-medium
            leading-[2.05]
            text-[color-mix(in_srgb,var(--dnh-text-on-brand)_76%,transparent)]
          "
        >
          {item.description}
        </p>

        <div className="mt-7 w-full">
          <ActionButton
            href={item.href}
            variant={isPrimary ? "assessment" : "secondary"}
            size="md"
            icon={ArrowLeft}
            className={`
              w-full
              min-w-0
              ${
                !isPrimary
                  ? `
                    border-[color-mix(in_srgb,var(--dnh-text-on-brand)_28%,transparent)]
                    bg-[color-mix(in_srgb,var(--dnh-text-on-brand)_4%,transparent)]
                    text-[var(--dnh-text-on-brand)]
                    shadow-none
                    hover:border-[color-mix(in_srgb,var(--dnh-text-on-brand)_46%,transparent)]
                    hover:bg-[color-mix(in_srgb,var(--dnh-text-on-brand)_9%,transparent)]
                    hover:text-[var(--dnh-text-on-brand)]
                  `
                  : ""
              }
            `}
          >
            {item.cta}
          </ActionButton>
        </div>

        <p
          className="
            mt-3
            text-[11px]
            font-medium
            text-[color-mix(in_srgb,var(--dnh-text-on-brand)_62%,transparent)]
          "
        >
          {item.micro}
        </p>
      </div>
    </article>
  );
}

function PathCardMobile({ item }: { item: ConversionPath }) {
  const isPrimary = item.emphasis === "primary";

  return (
    <article
      className={`
        relative
        overflow-hidden
        border
        px-4
        py-5
        sm:px-5
        sm:py-6
        ${
          isPrimary
            ? `
              border-[color:color-mix(in_srgb,var(--dnh-accent)_75%,transparent)]
              bg-[color:color-mix(in_srgb,var(--dnh-primary)_14%,transparent)]
              shadow-[0_16px_34px_color-mix(in_srgb,var(--dnh-accent)_14%,transparent)]
            `
            : `
              border-[color:color-mix(in_srgb,var(--dnh-text-on-brand)_20%,transparent)]
              bg-[color:color-mix(in_srgb,var(--dnh-text-on-brand)_4%,transparent)]
            `
        }
      `}
    >
      <div
        className="
          absolute
          inset-y-0
          right-0
          w-px
          bg-[color:color-mix(in_srgb,var(--dnh-text-on-brand)_10%,transparent)]
        "
      />

      <div
        className="
          mb-4
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div className="text-right">
          <h3
            className="
              text-[22px]
              font-black
              leading-[1.6]
              tracking-[-0.03em]
              text-[var(--dnh-text-on-brand)]
              sm:text-[24px]
            "
          >
            {item.title}
          </h3>

          <p
            dir="ltr"
            className="
              mt-2
              text-[9px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[color-mix(in_srgb,var(--dnh-text-on-brand)_66%,transparent)]
            "
          >
            {item.englishTitle}
          </p>
        </div>

        <span
          dir="ltr"
          className={`
            shrink-0
            text-[48px]
            font-light
            leading-none
            tracking-[-0.08em]
            ${
              isPrimary
                ? "text-[color:color-mix(in_srgb,var(--dnh-primary)_78%,white)]"
                : "text-[color:color-mix(in_srgb,var(--dnh-primary)_70%,white)]"
            }
          `}
        >
          {item.order}
        </span>
      </div>

      <p
        className="
          text-[13px]
          font-medium
          leading-[2]
          text-[color-mix(in_srgb,var(--dnh-text-on-brand)_76%,transparent)]
          sm:text-[14px]
        "
      >
        {item.description}
      </p>

      <div className="mt-5">
        <ActionButton
          href={item.href}
          variant={isPrimary ? "assessment" : "secondary"}
          size="md"
          icon={ArrowLeft}
          fullWidth
          className={`
            min-w-0
            ${
              !isPrimary
                ? `
                  border-[color-mix(in_srgb,var(--dnh-text-on-brand)_28%,transparent)]
                  bg-[color-mix(in_srgb,var(--dnh-text-on-brand)_4%,transparent)]
                  text-[var(--dnh-text-on-brand)]
                  shadow-none
                  hover:border-[color-mix(in_srgb,var(--dnh-text-on-brand)_46%,transparent)]
                  hover:bg-[color-mix(in_srgb,var(--dnh-text-on-brand)_9%,transparent)]
                  hover:text-[var(--dnh-text-on-brand)]
                `
                : ""
            }
          `}
        >
          {item.cta}
        </ActionButton>
      </div>

      <p
        className="
          mt-3
          text-[11px]
          font-medium
          text-[color-mix(in_srgb,var(--dnh-text-on-brand)_62%,transparent)]
        "
      >
        {item.micro}
      </p>
    </article>
  );
}

function DecisionAxis() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-[1]
      "
    >
      {/* center vertical line */}
      <span
        className="
          absolute
          bottom-8
          left-1/2
          top-8
          w-px
          -translate-x-1/2
          bg-[color:color-mix(in_srgb,var(--dnh-text-on-brand)_14%,transparent)]
        "
      />

      {/* center point */}
      <span
        className="
          absolute
          left-1/2
          top-1/2
          h-3
          w-3
          -translate-x-1/2
          -translate-y-1/2
          bg-brand-accent
          shadow-[0_0_26px_color-mix(in_srgb,var(--dnh-accent)_45%,transparent)]
        "
      />

      {/* extra markers */}
      <span
        className="
          absolute
          left-[34%]
          top-[48%]
          h-2.5
          w-2.5
          bg-brand-primary
        "
      />
      <span
        className="
          absolute
          left-[66%]
          top-[48%]
          h-2.5
          w-2.5
          bg-brand-accent
        "
      />
      <span
        className="
          absolute
          left-[53%]
          top-[43%]
          h-1.5
          w-1.5
          bg-[#ef4444]
        "
      />
    </div>
  );
}

function CenterArchitecture() {
  return (
    <div
      aria-hidden="true"
      className="
        relative
        z-[1]
        mx-auto
        h-[340px]
        w-full
        max-w-[520px]
      "
    >
      <svg
        viewBox="0 0 520 340"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beamLeft" x1="0" y1="170" x2="260" y2="170">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="55%" stopColor="rgba(69, 172, 222, 0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>

          <linearGradient id="beamRight" x1="260" y1="170" x2="520" y2="170">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="45%" stopColor="rgba(252, 133, 2, 0.16)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* central horizon */}
        <line
          x1="0"
          y1="170"
          x2="520"
          y2="170"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />

        {/* diagonal structure */}
        <line
          x1="0"
          y1="50"
          x2="260"
          y2="170"
          stroke="rgba(112,193,232,0.24)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="290"
          x2="260"
          y2="170"
          stroke="rgba(112,193,232,0.24)"
          strokeWidth="1"
        />
        <line
          x1="260"
          y1="170"
          x2="520"
          y2="50"
          stroke="rgba(252,133,2,0.26)"
          strokeWidth="1"
        />
        <line
          x1="260"
          y1="170"
          x2="520"
          y2="290"
          stroke="rgba(252,133,2,0.26)"
          strokeWidth="1"
        />

        {/* filled beams */}
        <polygon points="0,78 260,170 0,262" fill="url(#beamLeft)" />
        <polygon points="260,170 520,78 520,262" fill="url(#beamRight)" />

        {/* architectural blades */}
        <g opacity="0.95">
          <rect
            x="100"
            y="114"
            width="22"
            height="112"
            fill="rgba(133, 212, 248, 0.24)"
            stroke="rgba(161, 227, 255, 0.34)"
          />
          <rect
            x="144"
            y="100"
            width="28"
            height="140"
            fill="rgba(133, 212, 248, 0.18)"
            stroke="rgba(161, 227, 255, 0.32)"
          />
          <rect
            x="178"
            y="88"
            width="36"
            height="164"
            fill="rgba(133, 212, 248, 0.16)"
            stroke="rgba(161, 227, 255, 0.32)"
          />
        </g>

        <g opacity="0.95">
          <rect
            x="300"
            y="114"
            width="22"
            height="112"
            fill="rgba(252, 133, 2, 0.12)"
            stroke="rgba(255, 182, 96, 0.36)"
          />
          <rect
            x="348"
            y="100"
            width="28"
            height="140"
            fill="rgba(252, 133, 2, 0.10)"
            stroke="rgba(255, 182, 96, 0.34)"
          />
          <rect
            x="390"
            y="88"
            width="36"
            height="164"
            fill="rgba(252, 133, 2, 0.08)"
            stroke="rgba(255, 182, 96, 0.34)"
          />
        </g>

        {/* guide lines */}
        <line
          x1="80"
          y1="60"
          x2="80"
          y2="280"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        <line
          x1="440"
          y1="60"
          x2="440"
          y2="280"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />

        {/* markers */}
        <rect x="254" y="164" width="12" height="12" fill="#FC8502" />
        <rect x="126" y="164" width="8" height="8" fill="#167394" />
        <rect x="386" y="164" width="8" height="8" fill="#FC8502" />
      </svg>
    </div>
  );
}

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <span
      dir="ltr"
      className="
        inline-flex
        items-center
        gap-2
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.22em]
        text-[color-mix(in_srgb,var(--dnh-text-on-brand)_66%,transparent)]
      "
    >
      <span className="h-2.5 w-2.5 bg-brand-accent" />
      <span>{children}</span>
    </span>
  );
}

function BackgroundLayers() {
  return (
    <>
      {/* base gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #06384A 0%,
              #032C39 42%,
              #042734 100%
            )
          `,
        }}
      />

      {/* ambient lights */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-100
        "
        style={{
          background: `
            radial-gradient(circle at 50% 18%, color-mix(in srgb, var(--dnh-primary) 20%, transparent) 0%, transparent 40%),
            radial-gradient(circle at 74% 60%, color-mix(in srgb, var(--dnh-accent) 10%, transparent) 0%, transparent 28%),
            radial-gradient(circle at 20% 26%, color-mix(in srgb, var(--dnh-primary) 16%, transparent) 0%, transparent 30%)
          `,
        }}
      />

      {/* grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.14]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)
          `,
          backgroundSize: "88px 88px",
        }}
      />

      {/* frame lines */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
        "
      />
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
        "
      />
    </>
  );
}
