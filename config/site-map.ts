export type SitePageType =
    | "core"
    | "dnh"
    | "service"
    | "audience"
    | "knowledge"
    | "conversion"
    | "legal";

export type SiteMapEntry = {
    path: string;
    type: SitePageType;
    indexable: boolean;
};

export const SITE_MAP: SiteMapEntry[] = [
    /* ===========================================================================
       Core
    =========================================================================== */

    {
        path: "/",
        type: "core",
        indexable: true,
    },

    {
        path: "/about",
        type: "core",
        indexable: true,
    },

    /* ===========================================================================
       DNH
    =========================================================================== */

    {
        path: "/dnh/wealth-architecture",
        type: "dnh",
        indexable: true,
    },

    {
        path: "/dnh/framework",
        type: "dnh",
        indexable: true,
    },

    {
        path: "/dnh/intelligence-desk",
        type: "dnh",
        indexable: true,
    },

    /* ===========================================================================
       Services
    =========================================================================== */

    {
        path: "/services",
        type: "service",
        indexable: true,
    },

    {
        path: "/services/private-wealth-strategy",
        type: "service",
        indexable: true,
    },

    {
        path: "/services/portfolio-intelligence",
        type: "service",
        indexable: true,
    },

    {
        path: "/services/strategic-financial-advisory",
        type: "service",
        indexable: true,
    },

    {
        path: "/services/macro-market-advisory",
        type: "service",
        indexable: true,
    },

    {
        path: "/services/risk-management-wealth-protection",
        type: "service",
        indexable: true,
    },

    {
        path: "/services/executive-briefings",
        type: "service",
        indexable: true,
    },

    /* ===========================================================================
       Who We Help
    =========================================================================== */

    {
        path: "/who-we-help/big-financial-decision",
        type: "audience",
        indexable: true,
    },

    {
        path: "/who-we-help/unstructured-portfolio",
        type: "audience",
        indexable: true,
    },

    {
        path: "/who-we-help/holdings-financial-capital-structure",
        type: "audience",
        indexable: true,
    },

    /* ===========================================================================
       Knowledge & Research
    =========================================================================== */

    {
        path: "/knowledge",
        type: "knowledge",
        indexable: true,
    },

    {
        path: "/knowledge/weekly-outlook",
        type: "knowledge",
        indexable: true,
    },

    {
        path: "/knowledge/insights",
        type: "knowledge",
        indexable: true,
    },

    {
        path: "/knowledge/research",
        type: "knowledge",
        indexable: true,
    },

    {
        path: "/knowledge/case-studies",
        type: "knowledge",
        indexable: true,
    },

    {
        path: "/knowledge/faq",
        type: "knowledge",
        indexable: true,
    },

    /* ===========================================================================
       Conversion
    =========================================================================== */

    {
        path: "/financial-decision-assessment",
        type: "conversion",
        indexable: true,
    },

    {
        path: "/request-strategic-consultation",
        type: "conversion",
        indexable: true,
    },

    {
        path: "/contact",
        type: "conversion",
        indexable: true,
    },

    /* ===========================================================================
       Legal
    =========================================================================== */

    {
        path: "/legal/privacy-policy",
        type: "legal",
        indexable: true,
    },

    {
        path: "/legal/terms-of-use",
        type: "legal",
        indexable: true,
    },

    {
        path: "/legal/financial-disclaimer",
        type: "legal",
        indexable: true,
    },

    {
        path: "/legal/data-protection-advisory-limitation",
        type: "legal",
        indexable: true,
    },

    {
        path:
            "/legal/no-investment-guarantee-no-trading-signal",
        type: "legal",
        indexable: true,
    },
];