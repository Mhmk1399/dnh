import { Types } from "mongoose";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import FormSubmission from "@/lib/models/FormSubmission";

async function authorize() {
  const user = await getCurrentUser();

  return user?.role === "admin" ? user : null;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; submissionId: string }> },
) {
  if (!(await authorize())) {
    return NextResponse.json(
      { message: "دسترسی مدیر لازم است." },
      { status: 403 },
    );
  }

  const { id, submissionId } = await params;

  if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(submissionId)) {
    return NextResponse.json(
      { message: "شناسه پاسخ معتبر نیست." },
      { status: 400 },
    );
  }

  try {
    await connect();

    const result = await FormSubmission.deleteOne({
      _id: submissionId,
      formId: id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "پاسخ پیدا نشد." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "پاسخ فرم حذف شد." });
  } catch {
    return NextResponse.json(
      { message: "حذف پاسخ انجام نشد." },
      { status: 503 },
    );
  }
}
