import FaqSection from "@/components/global/FaqSection";
import FinalConversionSection from "@/components/global/FinalConversionSection";
import AboutDrNasimSection from "@/components/static/Home/AboutDrNasimSection";
import DnhFrameworkSection from "@/components/static/Home/DnhFrameworkSection";
import HomeHero from "@/components/static/Home/HomeHero";
import ServicesSection from "@/components/static/Home/ServicesSection";
import TargetMarketsSection from "@/components/static/Home/TargetMarketsSection";
import WealthArchitectureSection from "@/components/static/Home/WealthArchitectureSection";
import WhatIsDnhSection from "@/components/static/Home/WhatIsDnhSection";

export default function Home() {
  return (
    <div className=" ">
      <HomeHero />
      <TargetMarketsSection />
      <WhatIsDnhSection />
      <AboutDrNasimSection />
      <DnhFrameworkSection />
      <WealthArchitectureSection />
      <ServicesSection />
      <FaqSection />
      <FinalConversionSection />
    </div>
  );
}
