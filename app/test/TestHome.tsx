"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  Gem,
  Landmark,
  LineChart,
  Network,
  PieChart,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./test.module.css";

const services = [
  ["استراتژی ثروت خصوصی", "ساختن تصویری منسجم از ثروت، اهداف، نقدشوندگی و ریسک‌ها.", Gem, "۰۱"],
  ["هوشمندی پرتفوی", "ارزیابی ساختار پرتفوی، تمرکز ریسک و حوزه‌های نیازمند بازبینی.", PieChart, "۰۲"],
  ["مشاوره مالی راهبردی", "پیوند سرمایه، نقدینگی و آینده کسب‌وکار در یک ساختار تصمیم.", BriefcaseBusiness, "۰۳"],
  ["مشاوره اقتصاد و بازار", "تحلیل شرایط اقتصادی و پیامدهای راهبردی آن‌ها برای تصمیم‌گیرندگان.", TrendingUp, "۰۴"],
  ["مدیریت ریسک و حفاظت", "شناخت نقاط آسیب‌پذیر در ثروت، سرمایه و ساختار مالی.", ShieldCheck, "۰۵"],
  ["نشست‌های مدیران", "بررسی متمرکز مسئله، سناریوها و مسیرهای قابل بررسی.", Building2, "۰۶"],
] as const;

const problems = [
  "در آستانه یک تصمیم مالی مهم هستید",
  "دارایی‌های مختلف دارید، اما تصویر یکپارچه‌ای ندارید",
  "تصمیم‌هایتان تحت تأثیر تورم، ارز و اخبار تغییر می‌کند",
  "بخشی از سرمایه شما متمرکز یا کم‌نقدشونده است",
  "در کسب‌وکار با مسئله سرمایه، نقدینگی یا تأمین مالی روبه‌رو هستید",
  "در سطح مدیریت یا هیئت‌مدیره به تحلیل سناریوها نیاز دارید",
];

const audiences = [
  ["یک تصمیم مالی بزرگ", "پیش از تخصیص سرمایه، خرید یا فروش دارایی، ریسک‌ها و محدودیت‌ها را یکجا ببینید.", Target],
  ["پرتفوی بدون معماری", "نقش هر دارایی را با اهداف، ریسک‌پذیری و نیازهای واقعی خود هماهنگ کنید.", WalletCards],
  ["ساختار مالی پیچیده", "برای هلدینگ یا کسب‌وکاری که سرمایه و نقدینگی در آن به‌هم وابسته‌اند.", Building2],
] as const;

const framework = [
  ["D", "هوشمندی داده", "Data Intelligence", "متغیرهای اقتصادی، دارایی‌ها، نقدینگی و شرایط اختصاصی شما را در یک تصویر قرار می‌دهیم."],
  ["N", "راهبرد هدایت تصمیم", "Navigation Strategy", "داده را به سناریوهای قابل بررسی با اولویت‌ها، محدودیت‌ها و ریسک‌های روشن تبدیل می‌کنیم."],
  ["H", "معماری افق", "Horizon Architecture", "تصمیم امروز را با اهداف بلندمدت، تاب‌آوری و ساختار کلی ثروت هماهنگ می‌کنیم."],
] as const;

const assets = ["طلا", "ارز", "سهام", "املاک", "درآمد ثابت", "نقدینگی", "دارایی جایگزین"];

const intelligence = [
  ["نمای ریسک کلان", "Macro Risk View", BarChart3],
  ["نمای دارایی‌ها", "Asset View", PieChart],
  ["نمای نقدینگی", "Liquidity View", CircleDollarSign],
  ["چه چیزهایی را باید دید؟", "What to Watch", Target],
  ["پیامدهای راهبردی", "Strategic Implications", Network],
] as const;

const insights = [
  "معماری ثروت",
  "تصمیم‌سازی مالی",
  "ریسک و حفاظت از ثروت",
  "تخصیص دارایی",
  "اقتصاد، تورم و ارز",
  "مالی رفتاری",
];

function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link className={`${styles.arrowLink} ${light ? styles.arrowLinkLight : ""}`} href={href}>
      <span>{children}</span><ArrowLeft aria-hidden="true" size={18} />
    </Link>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ""}`}><span />{children}</p>;
}

function HeroInstrument() {
  return (
    <div className={styles.heroInstrument} aria-hidden="true" data-financial-object>
      <div className={styles.instrumentHalo} data-orbit />
      <div className={styles.instrumentRing} data-orbit-reverse>
        <i /><i /><i /><i />
      </div>
      <div className={styles.instrumentCore}>
        <span>DNH</span><small>WEALTH ARCHITECTURE</small>
      </div>
      <div className={styles.instrumentNeedle} data-needle />
      <div className={`${styles.instrumentTag} ${styles.tagRisk}`}><small>RISK</small><b>۰.۲۸</b></div>
      <div className={`${styles.instrumentTag} ${styles.tagLiquidity}`}><small>LIQUIDITY</small><b>۷۲٪</b></div>
      <div className={`${styles.instrumentTag} ${styles.tagHorizon}`}><small>HORIZON</small><b>LONG</b></div>
      <svg className={styles.heroTrace} viewBox="0 0 560 260" preserveAspectRatio="none">
        <path data-draw d="M8 218 C80 210 92 155 151 168 S225 112 278 132 S350 58 407 83 S478 30 552 38" />
        <path className={styles.traceGhost} d="M8 228 C80 220 92 165 151 178 S225 122 278 142 S350 68 407 93 S478 40 552 48" />
      </svg>
    </div>
  );
}

function FinancialGlyph({ index }: { index: number }) {
  const variants = [
    <><circle cx="60" cy="60" r="38"/><circle cx="60" cy="60" r="20"/><path d="M60 9v102M9 60h102"/></>,
    <><path d="M12 92L38 55l22 17 42-51"/><path d="M12 103h96M22 103V76m27 27V66m27 37V47m26 56V22"/></>,
    <><path d="M15 28h28v28H15zM77 28h28v28H77zM46 77h28v28H46z"/><path d="M43 42h34M60 56v21"/></>,
    <><circle cx="60" cy="60" r="45"/><path d="M60 15v45l31 30M60 60L28 80"/><circle cx="60" cy="60" r="5"/></>,
    <><path d="M60 10l45 19v29c0 25-18 44-45 53-27-9-45-28-45-53V29z"/><path d="M38 61l14 14 31-34"/></>,
    <><path d="M16 95h88M25 95V51h70v44M37 51V31h46v20"/><path d="M45 66h30M45 78h30"/></>,
  ];
  return <svg className={styles.financialGlyph} viewBox="0 0 120 120" aria-hidden="true">{variants[index]}</svg>;
}

function DiagnosticRadar() {
  return (
    <div className={styles.diagnosticRadar} aria-hidden="true" data-financial-object>
      <svg viewBox="0 0 440 440">
        <circle cx="220" cy="220" r="190"/><circle cx="220" cy="220" r="140"/><circle cx="220" cy="220" r="88"/>
        <path d="M220 30v380M30 220h380M86 86l268 268M354 86L86 354"/>
        <path className={styles.radarShape} d="M220 74L342 151 310 293 206 355 94 265 131 133z"/>
        <line className={styles.radarSweep} x1="220" y1="220" x2="220" y2="30" />
      </svg>
      <span style={{"--x":"51%","--y":"13%"} as React.CSSProperties}>ریسک</span>
      <span style={{"--x":"87%","--y":"48%"} as React.CSSProperties}>نقدشوندگی</span>
      <span style={{"--x":"55%","--y":"88%"} as React.CSSProperties}>افق</span>
      <span style={{"--x":"5%","--y":"52%"} as React.CSSProperties}>سرمایه</span>
    </div>
  );
}

function AudienceObject({ index }: { index: number }) {
  return <div className={styles.audienceObject} aria-hidden="true">
    <span className={styles.objectAxis}/><span className={styles.objectAxis}/>
    <i/><i/><i/>
    <b>{index === 0 ? "DECISION" : index === 1 ? "PORTFOLIO" : "CAPITAL"}</b>
    <small>{index === 0 ? "01 / SCENARIOS" : index === 1 ? "07 / ASSETS" : "03 / LAYERS"}</small>
  </div>;
}

function DecisionEngine() {
  return <div className={styles.decisionEngine} aria-hidden="true" data-financial-object>
    <div className={styles.engineNoise}><i/><i/><i/><i/><i/></div>
    <div className={styles.engineCore}><Network size={34}/><span>DNH</span></div>
    <div className={styles.engineStructure}><i/><i/><i/><i/></div>
    <svg viewBox="0 0 700 220"><path data-draw d="M15 30C190 30 180 110 320 110S480 190 685 190"/><path data-draw d="M15 110H685"/><path data-draw d="M15 190C190 190 180 110 320 110S480 30 685 30"/></svg>
  </div>;
}

export function TestHome() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !root.current) return;

    const context = gsap.context(() => {
      gsap.from(`.${styles.heroCopy} > *`, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.11,
        ease: "power3.out",
      });

      gsap.from(`.${styles.heroInstrument}`, { opacity: 0, scale: 0.82, rotate: -8, duration: 1.5, delay: 0.25, ease: "expo.out" });
      gsap.to("[data-orbit]", { rotate: 360, duration: 30, repeat: -1, ease: "none" });
      gsap.to("[data-orbit-reverse]", { rotate: -360, duration: 42, repeat: -1, ease: "none" });
      gsap.to("[data-needle]", { rotate: 38, duration: 2.1, delay: .5, ease: "elastic.out(1, .5)" });

      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: path, start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>("[data-financial-object]").forEach((object) => {
        gsap.to(object, { yPercent: -7, ease: "none", scrollTrigger: { trigger: object.parentElement, start: "top bottom", end: "bottom top", scrub: .8 } });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 24,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      const frameworkCards = gsap.utils.toArray<HTMLElement>("[data-framework-card]");
      if (window.matchMedia("(min-width: 1024px)").matches) {
        gsap.timeline({
          scrollTrigger: {
            trigger: `.${styles.frameworkStage}`,
            start: "top top",
            end: "+=1500",
            scrub: 0.7,
            pin: true,
          },
        }).fromTo(frameworkCards, { opacity: 0.22, y: 38 }, { opacity: 1, y: 0, stagger: 0.5, ease: "none" });
      }

      gsap.to(`.${styles.assetOrbit}`, {
        rotate: 12,
        scrollTrigger: { trigger: `.${styles.wealthVisual}`, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={root} className={styles.page} dir="rtl">
      <section className={styles.hero} aria-labelledby="test-hero-title">
        <Image className={styles.heroImage} src="/assets/images/dnh-hero-desktop.png" alt="دکتر نسیم محمدحسنی، بنیان‌گذار DNH" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <Eyebrow light>معماری ثروت و تصمیم‌سازی مالی</Eyebrow>
            <h1 id="test-hero-title">برای تصمیم‌های مالی مهم،<br /><em>اطلاعات بیشتر کافی نیست.</em></h1>
            <p>به ساختاری روشن نیاز دارید که دارایی‌ها، ریسک‌ها، نقدشوندگی و شرایط اقتصادی را در یک تصویر واحد قرار دهد.</p>
            <div className={styles.heroActions}>
              <ArrowLink href="/financial-decision-assessment" light>شروع ارزیابی تصمیم مالی</ArrowLink>
              <ArrowLink href="#services" light>مشاهده خدمات DNH</ArrowLink>
            </div>
            <p className={styles.trustLine}><strong>دکتر نسیم محمدحسنی</strong> — معمار ثروت خصوصی و بنیان‌گذار چارچوب DNH</p>
          </div>
          <HeroInstrument />
        </div>
        <div className={styles.scrollCue}><span>SCROLL TO CLARITY</span><i /></div>
      </section>

      <section id="services" className={`${styles.section} ${styles.services}`}>
        <div className={styles.shell}>
          <header className={styles.splitHeader} data-reveal>
            <div><Eyebrow>خدمات DNH</Eyebrow><h2>برای کدام مسئله مالی به یک مسیر روشن‌تر نیاز دارید؟</h2></div>
            <p>هر خدمت از یک مسئله واقعی آغاز می‌شود؛ نه از یک محصول مالی از پیش‌تعیین‌شده.</p>
          </header>
          <div className={styles.serviceGrid} data-stagger>
            {services.map(([title, description, Icon, number], index) => (
              <article className={styles.serviceCard} key={title}>
                <div className={styles.cardTop}><span>{number}</span><Icon aria-hidden="true" size={23} strokeWidth={1.5} /></div>
                <FinancialGlyph index={index}/>
                <div className={styles.serviceCopy}><h3>{title}</h3><p>{description}</p></div><ArrowUpLeft aria-hidden="true" className={styles.cardArrow} size={20} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.problem}`}>
        <div className={styles.shell}>
          <div className={styles.problemIntro} data-reveal>
            <div><Eyebrow light>شناخت مسئله قبل از تصمیم</Eyebrow><h2>پیچیدگی، اغلب از کمبود اطلاعات نیست؛ از نبود تصویر کامل است.</h2></div>
            <div><p>اگر یکی از این موقعیت‌ها برای شما آشناست، مسئله اصلی احتمالاً انتخاب یک بازار نیست؛ مسئله، ساختار تصمیم است.</p><DiagnosticRadar/></div>
          </div>
          <ol className={styles.problemList} data-stagger>
            {problems.map((problem, index) => <li key={problem}><span>۰{index + 1}</span><p>{problem}</p><ArrowLeft aria-hidden="true" size={18} /></li>)}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.audience}`}>
        <div className={styles.shell}>
          <div className={styles.centerHeader} data-reveal><Eyebrow>چه کسانی از DNH بیشترین استفاده را می‌برند؟</Eyebrow><h2>هر مسئله مالی، مسیر بررسی متفاوتی نیاز دارد.</h2></div>
          <div className={styles.audienceGrid} data-stagger>
            {audiences.map(([title, description, Icon], index) => <article key={title}><span className={styles.audienceNumber}>۰{index + 1}</span><Icon aria-hidden="true" size={28} strokeWidth={1.35} /><AudienceObject index={index}/><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.comparison}>
        <div className={styles.shell}>
          <header className={styles.comparisonHeader} data-reveal><Eyebrow light>از هیاهوی بازار تا تصمیم ساختاریافته</Eyebrow><h2>تصمیم مالی نباید با هر خبر، نوسان یا هیجان بازار تغییر کند.</h2></header>
          <DecisionEngine />
          <div className={styles.comparisonGrid} data-stagger>
            <article className={styles.noiseCard}><span className={styles.cardLabel}>واکنش</span><h3>تصمیم واکنشی</h3>{["خبر، ترس یا هیجان", "نوسان کوتاه‌مدت", "فرصت‌های پراکنده", "نگاه جداگانه به دارایی‌ها"].map(x => <p key={x}>× {x}</p>)}</article>
            <div className={styles.comparisonAxis}><i /><Network aria-hidden="true" size={30} /><i /></div>
            <article className={styles.structureCard}><span className={styles.cardLabel}>ساختار</span><h3>تصمیم ساختاریافته</h3>{["شناخت وضعیت و اهداف", "ریسک و نقدشوندگی", "تحلیل سناریوها", "نگاه یکپارچه به ثروت"].map(x => <p key={x}>✓ {x}</p>)}</article>
          </div>
        </div>
      </section>

      <section className={styles.frameworkStage}>
        <div className={`${styles.shell} ${styles.frameworkInner}`}>
          <header className={styles.frameworkHeader}>
            <div><Eyebrow light>چارچوب DNH</Eyebrow><h2>تصمیم بهتر، از یک فرآیند بهتر شروع می‌شود.</h2></div>
            <p>هر تصمیم در سه لایه تحلیل می‌شود؛ از شناخت شرایط تا هماهنگی با افق بلندمدت.</p>
          </header>
          <div className={styles.frameworkGrid}>
            {framework.map(([code, title, english, description]) => <article data-framework-card key={code}><span className={styles.frameworkCode}>{code}</span><small>{english}</small><h3>{title}</h3><p>{description}</p></article>)}
          </div>
          <div className={styles.frameworkLine}><span>D</span><i /><span>N</span><i /><span>H</span></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.wealth}`}>
        <div className={`${styles.shell} ${styles.wealthGrid}`}>
          <div className={styles.wealthCopy} data-reveal><Eyebrow>نگاه یکپارچه به ثروت</Eyebrow><h2>هر دارایی باید در ساختار ثروت شما یک نقش مشخص داشته باشد.</h2><p>داشتن دارایی‌های متعدد به‌تنهایی به معنای ساختار منسجم نیست. نقش، ریسک، نقدشوندگی و افق زمانی هر دارایی باید روشن باشد.</p><ArrowLink href="/dnh/wealth-architecture">بررسی معماری ثروت</ArrowLink></div>
          <div className={styles.wealthVisual} aria-label="نمای مفهومی ارتباط دارایی‌ها در معماری ثروت" data-reveal>
            <div className={styles.assetCore}><Landmark aria-hidden="true" size={29} /><strong>معماری ثروت</strong><small>WHOLE-WEALTH VIEW</small></div>
            <div className={styles.assetOrbit}>{assets.map((asset, index) => <span style={{ "--index": index } as React.CSSProperties} key={asset}>{asset}</span>)}</div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.desk}`}>
        <div className={styles.deskBackdrop}><Image src="/assets/images/Translucent Data City in Perspective.png" alt="" fill sizes="100vw" /></div>
        <div className={styles.shell}>
          <header className={styles.deskHeader} data-reveal><div><Eyebrow light>میز هوشمندی DNH</Eyebrow><h2>قبل از تصمیم، متغیرهای اثرگذار را یکجا ببینید.</h2></div><p>از دنبال‌کردن پراکنده اخبار به یک نمای ساختاریافته از ریسک، دارایی و نقدینگی برسید.</p></header>
          <div className={styles.intelligenceGrid} data-stagger>{intelligence.map(([title, english, Icon], index) => <article key={title}><span>0{index + 1}</span><Icon aria-hidden="true" size={25} strokeWidth={1.4} /><small>{english}</small><h3>{title}</h3></article>)}</div>
          <p className={styles.disclaimer}>این میز ابزار معامله‌گری یا پیش‌بینی قیمت نیست؛ برای شناخت شرایط و پشتیبانی از تصمیم ساختاریافته طراحی شده است.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.outlook}`}>
        <div className={`${styles.shell} ${styles.outlookGrid}`}>
          <div data-reveal><Eyebrow>چشم‌انداز هفتگی DNH</Eyebrow><h2>آنچه این هفته برای تصمیم‌های مالی اهمیت دارد.</h2><p>جمع‌بندی فشرده مهم‌ترین تحولات، فشارها و متغیرهای اثرگذار بر فضای تصمیم‌گیری.</p><ArrowLink href="/knowledge/weekly-outlook">مشاهده آخرین چشم‌انداز</ArrowLink></div>
          <article className={styles.outlookReport} data-reveal><div className={styles.reportTop}><span>DNH / WEEKLY</span><span>EXECUTIVE VIEW</span></div><div className={styles.reportChart}><LineChart aria-hidden="true" size={54} strokeWidth={1} /></div>{["جمع‌بندی اجرایی", "نمای ریسک کلان", "نمای دارایی‌ها", "چه چیزهایی را باید دید؟", "یادداشت DNH"].map((x, i) => <p key={x}><span>۰{i + 1}</span>{x}</p>)}</article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.editorial}`}>
        <div className={styles.shell}>
          <header className={styles.splitHeader} data-reveal><div><Eyebrow>بینش‌های DNH</Eyebrow><h2>برای تصمیم بهتر، باید فراتر از خبر و نوسان روزانه دید.</h2></div><ArrowLink href="/knowledge/insights">مشاهده همه بینش‌ها</ArrowLink></header>
          <div className={styles.insightGrid} data-stagger>{insights.map((item, index) => <Link href="/knowledge/insights" key={item}><span>۰{index + 1}</span><h3>{item}</h3><ArrowUpLeft aria-hidden="true" size={20} /></Link>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.research}`}>
        <div className={styles.shell}>
          <div className={styles.researchTitle} data-reveal><Eyebrow light>پژوهش‌ها و پرونده‌های تحلیلی</Eyebrow><h2>تحلیل زمانی ارزشمند است که به درک بهتر یک تصمیم واقعی کمک کند.</h2></div>
          <div className={styles.researchGrid} data-stagger>
            <article><span>DNH RESEARCH</span><Sparkles aria-hidden="true" size={30} /><h3>پژوهش‌ها و یادداشت‌های تخصصی</h3><p>گزارش‌های ریسک کلان، تخصیص دارایی و حفاظت از ثروت برای شناخت بهتر محیط تصمیم.</p><ArrowLink href="/knowledge/research" light>مشاهده پژوهش‌ها</ArrowLink></article>
            <article><span>CASE STUDIES</span><BriefcaseBusiness aria-hidden="true" size={30} /><h3>پرونده‌های تحلیلی DNH</h3><p>مسائل واقعی و ناشناس با تمرکز بر فرآیند تحلیل و منطق تصمیم‌سازی، نه وعده بازده.</p><ArrowLink href="/knowledge/case-studies" light>مشاهده پرونده‌ها</ArrowLink></article>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.aboutImage}><Image src="/assets/images/dr-nasim-home-desktop.png" alt="دکتر نسیم محمدحسنی" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className={styles.aboutCopy} data-reveal><Eyebrow>درباره دکتر نسیم محمدحسنی</Eyebrow><h2>تجربه‌ای شکل‌گرفته از سال‌ها تصمیم‌سازی مالی و مدیریت ثروت.</h2><p>معمار ثروت خصوصی، مشاور مالی راهبردی و بنیان‌گذار چارچوب DNH؛ دارای دکترای مهندسی مالی و بیش از ۱۵ سال تجربه در مدیریت مالی.</p><blockquote><Quote aria-hidden="true" size={24} />ثروت فقط چیزی نیست که در اختیار داریم؛ ساختاری است که باید برای حفظ، توسعه و هدایت آن طراحی شود.</blockquote><ArrowLink href="/about">آشنایی بیشتر</ArrowLink></div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalGrid} aria-hidden="true" />
        <div className={styles.finalGlow} aria-hidden="true" />
        <div className={`${styles.shell} ${styles.finalInner}`} data-reveal>
          <Eyebrow light>شروع مسیر تصمیم‌گیری</Eyebrow><h2>قبل از تصمیم بعدی،<br /><em>مسئله را درست تعریف کنید.</em></h2><p>ارزیابی اولیه DNH کمک می‌کند نوع مسئله، میزان فوریت، سطح پیچیدگی و مسیر مناسب برای ادامه بررسی روشن شود.</p>
          <div className={styles.assessmentItems}>{["موضوع اصلی تصمیم", "اهداف و اولویت‌ها", "افق زمانی", "محدودیت‌ها و ریسک‌ها", "تناسب با خدمات DNH"].map((x, i) => <span key={x}><b>۰{i + 1}</b>{x}</span>)}</div>
          <div className={styles.heroActions}><ArrowLink href="/financial-decision-assessment" light>شروع ارزیابی اولیه</ArrowLink><ArrowLink href="/request-strategic-consultation" light>درخواست مشاوره راهبردی</ArrowLink></div>
        </div>
      </section>
    </div>
  );
}
