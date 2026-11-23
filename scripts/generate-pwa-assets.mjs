import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const iconsDir = path.join(rootDir, "public", "icons");
const socialDir = path.join(rootDir, "public", "social");
const appDir = path.join(rootDir, "app");
const sourceLogoPath = path.join(
  rootDir,
  "public",
  "assets",
  "images",
  "LOGO.svg",
);

const brand = {
  page: "#F7F4EF",
};

/**
 * LOGO.svg is the single source of truth. The square app icon uses the exact
 * brand mark cropped from that artwork; no replacement geometry is drawn.
 */
async function getBrandMark() {
  const sourceRaster = await sharp(sourceLogoPath).png().toBuffer();
  const croppedMark = await sharp(sourceRaster)
    .extract({ left: 120, top: 130, width: 560, height: 430 })
    .png()
    .toBuffer();

  return sharp(croppedMark)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function buildSquareIcon(
  mark,
  size,
  { maskable = false, transparent = false } = {},
) {
  const markWidth = Math.max(1, Math.round(size * (maskable ? 0.58 : 0.72)));
  const resizedMark = await sharp(mark)
    .resize({
      width: markWidth,
      height: markWidth,
      fit: "inside",
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();
  const markMetadata = await sharp(resizedMark).metadata();
  const left = Math.round((size - (markMetadata.width ?? markWidth)) / 2);
  const top = Math.round((size - (markMetadata.height ?? markWidth)) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: transparent ? "#00000000" : brand.page,
    },
  })
    .composite([{ input: resizedMark, left, top }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function buildSocialCard() {
  const wordmark = await sharp(sourceLogoPath)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: 920, height: 360, fit: "inside" })
    .png()
    .toBuffer();
  const metadata = await sharp(wordmark).metadata();

  return sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: brand.page,
    },
  })
    .composite([
      {
        input: wordmark,
        left: Math.round((1200 - (metadata.width ?? 920)) / 2),
        top: Math.round((630 - (metadata.height ?? 300)) / 2),
      },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
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

  return Buffer.concat([
    header,
    directory,
    ...entries.map((entry) => entry.buffer),
  ]);
}

async function main() {
  await Promise.all([
    mkdir(iconsDir, { recursive: true }),
    mkdir(socialDir, { recursive: true }),
  ]);

  const mark = await getBrandMark();

  // Keep an SVG copy of the original artwork alongside the generated icons.
  await copyFile(sourceLogoPath, path.join(iconsDir, "dnh-icon.svg"));

  const iconSizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

  for (const size of iconSizes) {
    const png = await buildSquareIcon(mark, size);
    await writeFile(path.join(iconsDir, `icon-${size}x${size}.png`), png);
  }

  for (const size of [192, 512]) {
    const png = await buildSquareIcon(mark, size, { maskable: true });
    await writeFile(
      path.join(iconsDir, `maskable-icon-${size}x${size}.png`),
      png,
    );
  }

  const faviconEntries = [];

  for (const size of [16, 32, 48]) {
    const png = await buildSquareIcon(mark, size, { transparent: true });
    await writeFile(path.join(iconsDir, `favicon-${size}x${size}.png`), png);
    faviconEntries.push({ size, buffer: png });
  }

  const ico = buildIco(faviconEntries);
  const appIcon = await buildSquareIcon(mark, 512);
  const appleIcon = await buildSquareIcon(mark, 180);

  await Promise.all([
    writeFile(path.join(appDir, "favicon.ico"), ico),
    writeFile(path.join(appDir, "icon.png"), appIcon),
    writeFile(path.join(appDir, "apple-icon.png"), appleIcon),
    writeFile(
      path.join(socialDir, "dnh-social-card.png"),
      await buildSocialCard(),
    ),
  ]);

  console.log(
    "Favicon, PWA icons and the default social card were generated from LOGO.svg.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
