import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Media from "../components/Media";
import { useLocale } from "../i18n";

export default function About() {
  const { t, href } = useLocale();
  const a = t.about;

  return (
    <div>
      <div className="bmk-about-hero">
        <Reveal>
          <Media image={{ src: "/assets/portrait.jpg", caption: t.story.rows[1].caption }} />
        </Reveal>
        <Reveal>
          <span className="mono bmk-eyebrow">{a.eyebrow}</span>
          <h1 className="serif">{a.title}</h1>
          {a.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="sig">{a.sig}</p>
          <div className="bmk-btn-row" style={{ marginTop: 30 }}>
            <Link className="bmk-btn" to={href("/work")}>
              {a.ctaPrimary}
            </Link>
            <Link className="bmk-btn ghost" to={href("/services")}>
              {a.ctaSecondary}
            </Link>
          </div>
        </Reveal>
      </div>

      <hr className="bmk-hr" />

      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">{a.valuesEyebrow}</span>
        </Reveal>
        <div className="bmk-values" style={{ marginTop: 40 }}>
          {a.values.map((v) => (
            <div className="v" key={v.k}>
              <span className="mono">{v.k}</span>
              <p>{v.v}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="bmk-hr" />

      <section className="bmk-section">
        <Reveal>
          <div className="bmk-quote-panel">
            <p>{a.quote}</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
