<a name="readme-top"></a>

<picture>
  <source media="(max-width: 640px)" srcset="docs/readme/cover-mobile.png">
  <img src="docs/readme/cover.png" alt="DNH - Clarity, by design. Next.js application and developer documentation." width="1440">
</picture>

<h1 align="center">DNH / Web Experience</h1>

<p align="center">
  A Next.js project, with a clear path from local development to deployment.
</p>

<p align="center">
  <a href="https://nextjs.org/docs"><img src="docs/readme/badge-nextjs.svg" alt="Next.js" height="30"></a>
  <a href="https://nextjs.org/docs/app/api-reference/cli/create-next-app"><img src="docs/readme/badge-bootstrap.svg" alt="Bootstrapped with create-next-app" height="30"></a>
  <a href="https://nextjs.org/docs/app/getting-started/fonts"><img src="docs/readme/badge-fonts.svg" alt="Font loading with next/font" height="30"></a>
</p>

<p align="center">
  <strong>English</strong> &nbsp; / &nbsp; <a href="README.fa.md">&#1601;&#1575;&#1585;&#1587;&#1740;</a>
</p>

<p align="center">
  <a href="#overview">Overview</a> &nbsp; / &nbsp;
  <a href="#local-development">Local development</a> &nbsp; / &nbsp;
  <a href="#dynamic-lead-forms">Lead forms</a> &nbsp; / &nbsp;
  <a href="#deployment">Deployment</a> &nbsp; / &nbsp;
  <a href="#resources">Resources</a>
</p>

---

## Overview

This project is built with [Next.js](https://nextjs.org) and was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

| Area | Project notes |
| :--- | :--- |
| **Development** | Start the local server and edit `app/page.tsx`. The page updates as you make changes. |
| **Typography** | [`next/font`](https://nextjs.org/docs/app/getting-started/fonts) optimizes and loads [Geist](https://vercel.com/font). |
| **Public lead forms** | Dynamic-form submissions include canonical server validation and a hidden honeypot. |
| **Deployment** | The production considerations for public forms are documented below. |

## Local development

### Install and start

From the project directory, install dependencies and start the development server. The example below uses npm; use the package manager already used by the repository.

```bash
npm install
npm run dev
```

Open **[localhost:3000](http://localhost:3000)** in your browser.

### Make your first change

Edit `app/page.tsx` and save the file to see the updated page. Project-specific runtime versions and scripts should follow the repository's own configuration.

<details>
<summary><strong>Using Yarn, pnpm, or Bun?</strong></summary>

After installing dependencies with your chosen package manager, use the corresponding development command:

| Package manager | Development command |
| :--- | :--- |
| Yarn | `yarn dev` |
| pnpm | `pnpm dev` |
| Bun | `bun dev` |

Use one package manager for this checkout rather than running every command above.

</details>

## Dynamic lead forms

Public dynamic-form submissions include two application-level controls:

| Control | Current implementation |
| :--- | :--- |
| **Canonical server validation** | Submitted data is validated on the server. |
| **Hidden honeypot** | A hidden honeypot is included in public form submissions. |

> [!IMPORTANT]
> **Before high-volume production use, add infrastructure-level rate limiting.**
> Consider a privacy-preserving CAPTCHA when abuse signals justify it. CAPTCHA is intentionally **not a v1 dependency**.

Keep the distinction clear: server validation and the honeypot are part of the current implementation; infrastructure-level rate limiting is a deployment task, and CAPTCHA remains conditional on observed abuse.

## Deployment

Use the [Vercel platform](https://vercel.com/new) to deploy the application, or consult the [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying) for other supported approaches.

For the repository's build and deployment commands, follow its configured scripts rather than assuming additional scripts exist.

### High-volume public-form checklist

- [ ] Add infrastructure-level rate limiting before high-volume production use.
- [ ] Review abuse signals to decide whether a privacy-preserving CAPTCHA is justified.

These are deployment considerations, not completed security checks.

## Documentation identity

The documentation artwork pairs deep navy and ocean blue with ice-blue highlights, an orange accent, and a warm-paper neutral.

<img src="docs/readme/palette.svg" alt="DNH documentation palette: Deep Navy #022F3E; Ocean Blue #167394; Ice Blue #82CEE4; Signal Orange #FC8502; Warm Paper #F7F6F2." width="1440">

<details>
<summary><strong>Palette and artwork files</strong></summary>

| Color | Hex |
| :--- | :--- |
| Deep navy | `#022F3E` |
| Ocean blue | `#167394` |
| Ice blue | `#82CEE4` |
| Signal orange | `#FC8502` |
| Warm paper | `#F7F6F2` |

The cover, mobile cover, badges, palette, and footer are stored in [`docs/readme`](docs/readme/). They are documentation assets, not application screenshots. Editable SVG sources are included alongside the PNG covers; no font files are bundled.

These colors describe the README artwork. They do not replace the application's CSS design tokens.

</details>

## Resources

| Resource | Use it for |
| :--- | :--- |
| [Next.js documentation](https://nextjs.org/docs) | Framework features and API reference. |
| [Learn Next.js](https://nextjs.org/learn) | The interactive Next.js tutorial. |
| [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app) | Project bootstrap documentation. |
| [Font optimization](https://nextjs.org/docs/app/getting-started/fonts) | Working with `next/font`. |
| [Geist](https://vercel.com/font) | The type family referenced by this project. |
| [Next.js on GitHub](https://github.com/vercel/next.js) | The framework's source repository and contribution discussion. |
| [Deploying Next.js](https://nextjs.org/docs/app/getting-started/deploying) | Deployment options and configuration. |

---

<img src="docs/readme/footer.svg" alt="DNH - Clarity. Structure. Intent." width="1440">

<p align="center"><a href="#readme-top">Back to top</a></p>
