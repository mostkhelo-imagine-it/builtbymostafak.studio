import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Media from "../components/Media";
import { useLocale } from "../i18n";

export default function Home() {
  const { t, href } = useLocale();
  const preview = t.cases.slice(0, 4);
  const s = t.homeSections;

  return (
    <>
      <section className="bmk-hero">
        <div className="bmk-hero-bg">
          <img src="/assets/evening-session.jpg" alt="" aria-hidden="true" />
        </div>
        <div className="bmk-hero-content">
          <span className="mono bmk-eyebrow">{t.hero.eyebrow}</span>
          <h1 className="serif">
            {t.hero.headline} <em>{t.hero.headlineEm}</em> {t.hero.headlineRest}
          </h1>
          <div className="bmk-underline-wrap">
            <svg viewBox="0 0 520 30" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="bmk-scribble"
                d="M6,22 C40,4 70,28 110,14 C150,2 180,26 230,12 Q280,-2 330,16 C370,28 410,6 460,15 C480,18 500,12 514,16"
              />
            </svg>
          </div>
          <p className="lead">{t.hero.lead}</p>
          <div className="bmk-btn-row">
            <Link className="bmk-btn" to={href("/contact")}>
              {t.hero.ctaPrimary}
            </Link>
            <Link className="bmk-btn ghost" to={href("/work")}>
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <hr className="bmk-hr" />

      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">{t.story.eyebrow}</span>
        </Reveal>
        <div style={{ marginTop: 56 }}>
          {t.story.rows.map((row, i) => (
            <div className={`bmk-story-row${i === 1 ? " flip" : ""}`} key={row.num}>
              <Reveal>
                <Media
                  image={{
                    src: ["/assets/land-walk.jpg", "/assets/portrait.jpg", "/assets/evening-session.jpg"][i],
                    caption: row.caption,
                  }}
                />
              </Reveal>
              <Reveal>
                <span className="num">{row.num}</span>
                <p>{row.body}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <hr className="bmk-hr" />

      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">{s.helpEyebrow}</span>
        </Reveal>
        <Reveal>
          <h2 className="serif bmk-h2">{s.helpTitle}</h2>
        </Reveal>
        <div className="bmk-grid-3">
          {t.helpCards.map((c) => (
            <Reveal key={c.idx} className="bmk-card">
              <span className="idx mono">{c.idx}</span>
              <h3 className="serif">{c.title}</h3>
              <p>{c.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="bmk-hr" />

      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">{s.workEyebrow}</span>
        </Reveal>
        <Reveal>
          <h2 className="serif bmk-h2">{s.workTitle}</h2>
        </Reveal>
        <div className="bmk-work-grid">
          {preview.map((w) => (
            <Reveal key={w.slug} as="div">
              <Link className="bmk-work-card" to={`${href("/work")}#${w.slug}`}>
                <Media image={w.image} label={w.tag} />
                <div className="meta">
                  <span className="tag mono">{w.tag}</span>
                  <h3 className="serif">{w.title}</h3>
                  <p>{w.teaser}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ marginTop: 44 }}>
            <Link className="bmk-btn ghost" to={href("/work")}>
              {s.workCta}
            </Link>
          </div>
        </Reveal>
      </section>

      <hr className="bmk-hr" />

      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">{t.approachPanel.eyebrow}</span>
        </Reveal>
        <Reveal>
          <div className="bmk-quote-panel" style={{ marginTop: 30 }}>
            <p>{t.approachPanel.quote}</p>
            <div className="bmk-rhythm">{t.approachPanel.rhythm}</div>
          </div>
        </Reveal>
        <div className="bmk-approach-grid">
          {t.approach.map((a) => (
            <Reveal key={a.n} className="step">
              <span className="n">{a.n}</span>
              <h4 className="serif">{a.h}</h4>
              <p>{a.p}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
