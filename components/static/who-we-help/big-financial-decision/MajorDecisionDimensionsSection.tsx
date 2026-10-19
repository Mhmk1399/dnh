"use client";

import {
  Clock3,
  GitBranch,
  Landmark,
  ShieldAlert,
  Waypoints,
} from "lucide-react";
import { useState } from "react";

import type { SiteLocale } from "@/lib/site-language";

import {
  MajorDecisionActions,
  MajorDecisionEyebrow,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

const dimensionIcons = [GitBranch, ShieldAlert, Landmark, Clock3, Waypoints];

const dimensionNodes = [
  { x: 50, y: 10 },
  { x: 84, y: 35 },
  { x: 71, y: 76 },
  { x: 29, y: 76 },
  { x: 16, y: 35 },
] as const;

export function MajorDecisionDimensionsSection({
  section,
  locale,
  rtl,
}: {
  section: MajorDecisionSection;
  locale: SiteLocale;
  rtl: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = section.items ?? [];
  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"
      />

      <div className="dnh-site-shell relative z-10">
        <header className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <MajorDecisionEyebrow section={section} />
            <h2
              id={`${section.id}-title`}
              className="mt-5 max-w-[31ch] text-pretty text-[clamp(2rem,7.5vw,2.2rem)] font-black leading-[1.48] tracking-[-0.03em] sm:text-[clamp(2.5rem,5vw,3.25rem)] lg:leading-[1.42]"
            >
              {section.heading}
            </h2>
          </div>

          {section.closing ? (
            <p className="max-w-[88ch] border-s-2 border-brand-accent ps-5 text-[16px] leading-[1.9] text-ink-muted sm:text-[17px] sm:leading-[1.95]">
              {section.closing}
            </p>
          ) : null}
        </header>

        <div className="mt-10 grid min-w-0 grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 xl:grid-cols-3">
          <div className="order-[6] w-full self-stretch">
            <div
              aria-hidden="true"
              className="relative aspect-square w-full min-h-[360px] overflow-hidden border border-line bg-brand-secondary text-page"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--dnh-primary)_14%,transparent),transparent_58%)]" />
              <div className="absolute inset-[7%] border border-page/10" />
              <div className="absolute inset-x-[7%] top-1/2 h-px bg-page/10" />
              <div className="absolute inset-y-[7%] start-1/2 w-px bg-page/10" />

              <svg
                viewBox="0 0 500 500"
                className="absolute inset-0 size-full"
                fill="none"
              >
                <polygon
                  points="250,50 420,175 355,380 145,380 80,175"
                  className="stroke-page/18"
                />
                <polygon
                  points="250,112 368,198 323,341 177,341 132,198"
                  className="stroke-page/12"
                />
                <polygon
                  points="250,172 318,222 292,304 208,304 182,222"
                  className="fill-brand-primary/10 stroke-brand-primary/45"
                />

                {dimensionNodes.map((node, index) => (
                  <line
                    key={`axis-${index}`}
                    x1="250"
                    y1="250"
                    x2={node.x * 5}
                    y2={node.y * 5}
                    className={`transition-all duration-500 motion-reduce:transition-none ${index === activeIndex ? "stroke-brand-primary stroke-[2.5]" : "stroke-page/16"}`}
                  />
                ))}

                <g
                  className="opacity-55 transition-transform duration-500 ease-out motion-reduce:transition-none"
                  style={{
                    transform: `rotate(${activeIndex * 72}deg)`,
                    transformOrigin: "250px 250px",
                  }}
                >
                  <line
                    x1="250"
                    y1="250"
                    x2="250"
                    y2="58"
                    className="stroke-brand-accent stroke-[1.5]"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="188"
                    strokeDasharray="3 10"
                    className="stroke-brand-accent/55"
                  />
                </g>

                <circle
                  cx="250"
                  cy="250"
                  r="72"
                  className="fill-brand-secondary stroke-brand-primary stroke-[2]"
                />
              </svg>

              <div className="absolute start-1/2 top-1/2 flex size-[25%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-page/50 sm:text-[11px]">
                  DNH
                </span>
                <span className="mt-1 text-[clamp(1rem,3.5vw,1.55rem)] font-black leading-[1.5] text-page">
                  {activeItem?.title}
                </span>
              </div>

              {items.map((item, index) => {
                const Icon = dimensionIcons[index] ?? Waypoints;
                const node = dimensionNodes[index] ?? dimensionNodes[0];
                const active = index === activeIndex;

                return (
                  <div
                    key={`${section.id}-node-${index}`}
                    className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center transition-[transform,opacity] duration-500 motion-reduce:transition-none ${active ? "z-10 scale-110 opacity-100" : "opacity-50"}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <span
                      className={`flex size-11 items-center justify-center border sm:size-13 ${active ? "border-brand-primary bg-brand-primary text-brand-secondary" : "border-page/25 bg-brand-secondary text-page"}`}
                    >
                      <Icon size={21} strokeWidth={1.7} />
                    </span>
                    <span
                      className={`max-w-24 text-[11px] font-bold leading-[1.45] sm:text-[13px] ${active ? "text-page" : "text-page/70"}`}
                    >
                      {item.title}
                    </span>
                  </div>
                );
              })}

              <div className="absolute inset-x-5 bottom-4 flex items-end justify-between border-t border-page/15 pt-3 sm:inset-x-7 sm:bottom-6">
                <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-page/40 sm:text-[10px]">
                  {locale === "fa" ? "ساختار تصمیم" : "Decision structure"}
                </span>
                <bdi
                  dir="ltr"
                  className="text-[28px] font-black leading-none text-brand-primary sm:text-[36px]"
                >
                  {String(activeIndex + 1).padStart(2, "0")}/05
                </bdi>
              </div>
            </div>
          </div>

          <div className="contents">
            <ol data-dimensions-list className="contents">
              {items.map((item, index) => {
                const Icon = dimensionIcons[index] ?? Waypoints;
                const active = index === activeIndex;

                return (
                  <li
                    key={`${section.id}-${index}`}
                    tabIndex={0}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onPointerDown={() => setActiveIndex(index)}
                    className={`relative min-h-[360px] min-w-0 border p-5 outline-none transition-[border-color,background-color,transform] duration-300 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 sm:p-6 lg:p-7 motion-reduce:transition-none ${active ? "border-brand-accent bg-surface-soft lg:-translate-y-1" : "border-line bg-page"}`}
                  >
                    <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                      <span
                        aria-hidden="true"
                        className={`flex size-12 shrink-0 items-center justify-center border border-brand-secondary transition-colors duration-300 sm:size-14 ${active ? "border-brand-secondary bg-brand-secondary text-brand-primary" : "border-line bg-page text-brand-secondary/70"} motion-reduce:transition-none`}
                      >
                        <Icon size={23} strokeWidth={1.65} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
                          <div className="min-w-0">
                            <h3 className="text-[21px] font-black leading-[1.6] text-ink sm:text-[23px] lg:text-[25px]">
                              {item.title}
                            </h3>
                          </div>
                          <bdi
                            dir="ltr"
                            className="text-[30px] font-black leading-none text-brand-primary sm:text-[36px]"
                          >
                            {String(item.number ?? index + 1).padStart(2, "0")}
                          </bdi>
                        </div>

                        <p className="mt-4 max-w-[65ch] text-[16px] leading-[1.9] text-ink-muted sm:text-[17px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <MajorDecisionActions section={section} rtl={rtl} />
      </div>
    </section>
  );
}
