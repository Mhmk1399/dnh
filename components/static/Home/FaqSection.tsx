"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Minus, Plus } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

type FaqItem = {
  id: string;
  index: string;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    index: "01",
    question: "DNH دقیقاً چه کاری انجام می‌دهد؟",
    answer:
      "DNH با تمرکز بر معماری ثروت و مشاوره مالی راهبردی، به تصمیم‌گیران کمک می‌کند مسائل مالی مهم را به‌صورت ساختاریافته ببینند؛ یعنی داده، ریسک، سناریو و مسیر تصمیم در کنار هم بررسی شوند.",
  },
  {
    id: "faq-2",
    index: "02",
    question: "معماری ثروت چیست؟",
    answer:
      "معماری ثروت یعنی نگاه به ثروت فقط به‌عنوان مجموعه‌ای از دارایی‌ها نباشد، بلکه ساختار، هدف، ریسک، افق زمانی و نحوه تصمیم‌گیری نیز در یک تصویر منسجم دیده شود.",
  },
  {
    id: "faq-3",
    index: "03",
    question: "DNH چه تفاوتی با مشاور سرمایه‌گذاری دارد؟",
    answer:
      "در DNH تمرکز فقط بر یک ابزار یا یک پیشنهاد سرمایه‌گذاری نیست. رویکرد بر دیدن تصویر جامع‌تر از دارایی‌ها، ریسک‌ها، اهداف و محدودیت‌ها است تا مسیر تصمیم‌گیری منسجم‌تری شکل بگیرد.",
  },
  {
    id: "faq-4",
    index: "04",
    question: "آیا سود یا بازده تضمین می‌شود؟",
    answer:
      "خیر. هیچ بازده یا نتیجه‌ای به‌صورت تضمینی ارائه نمی‌شود. نقش DNH کمک به روشن‌تر شدن تصمیم، ساختاردهی تحلیل و ارتقای کیفیت قضاوت مالی است، نه وعده نتیجه قطعی.",
  },
  {
    id: "faq-5",
    index: "05",
    question: "اطلاعات مشتری چگونه محرمانه می‌ماند؟",
    answer:
      "محرمانگی اطلاعات یکی از اصول پایه همکاری است. جزئیات دسترسی، نحوه تبادل داده و سطح اطلاعات مورد نیاز، متناسب با ماهیت همکاری و با رعایت حدود حرفه‌ای تنظیم می‌شود.",
  },
  {
    id: "faq-6",
    index: "06",
    question: "آیا با شرکت‌ها و هلدینگ‌ها نیز همکاری می‌کنید؟",
    answer:
      "بله. دامنه همکاری می‌تواند علاوه بر اشخاص، شامل شرکت‌ها، هلدینگ‌ها و ساختارهای تصمیم‌گیری پیچیده نیز باشد؛ به‌ویژه در موضوعاتی که ساختار سرمایه، نقدینگی، ریسک یا مسیر تصمیم اهمیت بالایی دارد.",
  },
];

export function FaqSection() {
  const [activeId, setActiveId] = useState<string>(FAQ_ITEMS[2].id);

  return (
    <section
      dir="rtl"
      aria-labelledby="faq-section-title"
      className="
        relative
        isolate
        overflow-hidden
        border-y
        border-line
        bg-page
      "
    >
      <FaqBackground />

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
          2xl:px-20
        "
      >
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.82fr)]
            lg:items-start
            lg:gap-12
            xl:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.78fr)]
          "
        >
          {/* =====================================================
              RIGHT COLUMN — INTRO
          ====================================================== */}
          <aside
            className="
              order-1
              text-right
              lg:sticky
              lg:top-24
            "
          >
            <div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />
              <span
                className="
                  text-[10px]
                  font-black
                  tracking-[0.05em]
                  text-brand-primary
                  sm:text-[11px]
                "
              >
                پرسش‌های متداول
              </span>
            </div>

            <h2
              id="faq-section-title"
              className="
                max-w-[560px]
                text-[30px]
                font-black
                leading-[1.5]
                tracking-[-0.04em]
                text-ink
                sm:text-[38px]
                lg:text-[44px]
                xl:text-[50px]
              "
            >
              پیش از تصمیم،
              <br />
              پرسیدن سؤال درست
              <br />
              <span className="text-brand-primary">مهم است.</span>
            </h2>

            <p
              className="
                mt-5
                max-w-[520px]
                text-[13px]
                font-medium
                leading-[2.1]
                text-ink-muted
                sm:text-[14px]
                lg:text-[15px]
              "
            >
              در این بخش، مهم‌ترین پرسش‌هایی که معمولاً پیش از شروع همکاری مطرح
              می‌شوند، به‌صورت روشن و مستقیم مطرح شده‌اند تا مسیر ارزیابی اولیه
              یا ورود به گفت‌وگو شفاف‌تر باشد.
            </p>

            <div className="mt-7">
              <ActionButton
                href="/assessment"
                variant="primary"
                size="md"
                icon={ArrowLeft}
                className="
                  w-full
                  sm:w-auto
                  sm:min-w-[230px]
                "
              >
                ارزیابی اولیه تصمیم مالی
              </ActionButton>
            </div>

            {/* Desktop note */}
            <div
              className="
                mt-10
                hidden
                items-center
                justify-between
                gap-6
                border-t
                border-line
                pt-6
                lg:flex
              "
            >
              <span
                className="
                  text-[11px]
                  font-medium
                  text-ink-muted
                "
              >
                پاسخ روشن، بخشی از تصمیم روشن است.
              </span>

              <div
                dir="ltr"
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span className="h-10 w-px bg-line" />
                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.26em]
                    text-brand-primary/42
                  "
                >
                  Clarity
                  <br />
                  Before
                  <br />
                  Commitment
                </span>
              </div>
            </div>
          </aside>

          {/* =====================================================
              LEFT COLUMN — FAQ DESK
          ====================================================== */}
          <div className="order-2">
            <div
              className="
                overflow-hidden
                border
                border-line
                bg-white/65
                shadow-[0_20px_50px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]
                backdrop-blur-[4px]
              "
            >
              <div
                aria-label="پرسش‌های متداول"
                className="divide-y divide-line"
              >
                {FAQ_ITEMS.map((item) => {
                  const isActive = item.id === activeId;

                  return (
                    <div key={item.id} className="relative">
                      <button
                        id={`${item.id}-button`}
                        type="button"
                        aria-expanded={isActive}
                        aria-controls={`${item.id}-panel`}
                        onClick={() =>
                          setActiveId((current) =>
                            current === item.id ? "" : item.id,
                          )
                        }
                        className={`
                          group/faq
                          relative
                          flex
                          w-full
                          cursor-pointer
                          items-center
                          gap-4
                          px-4
                          py-4
                          text-right
                          outline-none
                          transition-[background-color,color,border-color]
                          duration-300
                          focus-visible:ring-4
                          focus-visible:ring-focus/20
                          sm:px-5
                          lg:px-6
                          ${
                            isActive
                              ? "bg-[color-mix(in_srgb,var(--dnh-primary)_4%,white)]"
                              : "bg-transparent hover:bg-[color-mix(in_srgb,var(--dnh-primary)_2%,white)]"
                          }
                        `}
                      >
                        {isActive ? (
                          <span
                            aria-hidden="true"
                            className="
                              absolute
                              inset-y-0
                              right-0
                              w-[2px]
                              bg-brand-accent
                            "
                          />
                        ) : null}

                        <span
                          dir="ltr"
                          className={`
                            shrink-0
                            text-[29px]
                            font-light
                            leading-none
                            sm:text-[34px]
                            ${
                              isActive
                                ? "text-brand-accent"
                                : "text-brand-primary/28"
                            }
                          `}
                        >
                          {item.index}
                        </span>

                        <span
                          className={`
                            min-w-0
                            flex-1
                            text-[13px]
                            font-black
                            leading-7
                            sm:text-[15px]
                            ${isActive ? "text-ink" : "text-ink/92"}
                          `}
                        >
                          {item.question}
                        </span>

                        <span
                          aria-hidden="true"
                          className={`
                            inline-flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            text-brand-primary
                            transition-transform
                            duration-300
                            ${
                              isActive
                                ? "text-brand-accent"
                                : "group-hover/faq:text-brand-primary"
                            }
                          `}
                        >
                          {isActive ? (
                            <Minus className="h-4 w-4" strokeWidth={2} />
                          ) : (
                            <Plus className="h-4 w-4" strokeWidth={2} />
                          )}
                        </span>
                      </button>

                      <div
                        id={`${item.id}-panel`}
                        role="region"
                        aria-labelledby={`${item.id}-button`}
                        aria-hidden={!isActive}
                        className={`
                          grid
                          transition-[grid-template-rows,opacity]
                          duration-[420ms]
                          ease-[cubic-bezier(.22,1,.36,1)]
                          motion-reduce:transition-none
                          ${
                            isActive
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }
                        `}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="
                              border-t
                              border-line
                              bg-[linear-gradient(180deg,color-mix(in_srgb,var(--dnh-primary)_2.5%,white),white)]
                              px-5
                              py-5
                              sm:px-6
                              sm:py-6
                              lg:px-7
                            "
                          >
                            <div
                              className="
                                mb-3
                                flex
                                items-center
                                gap-3
                              "
                            >
                              <span
                                aria-hidden="true"
                                className="
                                  h-2
                                  w-2
                                  bg-brand-accent
                                "
                              />

                              <span
                                className="
                                  text-[10px]
                                  font-black
                                  text-brand-primary/70
                                "
                              >
                                پاسخ
                              </span>
                            </div>

                            <p
                              className="
                                max-w-[720px]
                                text-[13px]
                                font-medium
                                leading-[2.15]
                                text-ink-muted
                                sm:text-[14px]
                                lg:text-[15px]
                              "
                            >
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="
                  border-t
                  border-line
                  px-5
                  py-5
                  sm:px-6
                  lg:px-7
                "
              >
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-4
                    border-t
                    border-line
                    pt-5
                  "
                >
                  <span
                    className="
                      text-[11px]
                      font-medium
                      text-ink-muted
                    "
                  >
                    اگر سؤال شما اینجا نیست، می‌توانید وارد ارزیابی اولیه شوید.
                  </span>

                  <Link
                    href="/faq"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[11px]
                      font-black
                      text-brand-primary
                      transition-colors
                      duration-200
                      hover:text-brand-accent
                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-focus/20
                    "
                  >
                    <span>مشاهده همه پرسش‌ها</span>
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile footer note */}
            <div
              className="
                mt-5
                border-t
                border-line
                pt-4
                lg:hidden
              "
            >
              <span
                className="
                  text-[11px]
                  font-medium
                  text-ink-muted
                "
              >
                پاسخ روشن، بخشی از تصمیم روشن است.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqBackground() {
  return (
    <>
      {/* base wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #ffffff 0%,
              color-mix(in srgb, var(--dnh-primary) 2%, white) 100%
            )
          `,
        }}
      />

      {/* subtle grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(in srgb, var(--dnh-primary) 4%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--dnh-primary) 3%, transparent) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "76px 76px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.18))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.18))",
        }}
      />

      {/* architectural hints */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-[82%]
          top-0
          hidden
          w-px
          bg-line
          lg:block
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-[85%]
          top-0
          hidden
          w-px
          bg-line/60
          lg:block
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-[84%]
          hidden
          h-[74%]
          w-[110px]
          translate-x-[-50%]
          lg:block
        "
      >
        <div
          className="
            absolute
            bottom-0
            right-0
            h-[78%]
            w-[52px]
            border
            border-brand-primary/20
            bg-brand-primary/[0.035]
          "
        />
        <div
          className="
            absolute
            bottom-0
            right-[42px]
            h-[46%]
            w-[34px]
            border
            border-brand-primary/14
            bg-brand-primary/[0.025]
          "
        />
        <span
          className="
            absolute
            left-[12px]
            top-[45%]
            h-2
            w-2
            bg-brand-accent
          "
        />
      </div>

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-brand-primary/25
          to-transparent
        "
      />
    </>
  );
}
