import { model, models, Schema, type Model, type Types } from "mongoose";
import type {
  WeeklyOutlookBlockType,
  WeeklyOutlookButtonVariant,
  WeeklyOutlookCalloutTone,
  WeeklyOutlookDateCalendar,
  WeeklyOutlookSectionIcon,
  WeeklyOutlookSectionTone,
  WeeklyOutlookStatus,
} from "@/lib/weekly-outlook";

export type WeeklyOutlookReportRecord = {
  title: string;
  slug: string;
  edition: string;
  reportDate: Date;
  dateCalendar: WeeklyOutlookDateCalendar;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: WeeklyOutlookStatus;
  sections: Array<{
    id: string;
    eyebrow?: string;
    title: string;
    summary?: string;
    icon: WeeklyOutlookSectionIcon;
    tone: WeeklyOutlookSectionTone;
    blocks: Array<{
      id: string;
      type: WeeklyOutlookBlockType;
      text?: string;
      level?: "h2" | "h3";
      items?: string[];
      tone?: WeeklyOutlookCalloutTone;
      title?: string;
      cite?: string;
      src?: string;
      alt?: string;
      caption?: string;
      label?: string;
      href?: string;
      variant?: WeeklyOutlookButtonVariant;
      note?: string;
    }>;
  }>;
  revision: number;
  createdBy: Types.ObjectId;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

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

const weeklyOutlookReportSchema = new Schema<WeeklyOutlookReportRecord>(
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

weeklyOutlookReportSchema.index({ status: 1, reportDate: -1 });

const WeeklyOutlookReport =
  (models.WeeklyOutlookReport as
    | Model<WeeklyOutlookReportRecord>
    | undefined) ||
  model<WeeklyOutlookReportRecord>(
    "WeeklyOutlookReport",
    weeklyOutlookReportSchema,
  );

export default WeeklyOutlookReport;
