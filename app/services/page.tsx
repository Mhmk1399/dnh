import React from "react";
import type { Metadata } from "next";
import { ServicesHero } from "@/components/static/services/ServicesHero";
import { ServiceFitSection } from "@/components/static/services/ServiceFitSection";
import { ServiceContextSection } from "@/components/static/services/ServiceContextSection";
import { ServicesAudienceSection } from "@/components/static/services/ServicesAudienceSection";
import { ServicesMethodSection } from "@/components/static/services/ServicesMethodSection";
import { ServicesFinalCtaSection } from "@/components/static/services/ServicesFinalCtaSection";

export const metadata: Metadata = {
  title: "خدمات DNH | معماری ثروت و مشاوره مالی راهبردی",

  description:
    "خدمات DNH شامل استراتژی ثروت خصوصی، هوشمندی پرتفوی، مشاوره مالی راهبردی، مشاوره اقتصاد و بازار، مدیریت ریسک و Executive Briefings است.",

  alternates: {
    canonical: "/fa/services",
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    title: "خدمات DNH | مسیرهای تخصصی برای تصمیم‌های مالی",
    description:
      "آشنایی با خدمات DNH برای معماری ثروت، بررسی پرتفوی، تصمیم‌های مالی راهبردی، ریسک و محیط اقتصادی.",
  },
};
const page = () => {
  return (
    <div>
      <ServicesHero />
      <ServiceFitSection />
      <ServiceContextSection />
      <ServicesAudienceSection />
      <ServicesMethodSection />
      <ServicesFinalCtaSection />
    </div>
  );
};

export default page;
