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
      <div className="bmk-btn-row" style={{ marginTop: 40, justifyContent: "center" }}>
        <Link className="bmk-btn" to={href("/contact")}>
          {f.cta}
        </Link>
        <a
          className="bmk-btn ghost"
          href={t.servicesPage.toolUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.servicesPage.snapshot.cta}
        </a>
      </div>
      <div className="legal-row">
        <Link to={href("/terms")}>{f.legal.terms}</Link>
        <Link to={href("/privacy")}>{f.legal.privacy}</Link>
        <Link to={href("/refund")}>{f.legal.refund}</Link>
      </div>

      <div className="bottom-row">
        <span>{f.rights}</span>
        <span>{f.privacy}</span>
        <a href={`mailto:${t.EMAIL}`}>{t.EMAIL}</a>
      </div>
    </footer>
  );
}
