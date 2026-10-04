import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const iconsDir = path.join(rootDir, "public", "icons");
const appDir = path.join(rootDir, "app");

const brand = {
  primary: "#167394",
  secondary: "#157293",
  accent: "#FC8502",
  ink: "#073A4B",
  light: "#FFFFFF",
};

function buildIconSvg({ maskable = false } = {}) {
  const cornerRadius = maskable ? 0 : 224;
  const contentScale = maskable ? 0.82 : 1;
  const translate = maskable ? 92 : 0;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="DNH">
  <defs>
    <linearGradient id="bg" x1="160" y1="80" x2="890" y2="940" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${brand.primary}"/>
      <stop offset="0.52" stop-color="${brand.secondary}"/>
      <stop offset="1" stop-color="${brand.ink}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="28%" r="72%">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.24"/>
      <stop offset="0.46" stop-color="#FFFFFF" stop-opacity="0.07"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#031A24" flood-opacity="0.24"/>
    </filter>
  </defs>

  <rect width="1024" height="1024" rx="${cornerRadius}" fill="url(#bg)"/>
  <rect width="1024" height="1024" rx="${cornerRadius}" fill="url(#glow)"/>

  <g transform="translate(${translate} ${translate}) scale(${contentScale})" filter="url(#shadow)">
    <circle cx="512" cy="442" r="292" fill="#FFFFFF" opacity="0.08"/>
    <path d="M267 282c0-18 15-33 33-33h79c18 0 33 15 33 33v281c0 18-15 33-33 33h-79c-18 0-33-15-33-33V282Z" fill="${brand.light}" opacity="0.94"/>
    <path d="M442 214c0-18 15-33 33-33h79c18 0 33 15 33 33v349c0 18-15 33-33 33h-79c-18 0-33-15-33-33V214Z" fill="${brand.light}" opacity="0.98"/>
    <path d="M617 143c0-18 15-33 33-33h79c18 0 33 15 33 33v420c0 18-15 33-33 33h-79c-18 0-33-15-33-33V143Z" fill="${brand.light}"/>

    <rect x="252" y="642" width="520" height="34" rx="17" fill="${brand.accent}"/>
    <path d="M319 724c57 51 122 76 193 76 72 0 137-25 193-76" fill="none" stroke="${brand.accent}" stroke-width="30" stroke-linecap="round" opacity="0.92"/>

    <text x="512" y="890" text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="178" font-weight="800"
      letter-spacing="8" fill="${brand.light}">DNH</text>
  </g>
</svg>`;
}

async function pngFromSvg(svg, size) {
  return sharp(Buffer.from(svg))
    .resize(size, size, {
      fit: "cover",
    })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
    })
    .toBuffer();
}

function buildIco(entries) {
  const headerSize = 6;
  const directorySize = entries.length * 16;
  let offset = headerSize + directorySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(directorySize);

  entries.forEach((entry, index) => {
    const entryOffset = index * 16;
    const width = entry.size >= 256 ? 0 : entry.size;
    const height = entry.size >= 256 ? 0 : entry.size;

    directory.writeUInt8(width, entryOffset);
    directory.writeUInt8(height, entryOffset + 1);
    directory.writeUInt8(0, entryOffset + 2);
    directory.writeUInt8(0, entryOffset + 3);
    directory.writeUInt16LE(1, entryOffset + 4);
    directory.writeUInt16LE(32, entryOffset + 6);
    directory.writeUInt32LE(entry.buffer.length, entryOffset + 8);
    directory.writeUInt32LE(offset, entryOffset + 12);

    offset += entry.buffer.length;
  });

  return Buffer.concat([header, directory, ...entries.map((entry) => entry.buffer)]);
}

async function main() {
  await mkdir(iconsDir, { recursive: true });

  const iconSvg = buildIconSvg();
  const maskableSvg = buildIconSvg({ maskable: true });

  await writeFile(path.join(iconsDir, "dnh-icon.svg"), iconSvg);

  const iconSizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

  for (const size of iconSizes) {
    const png = await pngFromSvg(iconSvg, size);
    await writeFile(path.join(iconsDir, `icon-${size}x${size}.png`), png);
  }

  for (const size of [192, 512]) {
    const png = await pngFromSvg(maskableSvg, size);
    await writeFile(path.join(iconsDir, `maskable-icon-${size}x${size}.png`), png);
  }

  const faviconEntries = [];

  for (const size of [16, 32, 48]) {
    const png = await pngFromSvg(iconSvg, size);

    await writeFile(path.join(iconsDir, `favicon-${size}x${size}.png`), png);
    faviconEntries.push({
      size,
      buffer: png,
    });
  }

  const ico = buildIco(faviconEntries);

  await writeFile(path.join(appDir, "favicon.ico"), ico);
  await writeFile(path.join(appDir, "icon.png"), await pngFromSvg(iconSvg, 512));
  await writeFile(path.join(appDir, "apple-icon.png"), await pngFromSvg(iconSvg, 180));

  console.log("PWA assets generated in public/icons and app icon files.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
