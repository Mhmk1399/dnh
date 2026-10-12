import Link from "next/link";

import {
  ArrowLeft,
  BriefcaseBusiness,
  ClipboardCheck,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  Send,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/* =============================================================================
   TYPES
============================================================================= */

type ContactHeroProps = {
  phoneDisplay: string;
  phoneHref: string;

  whatsappDisplay: string;
  whatsappHref: string;

  email: string;

  address: string;
  googleMapsUrl: string;

  responseNote?: string;
};

type ContactChannelProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  action: string;
  href: string;
  external?: boolean;
  ltr?: boolean;
};

/* =============================================================================
   ROUTES
============================================================================= */

const CONTACT_ROUTES = [
  {
    number: "01",
    icon: Send,
    title: "ارسال پیام",
    description: "برای ارتباط عمومی یا مطرح کردن یک موضوع مشخص",
    href: "#contact-form",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "ارزیابی تصمیم مالی",
    description: "اگر با یک تصمیم یا مسئله مالی مشخص روبه‌رو هستید",
    href: "/financial-decision-assessment",
  },
  {
    number: "03",
    icon: BriefcaseBusiness,
    title: "مشاوره راهبردی",
    description: "برای موضوعاتی که به بررسی و گفت‌وگوی تخصصی نیاز دارند",
    href: "/request-strategic-consultation",
  },
] as const;

/* =============================================================================
   CONTACT HERO
============================================================================= */

export function ContactHero({
  phoneDisplay,
  phoneHref,
  whatsappDisplay,
  whatsappHref,
  email,
  address,
  googleMapsUrl,
  responseNote = "درخواست‌ها پس از بررسی اولیه از مسیر مناسب پیگیری می‌شوند.",
}: ContactHeroProps) {
  return (
    <section
      id="contact-intro"
      dir="rtl"
      aria-labelledby="contact-hero-title"
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden

        bg-[#021f2a]
        text-white
      "
    >
      <ContactBackground />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1536px]
          flex-col

          px-5
          pb-12
          pt-[112px]

          sm:px-8
          sm:pb-14
          sm:pt-[124px]

          lg:px-12
          lg:pb-14
          lg:pt-[118px]

          xl:px-16
          2xl:px-20
        "
      >


        {/* ===========================================================
            MAIN GRID
        ============================================================ */}

        <div
          className="
            grid
            flex-1
            gap-10

            pt-10

            lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]
            lg:items-stretch
            lg:gap-0
            lg:pt-12
            lg:[direction:ltr]
          "
        >
          {/* =========================================================
              LEFT — DIRECT CONTACT
          ========================================================== */}

          <aside
            dir="rtl"
            aria-label="راه‌های ارتباط مستقیم با DNH"
            className="
              relative
              order-2

              overflow-hidden

              border
              border-white/[0.1]

              bg-white/[0.025]

              lg:order-none
              lg:col-start-1
              lg:row-start-1
              lg:border-l-0
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0
                h-[3px]
                bg-[#fc8502]
              "
            />

            <div
              className="
                flex
                h-full
                flex-col

                px-5
                py-6

                sm:px-6
                sm:py-7

                lg:px-7
                lg:py-8

                xl:px-8
              "
            >
              {/* HEADER */}

              <div
                className="
                  border-b
                  border-white/[0.09]
                  pb-6
                "
              >
                <p
                  className="
                    text-[12px]
                    font-black
                    text-[#82cee4]/70
                  "
                >
                  راه‌های ارتباط مستقیم
                </p>

                <h2
                  className="
                    mt-2

                    text-[23px]
                    font-black
                    leading-[1.7]

                    text-white

                    sm:text-[25px]
                  "
                >
                  هر زمان مسیر مستقیم‌تری نیاز دارید.
                </h2>

                <p
                  className="
                    mt-3
                    max-w-[430px]

                    text-[14px]
                    font-medium
                    leading-7

                    text-white/45
                  "
                >
                  تماس، پیام، ایمیل یا هماهنگی مراجعه حضوری.
                </p>
              </div>

              {/* CHANNELS */}

              <div>
                <ContactChannel
                  icon={Phone}
                  label="تماس تلفنی"
                  value={phoneDisplay}
                  action="تماس"
                  href={`tel:${phoneHref}`}
                  ltr
                />

                <ContactChannel
                  icon={MessageCircleMore}
                  label="واتساپ"
                  value={whatsappDisplay}
                  action="شروع گفتگو"
                  href={whatsappHref}
                  external
                  ltr
                />

                <ContactChannel
                  icon={Mail}
                  label="ایمیل"
                  value={email}
                  action="ارسال ایمیل"
                  href={`mailto:${email}`}
                  ltr
                />

                <ContactChannel
                  icon={MapPin}
                  label="آدرس دفتر"
                  value={address}
                  action="مشاهده مسیر"
                  href={googleMapsUrl}
                  external
                />
              </div>

              {/* RESPONSE */}

              <div
                className="
                  mt-auto
                  border-t
                  border-white/[0.09]
                  pt-5
                "
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    aria-hidden="true"
                    strokeWidth={1.6}
                    className="
                      mt-[3px]
                      size-[17px]
                      shrink-0
                      text-[#82cee4]/65
                    "
                  />

                  <div>
                    <p
                      className="
                        text-[13px]
                        font-black
                        text-white/75
                      "
                    >
                      نحوه پاسخگویی
                    </p>

                    <p
                      className="
                        mt-1
                        text-[13px]
                        font-medium
                        leading-6
                        text-white/40
                      "
                    >
                      {responseNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* =========================================================
              RIGHT — PRIMARY CONTACT ROUTING
          ========================================================== */}

          <div
            dir="rtl"
            className="
              relative
              order-1

              flex
              items-center

              lg:order-none
              lg:col-start-2
              lg:row-start-1

              lg:border
              lg:border-white/[0.1]
            "
          >
            {/* subtle field */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0

                bg-[linear-gradient(115deg,rgba(255,255,255,.018),transparent_60%)]
              "
            />

            <div
              className="
                relative
                z-10
                w-full

                py-2

                lg:px-10
                lg:py-8

                xl:px-14
              "
            >
              {/* EYEBROW */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-px
                    w-9
                    bg-[#fc8502]
                  "
                />

                <p
                  className="
                    text-[13px]
                    font-black
                    text-[#82cee4]
                  "
                >
                  شروع ارتباط
                </p>
              </div>

              {/* TITLE */}

              <h1
                id="contact-hero-title"
                className="
                  mt-5
                  max-w-[800px]

                  text-[36px]
                  font-black
                  leading-[1.62]
                  tracking-[-0.05em]

                  text-white

                  sm:text-[44px]

                  lg:text-[50px]
                  lg:leading-[1.52]

                  xl:text-[57px]
                "
              >
                یک گفت‌وگوی روشن،
                <br />
                <span className="text-[#fc8502]">
                  از مسیر درست شروع می‌شود.
                </span>
              </h1>

              <p
                className="
                  mt-5
                  max-w-[650px]

                  text-[15px]
                  font-medium
                  leading-[2]

                  text-white/52

                  sm:text-[16px]
                "
              >
                بسته به موضوع، مسیر مناسب را انتخاب کنید تا درخواست شما از ابتدا
                در چارچوب درست بررسی شود.
              </p>

              {/* =====================================================
                  ROUTES
              ====================================================== */}

              <div
                className="
                  mt-9
                  border-y
                  border-white/[0.09]
                "
              >
                {CONTACT_ROUTES.map((route) => (
                  <ContactRoute key={route.number} {...route} />
                ))}
              </div>

              {/* FOOT NOTE */}

              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    mt-[11px]
                    h-[6px]
                    w-[6px]
                    shrink-0
                    bg-[#fc8502]
                  "
                />

                <p
                  className="
                    max-w-[600px]

                    text-[13px]
                    font-medium
                    leading-6

                    text-white/34
                  "
                >
                  اطلاعات اولیه صرفاً برای شناخت موضوع و هدایت درخواست به مسیر
                  مناسب استفاده می‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   CONTACT ROUTE
============================================================================= */

function ContactRoute({
  number,
  icon: Icon,
  title,
  description,
  href,
}: (typeof CONTACT_ROUTES)[number]) {
  return (
    <Link
      href={href}
      className="
        group/route
        relative

        grid
        gap-4

        border-b
        border-white/[0.075]

        py-5

        last:border-b-0

        outline-none

        transition-colors
        duration-200

        hover:bg-white/[0.022]

        focus-visible:bg-white/[0.03]
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-[#fc8502]/30

        sm:grid-cols-[44px_minmax(0,1fr)_42px]
        sm:items-center
        sm:gap-5
      "
    >
      {/* ICON */}

      <span
        aria-hidden="true"
        className="
          grid
          size-10
          place-items-center

          border
          border-white/[0.11]

          text-[#82cee4]/75

          transition-[border-color,color]
          duration-200

          group-hover/route:border-[#fc8502]/40
          group-hover/route:text-[#fc8502]
        "
      >
        <Icon strokeWidth={1.6} className="size-[17px]" />
      </span>

      {/* CONTENT */}

      <span className="min-w-0">
        <span
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              text-[12px]
              font-black
              tabular-nums
              text-white/24
            "
          >
            {number}
          </span>

          <span
            className="
              text-[16px]
              font-black
              text-white
            "
          >
            {title}
          </span>
        </span>

        <span
          className="
            mt-1
            block

            text-[14px]
            font-medium
            leading-7

            text-white/42
          "
        >
          {description}
        </span>
      </span>

      {/* ARROW */}

      <span
        className="
          hidden
          size-9
          place-items-center

          border
          border-white/[0.09]

          text-white/35

          transition-[border-color,color,transform]
          duration-200

          group-hover/route:-translate-x-1
          group-hover/route:border-[#fc8502]/35
          group-hover/route:text-[#fc8502]

          sm:grid
        "
      >
        <ArrowLeft
          aria-hidden="true"
          strokeWidth={1.7}
          className="size-[15px]"
        />
      </span>

      {/* ORANGE RAIL */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-[#fc8502]

          transition-transform
          duration-200

          group-hover/route:scale-y-100
        "
      />
    </Link>
  );
}

/* =============================================================================
   CONTACT CHANNEL
============================================================================= */

function ContactChannel({
  icon: Icon,
  label,
  value,
  action,
  href,
  external = false,
  ltr = false,
}: ContactChannelProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="
        group/channel
        relative

        grid
        gap-3

        border-b
        border-white/[0.075]

        py-5

        last:border-b-0

        outline-none

        transition-colors
        duration-200

        hover:bg-white/[0.025]

        focus-visible:bg-white/[0.035]
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-[#fc8502]/30

        sm:grid-cols-[40px_minmax(0,1fr)_auto]
        sm:items-center
        sm:gap-4
      "
    >
      {/* ICON */}

      <span
        aria-hidden="true"
        className="
          grid
          size-9
          place-items-center

          border
          border-white/[0.1]

          text-[#82cee4]/70

          transition-[border-color,color]
          duration-200

          group-hover/channel:border-[#fc8502]/40
          group-hover/channel:text-[#fc8502]
        "
      >
        <Icon strokeWidth={1.6} className="size-[16px]" />
      </span>

      {/* CONTENT */}

      <span className="min-w-0">
        <span
          className="
            block

            text-[13px]
            font-black

            text-white/75
          "
        >
          {label}
        </span>

        <span
          dir={ltr ? "ltr" : undefined}
          className={`
            mt-1
            block

            overflow-hidden
            text-ellipsis

            text-[14px]
            font-medium
            leading-6

            text-white/42

            transition-colors
            duration-200

            group-hover/channel:text-white/62

            ${ltr ? "text-right" : ""}
          `}
        >
          {value}
        </span>
      </span>

      {/* ACTION */}

      <span
        className="
          flex
          items-center
          gap-2

          pr-[54px]

          text-[12px]
          font-black

          text-white/30

          transition-colors
          duration-200

          group-hover/channel:text-[#fc8502]

          sm:pr-0
        "
      >
        {action}

        <ArrowLeft
          aria-hidden="true"
          strokeWidth={1.7}
          className="
            size-[14px]

            transition-transform
            duration-200

            group-hover/channel:-translate-x-1
          "
        />
      </span>

      {/* ACTIVE RAIL */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-[#fc8502]

          transition-transform
          duration-200

          group-hover/channel:scale-y-100
        "
      />
    </a>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ContactBackground() {
  return (
    <>
      {/* MAIN DARK FIELD */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background: `
            radial-gradient(
              circle at 76% 32%,
              rgba(22,115,148,.20),
              transparent 28%
            ),
            radial-gradient(
              circle at 18% 74%,
              rgba(22,115,148,.10),
              transparent 24%
            ),
            linear-gradient(
              118deg,
              #021d27 0%,
              #032f3e 46%,
              #022631 100%
            )
          `,
        }}
      />

      {/* ENGINEERING GRID */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.045]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,.055) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "112px 112px",
        }}
      />

      {/* HORIZONTAL REFERENCE */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-0
          top-[46%]

          hidden
          h-px
          w-[18%]

          bg-gradient-to-r
          from-transparent
          to-[#fc8502]/25

          lg:block
        "
      />

      {/* VERTICAL REFERENCE */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          bottom-0
          right-[14%]

          hidden
          h-[150px]
          w-px

          bg-gradient-to-t
          from-[#fc8502]/24
          to-transparent

          lg:block
        "
      />

      {/* REFERENCE POINT */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          bottom-[150px]
          right-[14%]

          hidden
          h-[11px]
          w-[11px]

          translate-x-1/2

          bg-[#fc8502]

          lg:block
        "
      />
    </>
  );
}
