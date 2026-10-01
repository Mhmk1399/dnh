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
      className="relative mt-20 px-2 pb-2 sm:mt-24 sm:px-3 sm:pb-3"
    >
      <div
        className="
          relative
          isolate
          mx-auto
          max-w-[1480px]
          overflow-hidden
          rounded-[24px]
          border
          border-line
          bg-page/[0.82]
          shadow-[0_18px_60px_color-mix(in_srgb,var(--dnh-primary)_12%,transparent)]
          backdrop-blur-[28px]
          backdrop-saturate-[150%]
          sm:rounded-[28px]
        "
      >
        <FooterAtmosphere />

        <div className="relative z-10">
          <div
            className="
              flex
              flex-col
              gap-5
              border-b
              border-line
              px-5
              py-5
              sm:px-7
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:px-9
              lg:py-6
              bg-surface-soft/30
            "
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  aria-label="DNH - صفحه اصلی"
                  className="
                    flex
                    shrink-0
                    items-center
                    rounded-xl
                    outline-none
                    focus-visible:ring-2
                    focus-visible:ring-focus/30
                  "
                >
                  <Image
                    src="/assets/images/LOGO.svg"
                    alt="DNH"
                    width={156}
                    height={42}
                    sizes="156px"
                    className="h-9 w-auto object-contain sm:h-10"
                  />
                </Link>

                <span
                  aria-hidden="true"
                  className="hidden h-9 w-px bg-line sm:block"
                />

                <p
                  className="
                    hidden
                    max-w-[390px]
                    text-[11px]
                    font-semibold
                    leading-7
                    text-ink-muted
                    sm:block
                  "
                >
                  معماری ثروت و هوشمندی مالی برای تصمیم‌های بزرگ و ماندگار.
                </p>
              </div>

              <FooterSocials />
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              <ActionButton
                href="/request-strategic-consultation"
                variant="primary"
                size="sm"
                icon={ArrowLeft}
                iconPosition="end"
                className="w-full sm:min-w-[205px]"
              >
                درخواست مشاوره راهبردی
              </ActionButton>

              <ActionButton
                href="/financial-decision-assessment"
                variant="secondary"
                size="sm"
                icon={CircleDollarSign}
                iconPosition="start"
                className="w-full sm:min-w-[175px]"
              >
                ارزیابی تصمیم مالی
              </ActionButton>
            </div>
          </div>

          <nav
            aria-label="دسترسی سریع پاورقی"
            className="
              grid
              grid-cols-2
              gap-x-5
              gap-y-8
              px-5
              py-7
              sm:px-7
              md:grid-cols-4
              lg:px-9
              lg:py-8
            "
          >
            {footerGroups.map((group) => (
              <FooterGroup key={group.title} group={group} />
            ))}
          </nav>

          <div
            className="
              flex
              flex-col
              gap-4
              border-t
              border-line
              px-5
              py-4
              text-[9px]
              font-semibold
              text-ink-muted
              sm:px-7
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:px-9
              bg-surface-soft/25
            "
          >
            <p dir="ltr" className="text-right lg:text-left">
              © {year} DNH. All rights reserved.
            </p>

            <nav aria-label="لینک‌های حقوقی">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        outline-none
                        transition-colors
                        duration-200
                        hover:text-brand-primary
                        focus-visible:text-brand-primary
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
      </div>
    </footer>
  );
}

function FooterGroup({ group }: { group: FooterGroup }) {
  return (
    <section
      aria-labelledby={`footer-${group.id}`}
      className="
        rounded-[20px]
        border
        border-transparent
        bg-page/35
        p-3
        transition-[border-color,background-color]
        duration-300
        hover:border-line
        hover:bg-page/75
      "
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-brand-accent"
        />

        <h2
          id={`footer-${group.id}`}
          className="text-[11px] font-black text-ink"
        >
          {group.title}
        </h2>
      </div>

      <ul className="space-y-0.5">
        {group.links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="
                group/link
                inline-flex
                items-center
                gap-1.5
                py-1.5
                text-[10px]
                font-semibold
                leading-5
                text-ink-muted
                outline-none
                transition-colors
                duration-200
                hover:text-brand-primary
                focus-visible:text-brand-primary
              "
            >
              <span>{item.label}</span>

              <ArrowLeft
                aria-hidden="true"
                strokeWidth={1.8}
                className="
                  h-3
                  w-3
                  translate-x-1
                  opacity-0
                  transition-all
                  duration-200
                  group-hover/link:translate-x-0
                  group-hover/link:opacity-100
                  group-focus-visible/link:translate-x-0
                  group-focus-visible/link:opacity-100
                "
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FooterSocials() {
  return (
    <nav aria-label="شبکه‌های اجتماعی DNH">
      <div className="flex flex-wrap items-center gap-2">
        <span className="ml-1 text-[9px] font-black text-ink-muted">
          شبکه‌های اجتماعی
        </span>

        {socialLinks.map((item) =>
          item.href ? (
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
                border-line
                bg-page/80
                px-3
                text-[9px]
                font-bold
                text-ink-muted
                outline-none
                transition-[transform,border-color,background-color,color,box-shadow]
                duration-300
                hover:-translate-y-px
                hover:border-line-strong/30
                hover:bg-page
                hover:text-brand-primary
                hover:shadow-[0_8px_20px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]
                focus-visible:ring-2
                focus-visible:ring-focus/30
              "
            >
              <SocialIcon platform={item.platform} />
              <span>{item.label}</span>
            </a>
          ) : (
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
                border-line
                bg-page/45
                px-3
                text-[9px]
                font-bold
                text-ink-muted/55
              "
            >
              <SocialIcon platform={item.platform} />
              <span>{item.label}</span>
            </span>
          ),
        )}
      </div>
    </nav>
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

function FooterAtmosphere() {
  return (
    <>
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-[10%]
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-page
          to-transparent
          opacity-80
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-brand-primary/[0.07]
          blur-[80px]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-28
          left-[10%]
          h-56
          w-56
          rounded-full
          bg-brand-accent/[0.055]
          blur-[75px]
        "
      />
    </>
  );
}
