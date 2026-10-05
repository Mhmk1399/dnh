import {
  ArrowLeft,
  Mail,
  MapPin,
  MessageCircleMore,
  Navigation,
  Phone,
  type LucideIcon,
} from "lucide-react";

type ContactHeroProps = {
  phoneDisplay: string;
  phoneHref: string;

  whatsappDisplay: string;
  whatsappHref: string;

  email: string;

  address: string;
  googleMapsUrl: string;

  cityLabel?: string;
};

type ContactItemProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  action: string;
  href: string;
  delay: number;
  external?: boolean;
  ltr?: boolean;
};

export function ContactHero({
  phoneDisplay,
  phoneHref,
  whatsappDisplay,
  whatsappHref,
  email,
  address,
  googleMapsUrl,
  cityLabel = "دفتر DNH",
}: ContactHeroProps) {
  return (
    <section
      dir="rtl"
      aria-labelledby="contact-hero-title"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#032d3b]
      "
      style={{
        minHeight: "100dvh",
      }}
    >
      <ContactBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          min-h-[100dvh]
          w-full
          max-w-[1536px]

          pt-[110px]

          lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
          lg:pt-0
        "
      >
        {/* =========================================================
            RIGHT — CONTACT
        ========================================================== */}

        <div
          className="
            order-1
            flex
            items-center

            px-5
            py-12

            sm:px-8
            sm:py-16

            lg:col-start-1
            lg:row-start-1
            lg:px-12
            lg:pb-16
            lg:pt-[130px]

            xl:px-16
          "
        >
          <div className="w-full max-w-[650px]">
            {/* Eyebrow */}
            <div
              className="
                dnh-contact-enter
                mb-5
                flex
                items-center
                gap-3
              "
              style={{
                animationDelay: "80ms",
              }}
            >
              <span className="h-px w-10 bg-brand-accent" />

              <span
                className="
                  text-[10px]
                  font-black
                  text-white/72

                  sm:text-[11px]
                "
              >
                ارتباط با DNH
              </span>
            </div>

            {/* Title */}
            <h1
              id="contact-hero-title"
              className="
                dnh-contact-enter

                max-w-[650px]

                text-[32px]
                font-black
                leading-[1.55]
                tracking-[-0.04em]

                text-white

                sm:text-[40px]

                lg:text-[46px]

                xl:text-[52px]
              "
              style={{
                animationDelay: "140ms",
              }}
            >
              برای شروع گفت‌وگو،
              <br />
              <span className="text-brand-accent">مسیر ارتباطی مناسب</span> را
              انتخاب کنید.
            </h1>

            {/* Description */}
            <p
              className="
                dnh-contact-enter

                mt-5
                max-w-[600px]

                text-[13px]
                font-medium
                leading-[2.15]

                text-white/64

                sm:text-[14px]

                lg:text-[15px]
              "
              style={{
                animationDelay: "210ms",
              }}
            >
              برای ارتباط مستقیم با DNH می‌توانید از تماس تلفنی، واتساپ، ایمیل
              یا موقعیت دفتر استفاده کنید. مسیر مناسب خود را انتخاب کنید تا
              ارتباط سریع‌تر و روشن‌تر آغاز شود.
            </p>

            {/* =====================================================
                Contact rows
            ====================================================== */}

            <div
              className="
                mt-8
                border-y
                border-white/12

                lg:mt-9
              "
            >
              <ContactItem
                icon={Phone}
                title="تماس تلفنی"
                value={phoneDisplay}
                action="تماس مستقیم"
                href={`tel:${phoneHref}`}
                delay={290}
                ltr
              />

              <ContactItem
                icon={MessageCircleMore}
                title="واتساپ"
                value={whatsappDisplay}
                action="شروع گفت‌وگو"
                href={whatsappHref}
                delay={360}
                external
                ltr
              />

              <ContactItem
                icon={Mail}
                title="ایمیل"
                value={email}
                action="ارسال ایمیل"
                href={`mailto:${email}`}
                delay={430}
                ltr
              />

              <ContactItem
                icon={MapPin}
                title="آدرس دفتر"
                value={address}
                action="مسیریابی"
                href={googleMapsUrl}
                delay={500}
                external
              />
            </div>
          </div>
        </div>

        {/* =========================================================
            LEFT — LOCATION
        ========================================================== */}

        <div
          className="
            dnh-contact-map

            order-2
            relative

            min-h-[440px]

            overflow-hidden

            border-t
            border-white/10

            bg-[#eff8fa]

            lg:col-start-2
            lg:row-start-1
            lg:min-h-[100dvh]
            lg:border-l
            lg:border-t-0
            lg:border-white/10
          "
        >
          <MapVisual />

          {/* Map header */}
          <div
            className="
              absolute
              left-5
              top-6
              z-20

              text-left

              lg:left-8
              lg:top-[130px]
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span className="h-8 w-px bg-brand-accent" />

              <div>
                <span
                  className="
                    block
                    text-[9px]
                    font-black
                    text-brand-primary
                  "
                >
                  موقعیت دفتر
                </span>

                <span
                  className="
                    mt-1
                    block
                    text-[8px]
                    font-medium
                    text-ink-muted
                  "
                >
                  مسیر ارتباط حضوری
                </span>
              </div>
            </div>
          </div>

          {/* Orange location point */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="باز کردن موقعیت دفتر DNH در گوگل مپ"
            className="
              dnh-contact-pin

              group/map-pin

              absolute
              left-[51%]
              top-[48%]
              z-20

              flex
              h-10
              w-10
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center

              bg-brand-accent

              text-white

              shadow-[0_12px_30px_color-mix(in_srgb,var(--dnh-accent)_34%,transparent)]

              outline-none

              transition-[transform,box-shadow]
              duration-300

              hover:-translate-y-[55%]
              hover:shadow-[0_16px_36px_color-mix(in_srgb,var(--dnh-accent)_42%,transparent)]

              focus-visible:ring-4
              focus-visible:ring-focus/30
            "
          >
            <MapPin
              className="
                h-[18px]
                w-[18px]

                transition-transform
                duration-300

                group-hover/map-pin:-translate-y-0.5
              "
              strokeWidth={1.8}
            />
          </a>

          {/* Office location footer */}
          <div
            className="
              absolute
              inset-x-5
              bottom-5
              z-20

              border
              border-white/15

              bg-[#043544]/95

              px-4
              py-4

              text-white

              shadow-[0_18px_44px_rgba(2,29,39,0.18)]

              backdrop-blur-[12px]

              sm:inset-x-8
              sm:px-5

              lg:bottom-8
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="min-w-0">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span className="h-2 w-2 bg-brand-accent" />

                  <span
                    className="
                      text-[11px]
                      font-black
                    "
                  >
                    {cityLabel}
                  </span>
                </div>

                <address
                  className="
                    mt-2
                    not-italic

                    text-[10px]
                    font-medium
                    leading-[1.9]

                    text-white/62

                    sm:text-[11px]
                  "
                >
                  {address}
                </address>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group/navigation

                  inline-flex
                  min-h-11
                  shrink-0
                  items-center
                  justify-center
                  gap-2

                  border-r
                  border-white/16

                  pr-4

                  text-[10px]
                  font-black

                  text-white

                  outline-none

                  transition-colors
                  duration-300

                  hover:text-brand-accent

                  focus-visible:ring-4
                  focus-visible:ring-focus/25

                  max-sm:border-r-0
                  max-sm:border-t
                  max-sm:border-white/12
                  max-sm:pt-3
                "
              >
                <Navigation
                  aria-hidden="true"
                  className="
                    h-4
                    w-4

                    text-brand-accent

                    transition-transform
                    duration-300

                    group-hover/navigation:-translate-x-0.5
                    group-hover/navigation:-translate-y-0.5
                  "
                  strokeWidth={1.7}
                />

                <span>مسیریابی در گوگل مپ</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================================================
          Lightweight animations
      ============================================================ */}

      <style>{`
        @keyframes dnhContactEnter {
          from {
            opacity: 0;
            transform: translate3d(-14px, 10px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes dnhContactMapEnter {
          from {
            opacity: 0;
            transform: translate3d(-16px, 0, 0) scale(.988);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes dnhContactPinEnter {
          from {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              scale(.65);
          }

          to {
            opacity: 1;
            transform:
              translate(-50%, -50%)
              scale(1);
          }
        }

        .dnh-contact-enter {
          opacity: 0;
          animation:
            dnhContactEnter
            640ms
            cubic-bezier(.22, 1, .36, 1)
            forwards;
        }

        .dnh-contact-map {
          opacity: 0;
          animation:
            dnhContactMapEnter
            820ms
            120ms
            cubic-bezier(.22, 1, .36, 1)
            forwards;
        }

        .dnh-contact-pin {
          opacity: 0;
          animation:
            dnhContactPinEnter
            480ms
            720ms
            cubic-bezier(.22, 1, .36, 1)
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .dnh-contact-enter,
          .dnh-contact-map,
          .dnh-contact-pin {
            opacity: 1;
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

/* =============================================================================
   CONTACT ITEM
============================================================================= */

function ContactItem({
  icon: Icon,
  title,
  value,
  action,
  href,
  delay,
  external = false,
  ltr = false,
}: ContactItemProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="
        dnh-contact-enter

        group/contact-row

        relative

        grid
        min-h-[78px]
        grid-cols-[44px_minmax(0,1fr)]
        items-center
        gap-3

        border-b
        border-white/10

        px-1
        py-3

        outline-none

        transition-[background-color,border-color]
        duration-300

        last:border-b-0

        hover:bg-white/[0.035]

        focus-visible:bg-white/[0.05]
        focus-visible:ring-4
        focus-visible:ring-focus/20

        sm:grid-cols-[46px_minmax(0,1fr)_125px]
        sm:gap-4
        sm:px-2
      "
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Icon */}
      <span
        aria-hidden="true"
        className="
          flex
          h-10
          w-10
          items-center
          justify-center

          border
          border-white/18

          text-white/80

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/contact-row:translate-x-[-2px]
          group-hover/contact-row:border-brand-primary
          group-hover/contact-row:bg-brand-primary
          group-hover/contact-row:text-white
        "
      >
        <Icon className="h-[17px] w-[17px]" strokeWidth={1.65} />
      </span>

      {/* Content */}
      <span className="min-w-0">
        <span
          className="
            block
            text-[11px]
            font-black
            text-white

            sm:text-[12px]
          "
        >
          {title}
        </span>

        <span
          dir={ltr ? "ltr" : undefined}
          className={`
            mt-1
            block

            text-[10px]
            font-medium
            leading-5

            text-white/52

            transition-colors
            duration-300

            group-hover/contact-row:text-white/72

            sm:text-[11px]

            ${ltr ? "text-right" : ""}
          `}
        >
          {value}
        </span>
      </span>

      {/* Action */}
      <span
        className="
          col-span-2

          flex
          items-center
          justify-between
          gap-3

          border-t
          border-white/8

          pt-3

          text-[10px]
          font-black

          text-white/62

          transition-colors
          duration-300

          group-hover/contact-row:text-brand-accent

          sm:col-span-1
          sm:border-r
          sm:border-t-0
          sm:border-white/12
          sm:pr-4
          sm:pt-0
        "
      >
        <span>{action}</span>

        <ArrowLeft
          aria-hidden="true"
          className="
            h-4
            w-4

            transition-transform
            duration-300

            group-hover/contact-row:-translate-x-1
          "
          strokeWidth={1.7}
        />
      </span>
    </a>
  );
}

/* =============================================================================
   MAP VISUAL
============================================================================= */

function MapVisual() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
        "
        style={{
          background: `
            linear-gradient(
              135deg,
              #f8fcfd 0%,
              #eaf6f8 48%,
              #f8fcfd 100%
            )
          `,
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 700 900"
        preserveAspectRatio="xMidYMid slice"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        fill="none"
      >
        {/* city blocks */}
        <g
          fill="var(--dnh-primary)"
          fillOpacity="0.055"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.08"
        >
          <rect x="40" y="80" width="140" height="110" />
          <rect x="210" y="50" width="120" height="180" />
          <rect x="370" y="90" width="190" height="130" />
          <rect x="580" y="30" width="90" height="170" />

          <rect x="30" y="260" width="200" height="140" />
          <rect x="270" y="270" width="100" height="190" />
          <rect x="405" y="250" width="230" height="150" />

          <rect x="65" y="460" width="130" height="190" />
          <rect x="220" y="500" width="220" height="120" />
          <rect x="490" y="445" width="150" height="210" />

          <rect x="20" y="690" width="230" height="150" />
          <rect x="290" y="675" width="130" height="180" />
          <rect x="465" y="700" width="200" height="120" />
        </g>

        {/* primary roads */}
        <path
          d="M-30 200L730 610"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.18"
          strokeWidth="2"
        />

        <path
          d="M80 -20L560 920"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.14"
          strokeWidth="2"
        />

        <path
          d="M-20 560L730 170"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.17"
          strokeWidth="2"
        />

        {/* secondary roads */}
        <g stroke="var(--dnh-primary)" strokeOpacity="0.07">
          <path d="M0 330H700" />
          <path d="M0 480H700" />
          <path d="M0 720H700" />

          <path d="M170 0V900" />
          <path d="M355 0V900" />
          <path d="M545 0V900" />
        </g>

        {/* orange axis */}
        <path d="M0 470H700" stroke="var(--dnh-accent)" strokeOpacity="0.45" />

        <path d="M350 0V900" stroke="var(--dnh-accent)" strokeOpacity="0.28" />
      </svg>

      {/* subtle atmosphere */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0

          bg-[linear-gradient(180deg,transparent_0%,transparent_65%,rgba(255,255,255,.42)_100%)]
        "
      />
    </>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ContactBackground() {
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
              #043746 0%,
              #032e3d 52%,
              #022732 100%
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

          opacity-[0.11]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,.09) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,.06) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "86px 86px",
        }}
      />
    </>
  );
}
