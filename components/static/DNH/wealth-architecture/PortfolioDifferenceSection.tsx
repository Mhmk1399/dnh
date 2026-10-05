"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

export function PortfolioDifferenceSection() {
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
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio-difference"
      dir="rtl"
      aria-labelledby="portfolio-difference-title"
      data-visible={visible}
      className="
        portfolio-difference
        relative
        isolate
        scroll-mt-24
        overflow-hidden
        border-y
        border-line
        bg-page
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
          max-w-[1600px]

          gap-12

          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:min-h-[680px]
          lg:grid-cols-[1.1fr_0.9fr]
          lg:items-center
          lg:gap-14
          lg:px-12
          lg:py-20

          xl:grid-cols-[1.16fr_0.84fr]
          xl:gap-20
          xl:px-16

          2xl:px-20
        "
      >
        <div
          className="
            order-1

            lg:col-start-1
            lg:row-start-1
          "
        >
          <div
            className="
              portfolio-reveal
              portfolio-delay-1

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
                text-brand-primary

                sm:text-[11px]
              "
            >
              تفاوت در دامنه نگاه
            </span>
          </div>

          <h2
            id="portfolio-difference-title"
            className="
              portfolio-reveal
              portfolio-delay-2

              max-w-[600px]

              text-[34px]
              font-black
              leading-[1.62]
              tracking-[-0.045em]

              text-ink

              sm:text-[42px]

              lg:text-[48px]

              xl:text-[54px]
            "
          >
            پرتفوی،
            <br />
            بخشی از تصویر است؛
            <br />
            <span className="text-brand-accent">نه تمام آن.</span>
          </h2>

          <p
            className="
              portfolio-reveal
              portfolio-delay-3

              mt-6
              max-w-[610px]

              text-[13px]
              font-medium
              leading-[2.25]

              text-ink-muted

              sm:text-[14px]

              lg:text-[15px]
            "
          >
            مدیریت پرتفوی معمولاً بر ساختار و رفتار دارایی‌های سرمایه‌گذاری
            تمرکز دارد. در نگاه DNH، معماری ثروت در سطحی گسترده‌تر به رابطه
            میان دارایی‌ها، نقدینگی، ریسک، اهداف، افق زمانی و تصمیم‌های مالی
            نگاه می‌کند تا یک تصویر منسجم‌تر از ثروت شکل بگیرد.
          </p>

          <div
            className="
              portfolio-reveal
              portfolio-delay-4

              mt-8
            "
          >
            <ActionButton
              href="#common-mistakes"
              variant="assessment"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                bg-brand-accent

                shadow-[0_14px_34px_color-mix(in_srgb,var(--dnh-accent)_24%,transparent)]

                hover:bg-[#ec7d01]

                sm:w-auto
                sm:min-w-[235px]
              "
            >
              آشنایی بیشتر با تفاوت‌ها
            </ActionButton>
          </div>
        </div>

        <div
          className="
            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <PortfolioGradientStatement />
        </div>
      </div>

      <MotionStyles />
    </section>
  );
}

function PortfolioGradientStatement() {
  return (
    <div
      className="
        portfolio-gradient-card
        portfolio-reveal
        portfolio-delay-3

        relative
        mx-auto
        flex
        min-h-[330px]
        w-full
        max-w-[520px]
        flex-col
        justify-end
        overflow-hidden

        border
        border-brand-primary/15

        bg-[linear-gradient(135deg,color-mix(in_srgb,var(--dnh-primary)_92%,#031a22)_0%,color-mix(in_srgb,var(--dnh-secondary)_82%,#052634)_45%,color-mix(in_srgb,var(--dnh-accent)_78%,#0b2b34)_100%)]

        p-7

        text-white

        shadow-[0_28px_90px_color-mix(in_srgb,var(--dnh-primary)_18%,transparent)]

        sm:min-h-[390px]
        sm:p-9

        lg:min-h-[470px]
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute
          -left-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-white/18
          blur-[70px]
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          -bottom-32
          -right-24
          h-80
          w-80
          rounded-full
          bg-brand-accent/35
          blur-[82px]
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-8
          top-9
          h-px
          bg-white/25
        "
      />

      <div className="relative z-10">
        <p
          className="
            mb-5
            inline-flex
            items-center
            gap-2

            text-[10px]
            font-black
            text-white/62
          "
        >
          <span className="h-px w-8 bg-brand-accent" />
          DNH Wealth Architecture
        </p>

        <p
          className="
            max-w-[390px]
            text-[25px]
            font-black
            leading-[1.75]
            tracking-[-0.04em]

            sm:text-[31px]
          "
        >
          پرتفوی فقط یک قاب از تصویر ثروت است.
        </p>

        <p
          className="
            mt-5
            max-w-[380px]
            text-[12px]
            font-medium
            leading-[2.05]
            text-white/68

            sm:text-[13px]
          "
        >
          معماری ثروت، رابطه میان تصمیم، زمان، ریسک و دارایی را کنار هم
          می‌بیند.
        </p>
      </div>
    </div>
  );
}

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
              105deg,
              color-mix(in srgb, var(--dnh-primary) 4%, white) 0%,
              #ffffff 48%,
              #ffffff 100%
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
          opacity-[0.28]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(in srgb, var(--dnh-primary) 4%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--dnh-primary) 3%, transparent) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "82px 82px",
          maskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.6) 62%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.6) 62%, transparent 100%)",
        }}
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
          via-brand-primary/30
          to-transparent
        "
      />
    </>
  );
}

function MotionStyles() {
  return (
    <style>{`
      .portfolio-reveal {
        opacity: 0;
        transform: translate3d(0, 12px, 0);

        transition:
          opacity 620ms cubic-bezier(.22, 1, .36, 1),
          transform 620ms cubic-bezier(.22, 1, .36, 1);
      }

      .portfolio-difference[data-visible="true"]
      .portfolio-reveal {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .portfolio-delay-1 {
        transition-delay: 50ms;
      }

      .portfolio-delay-2 {
        transition-delay: 110ms;
      }

      .portfolio-delay-3 {
        transition-delay: 180ms;
      }

      .portfolio-delay-4 {
        transition-delay: 260ms;
      }

      .portfolio-gradient-card {
        isolation: isolate;
      }

      .portfolio-gradient-card::before {
        content: "";
        position: absolute;
        inset: 1px;
        pointer-events: none;
        background:
          linear-gradient(90deg, transparent, rgba(255,255,255,.16), transparent),
          linear-gradient(to bottom, rgba(255,255,255,.11) 1px, transparent 1px),
          linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px);
        background-size: auto, 74px 74px, 74px 74px;
        opacity: .36;
      }

      @media (hover: hover) and (pointer: fine) {
        .portfolio-gradient-card {
          transition:
            transform 420ms cubic-bezier(.22, 1, .36, 1),
            box-shadow 420ms cubic-bezier(.22, 1, .36, 1);
        }

        .portfolio-gradient-card:hover {
          transform: translate3d(0, -4px, 0);
          box-shadow: 0 34px 110px color-mix(in srgb, var(--dnh-primary) 24%, transparent);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .portfolio-reveal,
        .portfolio-gradient-card {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
        }
      }
    `}</style>
  );
}
