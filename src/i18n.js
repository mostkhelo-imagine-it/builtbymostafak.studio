import { useLocation } from "react-router-dom";
import * as en from "./content.en";
import * as ar from "./content.ar";

export const SITE_URL = "https://builtbymostafak.studio";
export const LOCALES = ["en", "ar"];
export const DEFAULT_LOCALE = "en";

const bundles = { en, ar };

/* The routes each locale serves, minus the /ar prefix. */
export const PATHS = ["/", "/work", "/services", "/notes", "/about", "/contact", "/terms", "/privacy", "/refund"];

/** Splits a full pathname into its locale and the locale-free path. */
export function parsePath(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/ar" || clean.startsWith("/ar/")) {
    return { locale: "ar", path: clean.slice(3) || "/" };
  }
  return { locale: "en", path: clean };
}

/** Builds a href for a given locale and locale-free path. */
export function localeHref(locale, path) {
  const p = path === "/" ? "" : path;
  return locale === "ar" ? `/ar${p}` || "/ar" : p || "/";
}

/* Static hosting serves these as directories, so /work 301s to /work/. Canonical
 * and hreflang must name the URL that actually answers 200. */
export function canonicalUrl(locale, path) {
  const h = localeHref(locale, path);
  return SITE_URL + (h.endsWith("/") ? h : `${h}/`);
}

export function useLocale() {
  const { pathname } = useLocation();
  const { locale, path } = parsePath(pathname);
  return {
    locale,
    path,
    dir: locale === "ar" ? "rtl" : "ltr",
    t: bundles[locale],
    /** href to the current page in the other language */
    alternateHref: localeHref(locale === "ar" ? "en" : "ar", path),
    /** href within the current language */
    href: (p) => localeHref(locale, p),
  };
}

export function getBundle(locale) {
  return bundles[locale] || bundles.en;
}
