"use client";

import Image from "next/image";
import { LocalizedLink as Link } from "@/components/providers/LanguageProvider";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronDown, CircleDollarSign, Send } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import { useLanguage } from "@/components/providers/LanguageProvider";
import shellContent from "@/config/site-shell.json";
import {
  ASSESSMENT_PATH,
  CONSULTATION_PATH,
  DNH_ITEMS,
  getSiteHref,
  getLocalizedSiteNavigation,
  SERVICE_ITEMS,
  type SiteLink,
} from "@/config/site-navigation";
import styles from "./Footer.module.css";

type FooterGroup = { id: "dnh" | "services" | "contact"; title: string; links: SiteLink[] };

const footerGroups: FooterGroup[] = [
  {
    id: "dnh",
    title: "دنیای DNH",
    links: [...DNH_ITEMS, { title: "درباره ما", href: "/about" }],
  },
  {
    id: "services",
    title: "خدمات تخصصی",
    links: [{ title: "نمای کلی خدمات", href: "/services" }, ...SERVICE_ITEMS],
  },
 
  {
    id: "contact",
    title: "همراه شما",
    links: [
      { title: "ارزیابی تصمیم مالی", href: ASSESSMENT_PATH },
      { title: "درخواست مشاوره راهبردی", href: CONSULTATION_PATH },
      { title: "دانش و بینش", href: "/knowledge" },
      { title: "تماس با ما", href: "/contact" },
    ],
  },
];

// Add only verified profile URLs here; an unconfigured profile is never a link.
const socialLinks = [
  { id: "instagram", icon: InstagramIcon, href: "" },
  { id: "linkedin", icon: LinkedinIcon, href: "" },
  { id: "telegram", icon: Send, href: "" },
] as const;

export default function Footer() {
  const { locale, direction, languageTag, isRTL } = useLanguage();
  const copy = shellContent[locale].footer;
  const { legalLinks, translateLink } = getLocalizedSiteNavigation(locale);
  const groups = footerGroups.map((group) => ({
    ...group,
    title: copy.groups[group.id],
    links: group.links.map(translateLink),
  }));
  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;
  const pathname = usePathname();
  const siteHref = (href: string) => getSiteHref(href, pathname);
  const year = new Intl.DateTimeFormat(languageTag, {
    year: "numeric",
    calendar: isRTL ? "persian" : "gregory",
    timeZone: "Asia/Tehran",
  }).format(new Date());

  return (
    <footer dir={direction} aria-label={copy.label} className={styles.footer}>
      <div className={styles.shell}>
      

        <div className={styles.content}>
          <div className={styles.brand}>
            <Link href="/" aria-label={copy.home} className={styles.logo}>
              <Image
                src="/assets/images/LOGO.svg"
                alt="DNH"
                width={170}
                height={46}
                sizes="170px"
              />
            </Link>
            <p className={styles.brandTitle}>{copy.brandTitle}</p>
            <p className={styles.brandDescription}>
              {copy.brandDescription}
            </p>
            <FooterSocials />
          </div>

          <nav
            aria-label={copy.navigation}
            className={styles.desktopNavigation}
          >
            {groups.map((group) => (
              <section key={group.id} aria-labelledby={"footer-" + group.id}>
                <h2 id={"footer-" + group.id} className={styles.groupTitle}>
                  {group.title}
                </h2>
                <FooterLinks links={group.links} pathname={pathname} />
              </section>
            ))}
          </nav>

          <nav
            aria-label={copy.navigation}
            className={styles.mobileNavigation}
          >
            {groups.map((group) => (
              <details
                key={group.id}
                name="footer-navigation"
                className={styles.mobileGroup}
              >
                <summary>
                  <span>{group.title}</span>
                  <ChevronDown aria-hidden="true" size={18} strokeWidth={1.7} />
                </summary>
                <FooterLinks links={group.links} pathname={pathname} />
              </details>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <nav aria-label={copy.legal}>
            <ul className={styles.legalLinks}>
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={siteHref(item.href)}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className={styles.copyright}>
            © {year} <bdi>DNH</bdi> · {copy.copyright}
          </p>
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
      {links.map((item) => (
        <li key={item.href}>
          <Link href={getSiteHref(item.href, pathname)}>
            <span>{item.title}</span>
            <DirectionArrow aria-hidden="true" size={14} strokeWidth={1.7} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterSocials() {
  const { locale } = useLanguage();
  const copy = shellContent[locale].footer;
  const hasPendingProfiles = socialLinks.some((item) => !item.href);

  return (
    <div className={styles.socials}>
      <p className={styles.socialTitle}>{copy.socialTitle}</p>
      <ul>
        {socialLinks.map(({ id, href, icon: Icon }) => (
          <li key={id}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.socials[id]} DNH, ${copy.newWindow}`}
              >
                <Icon aria-hidden="true" size={17} strokeWidth={1.65} />
                <span>{copy.socials[id]}</span>
              </a>
            ) : (
              <span
                className={styles.pendingSocial}
                aria-disabled="true"
                aria-label={`${copy.socials[id]}, ${copy.unavailable}`}
              >
                <Icon aria-hidden="true" size={17} strokeWidth={1.65} />
                <span>{copy.socials[id]}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      {hasPendingProfiles && (
        <p className={styles.socialNote}>
          {copy.socialPending}
        </p>
      )}
    </div>
  );
}

type SocialIconProps = { size?: number; strokeWidth?: number };

function InstagramIcon({ size = 17, strokeWidth = 1.65 }: SocialIconProps) {
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

function LinkedinIcon({ size = 17, strokeWidth = 1.65 }: SocialIconProps) {
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
