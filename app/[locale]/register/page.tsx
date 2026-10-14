import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthPage } from "@/components/pages/AuthPage";

const pageMetadata: Metadata = { title: "ثبت‌نام | DNH" };
export const dynamic = "force-dynamic";
export default async function RegisterPage() { if (await getCurrentUser()) redirect("/dashboard"); return <AuthPage mode="register" />; }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata(pageMetadata, "/register", normalizeSiteLocale(locale));
}
