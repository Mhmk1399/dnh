import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import { intakeSources, isIntakeType } from "@/lib/admin-intake";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  const user = await getCurrentUser();

  if (user?.role !== "admin") {
    return NextResponse.json(
      { message: "دسترسی مدیر لازم است." },
      { status: 403 },
    );
  }

  const { type, id } = await params;
  if (!isIntakeType(type) || !Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "نوع یا شناسه رکورد معتبر نیست." },
      { status: 400 },
    );
  }

  try {
    await connect();
    const result = await intakeSources[type].remove(id);

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "رکورد پیدا نشد." }, { status: 404 });
    }

    return NextResponse.json({ message: "رکورد ورودی با موفقیت حذف شد." });
  } catch {
    return NextResponse.json(
      { message: "حذف رکورد انجام نشد. اتصال پایگاه داده را بررسی کنید." },
      { status: 503 },
    );
  }
}
