import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { WeeklyOutlookBuilder } from "@/components/weekly-outlooks/WeeklyOutlookBuilder";
import { getCurrentUser } from "@/lib/auth";
import { createWeeklyOutlookTemplate } from "@/lib/weekly-outlook";

export const metadata: Metadata = {
  title: "گزارش هفتگی جدید | مدیریت DNH",
};

export const dynamic = "force-dynamic";

export default async function NewWeeklyOutlookPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  return <WeeklyOutlookBuilder initial={createWeeklyOutlookTemplate()} />;
}
