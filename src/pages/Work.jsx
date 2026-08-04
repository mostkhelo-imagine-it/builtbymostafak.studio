import Reveal from "../components/Reveal";
import Media from "../components/Media";
import { cases } from "../content";

function Body({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return <p>{parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}</p>;
}

export default function Work() {
  return (
    <div>
      <div className="bmk-section tight" style={{ textAlign: "center", paddingBottom: 20 }}>
        <Reveal>
          <span className="mono bmk-eyebrow">Inside the Work</span>
        </Reveal>
        <Reveal>
          <h1 className="serif" style={{ fontWeight: 400, fontSize: "clamp(32px,5vw,54px)", margin: "16px 0 20px" }}>
            Every project carries a moment of clarity
          </h1>
        </Reveal>
        <Reveal>
          <p style={{ color: "var(--text2)", maxWidth: 620, margin: "0 auto", lineHeight: 1.75, fontSize: 16 }}>
            These are documentation, not a showcase. Told truthfully and without client names — some
            stories are still in motion, others complete, but all of them are alive.
          </p>
        </Reveal>
      </div>

      {cases.map((c) => (
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
              {c.body.map((t, i) => (
                <Body key={i} text={t} />
              ))}
              <div className="built">
                <span className="k">What I built</span>
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
            Every story begins the same way: listening, shaping, revealing, growing.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
