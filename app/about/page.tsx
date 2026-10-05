import { AboutClosingSection } from "@/components/static/About/AboutClosingSection";
import { AboutHero } from "@/components/static/About/AboutHero";
import { AboutOriginSection } from "@/components/static/About/AboutOriginSection";

const page = () => {
  return (
    <div>
      <AboutHero />
      <AboutOriginSection />
      <AboutClosingSection />
    </div>
  );
};

export default page;
