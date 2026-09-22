import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();

// NOTE: SVG text uses common system fonts (Georgia/Arial). On systems without
// them the renderer falls back to a generic serif/sans — regenerate on the
// same machine if pixel-identity matters (committed outputs are authoritative).
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#050505"/>
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="#C9A227" stroke-width="2"/>
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#C9A227" stroke-width="1" opacity="0.45"/>
  <text x="600" y="150" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="12" fill="#B5B5B5">PREMIUM HAIR · BEAUTY · GROOMING</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="94" letter-spacing="6" fill="#FFFFFF">THE HAIR EDGE</text>
  <text x="600" y="382" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="54" letter-spacing="10" fill="#C9A227">UNISEX SALON</text>
  <line x1="440" y1="428" x2="760" y2="428" stroke="#C9A227" stroke-width="2"/>
  <text x="600" y="488" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="4" fill="#FFFFFF">Madhapur, Hyderabad</text>
  <text x="600" y="548" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="2" fill="#B5B5B5">4.6 ★ Google Reviews · Open Daily 8 AM – 11:30 PM</text>
</svg>`;

const iconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="108" fill="#050505"/>
  <rect x="26" y="26" width="460" height="460" rx="86" fill="none" stroke="#C9A227" stroke-width="8"/>
  <text x="256" y="316" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="bold" font-size="196" fill="#C9A227">HE</text>
  <line x1="150" y1="356" x2="362" y2="356" stroke="#C9A227" stroke-width="6"/>
  <text x="256" y="418" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="34" letter-spacing="6" fill="#FFFFFF">SALON</text>
</svg>`;

async function main() {
  const ogPath = path.join(root, "public", "images", "og-image.jpg");
  await sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(ogPath);

  const iconPath = path.join(root, "app", "icon.png");
  await sharp(Buffer.from(iconSvg)).png({ compressionLevel: 9 }).toFile(iconPath);

  const applePath = path.join(root, "app", "apple-icon.png");
  await sharp(Buffer.from(iconSvg))
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(applePath);

  for (const p of [ogPath, iconPath, applePath]) {
    const meta = await sharp(p).metadata();
    const kb = (fs.statSync(p).size / 1024).toFixed(1);
    console.log(
      `${path.relative(root, p)}: ${meta.width}x${meta.height} ${meta.format} ${kb} KB`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
