import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import WeeklyOutlookReport from "@/lib/models/WeeklyOutlookReport";
import { dateOnlyToStorageDate } from "@/lib/weekly-outlook-date";
import {
  WEEKLY_OUTLOOK_STATUSES,
  type WeeklyOutlookStatus,
} from "@/lib/weekly-outlook";
import {
  validateWeeklyOutlookReport,
  WeeklyOutlookDefinitionError,
} from "@/lib/weekly-outlook-validation";
import { readJson } from "@/lib/validation";

async function authorize() {
  const user = await getCurrentUser();

  return user?.role === "admin" ? user : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authorize())) {
    return NextResponse.json(
      { message: "دسترسی مدیر لازم است." },
      { status: 403 },
    );
  }

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "شناسه گزارش معتبر نیست." },
      { status: 400 },
    );
  }

  try {
    await connect();

    const report = await WeeklyOutlookReport.findById(id).lean();

    if (!report) {
      return NextResponse.json(
        { message: "گزارش پیدا نشد." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      report: {
        ...report,
        _id: String(report._id),
        dateCalendar: report.dateCalendar ?? "jalali",
        createdBy: String(report.createdBy),
      },
    });
  } catch {
    return NextResponse.json(
      { message: "دریافت گزارش انجام نشد." },
      { status: 503 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authorize())) {
    return NextResponse.json(
      { message: "دسترسی مدیر لازم است." },
      { status: 403 },
    );
  }

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "شناسه گزارش معتبر نیست." },
      { status: 400 },
    );
  }

  const body = await readJson(request);

  if (!body) {
    return NextResponse.json(
      { message: "بدنه درخواست معتبر نیست." },
      { status: 400 },
    );
  }

  const expectedRevision = Number(body.expectedRevision);
  const action = typeof body.action === "string" ? body.action : "save";
  const currentStatus = WEEKLY_OUTLOOK_STATUSES.includes(
    body.status as WeeklyOutlookStatus,
  )
    ? (body.status as WeeklyOutlookStatus)
    : "draft";
  const statusMap: Record<string, WeeklyOutlookStatus> = {
    save: currentStatus,
    publish: "published",
    unpublish: "draft",
    archive: "archived",
  };
  const requestedStatus = statusMap[action];

  if (!requestedStatus) {
    return NextResponse.json(
      { message: "عملیات معتبر نیست." },
      { status: 400 },
    );
  }

  if (!Number.isInteger(expectedRevision) || expectedRevision < 1) {
    return NextResponse.json(
      { message: "نسخه مورد انتظار معتبر نیست." },
      { status: 400 },
    );
  }

  try {
    const definition = validateWeeklyOutlookReport(body, requestedStatus);

    await connect();

    const update = {
      ...definition,
      reportDate: dateOnlyToStorageDate(definition.reportDate),
      status: requestedStatus,
      revision: expectedRevision + 1,
      ...(requestedStatus === "published"
        ? { publishedAt: new Date() }
        : requestedStatus === "draft"
          ? { publishedAt: null }
          : {}),
    };

    const report = await WeeklyOutlookReport.findOneAndUpdate(
      { _id: id, revision: expectedRevision },
      { $set: update },
      { new: true, runValidators: true },
    ).lean();

    if (!report) {
      const exists = await WeeklyOutlookReport.exists({ _id: id });

      return NextResponse.json(
        {
          message: exists
            ? "این گزارش در پنجره دیگری تغییر کرده است. صفحه را تازه‌سازی کنید."
            : "گزارش پیدا نشد.",
          code: exists ? "REVISION_CONFLICT" : "NOT_FOUND",
        },
        { status: exists ? 409 : 404 },
      );
    }

    return NextResponse.json({
      message:
        action === "publish"
          ? "گزارش منتشر شد."
          : action === "archive"
            ? "گزارش بایگانی شد."
            : action === "unpublish"
              ? "انتشار گزارش متوقف شد."
              : "تغییرات ذخیره شد.",
      revision: report.revision,
      status: report.status,
    });
  } catch (error) {
    if (error instanceof WeeklyOutlookDefinitionError) {
      return NextResponse.json(
        {
          message: "تعریف گزارش نیاز به اصلاح دارد.",
          errors: error.issues,
        },
        { status: 422 },
      );
    }

    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          message: "این شناسه مسیر قبلاً استفاده شده است.",
          errors: { slug: "شناسه مسیر تکراری است." },
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "ذخیره تغییرات انجام نشد." },
      { status: 503 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authorize())) {
    return NextResponse.json(
      { message: "دسترسی مدیر لازم است." },
      { status: 403 },
    );
  }

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "شناسه گزارش معتبر نیست." },
      { status: 400 },
    );
  }

  try {
    await connect();

    const result = await WeeklyOutlookReport.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "گزارش پیدا نشد." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "گزارش حذف شد." });
  } catch {
    return NextResponse.json(
      { message: "حذف گزارش انجام نشد." },
      { status: 503 },
    );
  }
}
