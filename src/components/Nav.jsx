import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLocale } from "../i18n";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { t, href, alternateHref } = useLocale();

  const items = [
    { to: href("/"), label: t.ui.nav.home, end: true },
    { to: href("/work"), label: t.ui.nav.work },
    { to: href("/services"), label: t.ui.nav.services },
    { to: href("/notes"), label: t.ui.nav.notes },
    { to: href("/about"), label: t.ui.nav.about },
    { to: href("/contact"), label: t.ui.nav.contact },
  ];

  return (
    <>
      <nav className="bmk-nav">
        <Link to={href("/")} className="bmk-logo" aria-label={t.ui.homeAria}>
          <img src="/assets/wordmark.png" alt="builtbymostafaK© — Creative Studio" />
        </Link>

        <div className="bmk-links">
          {items.map((it) => (
            <NavLink key={it.to} to={it.to} end={it.end} className="bmk-link">
              {it.label}
            </NavLink>
          ))}
          <Link to={alternateHref} className="bmk-link bmk-lang" aria-label={t.ui.switchLabel}>
            {t.ui.switchTo}
          </Link>
        </div>

        <button className="bmk-burger" onClick={() => setOpen(true)} aria-label={t.ui.openMenu}>
          ≡
        </button>
      </nav>

      {open && (
        <div className="bmk-mobile-menu">
          <button className="bmk-mobile-close" onClick={() => setOpen(false)} aria-label={t.ui.closeMenu}>
            ×
          </button>
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className="bmk-link serif"
              style={{ fontSize: 24 }}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </NavLink>
          ))}
          <Link
            to={alternateHref}
            className="bmk-link bmk-lang"
            style={{ fontSize: 18, marginTop: 12 }}
            onClick={() => setOpen(false)}
          >
            {t.ui.switchTo}
          </Link>
        </div>
      )}
    </>
  );
}
