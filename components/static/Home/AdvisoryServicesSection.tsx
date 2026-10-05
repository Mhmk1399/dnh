"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const SERVICES_BG = "/assets/images/dnh-services-dark-bg.png";

/* =============================================================================
   Services

   هیچ شماره‌ای نمایش داده نمی‌شود چون این خدمات Sequence نیستند.
============================================================================= */

type ServiceItem = {
  key: string;
  label: string;
  title: string;
  audience: string;
  description: string;
  href: string;
};

const SERVICES: ServiceItem[] = [
  {
    key: "private-wealth",
    label: "PRIVATE WEALTH",
    title: "استراتژی ثروت خصوصی",
    audience: "افراد، خانواده‌ها و صاحبان سرمایه",
    description:
      "ساختن تصویری ساختاریافته از ثروت، اهداف، نقدشوندگی، ریسک و مسیرهای قابل بررسی.",
    href: "/fa/services/private-wealth-strategy",
  },

  {
    key: "portfolio",
    label: "PORTFOLIO INTELLIGENCE",
    title: "هوشمندی پرتفوی",
    audience: "دارندگان دارایی‌ها و پرتفوی‌های متنوع",
    description:
      "ارزیابی پراکندگی دارایی، تمرکز ریسک، نقدشوندگی و حوزه‌های نیازمند بازبینی.",
    href: "/fa/services/portfolio-intelligence",
  },

  {
    key: "strategic-advisory",
    label: "STRATEGIC ADVISORY",
    title: "مشاوره مالی راهبردی",
    audience: "صاحبان کسب‌وکار، مدیران و هلدینگ‌ها",
    description:
      "بررسی ساختار مالی، سرمایه، نقدینگی، تأمین مالی و مسیر تصمیم در مسائل چندلایه کسب‌وکار.",
    href: "/fa/services/strategic-financial-advisory",
  },

  {
    key: "macro-market",
    label: "MACRO & MARKET",
    title: "مشاوره اقتصاد و بازار",
    audience: "سرمایه‌گذاران و تصمیم‌گیرندگان",
    description:
      "تحلیل شرایط اقتصادی، سناریوهای مرتبط و پیامدهای راهبردی آن‌ها برای تصمیم.",
    href: "/fa/services/macro-market-advisory",
  },

  {
    key: "risk-protection",
    label: "RISK & PROTECTION",
    title: "مدیریت ریسک و حفاظت از ثروت",
    audience: "افراد، خانواده‌ها، صاحبان سرمایه و کسب‌وکارها",
    description:
      "شناخت ریسک‌های مهم و پنهان و ایجاد تصویری ساختاریافته از اولویت‌های حفاظتی.",
    href: "/fa/services/risk-management-wealth-protection",
  },

  {
    key: "executive",
    label: "EXECUTIVE BRIEFINGS",
    title: "نشست‌های مدیران",
    audience: "مدیران ارشد، هیئت‌مدیره و تصمیم‌گیرندگان کلیدی",
    description:
      "بررسی متمرکز یک موضوع مهم و جمع‌بندی نکات کلیدی، سناریوها و مسیرهای قابل بررسی.",
    href: "/fa/services/executive-briefings",
  },
];

/* =============================================================================
   Section
============================================================================= */

export function AdvisoryServicesSection() {
  const { ref, isVisible } = useInViewOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      id="advisory-services"
      aria-labelledby="advisory-services-title"
      dir="rtl"
      className="
        relative
        isolate
        overflow-hidden

        border-y
        border-white/10

        bg-brand-secondary
      "
    >
      {/* =========================================================
          Background
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
        "
      >
        <Image
          src={SERVICES_BG}
          alt=""
          fill
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-[linear-gradient(110deg,rgba(3,38,50,.97)_0%,rgba(3,45,59,.93)_48%,rgba(4,55,72,.89)_100%)]
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-b
            from-black/5
            via-transparent
            to-black/15
          "
        />
      </div>

      {/* =========================================================
          subtle grid
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-[1]

          opacity-[0.08]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.10) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
        }}
      />

      {/* top marker */}

      <span
        aria-hidden="true"
        className="
          absolute
          left-[20%]
          top-0
          z-[2]

          h-[7px]
          w-[2px]

          bg-brand-accent
        "
      />

      {/* =========================================================
          Container
      ========================================================== */}

      <div
        className="
          relative
          z-10

          dnh-site-shell
          mx-auto

          w-full
          max-w-[1536px]

          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:px-12
          lg:py-24

          xl:px-16
          xl:py-28

          2xl:px-20
        "
      >
        {/* =======================================================
            Header
        ======================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.92fr_1.08fr]
            lg:items-end
            lg:gap-16
          "
        >
          {/* Main title */}

          <Reveal visible={isVisible} delay={40}>
            <div>
              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-px
                    w-10

                    bg-brand-accent
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-black

                    text-white/75

                    sm:text-[11px]
                  "
                >
                  خدمات مشاوره‌ای DNH
                </span>
              </div>

              <h2
                id="advisory-services-title"
                className="
                  max-w-[700px]

                  text-[32px]
                  font-black
                  leading-[1.58]
                  tracking-[-0.045em]

                  text-white

                  sm:text-[39px]

                  lg:text-[45px]
                  lg:leading-[1.5]

                  xl:text-[50px]
                "
              >
                مسیر مناسب،
                <br />
                از <span className="text-brand-accent">مسئله درست</span> آغاز
                می‌شود.
              </h2>
            </div>
          </Reveal>

          {/* Description */}

          <Reveal visible={isVisible} delay={110}>
            <div
              className="
                lg:pb-1
              "
            >
              <p
                className="
                  max-w-[650px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-white/66

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                خدمات DNH به‌عنوان پکیج‌های جدا از هم تعریف نشده‌اند. نقطه شروع،
                شناخت مسئله‌ای است که باید بررسی شود؛ از ساختار ثروت و پرتفوی تا
                ریسک، محیط اقتصادی و تصمیم‌های مالی پیچیده.
              </p>

              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-4

                  sm:flex-row
                  sm:items-center
                "
              >
                <ActionButton
                  href="/fa/services"
                  variant="secondary"
                  size="md"
                  icon={ArrowLeft}
                  className="
                    w-full

                    border-white/28
                    bg-white/[0.055]

                    text-white

                    shadow-none

                    hover:border-white/50
                    hover:bg-white/[0.10]
                    hover:text-white

                    sm:w-auto
                    sm:min-w-[210px]
                  "
                >
                  مشاهده همه خدمات
                </ActionButton>

                <p
                  className="
                    text-[9px]
                    font-medium
                    leading-[1.9]

                    text-white/42

                    sm:max-w-[220px]
                  "
                >
                  انتخاب مسیر همکاری بعد از شناخت موقعیت و مسئله معنا پیدا
                  می‌کند.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =======================================================
            Service matrix header
        ======================================================== */}

        <Reveal visible={isVisible} delay={180}>
          <div
            className="
              mt-12

              flex
              items-center
              justify-between
              gap-5

              border-b
              border-white/15

              pb-4

              sm:mt-14

              lg:mt-16
            "
          >
            <div>
              <p
                dir="ltr"
                className="
                  text-[8px]
                  font-black
                  tracking-[0.2em]

                  text-brand-accent
                "
              >
                ADVISORY SERVICE MATRIX
              </p>

              <p
                className="
                  mt-2

                  text-[10px]
                  font-medium

                  text-white/52
                "
              >
                شش مسیر تخصصی برای موقعیت‌های متفاوت
              </p>
            </div>

            <span
              aria-hidden="true"
              className="
                hidden
                h-px
                w-24

                bg-white/15

                sm:block
              "
            />
          </div>
        </Reveal>

        {/* =======================================================
            Service matrix
        ======================================================== */}

        <ul
          aria-label="خدمات تخصصی DNH"
          className="
            grid

            border-x
            border-white/12

            md:grid-cols-2
          "
        >
          {SERVICES.map((service, index) => (
            <ServiceMatrixItem
              key={service.key}
              service={service}
              index={index}
              visible={isVisible}
            />
          ))}
        </ul>

        {/* =======================================================
            Footer rail
        ======================================================== */}

        <Reveal visible={isVisible} delay={620}>
          <div
            className="
              flex
              items-center
              justify-between
              gap-5

              border-t
              border-white/15

              pt-5
            "
          >
            <p
              className="
                max-w-[650px]

                text-[10px]
                font-medium
                leading-[1.9]

                text-white/45

                sm:text-[11px]
              "
            >
              DNH پیش از پیشنهاد مسیر همکاری، تلاش می‌کند مسئله، پیچیدگی و نوع
              تصمیم را دقیق‌تر ببیند.
            </p>

            <div
              aria-hidden="true"
              className="
                hidden
                shrink-0
                items-center
                gap-3

                sm:flex
              "
            >
              <span
                className="
                  h-[5px]
                  w-[5px]

                  bg-brand-accent
                "
              />

              <span
                className="
                  h-px
                  w-12

                  bg-white/18
                "
              />

              <span
                dir="ltr"
                className="
                  text-[7px]
                  font-bold
                  tracking-[0.18em]

                  text-white/35
                "
              >
                DNH / ADVISORY
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Service
============================================================================= */

function ServiceMatrixItem({
  service,
  index,
  visible,
}: {
  service: ServiceItem;
  index: number;
  visible: boolean;
}) {
  const isRightColumn = index % 2 === 0;
  const hasBottomBorder = index < 4;

  return (
    <li
      className={`
        transition-[opacity,transform]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        ${isRightColumn ? "md:border-l md:border-white/12" : ""}

        ${
          hasBottomBorder
            ? "border-b border-white/12"
            : index === 4
              ? "border-b border-white/12 md:border-b-0"
              : ""
        }

        ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={
        {
          transitionDelay: `${240 + index * 70}ms`,
        } as CSSProperties
      }
    >
      <article className="h-full">
        <Link
          href={service.href}
          aria-label={`مشاهده خدمت ${service.title}`}
          className="
            group/service

            relative

            flex
            min-h-[255px]
            h-full
            flex-col

            overflow-hidden

            px-5
            py-6

            outline-none

            transition-colors
            duration-300

            hover:bg-white/[0.055]

            focus-visible:bg-white/[0.07]
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-focus/50

            sm:px-6
            sm:py-7

            lg:min-h-[275px]
            lg:px-8
            lg:py-8
          "
        >
          {/* hover accent */}

          <span
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              top-0

              h-[2px]

              origin-right
              scale-x-0

              bg-brand-accent

              transition-transform
              duration-500
              ease-[cubic-bezier(.22,1,.36,1)]

              group-hover/service:scale-x-100
            "
          />

          {/* top */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-5
            "
          >
            <div>
              <p
                dir="ltr"
                className="
                  text-right
                  text-[7px]
                  font-black
                  tracking-[0.17em]

                  text-brand-accent/85
                "
              >
                {service.label}
              </p>

              <h3
                className="
                  mt-3

                  text-[17px]
                  font-black
                  leading-[1.8]

                  text-white

                  transition-colors
                  duration-300

                  group-hover/service:text-white

                  sm:text-[18px]

                  lg:text-[19px]
                "
              >
                {service.title}
              </h3>
            </div>

            <span
              aria-hidden="true"
              className="
                flex
                h-10
                w-10
                shrink-0

                items-center
                justify-center

                border
                border-white/14

                text-white/55

                transition-[border-color,color,transform,background-color]
                duration-300

                group-hover/service:-translate-x-1
                group-hover/service:border-brand-accent/60
                group-hover/service:bg-brand-accent/[0.08]
                group-hover/service:text-brand-accent
              "
            >
              <ArrowUpLeft className="h-4 w-4" strokeWidth={1.7} />
            </span>
          </div>

          {/* audience */}

          <div
            className="
              mt-5

              border-r
              border-white/15

              pr-4
            "
          >
            <p
              className="
                text-[8px]
                font-black

                text-white/38
              "
            >
              مناسب برای
            </p>

            <p
              className="
                mt-1.5

                text-[10px]
                font-bold
                leading-[1.9]

                text-white/66

                sm:text-[11px]
              "
            >
              {service.audience}
            </p>
          </div>

          {/* description */}

          <p
            className="
              mt-5
              max-w-[520px]

              text-[11px]
              font-medium
              leading-[2]

              text-white/55

              sm:text-[12px]
            "
          >
            {service.description}
          </p>

          {/* footer */}

          <div
            className="
              mt-auto

              flex
              items-center
              justify-between
              gap-4

              pt-6
            "
          >
            <span
              className="
                text-[9px]
                font-bold

                text-white/42

                transition-colors
                duration-300

                group-hover/service:text-brand-accent
              "
            >
              مشاهده جزئیات خدمت
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-10

                bg-white/15

                transition-[width,background-color]
                duration-300

                group-hover/service:w-16
                group-hover/service:bg-brand-accent/70
              "
            />
          </div>
        </Link>
      </article>
    </li>
  );
}

/* =============================================================================
   Reveal
============================================================================= */

function Reveal({
  children,
  visible,
  delay,
}: {
  children: React.ReactNode;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`
        transition-[opacity,transform]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        ${visible ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"}

        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =============================================================================
   Observer
============================================================================= */

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || isVisible) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return {
    ref,
    isVisible,
  };
}
