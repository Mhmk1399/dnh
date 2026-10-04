"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown, CircleDollarSign, Send } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import {
  ASSESSMENT_PATH,
  CONSULTATION_PATH,
  DNH_ITEMS,
  getSiteHref,
  LEGAL_LINKS,
  SERVICE_ITEMS,
  TARGET_MARKET_ITEMS,
  type SiteLink,
} from "@/config/site-navigation";
import styles from "./Footer.module.css";

type FooterGroup = { id: string; title: string; links: SiteLink[] };

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
    id: "markets",
    title: "برای چه کسانی؟",
    links: TARGET_MARKET_ITEMS,
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
  { title: "اینستاگرام", icon: InstagramIcon, href: "" },
  { title: "لینکدین", icon: LinkedinIcon, href: "" },
  { title: "تلگرام", icon: Send, href: "" },
];

export default function Footer() {
  const pathname = usePathname();
  const siteHref = (href: string) => getSiteHref(href, pathname);
  const year = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    timeZone: "Asia/Tehran",
  }).format(new Date());

  return (
    <footer dir="rtl" aria-label="پاورقی وب‌سایت DNH" className={styles.footer}>
      <div className={styles.shell}>
        <section
          aria-labelledby="footer-closing-title"
          className={styles.invitation}
        >
          <div className={styles.invitationCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              از یک گفت‌وگو شروع کنیم
            </p>
            <h2 id="footer-closing-title">
              تصمیم مهم بعدی،
              <br />
              با <span>تصویری روشن‌تر.</span>
            </h2>
            <p className={styles.invitationDescription}>
              موقعیت مالی خود را بشناسید و مسیر مناسب همکاری با DNH را پیدا
              کنید.
            </p>
          </div>

          <div className={styles.invitationActions}>
            <ActionButton
              href={siteHref(CONSULTATION_PATH)}
              variant="assessment"
              size="md"
              icon={ArrowLeft}
              fullWidth
              className={styles.consultationButton}
            >
              درخواست مشاوره راهبردی
            </ActionButton>
            <ActionButton
              href={siteHref(ASSESSMENT_PATH)}
              variant="secondary"
              size="md"
              icon={CircleDollarSign}
              iconPosition="start"
              fullWidth
              className={styles.assessmentButton}
            >
              ارزیابی تصمیم مالی
            </ActionButton>
          </div>
        </section>

        <div className={styles.content}>
          <div className={styles.brand}>
            <Link href="/" aria-label="DNH، صفحه اصلی" className={styles.logo}>
              <Image
                src="/assets/images/LOGO.svg"
                alt="DNH"
                width={170}
                height={46}
                sizes="170px"
              />
            </Link>
            <p className={styles.brandTitle}>معماری ثروت، برای فردای شما.</p>
            <p className={styles.brandDescription}>
              داده، تحلیل و نگاه راهبردی؛ برای دیدن ارتباط میان ثروت، ریسک و
              تصمیم‌های مهم زندگی.
            </p>
            <FooterSocials />
          </div>

          <nav
            aria-label="دسترسی سریع پاورقی"
            className={styles.desktopNavigation}
          >
            {footerGroups.map((group) => (
              <section key={group.id} aria-labelledby={"footer-" + group.id}>
                <h2 id={"footer-" + group.id} className={styles.groupTitle}>
                  {group.title}
                </h2>
                <FooterLinks links={group.links} pathname={pathname} />
              </section>
            ))}
          </nav>

          <nav
            aria-label="دسترسی سریع پاورقی"
            className={styles.mobileNavigation}
          >
            {footerGroups.map((group) => (
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
          <nav aria-label="اطلاعات حقوقی">
            <ul className={styles.legalLinks}>
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={siteHref(item.href)}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className={styles.copyright}>
            © {year} <bdi>DNH</bdi> · تمامی حقوق محفوظ است.
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
  return (
    <ul className={styles.links}>
      {links.map((item) => (
        <li key={item.href}>
          <Link href={getSiteHref(item.href, pathname)}>
            <span>{item.title}</span>
            <ArrowLeft aria-hidden="true" size={14} strokeWidth={1.7} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterSocials() {
  const hasPendingProfiles = socialLinks.some((item) => !item.href);

  return (
    <div className={styles.socials}>
      <p className={styles.socialTitle}>در شبکه‌های اجتماعی</p>
      <ul>
        {socialLinks.map(({ title, href, icon: Icon }) => (
          <li key={title}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={title + " DNH، در پنجره جدید"}
              >
                <Icon aria-hidden="true" size={17} strokeWidth={1.65} />
                <span>{title}</span>
              </a>
            ) : (
              <span
                className={styles.pendingSocial}
                aria-disabled="true"
                aria-label={title + "، هنوز فعال نیست"}
              >
                <Icon aria-hidden="true" size={17} strokeWidth={1.65} />
                <span>{title}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      {hasPendingProfiles && (
        <p className={styles.socialNote}>
          پیوندهای شبکه‌های اجتماعی هنوز فعال نیستند.
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
