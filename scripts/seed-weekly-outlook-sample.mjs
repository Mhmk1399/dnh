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

const result = await WeeklyOutlookReport.findOneAndUpdate(
  { slug: sampleReport.slug },
  {
    $set: {
      ...sampleReport,
      createdBy,
    },
    $setOnInsert: {
      createdAt: new Date(),
    },
  },
  {
    upsert: true,
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  },
).lean();

console.log(
  `Seeded weekly outlook: ${result.slug} (${String(result._id)})`,
);

await mongoose.disconnect();
