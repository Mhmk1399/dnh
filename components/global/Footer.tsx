import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, CircleDollarSign } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

type FooterLink = {
  label: string;
  href: string;
};

type FooterGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

type SocialPlatform = "instagram" | "linkedin" | "telegram";

type SocialLink = {
  label: string;
  platform: SocialPlatform;
  href?: string;
};

const socialLinks: SocialLink[] = [
  {
    label: "اینستاگرام",
    platform: "instagram",
    href: "#",
  },
  {
    label: "لینکدین",
    platform: "linkedin",
    href: "#",
  },
  {
    label: "تلگرام",
    platform: "telegram",
    href: "#",
  },
];

const footerGroups: FooterGroup[] = [
  {
    id: "dnh",
    title: "DNH",
    links: [
      { label: "معماری ثروت", href: "/dnh/wealth-architecture" },
      { label: "چارچوب DNH", href: "/dnh/framework" },
      { label: "میز هوشمندی DNH", href: "/dnh/intelligence-desk" },
      { label: "درباره DNH", href: "/about" },
    ],
  },
  {
    id: "services",
    title: "خدمات",
    links: [
      { label: "نمای کلی خدمات", href: "/services" },
      {
        label: "استراتژی ثروت خصوصی",
        href: "/services/private-wealth-strategy",
      },
      {
        label: "هوشمندی پرتفوی",
        href: "/services/portfolio-intelligence",
      },
      {
        label: "مشاوره مالی راهبردی",
        href: "/services/strategic-financial-advisory",
      },
      {
        label: "مشاوره اقتصاد و بازار",
        href: "/services/macro-market-advisory",
      },
      {
        label: "مدیریت ریسک و حفاظت از ثروت",
        href: "/services/risk-management-wealth-protection",
      },
      {
        label: "نشست‌های مدیران",
        href: "/services/executive-briefings",
      },
    ],
  },
  {
    id: "target-markets",
    title: "بازارهای هدف",
    links: [
      {
        label: "تصمیم مالی بزرگ",
        href: "/target-markets/big-financial-decision",
      },
      {
        label: "پرتفوی بدون معماری",
        href: "/target-markets/unstructured-portfolio",
      },
      {
        label: "هلدینگ‌ها و ساختار سرمایه",
        href: "/target-markets/holdings-financial-capital-structure",
      },
      { label: "دانش", href: "/knowledge" },
    ],
  },
  {
    id: "contact",
    title: "ارتباط",
    links: [
      {
        label: "ارزیابی تصمیم مالی",
        href: "/financial-decision-assessment",
      },
      {
        label: "درخواست مشاوره راهبردی",
        href: "/request-strategic-consultation",
      },
      { label: "تماس با DNH", href: "/contact" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: "حریم خصوصی", href: "/legal/privacy-policy" },
  { label: "شرایط استفاده", href: "/legal/terms-of-use" },
  { label: "سلب مسئولیت مالی", href: "/legal/financial-disclaimer" },
  {
    label: "حفاظت داده",
    href: "/legal/data-protection-advisory-limitation",
  },
  {
    label: "عدم تضمین سرمایه‌گذاری",
    href: "/legal/no-investment-guarantee-no-trading-signal",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      dir="rtl"
      aria-label="پاورقی وب‌سایت DNH"
      className="
        relative
        mt-24
        px-2
        pb-2
        sm:mt-28
        sm:px-3
        sm:pb-3
      "
    >
      <div
        className="
          relative
          isolate
          mx-auto
          max-w-[1536px]
          overflow-hidden
          
          border
          border-white/10
          shadow-[0_30px_90px_color-mix(in_srgb,var(--dnh-primary)_18%,transparent)]
        "
        style={{
          background: `
            linear-gradient(
              135deg,
              color-mix(in srgb, var(--dnh-secondary) 62%, black) 0%,
              color-mix(in srgb, var(--dnh-primary) 54%, black) 52%,
              color-mix(in srgb, var(--dnh-secondary) 48%, black) 100%
            )
          `,
        }}
      >
        <FooterAtmosphere />

        <div className="relative z-10">
          {/* ===============================================================
              Closing statement / CTA
          =============================================================== */}

          <section
            aria-labelledby="footer-closing-title"
            className="
              grid
              gap-9
              border-b
              border-white/10
              px-5
              py-9

              sm:px-8
              sm:py-11

              lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]
              lg:items-end
              lg:gap-16
              lg:px-12
              lg:py-14

              xl:px-16
            "
          >
            <div className="max-w-[780px]">
              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="
                    h-px
                    w-9
                    bg-brand-accent
                  "
                />

                <span
                  dir="ltr"
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-white/60
                    sm:text-[10px]
                  "
                >
                  DNH · Strategic Financial Advisory
                </span>
              </div>

              <h2
                id="footer-closing-title"
                className="
                  max-w-[720px]
                  text-[30px]
                  font-black
                  leading-[1.55]
                  tracking-[-0.035em]
                  text-white

                  sm:text-[38px]

                  lg:text-[46px]
                  lg:leading-[1.45]

                  xl:text-[52px]
                "
              >
                تصمیم‌های مهم،
                <br className="hidden sm:block" />
                به <span className="text-brand-accent">
                  معماری روشن‌تری
                </span>{" "}
                نیاز دارند.
              </h2>

              <p
                className="
                  mt-5
                  max-w-[650px]
                  text-[12px]
                  font-medium
                  leading-[2.15]
                  text-white/58

                  sm:text-[13px]
                  lg:text-[14px]
                "
              >
                DNH برای تصمیم‌هایی طراحی شده که یک پاسخ ساده برایشان کافی نیست؛
                جایی که داده، ریسک، ساختار مالی و افق تصمیم باید در یک تصویر
                منسجم دیده شوند.
              </p>

              <FrameworkRail />
            </div>

            {/* CTA */}
            <div
              className="
                flex
                w-full
                flex-col
                gap-3

                sm:max-w-[520px]
                sm:flex-row
                sm:flex-wrap

                lg:mr-auto
                lg:max-w-[470px]
                lg:justify-end
              "
            >
              <ActionButton
                href="/request-strategic-consultation"
                variant="assessment"
                size="md"
                icon={ArrowLeft}
                className="
                  w-full
                  sm:w-auto
                  sm:min-w-[245px]
                "
              >
                درخواست مشاوره راهبردی
              </ActionButton>

              <ActionButton
                href="/financial-decision-assessment"
                variant="secondary"
                size="md"
                icon={CircleDollarSign}
                iconPosition="start"
                className="
                  w-full
                  sm:w-auto
                  sm:min-w-[205px]
                "
              >
                ارزیابی تصمیم مالی
              </ActionButton>
            </div>
          </section>

          {/* ===============================================================
              Brand + navigation
          =============================================================== */}

          <div
            className="
              grid
              lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.65fr)]
            "
          >
            {/* Brand column */}
            <aside
              className="
                border-b
                border-white/10
                px-5
                py-8

                sm:px-8

                lg:border-b-0
                lg:border-l
                lg:border-white/10
                lg:px-10
                lg:py-11

                xl:px-12
              "
            >
              <Link
                href="/"
                aria-label="DNH - صفحه اصلی"
                className="
                  inline-flex
                  items-center
                  rounded-[14px]
                  bg-page
                  p-3
                  outline-none
                  transition-transform
                  duration-300
                  hover:-translate-y-px
                  focus-visible:ring-4
                  focus-visible:ring-focus/30
                "
              >
                <Image
                  src="/assets/images/LOGO.svg"
                  alt="DNH"
                  width={170}
                  height={46}
                  sizes="170px"
                  className="
                    h-10
                    w-auto
                    object-contain
                  "
                />
              </Link>

              <p
                className="
                  mt-6
                  max-w-[340px]
                  text-[11px]
                  font-medium
                  leading-[2.1]
                  text-white/52

                  sm:text-[12px]
                "
              >
                معماری ثروت، هوشمندی مالی و پشتیبانی تحلیلی برای تصمیم‌هایی که
                اثر آن‌ها فراتر از یک انتخاب کوتاه‌مدت است.
              </p>

              <div
                className="
                  mt-7
                  h-px
                  w-full
                  bg-white/10
                "
              />

              <FooterSocials />
            </aside>

            {/* Navigation */}
            <nav
              aria-label="دسترسی سریع پاورقی"
              className="
                grid
                grid-cols-2
                gap-x-6
                gap-y-10
                px-5
                py-8

                sm:px-8

                md:grid-cols-4

                lg:px-10
                lg:py-11

                xl:px-12
              "
            >
              {footerGroups.map((group, index) => (
                <FooterGroup key={group.id} group={group} index={index} />
              ))}
            </nav>
          </div>

          {/* ===============================================================
              Legal / bottom bar
          =============================================================== */}

          <div
            className="
              relative
              flex
              flex-col
              gap-5
              border-t
              border-white/10
              px-5
              py-5

              sm:px-8

              lg:flex-row
              lg:items-center
              lg:justify-between

              lg:px-12
              xl:px-16
            "
          >
            <p
              dir="ltr"
              className="
                text-right
                text-[9px]
                font-medium
                tracking-[0.04em]
                text-white/38

                lg:text-left
              "
            >
              © {year} DNH. All rights reserved.
            </p>

            <nav aria-label="لینک‌های حقوقی">
              <ul
                className="
                  flex
                  flex-wrap
                  gap-x-5
                  gap-y-2
                "
              >
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        text-[9px]
                        font-semibold
                        text-white/42
                        outline-none
                        transition-colors
                        duration-200

                        hover:text-white
                        focus-visible:text-white
                        focus-visible:underline
                      "
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Huge watermark */}
        <span
          aria-hidden="true"
          dir="ltr"
          className="
            pointer-events-none
            absolute
            -bottom-14
            -left-3
            z-0

            select-none

            text-[120px]
            font-black
            leading-none
            tracking-[-0.08em]

            text-white/[0.025]

            sm:text-[170px]
            lg:-bottom-24
            lg:text-[250px]
          "
        >
          DNH
        </span>
      </div>
    </footer>
  );
}

/* =============================================================================
   DNH Framework signature
============================================================================= */

function FrameworkRail() {
  return (
    <div
      dir="ltr"
      className="
        mt-7
        flex
        max-w-[680px]
        flex-wrap
        items-center
        gap-x-3
        gap-y-2

        border-t
        border-white/10

        pt-5

        text-[8px]
        font-bold
        uppercase
        tracking-[0.14em]
        text-white/44

        sm:gap-x-4
        sm:text-[9px]
      "
    >
      <span>Data Intelligence</span>

      <span aria-hidden="true" className="text-brand-accent">
        →
      </span>

      <span>Navigation Strategy</span>

      <span aria-hidden="true" className="text-brand-accent">
        →
      </span>

      <span>Horizon Architecture</span>
    </div>
  );
}

/* =============================================================================
   Footer group
============================================================================= */

function FooterGroup({ group, index }: { group: FooterGroup; index: number }) {
  return (
    <section aria-labelledby={`footer-${group.id}`}>
      <div
        className="
          mb-5
          flex
          items-center
          gap-2.5
        "
      >
        <span
          dir="ltr"
          aria-hidden="true"
          className="
            text-[8px]
            font-black
            tracking-[0.12em]
            text-brand-accent
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          aria-hidden="true"
          className="
            h-px
            w-5
            bg-white/15
          "
        />

        <h2
          id={`footer-${group.id}`}
          className="
            text-[11px]
            font-black
            text-white
          "
        >
          {group.title}
        </h2>
      </div>

      <ul className="space-y-1">
        {group.links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="
                group/footer-link
                inline-flex
                max-w-full
                items-center
                gap-1.5

                py-1.5

                text-[10px]
                font-semibold
                leading-6

                text-white/48

                outline-none

                transition-colors
                duration-200

                hover:text-white
                focus-visible:text-white
              "
            >
              <span>{item.label}</span>

              <ArrowLeft
                aria-hidden="true"
                strokeWidth={1.7}
                className="
                  h-3
                  w-3
                  shrink-0

                  translate-x-1
                  text-brand-accent
                  opacity-0

                  transition-[transform,opacity]
                  duration-200

                  group-hover/footer-link:translate-x-0
                  group-hover/footer-link:opacity-100

                  group-focus-visible/footer-link:translate-x-0
                  group-focus-visible/footer-link:opacity-100
                "
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* =============================================================================
   Socials
============================================================================= */

function FooterSocials() {
  return (
    <nav aria-label="شبکه‌های اجتماعی DNH" className="mt-6">
      <p
        className="
          mb-3
          text-[9px]
          font-black
          text-white/38
        "
      >
        شبکه‌های اجتماعی
      </p>

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >
        {socialLinks.map((item) => {
          const configured = Boolean(item.href) && item.href !== "#";

          if (!configured) {
            return (
              <span
                key={item.platform}
                aria-disabled="true"
                title={`آدرس ${item.label} هنوز تنظیم نشده است`}
                className="
                  inline-flex
                  h-9
                  cursor-not-allowed
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-white/8

                  bg-white/[0.025]

                  px-3

                  text-[9px]
                  font-bold
                  text-white/25
                "
              >
                <SocialIcon platform={item.platform} />

                <span>{item.label}</span>
              </span>
            );
          }

          return (
            <a
              key={item.platform}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${item.label} DNH`}
              className="
                group/social
                inline-flex
                h-9
                items-center
                gap-2

                rounded-full

                border
                border-white/10

                bg-white/[0.035]

                px-3

                text-[9px]
                font-bold
                text-white/50

                outline-none

                transition-[transform,border-color,background-color,color]
                duration-300

                hover:-translate-y-px
                hover:border-white/20
                hover:bg-white/[0.07]
                hover:text-white

                focus-visible:ring-4
                focus-visible:ring-focus/25
              "
            >
              <SocialIcon platform={item.platform} />

              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

/* =============================================================================
   Background atmosphere
============================================================================= */

function FooterAtmosphere() {
  return (
    <>
      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.16]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* top line */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-[8%]
          top-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-brand-accent/70
          to-transparent
        "
      />

      {/* brand glow */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-28
          -top-36

          h-80
          w-80

          rounded-full

          bg-brand-primary/20

          blur-[110px]
        "
      />

      {/* accent glow */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-[12%]

          h-64
          w-64

          rounded-full

          bg-brand-accent/[0.08]

          blur-[100px]
        "
      />

      {/* architectural rings */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-36
          top-24

          h-[360px]
          w-[360px]

          rounded-full
          border
          border-white/[0.035]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-20
          top-40

          h-[250px]
          w-[250px]

          rounded-full
          border
          border-brand-accent/[0.08]
        "
      />
    </>
  );
}

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
      >
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle
          cx="12"
          cy="12"
          r="3.8"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="17.5" cy="6.7" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
      >
        <circle cx="6.2" cy="6.3" r="1.3" fill="currentColor" />
        <path
          d="M5 9.5V19M10 19V9.5M10 13.4C10.7 11 12.1 9.5 14.5 9.5C17.2 9.5 19 11.2 19 14.4V19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="M21 4L3.8 10.7C2.7 11.1 2.7 11.8 3.6 12.1L8 13.5L9.7 18.7C9.9 19.3 10.3 19.4 10.8 19L13.2 16.7L17.7 20C18.5 20.5 19.1 20.2 19.3 19.2L22 5.4C22.2 4.4 21.8 3.8 21 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13.5L18.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
