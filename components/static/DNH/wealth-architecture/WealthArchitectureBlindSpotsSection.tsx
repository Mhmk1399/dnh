"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";

type BlindSpot = {
  id: number;
  title: string;
  lines: string[];
  desktopClass: string;
  mobileClass: string;
};

const BLIND_SPOTS: BlindSpot[] = [
  {
    id: 3,
    title: "نقطه کور ۰۳",
    lines: ["بررسی جداگانه اجزا", "بدون درنظر گرفتن", "ارتباط میان آن‌ها"],
    desktopClass: "left-2 top-7 xl:left-3 xl:top-8",
    mobileClass: "",
  },
  {
    id: 1,
    title: "نقطه کور ۰۱",
    lines: ["تمرکز بیشتر بر یک بخش از ساختار", "و نادیده گرفتن سایر اجزا"],
    desktopClass: "left-2 bottom-[24%] xl:left-3",
    mobileClass: "",
  },
  {
    id: 4,
    title: "نقطه کور ۰۴",
    lines: ["ناهماهنگی میان", "اهداف، زمان و", "تصمیم‌های مالی"],
    desktopClass: "right-4 top-[18%] xl:right-5",
    mobileClass: "",
  },
  {
    id: 2,
    title: "نقطه کور ۰۲",
    lines: ["عدم توجه به ریسک‌ها", "و پیامدهای آن‌ها", "در کنار دارایی‌ها"],
    desktopClass: "right-3 bottom-[18%] xl:right-4",
    mobileClass: "",
  },
];

export function WealthArchitectureBlindSpotsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeId, setActiveId] = useState<number>(4);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.24,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="common-mistakes"
      aria-labelledby="common-mistakes-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_78%_24%,rgba(22,115,148,0.22),transparent_28%),linear-gradient(135deg,#032f41_0%,#053f54_36%,#032b3a_100%)]"
    >
      <BackgroundGrid />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[46%] bg-[linear-gradient(90deg,rgba(255,255,255,0.03),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[34%] bg-[linear-gradient(270deg,rgba(0,0,0,0.08),transparent)]"
      />

      <div className="mx-auto max-w-[1536px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:gap-12">
          <div className="order-2 lg:order-2">
            <StructuralVisual
              activeId={activeId}
              revealed={revealed}
              onActivate={setActiveId}
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
              {BLIND_SPOTS.map((spot, index) => {
                const isActive = activeId === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveId(spot.id)}
                    className={`group rounded-none border px-4 py-4 text-right transition-all duration-300 ${
                      isActive
                        ? "border-brand-accent/80 bg-white/[0.06]"
                        : "border-white/10 bg-white/[0.025] hover:border-brand-accent/45"
                    }`}
                    style={{
                      transitionDelay: revealed
                        ? `${index * 80 + 260}ms`
                        : "0ms",
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-black text-brand-accent">
                        {spot.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 border transition-all duration-300 ${
                          isActive
                            ? "border-brand-accent bg-brand-accent shadow-[0_0_16px_rgba(252,133,2,0.55)]"
                            : "border-white/45 bg-transparent"
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      {spot.lines.map((line) => (
                        <p
                          key={line}
                          className={`text-[12px] leading-6 ${
                            isActive ? "text-white/84" : "text-white/64"
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div dir="rtl" className="order-1 lg:order-1 lg:pr-2 xl:pr-6">
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                revealed
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <div className="mb-5 flex items-center justify-start gap-3">
                <span className="h-px w-11 bg-brand-accent" />
                <span className="text-[11px] font-black tracking-[0.18em] text-white/78">
                  نقاط کور ساختار
                </span>
              </div>

              <h2
                id="common-mistakes-title"
                className="max-w-[12ch] text-[clamp(2.1rem,5vw,4.1rem)] font-black leading-[1.28] tracking-[-0.045em] text-white"
              >
                آنچه دیده نمی‌شود،
                <br />
                گاهی بیش از آنچه دیده می‌شود
                <br />
                <span className="text-brand-accent">اهمیت دارد.</span>
              </h2>

              <p className="mt-6 max-w-[35rem] text-[14px] font-medium leading-[2.15] text-white/72 sm:text-[15px]">
                وقتی اجزای مختلف ثروت جدا از هم بررسی شوند، ممکن است بعضی
                ارتباط‌ها، ناهماهنگی‌ها یا ریسک‌ها دیده نشوند. بررسی ساختاری،
                برای روشن‌تر شدن همین نقاط کور است.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ActionButton
                  href="/fa/contact?subject=ارزیابی%20ساختار%20ثروت"
                  variant="primary"
                  size="lg"
                  icon={ArrowLeft}
                  className="
                    w-full
                    bg-brand-accent
                    text-white
                    shadow-[0_18px_38px_rgba(252,133,2,0.28)]
                    hover:bg-[#ec7d02]
                    hover:shadow-[0_22px_44px_rgba(252,133,2,0.34)]
                    sm:w-auto
                    sm:min-w-[250px]
                  "
                >
                  ارزیابی ساختار ثروت خود
                </ActionButton>

                <Link
                  href="/fa/dnh/framework"
                  className="
                    group inline-flex items-center justify-center gap-2
                    px-1 py-3 text-sm font-bold text-white/82 transition-colors
                    hover:text-white
                  "
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  آشنایی با رویکرد DNH
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StructuralVisual({
  activeId,
  revealed,
  onActivate,
}: {
  activeId: number;
  revealed: boolean;
  onActivate: (id: number) => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[860px]">
      <div className="relative aspect-[1.11/0.84] w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%,transparent_68%,rgba(255,255,255,0.02))]
          "
        />

        <svg
          viewBox="0 0 860 650"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="نمودار بصری نقاط کور ساختار ثروت"
        >
          <defs>
            <linearGradient id="glassFillA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(220,244,255,0.42)" />
              <stop offset="60%" stopColor="rgba(126,205,245,0.16)" />
              <stop offset="100%" stopColor="rgba(80,175,222,0.06)" />
            </linearGradient>

            <linearGradient id="glassFillB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(228,247,255,0.26)" />
              <stop offset="100%" stopColor="rgba(110,183,221,0.04)" />
            </linearGradient>

            <linearGradient id="glassStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(213,243,255,0.92)" />
              <stop offset="100%" stopColor="rgba(148,220,255,0.24)" />
            </linearGradient>

            <linearGradient id="amberGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffb24a" />
              <stop offset="100%" stopColor="#fc8502" />
            </linearGradient>

            <filter
              id="orangeGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* blueprint mesh */}
          <g
            opacity={revealed ? 1 : 0}
            style={{
              transition: "opacity 650ms cubic-bezier(.22,1,.36,1)",
            }}
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={50 + i * 42}
                y1={34}
                x2={50 + i * 42}
                y2={610}
                stroke="rgba(255,255,255,0.065)"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 13 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="32"
                y1={60 + i * 42}
                x2="820"
                y2={60 + i * 42}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            ))}
            <line
              x1="105"
              y1="105"
              x2="756"
              y2="560"
              stroke="rgba(110,193,235,0.08)"
              strokeWidth="1.1"
            />
            <line
              x1="140"
              y1="582"
              x2="740"
              y2="108"
              stroke="rgba(110,193,235,0.08)"
              strokeWidth="1.1"
            />
            <line
              x1="68"
              y1="340"
              x2="786"
              y2="340"
              stroke="rgba(110,193,235,0.06)"
              strokeWidth="1"
            />
            <line
              x1="430"
              y1="62"
              x2="430"
              y2="595"
              stroke="rgba(110,193,235,0.06)"
              strokeWidth="1"
            />
          </g>

          {/* central structure */}
          <g
            opacity={revealed ? 1 : 0}
            style={{
              transformOrigin: "380px 350px",
              transformBox: "fill-box",
              transform: revealed
                ? "scale(1) translateY(0px)"
                : "scale(0.975) translateY(10px)",
              transition:
                "transform 820ms cubic-bezier(.22,1,.36,1) 120ms, opacity 820ms cubic-bezier(.22,1,.36,1) 120ms",
            }}
          >
            {/* far background planes */}
            <polygon
              points="210,260 300,220 300,422 210,462"
              fill="rgba(174,232,255,0.06)"
              stroke="rgba(180,232,255,0.12)"
            />
            <polygon
              points="514,210 590,177 590,388 514,422"
              fill="rgba(174,232,255,0.06)"
              stroke="rgba(180,232,255,0.12)"
            />
            <polygon
              points="364,122 500,62 626,123 492,183"
              fill="rgba(194,239,255,0.08)"
              stroke="url(#glassStroke)"
              strokeWidth="1.4"
            />

            {/* bottom large plane */}
            <polygon
              points="210,505 427,408 647,505 430,608"
              fill="url(#glassFillA)"
              stroke="url(#glassStroke)"
              strokeWidth="1.5"
            />
            <polygon
              points="210,505 210,405 430,510 430,608"
              fill="rgba(88,182,224,0.14)"
              stroke="rgba(186,235,255,0.14)"
            />

            {/* mid lower plane */}
            <polygon
              points="240,394 420,315 588,395 410,476"
              fill="url(#glassFillA)"
              stroke="url(#glassStroke)"
              strokeWidth="1.45"
            />
            <polygon
              points="240,394 240,318 410,396 410,476"
              fill="rgba(92,182,224,0.15)"
              stroke="rgba(196,240,255,0.12)"
            />

            {/* center plane */}
            <polygon
              points="198,297 382,215 575,297 392,377"
              fill="url(#glassFillA)"
              stroke="url(#glassStroke)"
              strokeWidth="1.5"
            />
            <polygon
              points="198,297 198,228 392,303 392,377"
              fill="rgba(92,182,224,0.14)"
              stroke="rgba(196,240,255,0.12)"
            />

            {/* upper plane */}
            <polygon
              points="250,211 403,145 556,212 403,280"
              fill="url(#glassFillB)"
              stroke="url(#glassStroke)"
              strokeWidth="1.4"
            />
            <polygon
              points="250,211 250,165 403,232 403,280"
              fill="rgba(100,183,221,0.16)"
              stroke="rgba(200,240,255,0.12)"
            />

            {/* top slab */}
            <polygon
              points="286,154 384,112 474,154 377,196"
              fill="rgba(226,247,255,0.11)"
              stroke="url(#glassStroke)"
              strokeWidth="1.4"
            />

            {/* central vertical forms */}
            <polygon
              points="334,196 410,162 410,463 334,497"
              fill="rgba(186,235,255,0.16)"
              stroke="url(#glassStroke)"
              strokeWidth="1.35"
            />
            <polygon
              points="410,162 481,193 481,432 410,463"
              fill="rgba(206,244,255,0.09)"
              stroke="url(#glassStroke)"
              strokeWidth="1.35"
            />
            <polygon
              points="276,253 332,228 332,526 276,550"
              fill="rgba(178,229,250,0.11)"
              stroke="rgba(180,235,255,0.22)"
              strokeWidth="1.2"
            />
            <polygon
              points="490,275 548,250 548,458 490,484"
              fill="rgba(178,229,250,0.11)"
              stroke="rgba(180,235,255,0.22)"
              strokeWidth="1.2"
            />

            {/* inner plates */}
            <polygon
              points="329,250 438,201 515,235 405,285"
              fill="rgba(225,248,255,0.15)"
              stroke="rgba(231,249,255,0.34)"
              strokeWidth="1.15"
            />
            <polygon
              points="302,336 390,298 463,330 376,370"
              fill="rgba(220,246,255,0.13)"
              stroke="rgba(225,247,255,0.28)"
              strokeWidth="1.05"
            />

            {/* light guide beam */}
            <line
              x1="382"
              y1="110"
              x2="382"
              y2="566"
              stroke="url(#amberGlow)"
              strokeWidth="2.2"
              filter="url(#orangeGlow)"
              opacity="0.95"
            />

            {/* luminous nodes on beam */}
            {[
              { x: 378, y: 168, size: 12 },
              { x: 484, y: 236, size: 10 },
              { x: 404, y: 365, size: 10 },
              { x: 286, y: 409, size: 10 },
            ].map((node) => (
              <g key={`${node.x}-${node.y}`} filter="url(#softGlow)">
                <rect
                  x={node.x - node.size / 2}
                  y={node.y - node.size / 2}
                  width={node.size}
                  height={node.size}
                  fill="url(#amberGlow)"
                  stroke="#ffd39a"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* connector lines */}
            <Connector
              active={activeId === 3}
              points="378,168 328,168 278,144 182,144"
            />
            <Connector
              active={activeId === 1}
              points="286,409 286,448 238,448 184,478 172,478"
            />
            <Connector
              active={activeId === 4}
              points="484,236 544,236 585,178 664,178"
            />
            <Connector
              active={activeId === 2}
              points="404,365 518,365 585,438 677,438"
            />

            {/* square end markers */}
            <Marker active={activeId === 3} x={171} y={144} />
            <Marker active={activeId === 1} x={161} y={478} />
            <Marker active={activeId === 4} x={674} y={178} />
            <Marker active={activeId === 2} x={688} y={438} />
          </g>

          {/* tiny signature */}
          <g
            opacity={revealed ? 0.82 : 0}
            style={{
              transition: "opacity 700ms cubic-bezier(.22,1,.36,1) 520ms",
            }}
          >
            <text
              x="44"
              y="548"
              fill="rgba(255,255,255,0.55)"
              fontSize="12"
              fontWeight="700"
              letterSpacing="0.34em"
            >
              DNH
            </text>
            <text
              x="44"
              y="570"
              fill="rgba(255,255,255,0.44)"
              fontSize="12"
              fontWeight="700"
              letterSpacing="0.24em"
            >
              WEALTH
            </text>
            <text
              x="44"
              y="592"
              fill="rgba(255,255,255,0.44)"
              fontSize="12"
              fontWeight="700"
              letterSpacing="0.24em"
            >
              ARCHITECTURE
            </text>
          </g>
        </svg>

        {/* desktop labels */}
        {BLIND_SPOTS.map((spot, index) => {
          const isActive = activeId === spot.id;

          return (
            <button
              key={spot.id}
              type="button"
              onMouseEnter={() => onActivate(spot.id)}
              onFocus={() => onActivate(spot.id)}
              className={`
                absolute hidden w-[170px] text-right lg:block
                transition-all duration-300 ease-out
                ${spot.desktopClass}
                ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}
                ${revealed ? "translate-y-0" : "translate-y-4 opacity-0"}
              `}
              style={{
                transitionDelay: revealed ? `${index * 90 + 340}ms` : "0ms",
              }}
            >
              <div className="pointer-events-none">
                <div className="mb-2 flex items-center justify-start gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 border transition-all duration-300 ${
                      isActive
                        ? "border-brand-accent bg-brand-accent shadow-[0_0_18px_rgba(252,133,2,0.6)]"
                        : "border-brand-accent/80 bg-transparent"
                    }`}
                  />
                  <span
                    className={`text-[16px] font-black leading-none ${
                      isActive ? "text-white" : "text-white/92"
                    }`}
                  >
                    {spot.title}
                  </span>
                </div>

                <div className="space-y-1">
                  {spot.lines.map((line) => (
                    <p
                      key={line}
                      className={`text-[12px] font-medium leading-6 transition-colors duration-300 ${
                        isActive ? "text-[#ffb45b]" : "text-white/62"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Connector({ active, points }: { active: boolean; points: string }) {
  return (
    <polyline
      points={points}
      fill="none"
      stroke={active ? "#fc8502" : "rgba(252,133,2,0.72)"}
      strokeWidth={active ? "1.8" : "1.3"}
      strokeLinecap="round"
      strokeLinejoin="round"
      filter={active ? "url(#softGlow)" : undefined}
      opacity={active ? "1" : "0.86"}
    />
  );
}

function Marker({ active, x, y }: { active: boolean; x: number; y: number }) {
  return (
    <g filter={active ? "url(#softGlow)" : undefined}>
      <rect
        x={x - 5}
        y={y - 5}
        width="10"
        height="10"
        fill={active ? "#fc8502" : "transparent"}
        stroke={active ? "#ffcf90" : "rgba(255,255,255,0.74)"}
        strokeWidth="1.15"
      />
    </g>
  );
}

function BackgroundGrid() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
          backgroundPosition: "center center",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(125deg, transparent 12%, rgba(89,182,224,0.12) 12.2%, transparent 12.4%),
            linear-gradient(35deg, transparent 18%, rgba(89,182,224,0.08) 18.2%, transparent 18.4%)
          `,
          backgroundSize: "100% 100%, 100% 100%",
        }}
      />
    </>
  );
}
