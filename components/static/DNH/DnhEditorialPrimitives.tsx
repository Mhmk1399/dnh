import { getImageProps } from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

export type DnhEditorialMedia = {
  src: string;
  mobile_src?: string;
  alt: string;
};

export type DnhEditorialCta = {
  id: string;
  label: string;
  type: "primary" | "secondary";
  href: string;
};

export function DnhHighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight?: string;
}) {
  const normalizedHighlight = highlight?.trim() ?? "";
  const index = normalizedHighlight
    ? heading.indexOf(normalizedHighlight)
    : -1;

  if (index < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, index)}
      <span className="text-brand-accent">
        {heading.slice(index, index + normalizedHighlight.length)}
      </span>
      {heading.slice(index + normalizedHighlight.length)}
    </>
  );
}

export function DnhEditorialEyebrow({
  eyebrow,
  englishLabel,
  locale,
  dark = false,
}: {
  eyebrow: string;
  englishLabel?: string;
  locale: "fa" | "en";
  dark?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-start">
      <span
        aria-hidden="true"
        className="h-[2px] w-10 shrink-0 bg-brand-accent sm:w-12"
      />
      <p
        className={`text-[12px] font-extrabold leading-[1.8] sm:text-[13px] ${
          dark ? "text-white/[0.9]" : "text-brand-primary"
        }`}
      >
        {eyebrow}
      </p>
   
    </div>
  );
}

export function DnhEditorialMediaFrame({
  media,
  label,
  priority = false,
  sizes,
  className = "aspect-[4/5] min-h-[430px] lg:min-h-[600px] lg:aspect-auto",
}: {
  media: DnhEditorialMedia;
  label?: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const desktopImage = getImageProps({
    src: media.src,
    alt: media.alt,
    fill: true,
    sizes,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : "auto",
    className: "h-full w-full object-cover object-center",
  }).props;
  const mobileImage = media.mobile_src
    ? getImageProps({
        src: media.mobile_src,
        alt: media.alt,
        fill: true,
        sizes: "calc(100vw - 24px)",
        loading: priority ? "eager" : "lazy",
        fetchPriority: priority ? "high" : "auto",
        className: "h-full w-full object-cover object-center",
      }).props
    : null;

  return (
    <div
      className={`relative overflow-hidden border border-white/16 bg-brand-primary ${className}`}
    >
      <picture className="absolute inset-0 block h-full w-full">
        {mobileImage ? (
          <source
            media="(max-width: 767px)"
            srcSet={mobileImage.srcSet}
            sizes={mobileImage.sizes}
          />
        ) : null}
        <img {...desktopImage} alt={media.alt} />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/68 via-transparent to-brand-primary/10"
      />
   
    
    </div>
  );
}

export function DnhEditorialActions({
  ctas,
  direction,
  dark = false,
  className = "",
}: {
  ctas: DnhEditorialCta[];
  direction: "rtl" | "ltr";
  dark?: boolean;
  className?: string;
}) {
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;

  if (ctas.length === 0) return null;

  return (
    <div
      className={`flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}
    >
      {ctas.map((cta) => (
        <ActionButton
          key={cta.id}
          href={cta.href}
          variant={cta.type}
          shape="square"
          size="lg"
          icon={Arrow}
          iconPosition="end"
          dir={direction}
          className={`min-h-12 w-full min-w-0 whitespace-normal text-center [overflow-wrap:anywhere] sm:w-auto ${
            dark && cta.type === "primary"
              ? "bg-brand-accent text-white shadow-none hover:bg-brand-primary hover:shadow-none"
              : dark
                ? "border-white/30 bg-transparent text-white shadow-none hover:border-brand-accent hover:bg-white/[0.06] hover:text-white hover:shadow-none"
                : ""
          }`}
        >
          {cta.label}
        </ActionButton>
      ))}
    </div>
  );
}
