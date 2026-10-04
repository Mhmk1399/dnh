import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthPage } from "@/components/pages/AuthPage";

export const metadata: Metadata = { title: "ورود | DNH" };
export const dynamic = "force-dynamic";
export default async function LoginPage() { if (await getCurrentUser()) redirect("/dashboard"); return <AuthPage mode="login" />; }
