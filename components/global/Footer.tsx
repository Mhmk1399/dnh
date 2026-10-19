"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  ChevronDown,
  Send,
} from "lucide-react";
import type { ComponentType } from "react";

import {
  LocalizedLink as Link,
  useLanguage,
} from "@/components/providers/LanguageProvider";
import shellContent from "@/config/site-shell.json";
import {
  ASSESSMENT_PATH,
  CONSULTATION_PATH,
  DNH_ITEMS,
  SERVICE_ITEMS,
  getLocalizedSiteNavigation,
  getSiteHref,
  isSitePathActive,
  type SiteLink,
} from "@/config/site-navigation";
import styles from "./Footer.module.css";

type FooterGroupId = "dnh" | "services" | "contact";
type FooterGroup = { id: FooterGroupId; links: SiteLink[] };

type SocialId = "instagram" | "linkedin" | "telegram";
type SocialIconProps = {
  size?: number;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
};
type SocialProfile = {
  id: SocialId;
  href: string;
  icon: ComponentType<SocialIconProps>;
};

const FOOTER_GROUPS: FooterGroup[] = [
  {
    id: "dnh",
    links: [...DNH_ITEMS, { title: "درباره ما", href: "/about" }],
  },
  {
    id: "services",
    links: [{ title: "نمای کلی خدمات", href: "/services" }, ...SERVICE_ITEMS],
  },
  {
    id: "contact",
    links: [
      { title: "ارزیابی تصمیم مالی", href: ASSESSMENT_PATH },
      { title: "درخواست مشاوره راهبردی", href: CONSULTATION_PATH },
      { title: "دانش و بینش", href: "/knowledge" },
      { title: "تماس با ما", href: "/contact" },
    ],
  },
];

// Add verified URLs here. Empty URLs stay non-clickable, never invented.
const SOCIAL_PROFILES: SocialProfile[] = [
  { id: "instagram", icon: Instagram, href: "" },
  { id: "linkedin", icon: Linkedin, href: "" },
  { id: "telegram", icon: Send, href: "" },
];

export default function Footer() {
  const pathname = usePathname();
  const { locale, direction, languageTag, isRTL } = useLanguage();
  const copy = shellContent[locale].footer;
  const navCopy = shellContent[locale].navbar;
  const { legalLinks, translateLink } = getLocalizedSiteNavigation(locale);

  const groups = FOOTER_GROUPS.map((group) => ({
    id: group.id,
    title: copy.groups[group.id],
    links: group.links.map(translateLink),
  }));

  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;
  const DiagonalArrow = isRTL ? ArrowUpLeft : ArrowUpRight;
  const siteHref = (path: string) => getSiteHref(path, pathname);

  const year = new Intl.DateTimeFormat(languageTag, {
    year: "numeric",
    calendar: isRTL ? "persian" : "gregory",
    timeZone: "Asia/Tehran",
  }).format(new Date());

  return (
    <footer
      dir={direction}
      lang={languageTag}
      aria-label={copy.label}
      className={styles.footer}
    >
      <div className={styles.ambient} aria-hidden="true" />

      <div className={styles.shell}>
        {/* Invitation panel: same frosted, premium language as the navbar. */}
        <section
          className={styles.invitation}
          aria-labelledby="dnh-footer-invitation"
        >
          <div className={styles.invitationDecor} aria-hidden="true" />

          <div className={styles.invitationCopy}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span>{copy.groups.contact}</span>
            </div>

            <h2 id="dnh-footer-invitation" className={styles.invitationTitle}>
              {navCopy.strategicConsultation}
            </h2>
            <p className={styles.invitationDescription}>
              {navCopy.conversation}
            </p>
          </div>

          <div className={styles.invitationActions}>
            <Link
              href={siteHref(CONSULTATION_PATH)}
              className={styles.consultationLink}
            >
              <span>{navCopy.consultation}</span>
              <span className={styles.actionIcon} aria-hidden="true">
                <DiagonalArrow size={18} strokeWidth={1.9} />
              </span>
            </Link>
            <Link
              href={siteHref(ASSESSMENT_PATH)}
              className={styles.assessmentLink}
            >
              <span>{navCopy.assessment}</span>
              <DirectionArrow size={17} aria-hidden="true" strokeWidth={1.8} />
            </Link>
            <span className={styles.invitationHint}>
              <span className={styles.hintDot} aria-hidden="true" />
              {navCopy.help}
            </span>
          </div>
        </section>

        <div className={styles.content}>
          {/* Brand + social presence */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label={copy.home}>
              <Image
                src="/assets/images/LOGOWHITE.svg"
                alt="DNH"
                width={170}
                height={52}
                sizes="(max-width: 767px) 130px, 150px"
                className={styles.logoImage}
                unoptimized
              />
            </Link>
            <p className={styles.brandTitle}>{copy.brandTitle}</p>
            <p className={styles.brandDescription}>{copy.brandDescription}</p>
            <FooterSocials />
          </div>

          {/* Desktop: three carefully spaced columns. */}
          <nav
            aria-label={copy.navigation}
            className={styles.desktopNavigation}
          >
            {groups.map((group) => (
              <section
                key={group.id}
                aria-labelledby={`footer-desktop-${group.id}`}
              >
                <h3
                  id={`footer-desktop-${group.id}`}
                  className={styles.groupTitle}
                >
                  <span className={styles.groupMarker} aria-hidden="true" />
                  {group.title}
                </h3>
                <FooterLinks links={group.links} pathname={pathname} />
              </section>
            ))}
          </nav>

          {/* Mobile: native, keyboard-accessible accordions. */}
          <nav aria-label={copy.navigation} className={styles.mobileNavigation}>
            {groups.map((group) => (
              <details
                key={group.id}
                name="dnh-footer-navigation"
                className={styles.mobileGroup}
              >
                <summary>
                  <span className={styles.mobileGroupTitle}>
                    <span className={styles.groupMarker} aria-hidden="true" />
                    {group.title}
                  </span>
                  <ChevronDown size={19} strokeWidth={1.7} aria-hidden="true" />
                </summary>
                <div className={styles.mobileGroupBody}>
                  <FooterLinks links={group.links} pathname={pathname} />
                </div>
              </details>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <span className={styles.copyrightMark} aria-hidden="true" />
            <span>
              &copy; {year} <bdi dir="ltr">DNH</bdi> &middot; {copy.copyright}
            </span>
          </p>
          <nav aria-label={copy.legal}>
            <ul className={styles.legalLinks}>
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={siteHref(item.href)}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  links,
  pathname,
}: {
  links: SiteLink[];
  pathname: string;
}) {
  const { isRTL } = useLanguage();
  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <ul className={styles.links}>
      {links.map((item) => {
        const isActive = isSitePathActive(item.href, pathname);

        return (
          <li key={item.href}>
            <Link
              href={getSiteHref(item.href, pathname)}
              data-active={isActive}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{item.title}</span>
              <DirectionArrow size={15} strokeWidth={1.7} aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function FooterSocials() {
  const { locale } = useLanguage();
  const copy = shellContent[locale].footer;
  const hasPendingProfiles = SOCIAL_PROFILES.some((profile) => !profile.href);

  return (
    <div className={styles.socials}>
      <p className={styles.socialTitle}>{copy.socialTitle}</p>
      <ul>
        {SOCIAL_PROFILES.map(({ id, icon: Icon, href }) => (
          <li key={id}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.socials[id]} DNH, ${copy.newWindow}`}
                title={copy.socials[id]}
                className={styles.socialLink}
              >
                <Icon size={18} strokeWidth={1.7} aria-hidden={true} />
              </a>
            ) : (
              <span
                className={styles.pendingSocial}
                aria-label={`${copy.socials[id]}, ${copy.unavailable}`}
                title={`${copy.socials[id]} - ${copy.unavailable}`}
              >
                <Icon size={18} strokeWidth={1.7} aria-hidden={true} />
              </span>
            )}
          </li>
        ))}
      </ul>
      {hasPendingProfiles ? (
        <p className={styles.socialNote}>{copy.socialPending}</p>
      ) : null}
    </div>
  );
}

function Instagram({ size = 17, strokeWidth = 1.65 }: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Linkedin({ size = 17, strokeWidth = 1.65 }: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <circle cx="6.2" cy="6.3" r="1.3" fill="currentColor" stroke="none" />
      <path
        d="M5 9.5V19M10 19V9.5M10 13.4C10.7 11 12.1 9.5 14.5 9.5C17.2 9.5 19 11.2 19 14.4V19"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
