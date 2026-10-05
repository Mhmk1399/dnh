"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

type WealthLabelItem = {
  title: string;
  description: string;
  side: "left" | "right";
  position: string;
  delay: number;
};

type MobileLayerLabelItem = {
  title: string;
  top: string;
  delay: number;
};

const WEALTH_LABELS: readonly WealthLabelItem[] = [
  {
    title: "دارایی‌ها",

    description: "دارایی‌های مالی و نحوه ترکیب آن‌ها",

    side: "left",

    position: "top-[12%] left-[2%]",

    delay: 620,
  },

  {
    title: "ریسک",

    description: "شناسایی، ارزیابی و مدیریت ریسک‌ها",

    side: "left",

    position: "top-[38%] left-[0%]",

    delay: 700,
  },

  {
    title: "افق زمانی",

    description: "هم‌راستایی با اهداف کوتاه‌مدت و بلندمدت",

    side: "left",

    position: "top-[66%] left-[1%]",

    delay: 780,
  },

  {
    title: "نقدینگی",

    description: "دسترسی، انعطاف و مدیریت جریان مالی",

    side: "right",

    position: "top-[17%] right-[0%]",

    delay: 660,
  },

  {
    title: "اهداف",

    description: "اهداف مالی و اولویت‌های زندگی",

    side: "right",

    position: "top-[43%] right-[0%]",

    delay: 740,
  },

  {
    title: "تصمیم‌های مالی",

    description: "تصمیم‌های آگاهانه و هماهنگ در یک مسیر",

    side: "right",

    position: "top-[68%] right-[0%]",

    delay: 820,
  },
] as const;

const MOBILE_LAYER_LABELS: readonly MobileLayerLabelItem[] = [
  { title: "دارایی‌ها", top: "top-[15%]", delay: 520 },
  { title: "نقدینگی", top: "top-[31%]", delay: 590 },
  { title: "ریسک", top: "top-[45%]", delay: 660 },
  { title: "اهداف", top: "top-[59%]", delay: 730 },
  { title: "افق زمانی", top: "top-[73%]", delay: 800 },
  { title: "تصمیم‌های مالی", top: "top-[87%]", delay: 870 },
] as const;

export function WealthComponentsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setVisible(true);

        observer.disconnect();
      },

      {
        threshold: 0.16,

        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="wealth-components"
      dir="rtl"
      aria-labelledby="wealth-components-title"
      data-visible={visible}
      className="

        wealth-components-section

        relative

        isolate

        scroll-mt-24

        overflow-hidden

        bg-[#032d3b]

        text-white

      "
    >
      <SectionBackground />

     

      <div
        className="

          relative

          z-10

          mx-auto

          grid

          w-full

          max-w-[1560px]



          gap-10



          px-5

          py-16



          sm:px-8

          sm:py-20



          lg:min-h-[720px]

          lg:grid-cols-[1.14fr_0.86fr]

          lg:items-center

          lg:gap-12

          lg:px-12

          lg:pb-16

          lg:pt-20



          xl:gap-16

          xl:px-16



          2xl:px-20

        "
      >
        {/* =========================================================

            CONTENT — RIGHT

        ========================================================== */}

        <div
          className="

            order-1



            lg:col-start-1

            lg:row-start-1

          "
        >
          <div
            className="

              wealth-content-reveal

              wealth-content-1



              mb-5

              flex

              items-center

              gap-3

            "
          >
            <span className="h-px w-10 bg-brand-accent" />

            <span
              className="

                text-[10px]

                font-black

                text-white/62



                sm:text-[11px]

              "
            >
              اجزای معماری ثروت
            </span>
          </div>

          <h2
            id="wealth-components-title"
            className="

              wealth-content-reveal

              wealth-content-2



              max-w-[630px]



              text-[33px]

              font-black

              leading-[1.58]

              tracking-[-0.045em]



              text-white



              sm:text-[41px]



              lg:text-[46px]



              xl:text-[52px]

            "
          >
            یک ساختار،
            <br />
            از <span className="text-brand-accent">چند لایه</span> مرتبط
            <br />
            ساخته می‌شود.
          </h2>

          <p
            className="

              wealth-content-reveal

              wealth-content-3



              mt-6

              max-w-[610px]



              text-[13px]

              font-medium

              leading-[2.2]



              text-white/64



              sm:text-[14px]



              lg:text-[15px]

            "
          >
            در یک نگاه ساختاریافته، ثروت تنها از دارایی‌ها تشکیل نمی‌شود؛ رابطه
            آن‌ها با نقدینگی، ریسک، اهداف، افق زمانی و تصمیم‌های مالی نیز اهمیت
            دارد. معماری ثروت این اجزا را در کنار هم می‌بیند تا تصویر روشن‌تر و
            منسجم‌تری از ساختار شکل بگیرد.
          </p>

          {/* CTA */}

          <div
            className="

              wealth-content-reveal

              wealth-content-4



              mt-8



              sm:mt-9

            "
          >
            <ActionButton
              href="#portfolio-difference"
              variant="primary"
              size="md"
              icon={ArrowLeft}
              className="

                w-full



                bg-brand-accent



                shadow-[0_16px_38px_color-mix(in_srgb,var(--dnh-accent)_25%,transparent)]



                hover:bg-[#ec7d01]



                sm:w-auto

                sm:min-w-[240px]

              "
            >
              تفاوت با مدیریت پرتفوی
            </ActionButton>
          </div>
        </div>

        {/* =========================================================

            ARCHITECTURE — LEFT

        ========================================================== */}

        <div
          className="

            order-2



            lg:col-start-2

            lg:row-start-1

          "
        >
          <WealthCutaway />
        </div>
      </div>

      <MotionStyles />
    </section>
  );
}

/* =============================================================================

   CUTAWAY

============================================================================= */

function WealthCutaway() {
  return (
    <div
      aria-hidden="true"
      className="

        wealth-cutaway



        relative

        mx-auto



        aspect-[1.05/1]

        w-full

        max-w-[840px]



        overflow-visible
        select-none

      "
    >
      {/* Desktop labels */}
      {WEALTH_LABELS.map((item) => (
        <WealthLabel key={item.title} {...item} />
      ))}

      {/* Mobile labels: title only, aligned beside each layer */}
      <div className="absolute inset-0 z-30 lg:hidden">
        {MOBILE_LAYER_LABELS.map((item) => (
          <MobileLayerLabel key={item.title} {...item} />
        ))}
      </div>

      <svg
        viewBox="0 0 760 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="

          absolute

          inset-0



          h-full
          w-full
          overflow-visible

          origin-center
          transition-transform
          duration-300

          max-lg:-translate-x-[10%]
          max-lg:scale-[0.84]
          max-sm:-translate-x-[12%]
          max-sm:scale-[0.78]

        "
      >
        <defs>
          <linearGradient id="wealthLayerTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d7fbff" stopOpacity="0.28" />

            <stop offset="40%" stopColor="#78dcf6" stopOpacity="0.36" />

            <stop offset="72%" stopColor="#1c7d98" stopOpacity="0.2" />

            <stop offset="100%" stopColor="#efffff" stopOpacity="0.18" />
          </linearGradient>

          <linearGradient id="wealthLayerRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a7f4ff" stopOpacity="0.24" />

            <stop offset="100%" stopColor="#0b5066" stopOpacity="0.16" />
          </linearGradient>

          <linearGradient id="wealthLayerSideLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#69d8f3" stopOpacity="0.08" />

            <stop offset="100%" stopColor="#bbf7ff" stopOpacity="0.24" />
          </linearGradient>

          <linearGradient id="wealthLayerSideRight" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6fbff" stopOpacity="0.2" />

            <stop offset="100%" stopColor="#157293" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="wealthEdge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6edbf5" stopOpacity="0.28" />

            <stop offset="50%" stopColor="#e4fbff" stopOpacity="0.94" />

            <stop offset="100%" stopColor="#5cd1ef" stopOpacity="0.26" />
          </linearGradient>

          <radialGradient
            id="wealthCoreGlow"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(380 202) rotate(90) scale(106)"
          >
            <stop stopColor="var(--dnh-accent)" stopOpacity="0.34" />

            <stop
              offset="0.5"
              stopColor="var(--dnh-accent)"
              stopOpacity="0.08"
            />

            <stop offset="1" stopColor="var(--dnh-accent)" stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id="wealthPlateGlow"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(380 332) rotate(90) scale(330 270)"
          >
            <stop stopColor="#7ce8ff" stopOpacity="0.28" />

            <stop offset="0.52" stopColor="#167394" stopOpacity="0.1" />

            <stop offset="1" stopColor="#032d3b" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="wealthCubeGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2ffff" stopOpacity="0.26" />

            <stop offset="45%" stopColor="#72dff8" stopOpacity="0.24" />

            <stop offset="100%" stopColor="#0b5d76" stopOpacity="0.1" />
          </linearGradient>

          <pattern
            id="cutawayGrid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path d="M30 0H0V30" stroke="#74d8fa" strokeOpacity="0.055" />
          </pattern>

          <filter
            id="wealthOrangeGlow"
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />

            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0.98
                0 1 0 0 0.52
                0 0 1 0 0.02
                0 0 0 1 0
              "
            />

            <feMerge>
              <feMergeNode />

              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="wealthCyanGlow"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />

            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                0 0 0 0 0.43
                0 0 0 0 0.88
                0 0 0 0 1
                0 0 0 .8 0
              "
            />

            <feMerge>
              <feMergeNode />

              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =========================================================

            GRID / GUIDES

        ========================================================== */}

        <rect
          x="42"
          y="18"
          width="676"
          height="615"
          fill="url(#cutawayGrid)"
          className="wealth-grid"
        />

        <rect
          x="118"
          y="58"
          width="524"
          height="548"
          fill="url(#wealthPlateGlow)"
        />

        <g className="wealth-perspective" stroke="#68d4fb" strokeOpacity="0.11">
          <path d="M36 548L380 350L724 548" />

          <path d="M64 495L380 313L696 495" />

          <path d="M92 442L380 276L668 442" />

          <path d="M120 389L380 239L640 389" />

          <path d="M148 336L380 202L612 336" />

          <path d="M92 608L380 442L668 608" />

          <path d="M160 612L380 486L600 612" />

          <path d="M228 615L380 528L532 615" />

          <path d="M380 34V626" />

          <path d="M208 58V610" />

          <path d="M552 58V610" />

          <path d="M300 78V618" />

          <path d="M460 78V618" />

          <path d="M84 114L676 586" />

          <path d="M178 70L724 502" />

          <path d="M676 114L84 586" />

          <path d="M582 70L36 502" />
        </g>

        {/* =========================================================

            TOP TOWER

        ========================================================== */}

        <g className="wealth-depth-frame" stroke="#7bdff8" strokeOpacity="0.17">
          <polygon
            points="166,166 380,63 594,166 594,558 380,626 166,558"
            fill="#68d8f5"
            fillOpacity="0.025"
          />

          <path d="M166 166V558" />

          <path d="M594 166V558" />

          <path d="M380 63V626" />

          <path d="M166 558L380 455L594 558" />

          <path d="M166 460L380 357L594 460" />

          <path d="M166 362L380 259L594 362" />

          <path d="M166 264L380 161L594 264" />
        </g>

        {/* =========================================================

            LAYERS

        ========================================================== */}

        <LayerPlane
          className="wealth-layer wealth-layer-1"
          centerY={160}
          width={420}
          depth={72}
          thickness={20}
        />

        <LayerPlane
          className="wealth-layer wealth-layer-2"
          centerY={258}
          width={470}
          depth={78}
          thickness={22}
        />

        <LayerPlane
          className="wealth-layer wealth-layer-3"
          centerY={356}
          width={500}
          depth={84}
          thickness={22}
        />

        <LayerPlane
          className="wealth-layer wealth-layer-4"
          centerY={454}
          width={470}
          depth={80}
          thickness={22}
        />

        <LayerPlane
          className="wealth-layer wealth-layer-5"
          centerY={552}
          width={430}
          depth={74}
          thickness={22}
        />

        {/* =========================================================

            TOP GLASS CUBE

        ========================================================== */}

        <g className="wealth-tower">
          <polygon
            points="298,78 380,38 462,78 380,118"
            fill="url(#wealthCubeGlass)"
            stroke="url(#wealthEdge)"
            strokeWidth="1.4"
            filter="url(#wealthCyanGlow)"
          />

          <polygon
            points="298,78 380,118 380,232 298,190"
            fill="url(#wealthLayerSideLeft)"
            stroke="#9becff"
            strokeOpacity="0.36"
          />

          <polygon
            points="380,118 462,78 462,190 380,232"
            fill="url(#wealthLayerSideRight)"
            stroke="#d8fbff"
            strokeOpacity="0.36"
          />

          <polygon
            points="298,190 380,232 462,190 380,150"
            fill="#8ce9ff"
            fillOpacity="0.08"
            stroke="#9eefff"
            strokeOpacity="0.18"
          />

          <g stroke="#d9fbff" strokeOpacity="0.16">
            <path d="M326 92V204" />

            <path d="M354 52V218" />

            <path d="M406 52V218" />

            <path d="M434 92V204" />

            <path d="M298 132L380 172L462 132" />
          </g>
        </g>

        {/* =========================================================

            CONNECTORS

        ========================================================== */}

        <g className="wealth-connectors" stroke="#d7f5ff" strokeOpacity="0.47">
          {/* left */}

          <path d="M294 118H180L150 100" />

          <path d="M240 356H166L132 384" />

          <path d="M254 552H164L128 579" />

          {/* right */}

          <path d="M496 215H600L632 192" />

          <path d="M608 356H636L666 332" />

          <path d="M584 506H622L655 528" />
        </g>

        {/* connection nodes */}

        <g fill="#082f3d" stroke="#ddf7ff" strokeOpacity="0.72">
          <rect x="144" y="94" width="11" height="11" />

          <rect x="126" y="378" width="11" height="11" />

          <rect x="122" y="574" width="11" height="11" />

          <rect x="628" y="186" width="11" height="11" />

          <rect x="662" y="326" width="11" height="11" />

          <rect x="652" y="523" width="11" height="11" />
        </g>

        {/* =========================================================

            CENTER GLOW

        ========================================================== */}

        <circle
          cx="380"
          cy="202"
          r="106"
          fill="url(#wealthCoreGlow)"
          className="wealth-core-glow"
        />

        {/* orange soft under-line */}

        <line
          x1="380"
          y1="39"
          x2="380"
          y2="634"
          stroke="var(--dnh-accent)"
          strokeOpacity="0.13"
          strokeWidth="9"
          filter="url(#wealthOrangeGlow)"
        />

        {/* MAIN SPINE */}

        <line
          x1="380"
          y1="39"
          x2="380"
          y2="634"
          stroke="var(--dnh-accent)"
          strokeOpacity="0.8"
          strokeWidth="1.2"
          className="wealth-spine"
        />

        {/* =========================================================

            NODES

        ========================================================== */}

        <CoreNode y={118} primary delayClass="wealth-node-1" />

        <CoreNode y={216} delayClass="wealth-node-2" />

        <CoreNode y={314} delayClass="wealth-node-3" />

        <CoreNode y={412} delayClass="wealth-node-4" />

        <CoreNode y={510} delayClass="wealth-node-5" />

        {/* =========================================================

            ONE-TIME SCAN

        ========================================================== */}

        <line
          x1="158"
          y1="130"
          x2="602"
          y2="130"
          stroke="var(--dnh-accent)"
          strokeOpacity="0"
          className="wealth-scan-line"
        />
      </svg>

      {/* ===========================================================

          SIGNATURE

      ============================================================ */}

      <div
        className="

          wealth-signature



          absolute

          bottom-[3%]

          left-[1%]



          hidden



          lg:block

        "
      >
        <span
          dir="ltr"
          className="

            block

            text-[7px]

            font-bold

            uppercase

            leading-[1.85]

            tracking-[0.34em]

            text-white/38

          "
        >
          DNH
          <br />
          Wealth
          <br />
          Architecture
        </span>

        <span
          aria-hidden="true"
          className="

            mt-3

            block

            h-px

            w-8

            bg-white/30

          "
        />
      </div>
    </div>
  );
}

/* =============================================================================

   LAYER

============================================================================= */

function LayerPlane({
  centerY,

  width,

  depth,

  thickness,

  className,
}: {
  centerY: number;

  width: number;

  depth: number;

  thickness: number;

  className: string;
}) {
  const centerX = 380;

  const leftX = centerX - width / 2;

  const rightX = centerX + width / 2;

  const topY = centerY - depth;

  const bottomY = centerY + depth;

  const gridFractions = [0.2, 0.4, 0.6, 0.8];

  const lerp = (start: number, end: number, amount: number) =>
    start + (end - start) * amount;

  return (
    <g className={className}>
      <polygon
        points={`

          ${leftX + 28},${centerY + thickness + 16}

          ${centerX},${bottomY + thickness + 44}

          ${rightX - 28},${centerY + thickness + 16}

          ${centerX},${topY + thickness - 4}

        `}
        fill="#001b23"
        fillOpacity="0.22"
      />

      {/* left lower thickness */}

      <polygon
        points={`

          ${leftX},${centerY}

          ${centerX},${bottomY}

          ${centerX},${bottomY + thickness}

          ${leftX},${centerY + thickness}

        `}
        fill="url(#wealthLayerRim)"
        stroke="#68d6f8"
        strokeOpacity="0.3"
      />

      {/* right lower thickness */}

      <polygon
        points={`

          ${centerX},${bottomY}

          ${rightX},${centerY}

          ${rightX},${centerY + thickness}

          ${centerX},${bottomY + thickness}

        `}
        fill="url(#wealthLayerRim)"
        stroke="#a9e8fb"
        strokeOpacity="0.26"
      />

      <polygon
        points={`

          ${leftX},${centerY}

          ${rightX},${centerY}

          ${rightX},${centerY + thickness}

          ${leftX},${centerY + thickness}

        `}
        fill="#9cebff"
        fillOpacity="0.08"
        stroke="#bdf8ff"
        strokeOpacity="0.14"
      />

      {/* main top plane */}

      <polygon
        points={`

          ${leftX},${centerY}

          ${centerX},${topY}

          ${rightX},${centerY}

          ${centerX},${bottomY}

        `}
        fill="url(#wealthLayerTop)"
        stroke="url(#wealthEdge)"
        strokeWidth="1.6"
        filter="url(#wealthCyanGlow)"
      />

      {/* inner geometry */}

      <g stroke="#d7fbff" strokeOpacity="0.16">
        {gridFractions.map((fraction) => (
          <path
            key={`layer-a-${fraction}`}
            d={`

              M ${lerp(leftX, centerX, fraction)} ${lerp(
                centerY,
                topY,
                fraction,
              )}

              L ${lerp(centerX, rightX, fraction)} ${lerp(
                bottomY,
                centerY,
                fraction,
              )}

            `}
          />
        ))}

        {gridFractions.map((fraction) => (
          <path
            key={`layer-b-${fraction}`}
            d={`

              M ${lerp(centerX, rightX, fraction)} ${lerp(
                topY,
                centerY,
                fraction,
              )}

              L ${lerp(leftX, centerX, fraction)} ${lerp(
                centerY,
                bottomY,
                fraction,
              )}

            `}
          />
        ))}

        <path d={`M ${leftX} ${centerY}H${rightX}`} strokeOpacity="0.12" />

        <path d={`M ${centerX} ${topY}V${bottomY}`} strokeOpacity="0.12" />
      </g>
    </g>
  );
}

/* =============================================================================

   CORE NODE

============================================================================= */

function CoreNode({
  y,

  primary = false,

  delayClass,
}: {
  y: number;

  primary?: boolean;

  delayClass: string;
}) {
  const size = primary ? 16 : 11;

  const centerX = 380;

  return (
    <g
      className={`

        wealth-core-node

        ${delayClass}

      `}
      style={{
        transformOrigin: `${centerX}px ${y}px`,
      }}
    >
      {primary ? (
        <rect
          x={centerX - 17}
          y={y - 17}
          width="34"
          height="34"
          fill="var(--dnh-accent)"
          fillOpacity="0.08"
          stroke="var(--dnh-accent)"
          strokeOpacity="0.2"
        />
      ) : null}

      <rect
        x={centerX - size / 2}
        y={y - size / 2}
        width={size}
        height={size}
        fill={primary ? "var(--dnh-accent)" : "#07313f"}
        stroke="var(--dnh-accent)"
        strokeWidth={primary ? 1.4 : 1.1}
      />
    </g>
  );
}

/* =============================================================================

   LABEL

============================================================================= */

function WealthLabel({
  title,
  description,
  side,
  position,
  delay,
}: WealthLabelItem) {
  return (
    <div
      className={`
        wealth-component-label
        absolute
        z-20
        hidden
        w-[172px]
        lg:block
        ${position}
        ${side === "right" ? "text-right" : "text-left"}
      `}
      style={
        {
          "--label-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      <div
        className={`
          flex
          items-center
          gap-2
          ${side === "right" ? "justify-start" : "justify-end"}
        `}
      >
        {side === "right" ? (
          <>
            <span
              aria-hidden="true"
              className="
                wealth-label-node
                h-2
                w-2
                shrink-0
                border
                border-brand-accent/80
                bg-brand-accent/20
                transition-[background-color,box-shadow]
                duration-300
              "
            />

            <span className="h-px w-7 bg-brand-accent/45" />
          </>
        ) : null}

        <span className="text-[11px] font-black text-white sm:text-[12px]">
          {title}
        </span>

        {side === "left" ? (
          <>
            <span className="h-px w-7 bg-brand-accent/45" />

            <span
              aria-hidden="true"
              className="
                wealth-label-node
                h-2
                w-2
                shrink-0
                border
                border-brand-accent/80
                bg-brand-accent/20
                transition-[background-color,box-shadow]
                duration-300
              "
            />
          </>
        ) : null}
      </div>

      <p
        className="
          wealth-label-description
          mt-2
          text-[10px]
          font-semibold
          leading-[1.9]
          text-brand-accent/85
          transition-colors
          duration-300
        "
      >
        {description}
      </p>
    </div>
  );
}

function MobileLayerLabel({ title, top, delay }: MobileLayerLabelItem) {
  return (
    <div
      className={`
        wealth-mobile-layer-label
        absolute
        right-0
        ${top}
        flex
        -translate-y-1/2
        items-center
        gap-2
        whitespace-nowrap
      `}
      style={
        {
          "--mobile-label-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 bg-brand-accent shadow-[0_0_12px_color-mix(in_srgb,var(--dnh-accent)_35%,transparent)]"
      />
      <span className="h-px w-4 bg-brand-accent/60 sm:w-5" />
      <span className="text-[10px] font-black text-white sm:text-[11px]">
        {title}
      </span>
    </div>
  );
}

/* =============================================================================

   BACKGROUND

============================================================================= */

function SectionBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="

          pointer-events-none

          absolute

          inset-0

        "
        style={{
          background: `

            linear-gradient(

              103deg,

              #032f3c 0%,

              #053847 42%,

              #032d3a 70%,

              #022733 100%

            )

          `,
        }}
      />

      <div
        aria-hidden="true"
        className="

          pointer-events-none

          absolute

          inset-0



          opacity-[0.15]

        "
        style={{
          backgroundImage: `

            linear-gradient(

              to right,

              rgba(106,218,255,.08) 1px,

              transparent 1px

            ),

            linear-gradient(

              to bottom,

              rgba(106,218,255,.055) 1px,

              transparent 1px

            )

          `,

          backgroundSize: "82px 82px",

          maskImage:
            "linear-gradient(90deg, black 0%, rgba(0,0,0,.82) 58%, transparent 100%)",

          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, rgba(0,0,0,.82) 58%, transparent 100%)",
        }}
      />

      {/* Visual atmosphere */}

      <div
        aria-hidden="true"
        className="

          pointer-events-none



          absolute

          left-[12%]

          top-[20%]



          h-[480px]

          w-[480px]



          bg-brand-primary/[0.08]



          blur-[130px]

        "
      />

      {/* right readability */}

      <div
        aria-hidden="true"
        className="

          pointer-events-none



          absolute

          inset-y-0

          right-0



          w-[46%]



          bg-[linear-gradient(90deg,transparent,rgba(1,27,36,.18))]

        "
      />

      <span
        aria-hidden="true"
        className="

          absolute

          inset-x-0

          top-0



          h-px



          bg-gradient-to-r

          from-transparent

          via-white/18

          to-transparent

        "
      />
    </>
  );
}

/* =============================================================================

   MOTION

============================================================================= */

function MotionStyles() {
  return (
    <style>{`

      /* ============================================================

         CONTENT

      ============================================================ */



      .wealth-content-reveal {

        opacity: 0;

        transform: translate3d(0, 12px, 0);



        transition:

          opacity 620ms cubic-bezier(.22, 1, .36, 1),

          transform 620ms cubic-bezier(.22, 1, .36, 1);

      }



      .wealth-components-section[data-visible="true"]

      .wealth-content-reveal {

        opacity: 1;

        transform: translate3d(0, 0, 0);

      }



      .wealth-content-1 {

        transition-delay: 80ms;

      }



      .wealth-content-2 {

        transition-delay: 140ms;

      }



      .wealth-content-3 {

        transition-delay: 210ms;

      }



      .wealth-content-4 {

        transition-delay: 290ms;

      }



      /* ============================================================

         TOWER

      ============================================================ */



      .wealth-tower {

        opacity: 0;

        transform-box: fill-box;

        transform-origin: center;

        transform: translate3d(0, 8px, 0);



        transition:

          opacity 600ms cubic-bezier(.22, 1, .36, 1),

          transform 600ms cubic-bezier(.22, 1, .36, 1);

      }



      .wealth-components-section[data-visible="true"]

      .wealth-tower {

        opacity: 1;

        transform: translate3d(0, 0, 0);

        transition-delay: 170ms;

      }



      /* ============================================================

         LAYERS

      ============================================================ */



      .wealth-layer {

        opacity: 0;



        transform-box: fill-box;

        transform-origin: center;



        transform: translate3d(0, 10px, 0);



        transition:

          opacity 600ms cubic-bezier(.22, 1, .36, 1),

          transform 600ms cubic-bezier(.22, 1, .36, 1);

      }



      .wealth-components-section[data-visible="true"]

      .wealth-layer {

        opacity: 1;

        transform: translate3d(0, 0, 0);

      }



      .wealth-components-section[data-visible="true"]

      .wealth-layer-1 {

        transition-delay: 240ms;

      }



      .wealth-components-section[data-visible="true"]

      .wealth-layer-2 {

        transition-delay: 310ms;

      }



      .wealth-components-section[data-visible="true"]

      .wealth-layer-3 {

        transition-delay: 380ms;

      }



      .wealth-components-section[data-visible="true"]

      .wealth-layer-4 {

        transition-delay: 450ms;

      }



      .wealth-components-section[data-visible="true"]

      .wealth-layer-5 {

        transition-delay: 520ms;

      }



      /* ============================================================

         SPINE

      ============================================================ */



      .wealth-spine {

        opacity: 0;



        transform-box: fill-box;

        transform-origin: center;



        transform: scaleY(0);



        transition:

          opacity 250ms ease,

          transform 720ms cubic-bezier(.22, 1, .36, 1);

      }



      .wealth-components-section[data-visible="true"]

      .wealth-spine {

        opacity: 1;

        transform: scaleY(1);

        transition-delay: 520ms;

      }



      /* ============================================================

         CORE NODES

      ============================================================ */



      .wealth-core-node {

        opacity: 0;



        transform-box: fill-box;

        transform: scale(.68);



        transition:

          opacity 350ms ease,

          transform 350ms cubic-bezier(.22, 1, .36, 1);

      }



      .wealth-components-section[data-visible="true"]

      .wealth-core-node {

        opacity: 1;

        transform: scale(1);

      }



      .wealth-components-section[data-visible="true"] .wealth-node-1 {

        transition-delay: 590ms;

      }



      .wealth-components-section[data-visible="true"] .wealth-node-2 {

        transition-delay: 650ms;

      }



      .wealth-components-section[data-visible="true"] .wealth-node-3 {

        transition-delay: 710ms;

      }



      .wealth-components-section[data-visible="true"] .wealth-node-4 {

        transition-delay: 770ms;

      }



      .wealth-components-section[data-visible="true"] .wealth-node-5 {

        transition-delay: 830ms;

      }



      /* ============================================================

         CONNECTORS

      ============================================================ */



      .wealth-connectors {

        opacity: 0;



        transition:

          opacity 500ms ease;

      }



      .wealth-components-section[data-visible="true"]

      .wealth-connectors {

        opacity: 1;

        transition-delay: 600ms;

      }



      /* ============================================================

         LABELS

      ============================================================ */



      .wealth-component-label {
        opacity: 0;
        transform: translate3d(0, 6px, 0);

        transition:
          opacity 480ms ease,
          transform 480ms cubic-bezier(.22, 1, .36, 1);
      }

      .wealth-components-section[data-visible="true"]
      .wealth-component-label {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition-delay: var(--label-delay);
      }

      .wealth-mobile-layer-label {
        opacity: 0;
        transform: translate3d(8px, -50%, 0);

        transition:
          opacity 420ms ease,
          transform 420ms cubic-bezier(.22, 1, .36, 1);
      }

      .wealth-components-section[data-visible="true"]
      .wealth-mobile-layer-label {
        opacity: 1;
        transform: translate3d(0, -50%, 0);
        transition-delay: var(--mobile-label-delay);
      }



      .wealth-signature {

        opacity: 0;



        transition:

          opacity 500ms ease;

      }



      .wealth-components-section[data-visible="true"]

      .wealth-signature {

        opacity: 1;

        transition-delay: 900ms;

      }



      /* ============================================================

         VERY LIGHT SCAN

      ============================================================ */



      @keyframes wealthScan {

        0% {

          opacity: 0;

          transform: translate3d(0, 0, 0);

        }



        12% {

          opacity: .4;

        }



        82% {

          opacity: .18;

        }



        100% {

          opacity: 0;

          transform: translate3d(0, 400px, 0);

        }

      }



      .wealth-components-section[data-visible="true"]

      .wealth-scan-line {

        animation:

          wealthScan

          900ms

          320ms

          cubic-bezier(.22, 1, .36, 1)

          both;

      }



      /* ============================================================

         HOVER

      ============================================================ */



      @media (hover: hover) and (pointer: fine) {

        .wealth-cutaway:hover .wealth-layer-1 {

          transform: translate3d(0, -4px, 0);

        }



        .wealth-cutaway:hover .wealth-layer-2 {

          transform: translate3d(0, -2px, 0);

        }



        .wealth-cutaway:hover .wealth-layer-4 {

          transform: translate3d(0, 2px, 0);

        }



        .wealth-cutaway:hover .wealth-layer-5 {

          transform: translate3d(0, 4px, 0);

        }



        .wealth-cutaway:hover .wealth-core-glow {

          opacity: 1;

        }



        .wealth-cutaway:hover .wealth-connectors {

          opacity: .88;

        }



        .wealth-cutaway:hover .wealth-component-label {
          color: rgba(255,255,255,.98);
        }

        .wealth-cutaway:hover .wealth-label-description {
          color: var(--dnh-accent);
        }

        .wealth-cutaway:hover .wealth-label-node {
          background-color: var(--dnh-accent);
          box-shadow: 0 0 14px color-mix(in srgb, var(--dnh-accent) 28%, transparent);
        }

      }



      /* ============================================================

         MOBILE

      ============================================================ */



      @media (max-width: 1023px) {
        .wealth-cutaway {
          max-height: 580px;
          min-height: 360px;
          padding-right: 78px;
        }

        .wealth-component-label {
          display: none !important;
        }
      }

      @media (max-width: 639px) {
        .wealth-cutaway {
          min-height: 340px;
          padding-right: 68px;
        }

        .wealth-mobile-layer-label {
          right: 2px;
        }
      }



      /* ============================================================

         REDUCED MOTION

      ============================================================ */



      @media (prefers-reduced-motion: reduce) {

        .wealth-content-reveal,

        .wealth-tower,

        .wealth-layer,

        .wealth-spine,

        .wealth-core-node,

        .wealth-connectors,

        .wealth-component-label,

        .wealth-mobile-layer-label,

        .wealth-signature,

        .wealth-scan-line {

          opacity: 1 !important;

          transform: none !important;

          transition: none !important;

          animation: none !important;

        }

      }

    `}</style>
  );
}
