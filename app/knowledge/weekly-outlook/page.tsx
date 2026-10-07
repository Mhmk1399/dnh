import { WeeklyOutlookAssetViewSection } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookAssetViewSection";
import { WeeklyOutlookHero } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookHero";
import { WeeklyOutlookMacroRiskSection } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookMacroRiskSection";
import { WeeklyOutlookSummarySection } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookSummarySection";
import { WeeklyOutlookWatchSection } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookWatchSection";

const page = () => {
  return (
    <div>
      <WeeklyOutlookHero />
      <WeeklyOutlookSummarySection
        edition="نسخه هفتگی"
        headline="تیتر اصلی جمع‌بندی این هفته"
        summary="یک جمع‌بندی کوتاه از مهم‌ترین تغییرات و زمینه تصمیم در این نسخه."
        items={[
          {
            type: "change",
            title: "مهم‌ترین تغییر این هفته",
            text: "توضیح کوتاه و مستقیم بر اساس تحلیل واقعی نسخه.",
          },
          {
            type: "risk",
            title: "ریسکی که باید دیده شود",
            text: "توضیح کوتاه درباره ریسک مهم این نسخه.",
          },
          {
            type: "watch",
            title: "متغیری که ارزش رصد دارد",
            text: "توضیح کوتاه درباره موضوعی که در ادامه باید دنبال شود.",
          },
        ]}
      />{" "}
      <WeeklyOutlookMacroRiskSection
        thesis="جمع‌بندی کوتاه از مهم‌ترین زمینه ریسک این هفته."
        risks={[
          {
            type: "inflation",
            title: "تیتر ریسک تورمی",
            summary: "توضیح کوتاه بر اساس تحلیل واقعی این نسخه.",
          },
          {
            type: "currency",
            title: "تیتر ریسک ارزی",
            summary: "توضیح کوتاه بر اساس تحلیل واقعی این نسخه.",
          },
          {
            type: "policy",
            title: "تیتر ریسک سیاست‌گذاری",
            summary: "توضیح کوتاه بر اساس تحلیل واقعی این نسخه.",
          },
          {
            type: "liquidity",
            title: "تیتر ریسک نقدینگی",
            summary: "توضیح کوتاه بر اساس تحلیل واقعی این نسخه.",
          },
        ]}
      />
      <WeeklyOutlookAssetViewSection
        thesis="جمع‌بندی کوتاه این هفته درباره شرایط کلی دارایی‌ها."
        items={[
          {
            name: "نام دارایی یا حوزه",
            context: "شرایط مهمی که در این نسخه دیده شده.",
            implication: "این شرایط برای تصمیم مالی چه معنایی دارد.",
          },
          {
            name: "نام دارایی یا حوزه",
            context: "شرایط مهمی که در این نسخه دیده شده.",
            implication: "پیام راهبردی کوتاه برای تصمیم.",
          },
          {
            name: "نام دارایی یا حوزه",
            context: "شرایط مهمی که در این نسخه دیده شده.",
            implication: "پیام راهبردی کوتاه برای تصمیم.",
          },
        ]}
      />
      <WeeklyOutlookWatchSection
        items={[
          {
            type: "macro",
            title: "متغیر کلان اول",
            watchFor: "تغییری که در این هفته باید دنبال شود.",
            implication:
              "اگر تغییر کند، بخشی از فرض‌های تصمیم نیاز به بازبینی دارد.",
          },
          {
            type: "currency",
            title: "متغیر ارزی",
            watchFor: "رفتار یا شرایطی که باید زیر نظر باشد.",
            implication: "می‌تواند ارزیابی ریسک یا نقدینگی را تغییر دهد.",
          },
          {
            type: "policy",
            title: "متغیر سیاست‌گذاری",
            watchFor: "تصمیم یا تغییر سیاستی قابل توجه.",
            implication: "می‌تواند زمینه تصمیم مالی را جابه‌جا کند.",
          },
          {
            type: "liquidity",
            title: "متغیر نقدینگی",
            watchFor: "نشانه‌ای که باید در ادامه رصد شود.",
            implication: "ممکن است نیاز به بازبینی شرایط نقدینگی ایجاد کند.",
          },
        ]}
      />
    </div>
  );
};

export default page;
