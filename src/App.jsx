import { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Notes from "./pages/Notes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useLocale, parsePath, getBundle, localeHref, canonicalUrl, PATHS } from "./i18n";

function NotFound() {
  const { t, href } = useLocale();
  return (
    <div className="bmk-404">
      <span className="mono bmk-eyebrow">404</span>
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.body}</p>
      <Link className="bmk-btn" to={href("/")}>
        {t.notFound.cta}
      </Link>
    </div>
  );
}

/* Restores scroll on navigation, and honours #case-slug links into the Work page.
 * The target is re-asserted a few times because a cold load settles its layout
 * after we first scroll (fonts swapping in, lazy images resolving), which would
 * otherwise leave the anchor stranded mid-page. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.slice(1);
    let attempt = 0;
    let timer;

    const settle = () => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (attempt === 0 || Math.abs(top) > 2) {
          el.scrollIntoView({ behavior: attempt === 0 ? "smooth" : "auto", block: "start" });
        }
      }
      if (++attempt < 4) timer = setTimeout(settle, 250);
    };

    timer = setTimeout(settle, 0);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

/* Keeps <html lang/dir>, the title, description, canonical and hreflang tags in
 * sync during client-side navigation. The prerenderer writes the same tags into
 * the static HTML, so crawlers see them without running any JavaScript. */
function HeadManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { locale, path } = parsePath(pathname);
    const bundle = getBundle(locale);
    const info = bundle.meta[path] || bundle.meta["/"];

    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.title = info.title;

    const set = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement(attrs.tag);
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => k !== "tag" && el.setAttribute(k, v));
    };

    set('meta[name="description"]', { tag: "meta", name: "description", content: info.description });
    set('link[rel="canonical"]', { tag: "link", rel: "canonical", href: canonicalUrl(locale, path) });

    document.head.querySelectorAll('link[rel="alternate"]').forEach((el) => el.remove());
    [
      ["en", canonicalUrl("en", path)],
      ["ar", canonicalUrl("ar", path)],
      ["x-default", canonicalUrl("en", path)],
    ].forEach(([lang, url]) => {
      const el = document.createElement("link");
      el.setAttribute("rel", "alternate");
      el.setAttribute("hreflang", lang);
      el.setAttribute("href", url);
      document.head.appendChild(el);
    });
  }, [pathname]);

  return null;
}

const PAGES = {
  "/": Home,
  "/work": Work,
  "/services": Services,
  "/notes": Notes,
  "/about": About,
  "/contact": Contact,
};

export default function App() {
  const { locale } = useLocale();

  return (
    <div className="bmk" lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <ScrollManager />
      <HeadManager />
      <Nav />
      <Routes>
        {PATHS.map((p) => {
          const Page = PAGES[p];
          return [
            <Route key={`en${p}`} path={p} element={<Page />} />,
            <Route key={`ar${p}`} path={localeHref("ar", p)} element={<Page />} />,
          ];
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
