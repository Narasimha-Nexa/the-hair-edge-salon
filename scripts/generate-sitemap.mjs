import fs from "fs";
import path from "path";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hair-edge-unisex-salon.netlify.app";

const staticRoutes = [
  { url: "", file: "app/page.tsx", changefreq: "weekly", priority: "1.0" },
  { url: "/about", file: "app/about/page.tsx", changefreq: "monthly", priority: "0.8" },
  { url: "/privacy", file: "app/privacy/page.tsx", changefreq: "monthly", priority: "0.8" },
  { url: "/terms", file: "app/terms/page.tsx", changefreq: "monthly", priority: "0.8" },
  { url: "/services", file: "app/services/page.tsx", changefreq: "weekly", priority: "0.9" },
  { url: "/blog", file: "app/blog/page.tsx", changefreq: "weekly", priority: "0.8" },
];

const areaSlugs = [
  "madhapur",
  "hitech-city",
  "gachibowli",
  "kondapur",
  "jubilee-hills",
  "banjara-hills",
  "kukatpally",
  "miyapur",
];

const serviceIds = [
  "hair-styling", "hair-cut", "hair-colour", "hair-straightening", "hair-blow-dry",
  "hair-curling", "hair-rebonding", "beard-styling", "beard-shaving", "beard-trimming",
  "full-body-waxing", "underarms-waxing", "full-leg-waxing", "full-arm-waxing",
  "half-arm-waxing", "face-waxing", "half-leg-waxing", "hair-spa", "hair-wash",
  "face-bleach", "face-clean-up", "face-d-tan", "facial", "head-massage",
  "pedicure", "manicure", "full-face-threading", "eye-brow-threading",
  "forehead-threading", "chin-threading", "lip-threading", "cheek-threading",
  "sideburn-threading", "hair-keratin", "make-up",
];

const blogSlugs = [
  "best-hair-salon-madhapur-hyderabad",
  "keratin-treatment-vs-rebonding",
  "bridal-makeup-packages-hyderabad",
  "hair-colour-trends-2026",
  "beard-grooming-tips-men",
  "pre-bridal-skin-care-routine",
];

function pageLastmod(relativePath, fallback) {
  try {
    const mtime = fs.statSync(path.join(process.cwd(), relativePath)).mtime;
    return mtime.toISOString().split("T")[0];
  } catch {
    return fallback;
  }
}

function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];
  const serviceLastmod = pageLastmod("components/sections/ServiceDetail.tsx", today);
  const blogLastmod = pageLastmod("lib/blog-posts.ts", today);
  const areaLastmod = pageLastmod("lib/areas.ts", today);

  const urls = [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route.url}`,
      lastmod: pageLastmod(route.file, today),
      changefreq: route.changefreq,
      priority: route.priority,
    })),
    ...areaSlugs.map((slug) => ({
      url: `${BASE_URL}/areas/${slug}`,
      lastmod: areaLastmod,
      changefreq: "monthly",
      priority: "0.8",
    })),
    ...serviceIds.map((id) => ({
      url: `${BASE_URL}/services/${id}`,
      lastmod: serviceLastmod,
      changefreq: "weekly",
      priority: "0.8",
    })),
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastmod: blogLastmod,
      changefreq: "weekly",
      priority: "0.7",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outputPath, xml);
  console.log(`Sitemap generated at ${outputPath} with ${urls.length} URLs`);

  const robotsPath = path.join(process.cwd(), "public", "robots.txt");
  const robots = `# Hair Edge Unisex Salon - robots.txt
User-agent: *
Allow: /

# Sitemap (must match the live host Google indexes)
Sitemap: ${BASE_URL}/sitemap.xml
`;
  fs.writeFileSync(robotsPath, robots);
  console.log(`robots.txt generated at ${robotsPath} → ${BASE_URL}/sitemap.xml`);
}

generateSitemap();
