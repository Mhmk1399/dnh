import type { Metadata } from "next";
import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";

import { UserEditForm } from "@/components/admin/users/UserEditForm";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import User from "@/lib/models/User";

export const metadata: Metadata = { title: "ویرایش کاربر | مدیریت DNH" };
export const dynamic = "force-dynamic";

export default async function AdminUserEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/login");
  if (currentUser.role !== "admin") redirect("/dashboard");

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) notFound();

  await connect();

  const user = await User.findById(id)
    .select("firstName lastName phone role")
    .lean();

  if (!user) notFound();

  return (
    <section className="mx-auto max-w-[980px]">
      <UserEditForm
        user={{
          id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
        }}
      />
    </section>
  );
}
