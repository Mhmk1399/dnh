import type { Metadata } from "next";

import { TestHome } from "./TestHome";

export const metadata: Metadata = {
  title: "خانه — کانسپت معماری هوشمند",
  description: "نسخه آزمایشی صفحه اصلی DNH با رویکرد معماری هوشمند.",
};

export default function TestPage() {
  return <TestHome />;
}
