import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FormBuilder } from "@/components/dynamic-forms/FormBuilder";
import { getCurrentUser } from "@/lib/auth";
import { createFormTemplate } from "@/lib/dynamic-forms";

export const metadata: Metadata = { title: "فرم جدید | مدیریت DNH" };
export const dynamic = "force-dynamic";
export default async function NewFormPage() { const user = await getCurrentUser(); if (!user) redirect("/login"); if (user.role !== "admin") redirect("/dashboard"); return <FormBuilder initial={createFormTemplate()}/>; }
