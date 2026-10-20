import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileSearch,
  LockKeyhole,
  Route,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteDirection } from "@/lib/site-language";
import type { ConsultationConfidentialityContent } from "./strategicConsultationTypes";

const STEP_ICONS: Record<
  ConsultationConfidentialityContent["steps"][number]["icon"],
  LucideIcon
> = {
  review: FileSearch,
  fit: Check,
  route: Route,
};

export function StrategicConsultationConfidentialitySection({
  content,
  direction,
}: {
  content: ConsultationConfidentialityContent;
  direction: SiteDirection;
}) {
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      aria-labelledby="consultation-confidentiality-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#f7f9f9]

        py-16

        sm:scroll-mt-28
        sm:py-20

        lg:py-20
      "
    >
      <SectionBackground />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          w-full
          max-w-[1536px]

          px-5
          sm:px-8
          lg:px-12
          xl:px-16
          2xl:px-20
        "
      >
        {/* ===========================================================
            HEADER
        ============================================================ */}

        <div
          className="
            grid
            gap-7

            pt-10

            lg:grid-cols-[0.76fr_1.24fr]
            lg:items-end
            lg:gap-16
            lg:pt-12
          "
        >
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
                  w-9
                  bg-[#fc8502]
                "
              />

              <p
                className="
                  text-[13px]
                  font-black
                  text-[#167394]
                "
              >
                {content.eyebrow}
              </p>
            </div>

            <h2
              id="consultation-confidentiality-title"
              className="
                max-w-[720px]

                text-[30px]
                font-black
                leading-[1.72]
                tracking-[-0.045em]

                text-[#10242c]

                sm:text-[36px]

                lg:text-[42px]
                lg:leading-[1.62]
              "
            >
              <HighlightedHeading
                text={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <p
            className="
              max-w-[610px]

              text-[15px]
              font-medium
              leading-[2]

              text-[#687a80]

              sm:text-[16px]
            "
          >
            {content.intro}
          </p>
        </div>

        {/* ===========================================================
            REVIEW REGISTER
        ============================================================ */}

        <div
          className="
            mt-10

            border
            border-[#167394]/13

            bg-white

            shadow-[0_24px_70px_rgba(3,55,70,.045)]

            lg:mt-12
          "
        >
          <div
            className="
              grid

              lg:grid-cols-3
            "
          >
            {content.steps.map((step, index) => (
              <NextStep
                key={step.id}
                {...step}
                icon={STEP_ICONS[step.icon]}
                last={index === content.steps.length - 1}
              />
            ))}
          </div>

          {/* =========================================================
              PRIVACY BOUNDARY
          ========================================================== */}

          <div
            className="
              relative

              border-t
              border-[#167394]/10

              bg-[#f8fbfb]

              px-5
              py-6

              sm:px-6

              lg:grid
              lg:grid-cols-[auto_1fr_auto]
              lg:items-center
              lg:gap-5
              lg:px-7
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-y-0
                start-0

                w-[3px]

                bg-[#fc8502]
              "
            />

            <span
              aria-hidden="true"
              className="
                grid
                size-10
                place-items-center

                border
                border-[#167394]/12

                bg-white

                text-[#167394]
              "
            >
              <LockKeyhole strokeWidth={1.6} className="size-[17px]" />
            </span>

            <div className="mt-4 lg:mt-0">
              <p
                className="
                  text-[14px]
                  font-black
                  text-[#31545e]
                "
              >
                {content.privacy.title}
              </p>

              <p
                className="
                  mt-1
                  max-w-[780px]

                  text-[13px]
                  font-medium
                  leading-6

                  text-[#718187]
                "
              >
                {content.privacy.description}
              </p>
            </div>

            <span
              className="
                mt-4
                inline-flex
                w-fit

                border
                border-[#167394]/10

                px-3
                py-2

                text-[12px]
                font-black
                text-[#167394]/55

                lg:mt-0
              "
            >
              {content.privacy.label}
            </span>
          </div>
        </div>

        {/* ===========================================================
            FINAL CTA
        ============================================================ */}

        <div
          className="
            mt-10

            grid
            gap-6

            border-t
            border-[#167394]/10

            pt-8

            lg:grid-cols-[1fr_auto]
            lg:items-center
          "
        >
          <div>
            <p
              className="
                text-[18px]
                font-black
                leading-8
                text-[#173b45]
              "
            >
              {content.final.title}
            </p>

            <p
              className="
                mt-2

                max-w-[620px]

                text-[14px]
                font-medium
                leading-7

                text-[#718187]
              "
            >
              {content.final.description}
            </p>
          </div>

          <div
            className="
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:flex-wrap
            "
          >
            {content.final.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant={cta.type === "primary" ? "assessment" : "secondary"}
                size="lg"
                icon={Arrow}
                className={
                  cta.type === "primary"
                    ? `
                  w-full bg-[#fc8502] text-white hover:-translate-y-0.5 hover:bg-[#ec7d01]
                  sm:w-auto sm:min-w-[235px]
                `
                    : `
                  w-full border-[#167394]/15 bg-transparent text-[#167394] shadow-none
                  hover:-translate-y-0.5 hover:border-[#167394]/30 hover:bg-[#167394]/[0.035]
                  sm:w-auto
                `
                }
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   NEXT STEP
============================================================================= */

function NextStep({
  number,
  icon: Icon,
  title,
  description,
  last,
}: Omit<ConsultationConfidentialityContent["steps"][number], "icon"> & {
  icon: LucideIcon;
  last: boolean;
}) {
  return (
    <article
      className={`
        group/step
        relative

        px-5
        py-6

        transition-colors
        duration-200

        hover:bg-[#fafcfc]

        sm:px-6

        lg:px-7
        lg:py-7

        ${
          last
            ? ""
            : "border-b border-[#167394]/[0.08] lg:border-b-0 lg:border-e lg:border-[#167394]/[0.08]"
        }
      `}
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-5
        "
      >
        <span
          aria-hidden="true"
          className="
            grid
            size-10
            place-items-center

            border
            border-[#167394]/10

            text-[#167394]

            transition-[border-color,color]
            duration-200

            group-hover/step:border-[#fc8502]/35
            group-hover/step:text-[#fc8502]
          "
        >
          <Icon strokeWidth={1.6} className="size-[17px]" />
        </span>
        <bdi
          dir="ltr"
          className="text-[9px] font-black tracking-[0.16em] text-[#167394]/45"
        >
          {number}
        </bdi>
      </div>

      <h3
        className="
          mt-5

          text-[16px]
          font-black
          leading-7

          text-[#173b45]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2

          text-[14px]
          font-medium
          leading-7

          text-[#718187]
        "
      >
        {description}
      </p>

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0

          h-[2px]

          origin-right
          scale-x-0

          bg-[#fc8502]

          transition-transform
          duration-200

          group-hover/step:scale-x-100
        "
      />
    </article>
  );
}

function HighlightedHeading({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  const index = text.indexOf(highlight);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-[#167394]">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

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
          background:
            "radial-gradient(circle at 83% 34%,rgba(22,115,148,.045),transparent 27%),linear-gradient(180deg,#f7f9f9 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.022]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(22,115,148,.20) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}
