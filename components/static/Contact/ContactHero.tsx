import Image from "next/image";

export type ContactHeroContent = {
  eyebrow: string; title: string; highlight: string; description: string;
  qualification: string; imageAlt: string; formCta: string;
};

export function ContactHero({ content }: { content: ContactHeroContent }) {
  return (
    <section aria-labelledby="contact-hero-title" className="relative overflow-hidden bg-[#062833] pt-[84px] text-white sm:pt-[96px] lg:pt-[88px]">
      <div className="dnh-site-shell mx-auto grid w-full max-w-[1536px] lg:h-[760px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative order-2 flex items-center px-5 py-14 sm:px-8 sm:py-16 lg:order-1 lg:px-12 lg:py-16 xl:px-16 2xl:px-20">
          <div className="max-w-[650px]">
            <div className="flex items-center gap-3 text-[13px] font-bold text-[#a8d5df]"><span className="h-0.5 w-10 bg-brand-accent" aria-hidden="true" /><span>{content.eyebrow}</span></div>
            <h1 id="contact-hero-title" className="mt-6 max-w-[15ch] text-pretty text-[clamp(2.35rem,8vw,3.8rem)] font-black leading-[1.35] tracking-normal lg:text-[clamp(3rem,4vw,4rem)] lg:leading-[1.28]">{content.title} <span className="text-brand-accent">{content.highlight}</span></h1>
            <p className="mt-7 max-w-[58ch] text-[15px] font-medium leading-[2.05] text-[#c2d6db] sm:text-[17px]">{content.description}</p>
            <p className="mt-5 border-s-2 border-brand-accent ps-4 text-[13px] leading-7 text-[#91b4bd]">{content.qualification}</p>
            <a href="#contact-form" className="mt-9 inline-flex min-h-14 items-center justify-center bg-brand-accent px-7 text-[14px] font-black text-[#10242c] outline-none transition hover:bg-white focus-visible:ring-4 focus-visible:ring-brand-accent/35">{content.formCta}</a>
          </div>
        </div>
        <div className="relative order-1 min-h-[360px] border-b border-white/10 sm:min-h-[430px] lg:order-2 lg:min-h-0 lg:border-b-0 lg:border-s">
          <Image src="/assets/images/dnh-hero-desktop.png" alt={content.imageAlt} fill priority sizes="(max-width: 1023px) 100vw, 54vw" className="object-cover object-[29%_center] sm:object-[30%_center] lg:object-[28%_center]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062833]/45 via-transparent to-transparent lg:bg-gradient-to-e lg:from-[#062833]/20 lg:to-transparent" aria-hidden="true" />
          <span className="absolute bottom-0 start-0 h-1 w-24 bg-brand-accent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
