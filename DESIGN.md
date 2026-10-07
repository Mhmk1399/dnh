---
version: alpha
name: DNH
description: Persian wealth advisory with a clear architectural approach to navigation.
colors:
  primary: "#167394"
  secondary: "#157293"
  accent: "#fc8502"
  page: "#ffffff"
typography:
  sans:
    fontFamily: "Estedad, sans-serif"
rounded:
  shell: "24px"
  item: "14px"
  icon: "12px"
spacing:
  shell-max: "1440px"
  shell-gutter-desktop: "24px"
  shell-gutter-tablet: "16px"
  shell-gutter-mobile: "12px"
  touch-min: "44px"
components:
  siteShell:
    width: "1440px"
  navigation:
    rounded: "24px"
  footer:
    rounded: "24px"
---

# DNH visual context

## Overview

This is a Persian, RTL brand website for wealth architecture and strategic financial advice. The public shell helps visitors recognize their financial situation, explore services, and reach an assessment or consultation. The visual reference is an architectural advisory dossier: quiet white surfaces, carefully separated information, deep blue-green chapter panels, and a restrained orange rule.

The October 2026 header/footer redesign establishes a shared public shell. Preserve the existing home sections and photography. Avoid trading-terminal density, speculative performance promises, excessive glass layers, large watermark lettering, and decorative orbit animations.

## Colors

Runtime ownership remains in `app/theme.css`. This file documents rather than generates tokens. The brand values above map to `--dnh-primary`, `--dnh-secondary`, `--dnh-accent`, and `--dnh-bg-page`. Tailwind aliases are defined by the existing `@theme inline` adapter. Header/footer CSS Modules consume these same variables directly.

Use `--dnh-text` for readable navigation text and `--dnh-text-muted` for supporting copy. Quiet surfaces and borders use `--dnh-bg-soft` and `--dnh-border`. Introductory panels mix secondary at 38% with `#101820`; this is a shell surface treatment, not a replacement brand color. Orange marks active routes and keyboard focus, and is used sparingly on dark surfaces. No theme toggle is currently offered.

## Typography

Retain the installed Estedad family and its existing weight mapping. Headings use 750–900 weights, navigation 600–750, and descriptions 400–500. Persian text needs relaxed line heights (1.8–2.1), natural shaping, and no letter spacing. Navigation titles wrap on phones; essential labels are never ellipsized. DNH remains the brand spelling; interface instructions and actions are Persian.

## Layout

Header and footer share a 1440px maximum width. The header is fixed over the hero with an inset, readable white bar; the logo stays on the right. Desktop navigation starts at 1280px to leave space for Persian labels and the consultation action. Smaller screens use a modal drawer at the right edge, up to 440px wide, with a separately scrolling link list and persistent actions. Account for top/bottom safe-area insets. Interactive targets are at least 44px high.

Home-page section containers use the shared `.dnh-site-shell` rhythm: 1440px max width with 24px desktop, 16px tablet, and 12px phone gutters. The shell edge should line up with the header and footer edge; local section content may still use its own internal grid, gap, and vertical spacing.

Desktop mega menus combine a dark introduction with grouped, icon-led links. Footer uses the same shell geometry, dark consultation panel and quieter grouped links. Native footer disclosures replace link columns under 768px.

## Elevation & Depth

Reserve shadows for the floating header and menu panels. A single low-radius backdrop filter belongs on the header bar, not every navigation item. Dark intro panels use solid tonal contrast. Desktop menu backdrop sits at `--dnh-layer-navigation-scrim` (50), below `--dnh-layer-navigation` (60). The native mobile dialog owns the browser top layer and background inertness.

## Shapes

Use 24px outer shells, 14–18px internal surfaces, and 12px icon tiles. Preserve the existing square `ActionButton` body and its circular icon container; this redesign does not change the global button radius. Thin rules organize content instead of adding many nested bordered cards.

## Components

`config/site-navigation.ts` owns header/footer link titles, destinations, groups, and action destinations. The public website is Persian-only for now, so header, footer, sitemap and CTAs use unprefixed routes such as `/services` rather than locale-prefixed service URLs. `getSiteHref` normalizes any legacy locale-prefixed inputs back to the unprefixed route. The populated public homepage remains `/`. Most content pages are intentionally empty stubs.

`components/ui/ActionButton.tsx` owns prominent calls to action. Ordinary navigation links and disclosure controls retain their native semantics. All shell controls have visible focus, hover and pressed feedback. Disabled social profiles are non-links with an honest unavailable state; never invent account URLs.

Header authentication entry points are secondary actions: desktop places ورود and ثبت‌نام beside the consultation CTA, while mobile keeps them inside the drawer rather than in the fixed top bar.

Desktop menus support hover with a short grace period, click, keyboard disclosure, ArrowDown into links, Escape with focus restoration, and outside dismissal. Closed panels are inert. Route changes reset menu state. Mobile uses a native modal dialog with Escape, focus containment, background scroll lock, and Lenis-safe internal scrolling. Drawer accordions reveal one section at a time. Footer disclosures work independently of JavaScript.

Icons follow the installed Lucide stroke style (1.5–1.8), normally 18–22px. Only social brand glyphs use local SVG. Motion is limited to 180–240ms feedback and panel transitions; `prefers-reduced-motion` disables shell animation.

PWA and favicon assets use a purpose-built square DNH mark: primary/secondary teal background, white architectural bars, and a small orange accent. Regenerate them with `npm run icons:pwa` instead of manually exporting separate sizes.

Global scrollbars are styled in `app/globals.css`: the track uses the dark petroleum teal shell, while the thumb uses a glass-like light teal highlight with subtle orange active feedback. Keep the standards-based `scrollbar-color` fallback and forced-colors reset whenever adjusting the WebKit treatment.

## Do's and Don'ts

- Keep header, mega menu and footer tokens and link sources coordinated.
- Test desktop, 320px and 390px phones, short landscape, keyboard, scrolling and route changes.
- Keep essential consultation actions reachable while a mobile link list scrolls.
- Do not fabricate social URLs, contact details, credentials or investment claims.
- Do not change unrelated home sections as part of shell maintenance.
