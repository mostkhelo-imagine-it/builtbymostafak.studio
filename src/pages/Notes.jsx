import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useLocale } from "../i18n";

export default function Notes() {
  const { t, href } = useLocale();
  const p = t.notesPage;

  return (
    <section className="bmk-section">
      <Reveal>
        <span className="mono bmk-eyebrow">{p.eyebrow}</span>
      </Reveal>
      <Reveal>
        <h1 className="serif bmk-h2" style={{ fontSize: "clamp(30px,4.4vw,48px)" }}>
          {p.title}
        </h1>
      </Reveal>
      <Reveal>
        <p style={{ color: "var(--text2)", maxWidth: 560, marginTop: 20, lineHeight: 1.75, fontSize: 16 }}>
          {p.intro}
        </p>
      </Reveal>

      <div className="bmk-notes">
        {t.notes.map((n) => (
          <Reveal key={n.n} className="bmk-note">
            <span className="n">{n.n}</span>
            <h3>{n.title}</h3>
            <p>{n.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p style={{ color: "var(--text2)", maxWidth: 620, marginTop: 50, lineHeight: 1.8, fontSize: 16 }}>
          {p.outro}
        </p>
        <div style={{ marginTop: 30 }}>
          <Link className="bmk-btn" to={href("/contact")}>
            {p.cta}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
