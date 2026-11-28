import { readFileSync } from "node:fs";
import mongoose, { Schema, Types } from "mongoose";

function loadEnv() {
  const text = readFileSync(".env", "utf8");

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");

    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] ??= value;
  }
}

loadEnv();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

const blockSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    text: String,
    level: String,
    items: { type: [String], default: undefined },
    tone: String,
    title: String,
    cite: String,
    src: String,
    alt: String,
    caption: String,
    label: String,
    href: String,
    variant: String,
    note: String,
  },
  { _id: false },
);

const sectionSchema = new Schema(
  {
    id: { type: String, required: true },
    eyebrow: String,
    title: { type: String, required: true },
    summary: String,
    icon: { type: String, required: true },
    tone: { type: String, required: true },
    visual: { type: String, default: "grid" },
    blocks: { type: [blockSchema], default: [] },
  },
  { _id: false },
);

const weeklyOutlookReportSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 180 },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      maxlength: 100,
    },
    edition: { type: String, required: true, maxlength: 120 },
    reportDate: { type: Date, required: true, index: true },
    dateCalendar: {
      type: String,
      enum: ["jalali", "gregorian"],
      default: "jalali",
      required: true,
      index: true,
    },
    excerpt: { type: String, required: true, maxlength: 900 },
    coverImage: { type: String, default: "" },
    coverImageAlt: { type: String, default: "" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    status: {
      type: String,
      required: true,
      default: "draft",
      index: true,
    },
    sections: { type: [sectionSchema], required: true },
    english: {
      ready: Boolean,
      title: String,
      edition: String,
      excerpt: String,
      seoTitle: String,
      seoDescription: String,
      sections: { type: [sectionSchema], default: undefined },
    },
    revision: { type: Number, required: true, default: 1 },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const userSchema = new Schema(
  {
    role: String,
  },
  { timestamps: true },
);

const WeeklyOutlookReport =
  mongoose.models.WeeklyOutlookReport ||
  mongoose.model("WeeklyOutlookReport", weeklyOutlookReportSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);

const sampleReport = {
  title:
    "بازارهای جهانی در تقاطع نرخ‌های بلندمدت بالا، انرژی پرریسک و کاهش شتاب اقتصاد آمریکا",
  slug: "global-economic-weekly-2026-10-02",
  edition: "DNH Global Economic Weekly",
  reportDate: new Date("2026-10-02T12:00:00.000Z"),
  dateCalendar: "gregorian",
  excerpt:
    "گزارش هفتگی اقتصاد جهان برای هفته منتهی به ۱۱ مهر ۱۴۰۵؛ تمرکز این نسخه بر نرخ‌های بلندمدت بالا، بازار انرژی، داده‌های اشتغال آمریکا و پیامدهای آن برای تصمیم‌گیری مالی است.",
  coverImage: "",
  coverImageAlt: "",
  seoTitle: "چشم‌انداز هفتگی اقتصاد جهان | ۲ اکتبر ۲۰۲۶",
  seoDescription:
    "جمع‌بندی DNH از اقتصاد آمریکا، اروپا، سیاست پولی، انرژی، اوراق، طلا و بازارهای جهانی در هفته منتهی به ۲ اکتبر ۲۰۲۶.",
  status: "published",
  revision: 1,
  publishedAt: new Date("2026-10-02T12:00:00.000Z"),
  english: {
    ready: true,
    title: "Global markets face high long-term yields, energy risks and a slowing US economy",
    edition: "DNH Global Economic Weekly",
    excerpt: "This edition reviews the global economy for the week ending 11 Mehr 1405, focusing on elevated long-term yields, energy markets and US employment data, and what they mean for financial decisions.",
    seoTitle: "Global Economic Weekly | 2 October 2026",
    seoDescription: "DNH reviews the US and European economies, monetary policy, energy, bonds, gold and global markets for the week ending 2 October 2026.",
    sections: [
      {
        id: "section_global_snapshot",
        eyebrow: "Week ending 11 Mehr 1405",
        title: "The world at a glance",
        summary: "Global markets weighed persistently high long-term yields, energy risks and weaker US economic data.",
        icon: "overview",
        tone: "light",
        blocks: [
          {
            id: "block_snapshot_intro",
            type: "paragraph",
            text: "This edition examines the developments most likely to affect financial decisions, risk assessments and asset allocation over the near term.",
          },
          {
            id: "block_snapshot_list",
            type: "list",
            items: [
              "US employment figures for September fell short of expectations, and revisions pointed to a weaker labour market in previous months.",
              "Long-term US Treasury yields remained near multi-year highs, and selling pressure spread to parts of the European bond market.",
              "The dollar continued to gain against the euro and remained near the upper end of its range.",
              "Rising risks in French government debt and higher inflation renewed investor scrutiny of European public finances.",
              "Developments in the Middle East and the outlook for supply continued to drive energy markets.",
              "Following a sharp correction, gold fluctuated as bond yields and interest rate expectations shifted.",
              "US equities proved resilient at the end of the week, with technology stocks still in focus.",
            ],
          },
        ],
      },
      {
        id: "section_us_economy",
        eyebrow: "US economy",
        title: "Hiring slows markedly",
        summary: "US labour market data played a central role in monetary policy expectations and asset pricing.",
        icon: "market",
        tone: "soft",
        blocks: [
          {
            id: "block_us_jobs",
            type: "paragraph",
            text: "The US economy added only 29,000 jobs in September, while the unemployment rate reached 4.2%. Revisions to prior months also pointed to a weaker trend in hiring.",
          },
          {
            id: "block_us_policy",
            type: "paragraph",
            text: "The figures came as investors continued to weigh Federal Reserve policy and elevated interest rates. Economic releases now carry greater weight in market expectations of the Fed’s next move.",
          },
          {
            id: "block_us_takeaway",
            type: "callout",
            tone: "info",
            title: "Weekly takeaway",
            text: "September’s employment report was one of the week’s most closely watched US releases and shifted market expectations for monetary policy.",
          },
          {
            id: "block_us_bonds_heading",
            type: "heading",
            level: "h3",
            text: "US Treasuries and equities",
          },
          {
            id: "block_us_bonds",
            type: "paragraph",
            text: "The 10-year US Treasury yield traded above 5% during the week and briefly reached about 5.37%, a level rarely seen in recent years. Major US equity indices recovered some of their earlier losses at the end of the week, with technology shares still in focus.",
          },
        ],
      },
      {
        id: "section_europe",
        eyebrow: "Europe",
        title: "Debt and energy risks return to focus",
        summary: "Europe ended the week facing higher inflation, sovereign debt risks and sensitivity to energy prices.",
        icon: "risk",
        tone: "light",
        blocks: [
          {
            id: "block_europe_debt",
            type: "paragraph",
            text: "The spread between French and German 10-year government bond yields exceeded 150 basis points, drawing renewed attention to France’s public finances and risks across European debt markets.",
          },
          {
            id: "block_europe_inflation",
            type: "paragraph",
            text: "Euro area inflation rose to 3.8% in September from 3.2% the previous month. Higher energy prices were reported to be a major contributor.",
          },
          {
            id: "block_europe_takeaway",
            type: "callout",
            tone: "risk",
            title: "Weekly takeaway",
            text: "By the end of the week, energy inflation and sovereign debt concerns were exerting a stronger influence on European markets.",
          },
        ],
      },
      {
        id: "section_policy_markets",
        eyebrow: "Monetary policy and markets",
        title: "Higher rates for longer",
        summary: "Global markets continued to face the prospect of elevated interest rates, with asset prices highly sensitive to bond yields.",
        icon: "policy",
        tone: "teal",
        blocks: [
          {
            id: "block_policy_fed",
            type: "paragraph",
            text: "After the Federal Reserve’s recent decision to raise its policy rate to a range of 3.75% to 4%, the September employment figures have become a key consideration in assessing its next move.",
          },
          {
            id: "block_policy_list",
            type: "list",
            items: [
              "The dollar gained against the euro for a fourth consecutive week.",
              "Long-term US Treasury yields remained elevated, and pressure spread to bond markets in several European economies.",
              "Oil traded in a wide range, with developments in the Middle East remaining a major driver.",
              "After a sharp correction early in the week, gold continued to trade unevenly.",
              "US equities performed better towards the end of the week, with technology stocks still in focus.",
            ],
          },
        ],
      },
      {
        id: "section_geo_trade",
        eyebrow: "Trade and geopolitics",
        title: "Energy risk alongside monetary policy",
        summary: "Energy, trade and supply chain risks remain relevant alongside monetary policy and government debt.",
        icon: "watch",
        tone: "soft",
        blocks: [
          {
            id: "block_geo",
            type: "paragraph",
            text: "Developments in the Middle East continued to feed through to energy markets and asset prices. Globally, investors face energy, trade and supply chain risks alongside monetary policy decisions and sovereign debt concerns.",
          },
          {
            id: "block_oecd",
            type: "quote",
            text: "Global economic growth in 2026 is estimated at around 2.9%. Rising long-term yields and persistent energy risks remain important considerations for the world economy.",
            cite: "DNH summary based on the data in this week’s report",
          },
        ],
      },
      {
        id: "section_conclusion",
        eyebrow: "Implications for decisions",
        title: "Financial decisions depend on more than market direction",
        summary: "This week again illustrated the limits of relying on a single market or indicator when making a financial decision.",
        icon: "conclusion",
        tone: "dark",
        blocks: [
          {
            id: "block_conclusion",
            type: "paragraph",
            text: "Elevated long-term yields, energy risks, relatively weak US employment figures and greater sensitivity in European debt markets point to the need to examine how the economy, monetary policy, liquidity and geopolitical risk interact.",
          },
          {
            id: "block_disclaimer",
            type: "callout",
            tone: "neutral",
            title: "Scope of this report",
            text: "This report provides context for financial decisions. It does not provide trading signals, investment advice or a guarantee of returns.",
          },
        ],
      },
    ],
  },
  sections: [
    {
      id: "section_global_snapshot",
      eyebrow: "هفته منتهی به ۱۱ مهر ۱۴۰۵",
      title: "جهان در یک نگاه",
      summary:
        "بازارهای جهانی هفته را با ترکیب نرخ‌های بلندمدت بالا، انرژی پرریسک و داده‌های ضعیف‌تر اقتصاد آمریکا خواندند.",
      icon: "overview",
      tone: "light",
      blocks: [
        {
          id: "block_snapshot_intro",
          type: "paragraph",
          text:
            "این نسخه از چشم‌انداز هفتگی اقتصاد جهان، تصویری فشرده از متغیرهایی ارائه می‌کند که در کوتاه‌مدت می‌توانند بر تصمیم‌های مالی، ارزیابی ریسک و ترکیب دارایی‌ها اثر بگذارند.",
        },
        {
          id: "block_snapshot_list",
          type: "list",
          items: [
            "داده اشتغال سپتامبر آمریکا ضعیف‌تر از انتظار منتشر شد و تصویر بازار کار نسبت به ماه‌های قبل تعدیل شد.",
            "بازده اوراق بلندمدت آمریکا در محدوده‌های بالای سال‌های اخیر باقی ماند و فشار فروش به بخشی از بازار بدهی اروپا نیز سرایت کرد.",
            "دلار در برابر یورو به روند صعودی خود ادامه داد و در محدوده بالایی قرار گرفت.",
            "افزایش ریسک بازار بدهی فرانسه و رشد تورم، توجه سرمایه‌گذاران را به وضعیت مالی دولت‌های اروپایی بازگرداند.",
            "بازار انرژی همچنان تحت تأثیر تحولات خاورمیانه و چشم‌انداز عرضه قرار داشت.",
            "طلا پس از اصلاح شدید، تحت تأثیر تغییرات بازده اوراق و انتظارات نرخ بهره نوسان کرد.",
            "بازار سهام آمریکا در پایان هفته مقاومت نشان داد و سهام فناوری همچنان در کانون توجه قرار داشت.",
          ],
        },
      ],
    },
    {
      id: "section_us_economy",
      eyebrow: "اقتصاد آمریکا",
      title: "بازار کار؛ کاهش محسوس شتاب اشتغال",
      summary:
        "داده‌های بازار کار آمریکا یکی از مهم‌ترین ورودی‌های تصمیم سیاست پولی و قیمت‌گذاری دارایی‌ها بود.",
      icon: "market",
      tone: "soft",
      blocks: [
        {
          id: "block_us_jobs",
          type: "paragraph",
          text:
            "داده‌های سپتامبر نشان داد اقتصاد آمریکا تنها ۲۹ هزار شغل ایجاد کرده و نرخ بیکاری به ۴.۲ درصد رسیده است. بازبینی آمار ماه‌های قبل نیز تصویر ضعیف‌تری از روند اشتغال ارائه کرد.",
        },
        {
          id: "block_us_policy",
          type: "paragraph",
          text:
            "این داده در شرایطی منتشر شد که سیاست پولی فدرال رزرو و سطح بالای نرخ‌های بهره همچنان در مرکز توجه بازار قرار دارد. بازار اکنون مسیر بعدی سیاست پولی را بیش از گذشته از زاویه داده‌های واقعی اقتصاد می‌خواند.",
        },
        {
          id: "block_us_takeaway",
          type: "callout",
          tone: "info",
          title: "برداشت هفته",
          text:
            "داده اشتغال سپتامبر یکی از مهم‌ترین داده‌های اقتصاد آمریکا در این هفته بود و انتظارات بازار درباره مسیر سیاست پولی را تحت تأثیر قرار داد.",
        },
        {
          id: "block_us_bonds_heading",
          type: "heading",
          level: "h3",
          text: "اوراق خزانه‌داری و سهام آمریکا",
        },
        {
          id: "block_us_bonds",
          type: "paragraph",
          text:
            "بازده اوراق ۱۰ ساله آمریکا در طول هفته در محدوده بالای ۵ درصد قرار گرفت و در مقطعی به حدود ۵.۳۷ درصد رسید؛ سطحی که در سال‌های اخیر کمتر مشاهده شده است. هم‌زمان شاخص‌های اصلی سهام آمریکا در پایان هفته بخشی از فشارهای هفته را جبران کردند و سهام فناوری همچنان در مرکز توجه باقی ماند.",
        },
      ],
    },
    {
      id: "section_europe",
      eyebrow: "اروپا",
      title: "بازگشت ریسک بدهی و انرژی به مرکز توجه",
      summary:
        "اروپا هفته را با ترکیبی از تورم بالاتر، ریسک بدهی دولت‌ها و حساسیت بازار انرژی پشت سر گذاشت.",
      icon: "risk",
      tone: "light",
      blocks: [
        {
          id: "block_europe_debt",
          type: "paragraph",
          text:
            "فاصله بازده اوراق ۱۰ ساله فرانسه و آلمان به بیش از ۱۵۰ واحد پایه رسید؛ سطحی که توجه بازار را بار دیگر به وضعیت مالی دولت فرانسه و ریسک‌های بازار بدهی اروپا معطوف کرد.",
        },
        {
          id: "block_europe_inflation",
          type: "paragraph",
          text:
            "تورم منطقه یورو در سپتامبر به ۳.۸ درصد رسید؛ در حالی که رقم ماه قبل ۳.۲ درصد بود. افزایش قیمت انرژی از عوامل مهم این افزایش گزارش شده است.",
        },
        {
          id: "block_europe_takeaway",
          type: "callout",
          tone: "risk",
          title: "برداشت هفته",
          text:
            "بازار اروپا در پایان هفته بیش از گذشته تحت تأثیر ترکیب تورم انرژی و ریسک بدهی دولت‌ها قرار گرفت.",
        },
      ],
    },
    {
      id: "section_policy_markets",
      eyebrow: "سیاست پولی و بازارها",
      title: "نرخ‌های بالا برای مدت طولانی‌تر",
      summary:
        "بازارهای جهانی همچنان با چشم‌انداز نرخ‌های بهره بالاتر و حساسیت بالای دارایی‌ها به بازده اوراق روبه‌رو بودند.",
      icon: "policy",
      tone: "teal",
      blocks: [
        {
          id: "block_policy_fed",
          type: "paragraph",
          text:
            "پس از تصمیم اخیر فدرال رزرو برای افزایش نرخ بهره به محدوده ۳.۷۵ تا ۴ درصد، داده اشتغال سپتامبر اکنون به یکی از عوامل مهم ارزیابی مسیر بعدی سیاست پولی تبدیل شده است.",
        },
        {
          id: "block_policy_list",
          type: "list",
          items: [
            "دلار در برابر یورو چهارمین هفته متوالی رشد را تجربه کرد.",
            "بازده اوراق بلندمدت آمریکا همچنان بالا ماند و فشار بازار بدهی به برخی اقتصادهای اروپایی نیز منتقل شد.",
            "نفت در طول هفته نوسان قابل‌توجهی داشت و تحولات خاورمیانه همچنان یکی از محرک‌های اصلی آن بود.",
            "طلا پس از اصلاح شدید ابتدای هفته، در ادامه معاملات نوسانی باقی ماند.",
            "سهام آمریکا در پایان هفته عملکرد بهتری داشت و فناوری همچنان در کانون توجه قرار گرفت.",
          ],
        },
      ],
    },
    {
      id: "section_geo_trade",
      eyebrow: "تجارت و ژئوپلیتیک",
      title: "ریسک انرژی در کنار سیاست پولی",
      summary:
        "ریسک‌های مرتبط با انرژی، تجارت و زنجیره تأمین همچنان کنار سیاست پولی و وضعیت بدهی دولت‌ها قرار دارند.",
      icon: "watch",
      tone: "soft",
      blocks: [
        {
          id: "block_geo",
          type: "paragraph",
          text:
            "تحولات خاورمیانه همچنان در بازار انرژی و قیمت‌گذاری دارایی‌ها منعکس شد. در بازار جهانی، ریسک‌های مرتبط با انرژی، تجارت و زنجیره تأمین در کنار سیاست‌های پولی و وضعیت بدهی دولت‌ها قرار دارند.",
        },
        {
          id: "block_oecd",
          type: "quote",
          text:
            "رشد اقتصاد جهانی در سال ۲۰۲۶ در محدوده ۲.۹ درصد برآورد می‌شود، اما افزایش بازده اوراق بلندمدت و استمرار ریسک انرژی از عوامل مهم پیش‌روی اقتصاد جهانی است.",
          cite: "جمع‌بندی DNH بر اساس داده‌های گزارش هفته",
        },
      ],
    },
    {
      id: "section_conclusion",
      eyebrow: "برداشت تصمیمی",
      title: "برای تصمیم مالی، تصویر کامل‌تر از جهت بازار مهم‌تر است",
      summary:
        "این هفته بار دیگر نشان داد تصمیم مالی فقط با نگاه به یک بازار یا یک عدد قابل اتکا نیست.",
      icon: "conclusion",
      tone: "dark",
      blocks: [
        {
          id: "block_conclusion",
          type: "paragraph",
          text:
            "ترکیب نرخ‌های بلندمدت بالا، انرژی پرریسک، ضعف نسبی داده‌های اشتغال آمریکا و افزایش حساسیت بازار بدهی اروپا، نشان می‌دهد تصمیم‌های مالی نیازمند خواندن رابطه میان اقتصاد، سیاست پولی، نقدینگی و ریسک ژئوپلیتیک هستند.",
        },
        {
          id: "block_disclaimer",
          type: "callout",
          tone: "neutral",
          title: "مرز حرفه‌ای گزارش",
          text:
            "این گزارش برای کمک به فهم زمینه تصمیم تهیه شده است و سیگنال خرید یا فروش، توصیه سرمایه‌گذاری یا تضمین بازده محسوب نمی‌شود.",
        },
      ],
    },
  ],
};

await mongoose.connect(process.env.MONGODB_URI, {
  bufferCommands: false,
  serverSelectionTimeoutMS: 8000,
});

const adminUser = await User.findOne({ role: "admin" }).select("_id").lean();
const createdBy = adminUser?._id ?? new Types.ObjectId();

const now = new Date();
const result = await WeeklyOutlookReport.updateOne(
  { slug: sampleReport.slug },
  {
    $setOnInsert: {
      ...sampleReport,
      createdBy,
      createdAt: now,
      updatedAt: now,
    },
  },
  {
    upsert: true,
    timestamps: false,
    runValidators: true,
    setDefaultsOnInsert: true,
  },
);

console.log(
  result.upsertedCount
    ? `Seeded bilingual weekly outlook: ${sampleReport.slug}`
    : `Weekly outlook already exists: ${sampleReport.slug}`,
);

await mongoose.disconnect();
