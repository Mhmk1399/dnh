import { WealthArchitectureSection } from "@/components/static/Home/AboutDnhSection";
import { DnhFrameworkSection } from "@/components/static/Home/DnhFrameworkSection";
import { HomeHero } from "@/components/static/Home/HomeHero";
import { LeadSection } from "@/components/pages/LeadSection";

export default function HomePage() {
  return (
    <>
      <main>
        <HomeHero />
        <WealthArchitectureSection />
        <DnhFrameworkSection />
        <LeadSection />
      </main>
    </>
  );
}
