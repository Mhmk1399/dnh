import type { MetadataRoute } from "next";

import { SITE_MAP } from "@/config/site-map";

/* =============================================================================
   Base URL
============================================================================= */

function getSiteUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(
            /\/$/,
            "",
        );
    }

    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    return "http://localhost:3000";
}

const BASE_URL = getSiteUrl();

/* =============================================================================
   Localized paths
============================================================================= */

type Locale = "fa" | "en";

function localizedPath(
    path: string,
    locale: Locale,
) {
    /*
     * Persian homepage:
     * /
     *
     * English homepage:
     * /en
     */
    if (path === "/") {
        return locale === "fa" ? "/" : "/en";
    }

    return `/${locale}${path}`;
}

function absoluteUrl(path: string) {
    return `${BASE_URL}${path}`;
}

/* =============================================================================
   Sitemap
============================================================================= */

export default function sitemap(): MetadataRoute.Sitemap {
    const publicPages = SITE_MAP.filter(
        (page) => page.indexable,
    );

    return publicPages.flatMap((page) => {
        const faPath = localizedPath(
            page.path,
            "fa",
        );

        const enPath = localizedPath(
            page.path,
            "en",
        );

        const alternates = {
            languages: {
                "fa-IR": absoluteUrl(faPath),
                en: absoluteUrl(enPath),
            },
        };

        return [
            {
                url: absoluteUrl(faPath),
                alternates,
            },

            {
                url: absoluteUrl(enPath),
                alternates,
            },
        ];
    });
}