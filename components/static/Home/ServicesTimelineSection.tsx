"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const SERVICES_BG = "/assets/images/dnh-services-dark-bg.png";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  side: "left" | "right";
};

const SERVICES: ServiceItem[] = [
  {
    id: "01",
    title: "استراتژی ثروت خصوصی",
    description: "طراحی مسیرهای بلندمدت برای مدیریت و انتقال ثروت.",
    href: "/services/private-wealth-strategy",
    side: "left",
  },
  {
    id: "02",
    title: "هوشمندی پرتفوی",
    description: "تحلیل یکپارچه و قوی برای ساخت پرتفوی منسجم‌تر.",
    href: "/services/portfolio-intelligence",
    side: "right",
  },
  {
    id: "03",
    title: "مشاوره مالی راهبردی",
    description: "ارائه راهکارهای مالی و ارزی متناسب با اهداف کلان.",
    href: "/services/strategic-financial-advisory",
    side: "left",
  },
  {
    id: "04",
    title: "مشاوره اقتصاد و بازار",
    description: "تحلیل روندها و سناریوها برای تصمیم‌های آگاهانه‌تر.",
    href: "/services/macro-market-advisory",
    side: "right",
  },
  {
    id: "05",
    title: "مدیریت ریسک و حفاظت از ثروت",
    description: "شناسایی، ارزیابی و مدیریت ریسک‌ها و تنش های کلیدی.",
    href: "/services/risk-management-wealth-protection",
    side: "left",
  },
  {
    id: "06",
    title: "نشست‌های مدیران",
    description: "گفت‌وگو و تحلیل متمرکز برای تصمیم‌های راهبردی.",
    href: "/services/executive-briefings",
    side: "right",
  },
];

export function ServicesTimelineSection() {
  const { ref, isVisible } = useInViewOnce<HTMLDivElement>();

  return (
    <section
      id="services-overview"
      aria-labelledby="services-overview-title"
      dir="rtl"
      className="
        relative
        isolate
        overflow-hidden
        border-y
        border-line
        bg-brand-secondary
      "
    >
      {/* Background image */}
      <div
        aria-hidden="true"
         className="absolute inset-0 z-0 "
        style={{
          backgroundImage: `url(${SERVICES_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark overlay */}

      {/* Grid overlay */}

      <div
        ref={ref}
        className="
          relative
          z-10
          dnh-site-shell
          mx-auto
          grid
          w-full
          max-w-[1536px]
          gap-10
          px-5
          py-16
          sm:px-8
          sm:py-20
          lg:grid-cols-12
          lg:items-center
          lg:gap-12
          lg:px-12
          lg:py-20
          xl:px-16
          2xl:px-20
        "
      >
        {/* Content side */}
        <div
          className="
            order-1
            lg:order-1
            lg:col-span-5
          "
        >
          <div className="max-w-[520px] text-right">
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />
              <span
                className="
                  text-[10px]
                  font-bold
                  tracking-[0.06em]
                  text-[color-mix(in_srgb,var(--dnh-text-on-brand)_82%,transparent)]
                  sm:text-[11px]
                "
              >
                خدمات DNH
              </span>
            </div>

            <h2
              id="services-overview-title"
              className="
                text-[34px]
                font-black
                leading-[1.45]
                tracking-[-0.04em]
                text-[var(--dnh-text-on-brand)]
               
                lg:text-[48px]
               
              "
            >
              مسیرهای تخصصی
              <br />
              برای تصمیم‌های پیچیده‌تر
            </h2>

            <p
              className="
                mt-6
                max-w-[500px]
                text-[14px]
                font-medium
                leading-[2.1]
                text-[color-mix(in_srgb,var(--dnh-text-on-brand)_76%,transparent)]
                sm:text-[15px]
                lg:text-[16px]
              "
            >
              DNH مجموعه‌ای از خدمات تحلیلی و راهبردی را برای موقعیت‌هایی ارائه
              می‌کند که تصمیم درباره ثروت، پرتفوی، ریسک، ساختار مالی یا جهت‌گیری
              راهبردی، به نگاهی منسجم‌تر و دقیق‌تر نیاز دارد.
            </p>

            <div className="mt-8">
              <ActionButton
                href="/services"
                variant="primary"
                size="md"
                icon={ArrowLeft}
                className="
                  w-full
                  bg-brand-accent
                  text-white
                  shadow-[0_18px_40px_color-mix(in_srgb,var(--dnh-accent)_26%,transparent)]
                  hover:bg-[#e77c02]
                  hover:shadow-[0_20px_44px_color-mix(in_srgb,var(--dnh-accent)_34%,transparent)]
                  sm:w-auto
                  sm:min-w-[220px]
                "
              >
                مشاهده همه خدمات
              </ActionButton>
            </div>
          </div>
        </div>

        {/* Timeline side */}
        <div
          className="
            order-2
            lg:order-1
            lg:col-span-7
          "
        >
          <DesktopTimeline items={SERVICES} isVisible={isVisible} />
          <MobileTimeline items={SERVICES} isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Desktop timeline
============================================================================= */

function DesktopTimeline({
  items,
  isVisible,
}: {
  items: ServiceItem[];
  isVisible: boolean;
}) {
  return (
    <div className="relative hidden lg:block">
      {/* Main vertical line */}
      <span
        aria-hidden="true"
        className="
          absolute
          bottom-8
          left-1/2
          top-8
          z-0
          w-px
          -translate-x-1/2
          bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.5),rgba(255,255,255,0.08))]
        "
      />

      <ol
        className="
          relative
          z-10
          grid
          grid-cols-[minmax(0,1fr)_70px_minmax(0,1fr)]
          gap-y-4
          py-4
        "
      >
        {items.map((item, index) => (
          <DesktopTimelineRow
            key={item.id}
            item={item}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </ol>
    </div>
  );
}

function DesktopTimelineRow({
  item,
  index,
  isVisible,
}: {
  item: ServiceItem;
  index: number;
  isVisible: boolean;
}) {
  const isLeft = item.side === "left";
  const row = Math.floor(index / 2) + 1;

  return (
    <li className="contents">
      {/* Card */}
      <div
        className={[
          "relative flex h-full items-center",
          isLeft ? "col-start-1" : "col-start-3",
          isVisible
            ? "translate-x-0 opacity-100"
            : isLeft
              ? "-translate-x-7 opacity-0"
              : "translate-x-7 opacity-0",
          "transition-[opacity,transform]",
          "duration-700",
          "ease-[cubic-bezier(.22,1,.36,1)]",
          "motion-reduce:transform-none",
          "motion-reduce:transition-none",
        ].join(" ")}
        style={{
          gridRow: row,
          transitionDelay: `${index * 120}ms`,
        }}
      >
        <ServiceCard item={item} side={item.side} />
      </div>

      {/* Middle marker */}
      <div
        className="
          relative
          col-start-2
          flex
          min-h-[92px]
          items-center
          justify-center
        "
        style={{ gridRow: row }}
      >
        <span
          aria-hidden="true"
          className={`
            relative
            z-10
            h-3.5
            w-3.5
            border
            border-brand-accent
            bg-brand-secondary
            shadow-[0_0_0_6px_rgba(5,20,27,0.55)]
            transition-[opacity,transform]
            duration-700
            ease-[cubic-bezier(.22,1,.36,1)]
            ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          `}
          style={{ transitionDelay: `${index * 120 + 100}ms` }}
        />

        <span
          aria-hidden="true"
          className={`
            absolute
            left-1/2
            top-1/2
            h-px
            w-[22px]
            -translate-y-1/2
            bg-white/35
            transition-opacity
            duration-500
            ${isLeft ? "-translate-x-[22px]" : "translate-x-0"}
            ${isVisible ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionDelay: `${index * 120 + 160}ms` }}
        />
      </div>
    </li>
  );
}

/* =============================================================================
   Mobile timeline
============================================================================= */

function MobileTimeline({
  items,
  isVisible,
}: {
  items: ServiceItem[];
  isVisible: boolean;
}) {
  return (
    <div className="relative lg:hidden">
      <span
        aria-hidden="true"
        className="
          absolute
          bottom-2
          right-[16px]
          top-2
          w-px
          bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),rgba(255,255,255,0.48),rgba(255,255,255,0.08))]
        "
      />

      <ol className="space-y-3 pr-8">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={[
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
              "transition-[opacity,transform]",
              "duration-700",
              "ease-[cubic-bezier(.22,1,.36,1)]",
              "motion-reduce:transform-none",
              "motion-reduce:transition-none",
            ].join(" ")}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <span
                aria-hidden="true"
                className="
                  absolute
                  right-[-24px]
                  top-1/2
                  h-3.5
                  w-3.5
                  -translate-y-1/2
                  border
                  border-brand-accent
                  bg-brand-secondary
                  shadow-[0_0_0_6px_rgba(5,20,27,0.55)]
                "
              />

              <ServiceCard item={item} side="right" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* =============================================================================
   Service card
============================================================================= */

function ServiceCard({
  item,
  side,
}: {
  item: ServiceItem;
  side: "left" | "right";
}) {
  const connectorClass =
    side === "left"
      ? `
        after:absolute
        after:-right-6
        after:top-1/2
        after:h-px
        after:w-6
        after:-translate-y-1/2
        after:bg-white/30
      `
      : `
        after:absolute
        after:-left-6
        after:top-1/2
        after:h-px
        after:w-6
        after:-translate-y-1/2
        after:bg-white/30
      `;

  return (
    <Link
      href={item.href}
      className={`
        group/service
        relative
        block
        w-full
        border
        border-white/18
        bg-[color-mix(in_srgb,var(--dnh-secondary)_22%,transparent)]
        px-5 
        py-4
        text-right
        shadow-[0_10px_32px_rgba(0,0,0,0.12)]
        backdrop-blur-[2px]
        outline-none
        transition-[transform,border-color,background-color,box-shadow]
        duration-300
        ease-[cubic-bezier(.22,1,.36,1)]
        hover:-translate-y-[2px]
        hover:border-brand-accent/80
        hover:bg-[color-mix(in_srgb,var(--dnh-primary)_18%,rgba(255,255,255,0.04))]
        hover:shadow-[0_18px_38px_rgba(0,0,0,0.22)]
        focus-visible:ring-4
        focus-visible:ring-focus/30
        motion-reduce:transform-none
        ${connectorClass}
      `}
      aria-label={`مشاهده صفحه ${item.title}`}
    >
      {/* subtle accent strip */}
      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0
          w-[2px]
          bg-brand-accent
          opacity-80
          transition-[width,opacity]
          duration-300
          group-hover/service:w-[4px]
          group-hover/service:opacity-100
        "
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className="
              text-[18px]
              font-black
              leading-8
              text-[var(--dnh-text-on-brand)]
              sm:text-[19px]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-2
              max-w-[280px]
              text-[13px]
              font-medium
              leading-[2]
              text-white/72
              sm:text-[14px]
            "
          >
            {item.description}
          </p>
        </div>

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            pl-1
          "
        >
          <span
            dir="ltr"
            className="
              text-[22px]
              font-light
              leading-none
              text-white/72
              transition-colors
              duration-300
              group-hover/service:text-white
            "
          >
            {item.id}
          </span>
        </div>
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <span
          className="
            text-[11px]
            font-bold
            tracking-[0.04em]
            text-white/58
            transition-colors
            duration-300
            group-hover/service:text-brand-accent
          "
        >
          مشاهده جزئیات خدمت
        </span>

        <span
          className="
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            border
            border-white/14
            bg-white/[0.04]
            text-white/78
            transition-all
            duration-300
            group-hover/service:border-brand-accent/65
            group-hover/service:bg-brand-accent/10
            group-hover/service:text-white
            group-hover/service:-translate-x-0.5
          "
        >
          <ArrowUpLeft className="h-4 w-4" strokeWidth={1.9} />
        </span>
      </div>
    </Link>
  );
}

/* =============================================================================
   Hook
============================================================================= */

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return { ref, isVisible };
}
