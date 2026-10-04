import { getImageProps } from "next/image";
import {
  ArrowLeft,
  ChartNoAxesCombined,
  Layers3,
  UserRoundCheck,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const HERO_DESKTOP = "/assets/images/dnh-hero-desktop.png";
const HERO_MOBILE = "/assets/images/dnh-hero-mobile.png";

export function HomeHero() {
  return (
    <section
      id="home"
      aria-labelledby="home-hero-title"
      className="
        relative
        isolate
        h-dvh
        overflow-hidden
        bg-brand-secondary
      "
    >
      <HeroBackground />

      {/* Desktop overlay */}


      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[1]
          lg:hidden
        "
        style={{
          background: `
            linear-gradient(
              180deg,
              color-mix(in srgb, var(--dnh-secondary) 5%, transparent) 0%,
              color-mix(in srgb, var(--dnh-secondary) 8%, transparent) 42%,
              color-mix(in srgb, var(--dnh-secondary) 65%, transparent) 68%,
              color-mix(in srgb, var(--dnh-secondary) 96%, transparent) 100%
            )
          `,
        }}
      />

      {/* Bottom depth */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          z-[1]
          h-[30%]
          bg-gradient-to-t
          from-brand-secondary/55
          via-brand-secondary/15
          to-transparent
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto

          flex
          h-full
          min-h-0
          w-full
          max-w-[1536px]

          items-end

          px-5
          pb-8
          pt-28

          sm:px-8
          sm:pb-10
          sm:pt-32

          lg:items-center
          lg:px-12
          lg:pb-0
          lg:pt-[96px]

          xl:px-16
          2xl:px-20
        "
      >
        <div
          dir="rtl"
          className="
            mr-0
            ml-auto
            w-full
            text-right

            sm:max-w-[620px]
            lg:max-w-[680px]
            xl:max-w-[730px]
          "
        >
          {/* Eyebrow */}
          <div
            className="
              mb-4
              flex
              items-center
              justify-start
              gap-3

              sm:mb-5
              lg:mb-6
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-9
                bg-brand-accent
                sm:w-11
              "
            />

            <span
              dir="rtl"
              className="
                text-[10px]
                font-semibold
                text-[var(--dnh-text-on-brand)]

               "
            >
              مشاوره مالی راهبردی
            </span>
          </div>

          {/* Main title */}
          <h1
            id="home-hero-title"
            className="
              max-w-[730px]
              font-black
              leading-[1.45]
              tracking-[-0.035em]
              text-2xl
              text-[var(--dnh-text-on-brand)]
              lg:text-4xl
            "
          >
            تصمیم‌های مالی مهم،
            <br />
            به یک <span className="text-brand-accent">تصویر کامل‌تر</span> نیاز
            دارند.
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-[570px]

              text-[13px]
              font-medium
              leading-[2]

              text-[color-mix(in_srgb,var(--dnh-text-on-brand)_78%,transparent)]

              sm:text-[14px]

              lg:mt-6
              lg:text-[15px]
              lg:leading-[2.1]
            "
          >
            تبدیل داده، ریسک، سناریو و ساختار مالی به یک تصمیم روشن، ساختاریافته
            و قابل‌دفاع.
          </p>

          {/* Actions */}
          <div
            className="
              mt-7
              flex
              w-full
              flex-col
              gap-3

              sm:w-auto
              sm:flex-row
              sm:flex-wrap
              sm:items-center

              lg:mt-9
            "
          >
            <ActionButton
              href="/assessment"
              variant="assessment"
              size="md"
              icon={ArrowLeft}
              className="
                w-full
                sm:w-auto
                sm:min-w-[245px]
              "
            >
              ارزیابی اولیه تصمیم مالی
            </ActionButton>

            <ActionButton
              href="/consultation"
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                border-[color-mix(in_srgb,var(--dnh-text-on-brand)_28%,transparent)]

                bg-[color-mix(in_srgb,var(--dnh-text-on-brand)_8%,transparent)]

                text-[var(--dnh-text-on-brand)]

                shadow-none

                backdrop-blur-[8px]

                hover:border-[color-mix(in_srgb,var(--dnh-text-on-brand)_55%,transparent)]

                hover:bg-[color-mix(in_srgb,var(--dnh-text-on-brand)_13%,transparent)]

                hover:text-[var(--dnh-text-on-brand)]

                sm:w-auto
                sm:min-w-[220px]
              "
            >
              درخواست مشاوره راهبردی
            </ActionButton>
          </div>

          {/* Roles */}
          <div
            className="
              mt-8
              hidden

              border-t
              border-[color-mix(in_srgb,var(--dnh-text-on-brand)_16%,transparent)]

              pt-5

              sm:flex
              sm:flex-wrap
              sm:items-center
              sm:gap-x-5
              sm:gap-y-3

              lg:mt-10
              lg:pt-6
            "
          >
            <ProfessionalRole
              icon={UserRoundCheck}
              label="معمار ثروت خصوصی"
            />

            <ProfessionalRole
              icon={ChartNoAxesCombined}
              label="مشاور مالی راهبردی"
            />

            <ProfessionalRole
              icon={Layers3}
              label="بنیان‌گذار چارچوب دی‌ان‌اچ"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  const commonProps = {
    alt: "دکتر نسیم محمدحسنی، بنیان‌گذار دی‌ان‌اچ",
    sizes: "100vw",
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonProps,
    src: HERO_DESKTOP,
    width: 2400,
    height: 1350,
    quality: 90,
  });

  const { props: mobileProps } = getImageProps({
    ...commonProps,
    src: HERO_MOBILE,
    width: 1080,
    height: 1920,
    quality: 88,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <picture
      className="
        absolute
        inset-0
        block
        h-full
        w-full
      "
    >
      <source
        media="(min-width: 1024px)"
        srcSet={desktopSrcSet}
        sizes="100vw"
      />

      <img
        {...mobileProps}
        alt=""
        className="
          h-full
          w-full
          object-cover
          object-center
        "
      />
    </picture>
  );
}

function ProfessionalRole({
  icon: Icon,
  label,
}: {
  icon: typeof UserRoundCheck;
  label: string;
}) {
  return (
    <div
      dir="rtl"
      className="
        flex
        items-center
        gap-2
        text-[10px]
        font-medium
        text-[color-mix(in_srgb,var(--dnh-text-on-brand)_76%,transparent)]
        lg:text-[11px]
      "
    >
      <Icon
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 text-[var(--dnh-text-on-brand)]"
        strokeWidth={1.6}
      />

      <span>{label}</span>
    </div>
  );
}
