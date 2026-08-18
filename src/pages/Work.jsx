import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Media from "../components/Media";
import { useLocale } from "../i18n";

/* The index of projects. Each card carries the thumbnail, the tag, the title and
 * the brief, and links through to the project's own page. */
export default function Work() {
  const { t, href } = useLocale();
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

      <section className="bmk-section" style={{ paddingTop: 30 }}>
        <div className="bmk-work-grid">
          {t.cases.map((c) => (
            <Reveal key={c.slug} as="div">
              <Link className="bmk-work-card" to={href(`/work/${c.slug}`)}>
                <Media image={c.image} label={c.tag} />
                <div className="meta">
                  <span className="tag mono">{c.tag}</span>
                  <h3 className="serif">{c.title}</h3>
                  <p>{c.teaser}</p>
                  <span className="more mono">{p.readMore}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="bmk-section tight" style={{ textAlign: "center", paddingTop: 0 }}>
        <Reveal>
          <p className="serif" style={{ fontStyle: "italic", fontSize: 22, color: "var(--accent)", margin: 0 }}>
            {p.closing}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
