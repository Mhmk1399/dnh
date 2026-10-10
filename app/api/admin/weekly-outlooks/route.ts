import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import WeeklyOutlookReport from "@/lib/models/WeeklyOutlookReport";
import {
  validateWeeklyOutlookReport,
  WeeklyOutlookDefinitionError,
} from "@/lib/weekly-outlook-validation";
import { readJson } from "@/lib/validation";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { message: "دسترسی مدیر لازم است." },
      { status: 403 },
    );
  }

  const body = await readJson(request);

  if (!body) {
    return NextResponse.json(
      { message: "بدنه درخواست معتبر نیست." },
      { status: 400 },
    );
  }

  try {
    const definition = validateWeeklyOutlookReport(body, "draft");

    await connect();

    const report = await WeeklyOutlookReport.create({
      ...definition,
      reportDate: new Date(definition.reportDate),
      revision: 1,
      createdBy: user.id,
      publishedAt: null,
    });

    return NextResponse.json(
      {
        message: "پیش‌نویس گزارش ساخته شد.",
        id: String(report._id),
        revision: report.revision,
      },
      { status: 201 },
    );
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
      { message: "ذخیره گزارش انجام نشد. دوباره تلاش کنید." },
      { status: 503 },
    );
  }
}
