import type { LucideIcon } from "lucide-react";

import {
  Activity,
  CircleDollarSign,
  Droplets,
  Eye,
  Landmark,
  Layers3,
} from "lucide-react";

type WatchType = "macro" | "currency" | "policy" | "liquidity" | "asset";

type WatchItem = {
  type: WatchType;
  title: string;
  watchFor: string;
  implication: string;
};

type WeeklyOutlookWatchSectionProps = {
  items: WatchItem[];
};

const WATCH_META: Record<
  WatchType,
  {
    icon: LucideIcon;
    label: string;
  }
> = {
  macro: {
    icon: Activity,
    label: "اقتصاد کلان",
  },
  currency: {
    icon: CircleDollarSign,
    label: "ارز",
  },
  policy: {
    icon: Landmark,
    label: "سیاست‌گذاری",
  },
  liquidity: {
    icon: Droplets,
    label: "نقدینگی",
  },
  asset: {
    icon: Layers3,
    label: "دارایی‌ها",
  },
};

export function WeeklyOutlookWatchSection({
  items,
}: WeeklyOutlookWatchSectionProps) {
  return (
    <section
      id="weekly-outlook-watch"
      dir="rtl"
      aria-labelledby="weekly-outlook-watch-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden
        bg-[#fafcfc]
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
            lg:grid-cols-[0.75fr_1.25fr]
            lg:items-end
            lg:gap-16
          "
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-[#fc8502]" />

              <p
                className="
                  text-[12px]
                  font-black
                  tracking-[0.02em]
                  text-[#167394]
                "
              >
                What to Watch
              </p>
            </div>

            <h2
              id="weekly-outlook-watch-title"
              className="
                max-w-[700px]
                text-[29px]
                font-black
                leading-[1.7]
                tracking-[-0.04em]
                text-[#10242c]
                sm:text-[35px]
                lg:text-[40px]
                lg:leading-[1.58]
              "
            >
              چه چیزهایی را{" "}
              <span className="text-[#167394]">باید زیر نظر داشت؟</span>
            </h2>
          </div>

          <p
            className="
              max-w-[620px]
              text-[15px]
              font-medium
              leading-[2]
              text-[#64767c]
              sm:text-[16px]
            "
          >
            متغیرهایی که تغییر آن‌ها می‌تواند زمینه تصمیم مالی را عوض کند.
          </p>
        </div>

        {/* ===========================================================
            WATCH REGISTER
        ============================================================ */}

        <div
          className="
            mt-10
            grid
            border
            border-[#167394]/14
            bg-white
            shadow-[0_20px_55px_rgba(3,55,70,.04)]
            lg:mt-12
            lg:grid-cols-[180px_1fr]
          "
        >
          {/* ---------------------------------------------------------
              INDEX RAIL
          ---------------------------------------------------------- */}

          <div
            className="
              relative
              hidden
              overflow-hidden
              bg-[#063746]
              px-6
              py-7
              text-white
              lg:flex
              lg:flex-col
              lg:justify-between
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-y-0
                right-0
                w-[3px]
                bg-[#fc8502]
              "
            />

            <div>
              <Eye
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-6 text-[#82cee4]"
              />

              <p
                className="
                  mt-6
                  text-[12px]
                  font-black
                  text-white/42
                "
              >
                WEEKLY
              </p>

              <p
                className="
                  mt-1
                  text-[18px]
                  font-black
                  text-white
                "
              >
                WATCH
              </p>
            </div>

            <div>
              <span
                className="
                  block
                  text-[54px]
                  font-black
                  leading-none
                  tracking-[-0.08em]
                  text-white/10
                "
              >
                04
              </span>

              <p
                className="
                  mt-3
                  text-[12px]
                  font-bold
                  leading-6
                  text-white/42
                "
              >
                متغیرهای مؤثر
                <br />
                بر تصمیم
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------
              REGISTER
          ---------------------------------------------------------- */}

          <div>
            <div
              className="
                flex
                items-center
                justify-between
                gap-5
                border-b
                border-[#167394]/10
                px-5
                py-4
                sm:px-6
                lg:px-7
              "
            >
              <div className="flex items-center gap-3">
                <Eye
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className="
                    size-[17px]
                    text-[#167394]
                    lg:hidden
                  "
                />

                <p
                  className="
                    text-[13px]
                    font-black
                    text-[#31545e]
                  "
                >
                  متغیرهای قابل رصد این هفته
                </p>
              </div>

              <span
                className="
                  text-[11px]
                  font-black
                  text-[#167394]/35
                "
              >
                WATCH REGISTER
              </span>
            </div>

            <div>
              {items.map((item, index) => (
                <WatchItemRow
                  key={`${item.type}-${item.title}-${index}`}
                  index={index + 1}
                  {...item}
                />
              ))}
            </div>

            {/* -------------------------------------------------------
                FOOT
            -------------------------------------------------------- */}

            <div
              className="
                flex
                items-start
                gap-3
                border-t
                border-[#167394]/10
                bg-[#f9fbfb]
                px-5
                py-4
                sm:px-6
                lg:px-7
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
                  text-[13px]
                  font-bold
                  leading-6
                  text-[#60737a]
                "
              >
                تغییر این متغیرها یعنی فرض‌های تصمیم باید دوباره بررسی شوند.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   WATCH ITEM
============================================================================= */

function WatchItemRow({
  index,
  type,
  title,
  watchFor,
  implication,
}: WatchItem & {
  index: number;
}) {
  const meta = WATCH_META[type];
  const Icon = meta.icon;

  return (
    <article
      className="
        group/watch
        relative
        grid
        gap-4
        border-b
        border-[#167394]/[0.085]
        px-5
        py-5
        last:border-b-0
        transition-colors
        duration-200
        hover:bg-[#fbfcfc]
        sm:px-6
        lg:grid-cols-[210px_1fr]
        lg:items-start
        lg:gap-8
        lg:px-7
        lg:py-6
      "
    >
      {/* -----------------------------------------------------------
          VARIABLE
      ------------------------------------------------------------ */}

      <div className="flex items-start gap-3">
        <div
          className="
            grid
            size-9
            shrink-0
            place-items-center
            border
            border-[#167394]/10
            bg-white
          "
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.6}
            className="
              size-[16px]
              text-[#167394]/65
              transition-colors
              duration-200
              group-hover/watch:text-[#fc8502]
            "
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span
              className="
                text-[10px]
                font-black
                tabular-nums
                text-[#167394]/32
              "
            >
              {String(index).padStart(2, "0")}
            </span>

            <span
              className="
                text-[11px]
                font-bold
                text-[#167394]/48
              "
            >
              {meta.label}
            </span>
          </div>

          <h3
            className="
              mt-1
              text-[16px]
              font-black
              leading-7
              text-[#173b45]
            "
          >
            {title}
          </h3>
        </div>
      </div>

      {/* -----------------------------------------------------------
          CONTENT
      ------------------------------------------------------------ */}

      <div
        className="
          grid
          gap-3
          lg:border-r
          lg:border-[#167394]/[0.08]
          lg:pr-7
        "
      >
        <p
          className="
            text-[15px]
            font-black
            leading-7
            text-[#31545e]
          "
        >
          {watchFor}
        </p>

        <div className="flex items-start gap-2.5">
          <span
            aria-hidden="true"
            className="
              mt-[11px]
              h-[5px]
              w-[5px]
              shrink-0
              bg-[#fc8502]
            "
          />

          <p
            className="
              text-[13px]
              font-medium
              leading-6
              text-[#718187]
            "
          >
            {implication}
          </p>
        </div>
      </div>

      {/* -----------------------------------------------------------
          HOVER MARKER
      ------------------------------------------------------------ */}

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
          group-hover/watch:scale-y-100
        "
      />
    </article>
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
          background: "linear-gradient(180deg,#fbfcfc 0%,#f7f9fa 100%)",
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
            "linear-gradient(to right,rgba(22,115,148,.22) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}
