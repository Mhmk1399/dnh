export type PortfolioCta = { label: string; type: string };
export type PortfolioItem = { number?: number; title: string; description: string; english_label?: string };
export type PortfolioSection = {
  order: number; id: string; type: string; eyebrow: string; english_label?: string; heading: string;
  paragraphs?: string[]; intro?: string; items?: PortfolioItem[]; assets?: PortfolioItem[]; routes?: PortfolioItem[];
  questions?: string[]; steps?: PortfolioItem[]; checklist?: string[]; framework_logic?: string;
  closing?: string; closing_paragraphs?: string[]; ctas?: PortfolioCta[];
};
export type PortfolioDocument = {
  page: string; brand: string; locale: string; direction: "rtl" | "ltr"; title: string;
  english_title?: string; section_count: number; sections: PortfolioSection[];
};
