import { Layers3, ScanLine, ShieldCheck } from "lucide-react";

type AssetViewItem = {
  name: string;
  context: string;
  implication: string;
};

type WeeklyOutlookAssetViewSectionProps = {
  thesis: string;
  items: AssetViewItem[];
};

export function WeeklyOutlookAssetViewSection({
  thesis,
  items,
}: WeeklyOutlookAssetViewSectionProps) {
  return (
    <section
      id="weekly-outlook-asset-view"
      dir="rtl"
      aria-labelledby="weekly-outlook-asset-view-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#021f2a]
        text-white

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

            lg:grid-cols-[0.82fr_1.18fr]
            lg:items-end
            lg:gap-16
            lg:pt-12
          "
        >
          <div>
            <p
              className="
                mb-3

                text-[13px]
                font-black

                text-brand-accent
              "
            >
              نمای دارایی
            </p>

            <h2
              id="weekly-outlook-asset-view-title"
              className="
                max-w-[760px]
                [text-wrap:balance]

                text-[29px]
                font-black
                leading-[1.68]
                tracking-[-0.04em]

                text-white

                sm:text-[35px]

                lg:text-[40px]
                lg:leading-[1.55]
              "
            >
              وضعیت دارایی‌ها؛{" "}
              <span className="text-brand-accent">
                نه برای معامله، برای تصمیم.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[610px]

              text-[15px]
              font-medium
              leading-[2]

              text-white/56

              sm:text-[16px]
            "
          >
            شرایط هر دارایی در کنار ریسک‌های کلان بررسی می‌شود تا پیام آن برای
            تصمیم مالی روشن‌تر باشد.
          </p>
        </div>

        {/* ===========================================================
            THESIS
        ============================================================ */}

        <div
          className="
            mt-10

            grid
            gap-5

            border
            border-white/[0.11]

            bg-white/[0.02]

            px-5
            py-5

            sm:px-6

            lg:grid-cols-[180px_1fr]
            lg:items-center
            lg:gap-8
            lg:px-7
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                grid
                size-9
                place-items-center

                border
                border-white/10
              "
            >
              <ScanLine
                aria-hidden="true"
                strokeWidth={1.6}
                className="
                  size-[16px]

                  text-brand-accent
                "
              />
            </div>

            <span
              className="
                text-[13px]
                font-black

                text-white/62
              "
            >
              برداشت این هفته
            </span>
          </div>

          <p
            className="
              text-[16px]
              font-black
              leading-8

              text-white

              lg:border-r
              lg:border-white/[0.09]
              lg:pr-7

              sm:text-[17px]
            "
          >
            {thesis}
          </p>
        </div>

        {/* ===========================================================
            ASSET TABLE
        ============================================================ */}

        <div
          className="
            mt-5

            border
            border-white/[0.11]

            bg-[#052b37]/72
          "
        >
          {/* desktop header */}

          <div
            className="
              hidden

              grid-cols-[0.72fr_1.14fr_1.14fr]

              border-b
              border-white/[0.09]

              px-6
              py-3

              lg:grid
            "
          >
            <TableLabel>دارایی / حوزه</TableLabel>
            <TableLabel>شرایط قابل توجه</TableLabel>
            <TableLabel>پیام برای تصمیم</TableLabel>
          </div>

          <div>
            {items.map((item, index) => (
              <AssetRow
                key={`${item.name}-${index}`}
                index={index + 1}
                {...item}
              />
            ))}
          </div>

          {/* footer */}

          <div
            className="
              flex
              items-start
              gap-3

              border-t
              border-white/[0.09]

              bg-black/[0.07]

              px-5
              py-4

              sm:px-6
            "
          >
            <ShieldCheck
              aria-hidden="true"
              strokeWidth={1.6}
              className="
                mt-1

                size-[16px]

                shrink-0

                text-[#82cee4]/65
              "
            />

            <p
              className="
                text-[13px]
                font-bold
                leading-6

                text-white/44
              "
            >
              این بخش برای درک شرایط و پیامد راهبردی است؛ نه توصیه خرید یا فروش.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   ASSET ROW
============================================================================= */

function AssetRow({
  index,
  name,
  context,
  implication,
}: AssetViewItem & {
  index: number;
}) {
  return (
    <article
      className="
        group/asset
        relative

        grid
        gap-4

        border-b
        border-white/[0.075]

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-200

        hover:bg-white/[0.022]

        sm:px-6

        lg:grid-cols-[0.72fr_1.14fr_1.14fr]
        lg:items-start
        lg:gap-0
      "
    >
      {/* asset */}

      <div
        className="
          flex
          items-start
          gap-3

          lg:pl-6
        "
      >
        <span
          className="
            mt-[2px]

            text-[11px]
            font-black
            tabular-nums

            text-white/22
          "
        >
          {String(index).padStart(2, "0")}
        </span>

        <h3
          className="
            text-[16px]
            font-black
            leading-7

            text-white
          "
        >
          {name}
        </h3>
      </div>

      {/* context */}

      <div
        className="
          lg:border-r
          lg:border-white/[0.075]
          lg:px-6
        "
      >
        <p
          className="
            mb-1

            text-[11px]
            font-black

            text-white/30

            lg:hidden
          "
        >
          شرایط قابل توجه
        </p>

        <p
          className="
            text-[14px]
            font-medium
            leading-7

            text-white/56
          "
        >
          {context}
        </p>
      </div>

      {/* implication */}

      <div
        className="
          lg:border-r
          lg:border-white/[0.075]
          lg:pr-6
        "
      >
        <p
          className="
            mb-1

            text-[11px]
            font-black

            text-brand-accent/70

            lg:hidden
          "
        >
          پیام برای تصمیم
        </p>

        <p
          className="
            text-[14px]
            font-bold
            leading-7

            text-white/76
          "
        >
          {implication}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-brand-accent

          transition-transform
          duration-200

          group-hover/asset:scale-y-100
        "
      />
    </article>
  );
}

/* =============================================================================
   TABLE LABEL
============================================================================= */

function TableLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        text-[11px]
        font-black

        text-white/28
      "
    >
      {children}
    </span>
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
            "radial-gradient(circle at 78% 40%,rgba(22,115,148,.16),transparent 28%),linear-gradient(118deg,#021d27 0%,#022936 52%,#021e28 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.04]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "118px 118px",
        }}
      />
    </>
  );
}
