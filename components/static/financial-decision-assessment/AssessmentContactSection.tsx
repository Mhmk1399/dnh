import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import { LocalizedLink as Link } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteDirection } from "@/lib/site-language";
import type { AssessmentContactContent } from "./assessmentTypes";

export function AssessmentContactSection({
  content,
  direction,
}: {
  content: AssessmentContactContent;
  direction: SiteDirection;
}) {
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;
  const DiagonalArrow = direction === "rtl" ? ArrowUpLeft : ArrowUpRight;

  return (
    <section
      id={content.id}
      dir={direction}
      aria-labelledby="assessment-contact-title"
      className="relative isolate overflow-hidden bg-brand-secondary py-16 text-white   sm:py-20 lg:py-24 "
    >
      <Background />
      <div className="dnh-site-shell relative z-10 flex min-h-[350px] flex-col justify-between">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-brand-primary" aria-hidden="true" />
            <span className="text-[10px] font-black text-white/60 sm:text-[11px]">
              {content.eyebrow}
            </span>
          </div>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <div>
            <h2
              id="assessment-contact-title"
              className="max-w-[900px] text-[34px] font-black leading-[1.65] tracking-[-0.05em] sm:text-[43px] lg:text-[54px] lg:leading-[1.55] xl:text-[62px]"
            >
              <Highlight
                text={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
            <p className="mt-7 max-w-[700px] text-[13px] font-medium leading-[2.25] text-white/52 sm:text-[14px] lg:text-[15px]">
              {content.intro}
            </p>
          </div>
          <div className="group relative border-s border-white/12 ps-5 sm:ps-7">
            <span
              aria-hidden="true"
              className="absolute -start-[2px] top-0 h-14 w-[3px] bg-brand-primary transition-[height] duration-500 group-hover:h-full"
            />

            <p className="mt-3 text-[14px] font-black leading-[1.9] sm:text-[16px]">
              {content.action_title}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {content.ctas.map((cta) => (
                <ActionButton
                  key={cta.id}
                  href={cta.href}
                  variant={cta.type === "primary" ? "assessment" : "secondary"}
                  size="lg"
                  shape="square"
                  className={
                    cta.type === "primary"
                      ? "w-full bg-brand-primary text-white shadow-none hover:bg-brand-accent sm:min-w-[280px]"
                      : "w-full border-white/20 bg-white/[0.035] text-white shadow-none hover:border-white/40 hover:bg-white/[0.075] hover:text-white"
                  }
                >
                  {cta.label}
                </ActionButton>
              ))}
            </div>
            <Link
              href={content.contact_link.href}
              className="group/contact mt-6 inline-flex min-h-11 items-center gap-3 text-[11px] font-bold text-white/38 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-focus/50"
            >
              {content.contact_link.label}
              <DiagonalArrow
                aria-hidden="true"
                className="size-3.5 text-brand-primary transition-transform group-hover/contact:-translate-y-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlight({ text, highlight }: { text: string; highlight: string }) {
  const index = text.indexOf(highlight);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-brand-primary">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}
function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(22,115,148,.2),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.3) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}
