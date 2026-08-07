import Reveal from "../components/Reveal";
import Media from "../components/Media";
import { useLocale } from "../i18n";

function Body({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return <p>{parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}</p>;
}

export default function Work() {
  const { t } = useLocale();
  const p = t.workPage;

  return (
    <div>
      <div className="bmk-section tight" style={{ textAlign: "center", paddingBottom: 20 }}>
        <Reveal>
          <span className="mono bmk-eyebrow">{p.eyebrow}</span>
        </Reveal>
        <Reveal>
          <h1 className="serif" style={{ fontWeight: 400, fontSize: "clamp(32px,5vw,54px)", margin: "16px 0 20px" }}>
            {p.title}
          </h1>
        </Reveal>
        <Reveal>
          <p style={{ color: "var(--text2)", maxWidth: 620, margin: "0 auto", lineHeight: 1.75, fontSize: 16 }}>
            {p.intro}
          </p>
        </Reveal>
      </div>

      {t.cases.map((c) => (
        <article className="bmk-case" id={c.slug} key={c.slug}>
          <Reveal>
            <span className="tag mono">{c.tag}</span>
          </Reveal>
          <Reveal>
            <h2 className="serif">{c.title}</h2>
          </Reveal>
          <Reveal>
            <Media image={c.image} label={c.tag} />
          </Reveal>
          <div className="body-grid">
            <Reveal className="label" as="span">
              {c.label}
            </Reveal>
            <Reveal>
              {c.body.map((text, i) => (
                <Body key={i} text={text} />
              ))}
              <div className="built">
                <span className="k">{p.builtLabel}</span>
                <p>{c.built}</p>
              </div>
            </Reveal>
          </div>
          {c.gallery && (
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 40 }}>
                {c.gallery.map((g) => (
                  <Media key={g.src} image={g} style={{ height: 240 }} />
                ))}
              </div>
            </Reveal>
          )}
        </article>
      ))}

      <div className="bmk-section tight" style={{ textAlign: "center" }}>
        <Reveal>
          <p className="serif" style={{ fontStyle: "italic", fontSize: 22, color: "var(--accent)", margin: 0 }}>
            {p.closing}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
