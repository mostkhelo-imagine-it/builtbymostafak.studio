import { Link } from "react-router-dom";
import { useLocale } from "../i18n";

export default function Footer() {
  const { t, href } = useLocale();
  const f = t.footer;

  return (
    <footer className="bmk-footer">
      <img className="mark" src="/assets/wordmark.png" alt="" aria-hidden="true" />
      <p className="mono bmk-eyebrow">{f.eyebrow}</p>
      <p>{f.body}</p>
      <p className="signoff">{f.signoff}</p>
      <p className="final">{f.final}</p>
      <div style={{ marginTop: 40 }}>
        <Link className="bmk-btn" to={href("/contact")}>
          {f.cta}
        </Link>
      </div>
      <div className="bottom-row">
        <span>{f.rights}</span>
        <span>{f.privacy}</span>
        <a href={`mailto:${t.EMAIL}`}>{t.EMAIL}</a>
      </div>
    </footer>
  );
}
