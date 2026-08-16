import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useLocale } from "../i18n";

export default function Services() {
  const { t, href } = useLocale();
  const p = t.servicesPage;

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
        <p style={{ color: "var(--text2)", maxWidth: 620, marginTop: 20, lineHeight: 1.8, fontSize: 16.5 }}>
          {p.intro}
        </p>
      </Reveal>

      <div className="bmk-services">
        {t.services.map((s) => (
          <Reveal key={s.n} className="bmk-service">
            <span className="n">{s.n}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </div>
            <div className="meta">
              {s.meta.map((m) => (
                <div key={m}>{m}</div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div
          style={{
            marginTop: 64,
            padding: "36px 32px",
            border: "1px solid var(--accent)",
            borderRadius: 14,
            background: "rgba(176,141,87,0.05)",
          }}
        >
          <span className="mono bmk-eyebrow" style={{ marginBottom: 12 }}>
            {p.snapshot.tag}
          </span>
          <h3 className="serif" style={{ fontSize: "clamp(24px,3.2vw,32px)", margin: "0 0 14px" }}>
            {p.snapshot.title}
          </h3>
          <p style={{ color: "var(--text2)", maxWidth: 620, lineHeight: 1.8, fontSize: 16 }}>
            {p.snapshot.copy}
          </p>
          <p style={{ marginTop: 14, fontSize: 15, color: "var(--text)" }}>{p.snapshot.price}</p>
          <a
            className="bmk-btn"
            href={p.toolUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 22, display: "inline-block" }}
          >
            {p.snapshot.cta}
          </a>
        </div>
      </Reveal>

      <Reveal>
        <div style={{ marginTop: 50 }}>
          <Link className="bmk-btn" to={href("/contact")}>
            {p.cta}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
