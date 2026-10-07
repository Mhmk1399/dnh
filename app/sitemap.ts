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

    return publicPages.map((page) => ({
        url: absoluteUrl(page.path),
    }));
}
