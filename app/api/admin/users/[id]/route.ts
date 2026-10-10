import { Types } from "mongoose";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import Session from "@/lib/models/Session";
import User from "@/lib/models/User";
import { readJson } from "@/lib/validation";

async function authorize() {
  const user = await getCurrentUser();

  return user?.role === "admin" ? user : null;
}

function sanitizeUserPatch(body: Record<string, unknown>) {
  const firstName =
    typeof body.firstName === "string" ? body.firstName.trim().slice(0, 50) : "";
  const lastName =
    typeof body.lastName === "string" ? body.lastName.trim().slice(0, 70) : "";
  const phone =
    typeof body.phone === "string" ? body.phone.trim().slice(0, 24) : "";
  const role = body.role === "admin" ? "admin" : "user";
  const errors: Record<string, string> = {};

  if (firstName.length < 2) errors.firstName = "نام باید حداقل ۲ کاراکتر باشد.";
  if (lastName.length < 2) errors.lastName = "نام خانوادگی باید حداقل ۲ کاراکتر باشد.";
  if (!/^09\d{9}$/.test(phone)) errors.phone = "شماره موبایل باید با فرمت 09xxxxxxxxx باشد.";

  return {
    value: { firstName, lastName, phone, role },
    errors,
  };
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
      { message: "شناسه کاربر معتبر نیست." },
      { status: 400 },
    );
  }

  try {
    await connect();

    const user = await User.findById(id)
      .select("firstName lastName phone role createdAt updatedAt")
      .lean();

    if (!user) {
      return NextResponse.json(
        { message: "کاربر پیدا نشد." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      user: {
        id: String(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "دریافت کاربر انجام نشد." },
      { status: 503 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await authorize();

  if (!admin) {
    return NextResponse.json(
      { message: "دسترسی مدیر لازم است." },
      { status: 403 },
    );
  }

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "شناسه کاربر معتبر نیست." },
      { status: 400 },
    );
  }

  const body = await readJson(request);

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { message: "بدنه درخواست معتبر نیست." },
      { status: 400 },
    );
  }

  const { value, errors } = sanitizeUserPatch(body as Record<string, unknown>);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "اطلاعات کاربر نیاز به اصلاح دارد.", errors },
      { status: 422 },
    );
  }

  if (admin.id === id && value.role !== "admin") {
    return NextResponse.json(
      { message: "امکان تغییر نقش حساب مدیر فعلی وجود ندارد." },
      { status: 409 },
    );
  }

  try {
    await connect();

    const user = await User.findByIdAndUpdate(
      id,
      { $set: value },
      { new: true, runValidators: true },
    )
      .select("firstName lastName phone role createdAt updatedAt")
      .lean();

    if (!user) {
      return NextResponse.json(
        { message: "کاربر پیدا نشد." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "اطلاعات کاربر ذخیره شد.",
      user: {
        id: String(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          message: "این شماره موبایل قبلاً ثبت شده است.",
          errors: { phone: "شماره موبایل تکراری است." },
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "ذخیره کاربر انجام نشد." },
      { status: 503 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await authorize();

  if (!admin) {
    return NextResponse.json(
      { message: "دسترسی مدیر لازم است." },
      { status: 403 },
    );
  }

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "شناسه کاربر معتبر نیست." },
      { status: 400 },
    );
  }

  if (admin.id === id) {
    return NextResponse.json(
      { message: "امکان حذف حساب مدیر فعلی وجود ندارد." },
      { status: 409 },
    );
  }

  try {
    await connect();

    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "کاربر پیدا نشد." },
        { status: 404 },
      );
    }

    await Session.deleteMany({ userId: id });

    return NextResponse.json({ message: "کاربر حذف شد." });
  } catch {
    return NextResponse.json(
      { message: "حذف کاربر انجام نشد." },
      { status: 503 },
    );
  }
}
