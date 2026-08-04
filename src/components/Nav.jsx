import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const items = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/notes", label: "Notes" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bmk-nav">
        <Link to="/" className="bmk-logo" aria-label="builtbymostafaK — home">
          <img src="/assets/wordmark.png" alt="builtbymostafaK© — Creative Studio" />
        </Link>
        <div className="bmk-links">
          {items.map((it) => (
            <NavLink key={it.to} to={it.to} end={it.end} className="bmk-link">
              {it.label}
            </NavLink>
          ))}
        </div>
        <button className="bmk-burger" onClick={() => setOpen(true)} aria-label="Open menu">
          ≡
        </button>
      </nav>

      {open && (
        <div className="bmk-mobile-menu">
          <button className="bmk-mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
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
        </div>
      )}
    </>
  );
}
