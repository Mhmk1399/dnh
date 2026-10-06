export const SERVICE_CATALOG = [
  { key: "private-wealth-strategy", name: "راهبرد ثروت خصوصی", route: "/services/private-wealth-strategy" },
  { key: "portfolio-intelligence", name: "هوشمندی سبد سرمایه‌گذاری", route: "/services/portfolio-intelligence" },
  { key: "strategic-financial-advisory", name: "مشاوره مالی راهبردی", route: "/services/strategic-financial-advisory" },
  { key: "macro-market-advisory", name: "مشاوره بازارهای کلان", route: "/services/macro-market-advisory" },
  { key: "risk-management-wealth-protection", name: "مدیریت ریسک و حفاظت از ثروت", route: "/services/risk-management-wealth-protection" },
  { key: "executive-briefings", name: "جلسات توجیهی مدیران", route: "/services/executive-briefings" },
  { key: "financial-decision-assessment", name: "ارزیابی تصمیم مالی", route: "/financial-decision-assessment" },
  { key: "strategic-consultation", name: "درخواست مشاوره راهبردی", route: "/request-strategic-consultation" },
] as const;

export type ServiceKey = (typeof SERVICE_CATALOG)[number]["key"];

export function getService(key: string) {
  return SERVICE_CATALOG.find((service) => service.key === key);
}

