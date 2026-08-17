import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import * as en from "./src/content.en.js";
import * as ar from "./src/content.ar.js";

const SITE_URL = "https://builtbymostafak.studio";
const PATHS = ["/", "/work", "/services", "/notes", "/about", "/contact", "/terms", "/privacy", "/refund"];
const BUNDLES = { en, ar };

const href = (locale, path) => {
  const p = path === "/" ? "" : path;
  return locale === "ar" ? `/ar${p}` || "/ar" : p || "/";
};

/* The server serves these as directories, so /work 301s to /work/. Canonical and
 * hreflang must name the URL that actually answers 200, not the one that bounces. */
const canonicalPath = (locale, path) => {
  const h = href(locale, path);
  return h.endsWith("/") ? h : `${h}/`;
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Writes a real static HTML file for every route in every language.
 *
 * Without this, GitHub Pages returns HTTP 404 for anything but "/" and relies on
 * a JS bounce, which browsers tolerate but crawlers read as "page not found".
 * Emitting real files means every route answers 200, and each one carries its own
 * title, description, canonical, and reciprocal hreflang in the raw HTML, so none
 * of it depends on the crawler executing JavaScript.
 */
export default function prerender() {
  return {
    name: "bmk-prerender",
    apply: "build",
    enforce: "post",
    closeBundle() {
      const outDir = resolve("dist");
      const template = readFileSync(resolve(outDir, "index.html"), "utf8");
      const urls = [];

      for (const locale of ["en", "ar"]) {
        const bundle = BUNDLES[locale];
        const dir = locale === "ar" ? "rtl" : "ltr";

        for (const path of PATHS) {
          const info = bundle.meta[path] || bundle.meta["/"];
          const url = href(locale, path);
          const canonical = SITE_URL + canonicalPath(locale, path);

          const alternates = [
            ["en", SITE_URL + canonicalPath("en", path)],
            ["ar", SITE_URL + canonicalPath("ar", path)],
            ["x-default", SITE_URL + canonicalPath("en", path)],
          ]
            .map(([l, h]) => `    <link rel="alternate" hreflang="${l}" href="${esc(h)}" />`)
            .join("\n");

          const head = [
            `    <title>${esc(info.title)}</title>`,
            `    <meta name="description" content="${esc(info.description)}" />`,
            `    <link rel="canonical" href="${esc(canonical)}" />`,
            alternates,
            `    <meta property="og:title" content="${esc(info.title)}" />`,
            `    <meta property="og:description" content="${esc(info.description)}" />`,
            `    <meta property="og:url" content="${esc(canonical)}" />`,
            `    <meta property="og:locale" content="${locale === "ar" ? "ar_EG" : "en_US"}" />`,
            `    <meta property="og:type" content="website" />`,
            `    <meta property="og:image" content="${SITE_URL}/assets/portrait-card.png" />`,
            `    <meta name="twitter:card" content="summary_large_image" />`,
          ].join("\n");

          const html = template
            .replace(/<html[^>]*>/, `<html lang="${locale}" dir="${dir}">`)
            .replace("<!--BMK_HEAD-->", head);

          const file =
            url === "/" ? resolve(outDir, "index.html") : resolve(outDir, `.${url}/index.html`);
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, html);
          urls.push(canonical);
        }
      }

      writeFileSync(
        resolve(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join("\n") +
          `\n</urlset>\n`
      );

      writeFileSync(
        resolve(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
      );

      console.log(`  bmk-prerender: ${urls.length} routes + sitemap.xml + robots.txt`);
    },
  };
}
