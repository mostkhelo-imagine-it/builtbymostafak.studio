import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { services } from "../content";

export default function Services() {
  return (
    <section className="bmk-section">
      <Reveal>
        <span className="mono bmk-eyebrow">Work With Me</span>
      </Reveal>
      <Reveal>
        <h1 className="serif bmk-h2" style={{ fontSize: "clamp(30px,4.4vw,48px)" }}>
          I work with founders, institutions, and creators who are building something real.
        </h1>
      </Reveal>
      <Reveal>
        <p style={{ color: "var(--text2)", maxWidth: 620, marginTop: 20, lineHeight: 1.8, fontSize: 16.5 }}>
          Some come at the beginning of an idea, others when things need to evolve. My role is to
          bring clarity, story, and structure to what you're creating.
        </p>
      </Reveal>

      <div className="bmk-services">
        {services.map((s) => (
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
        <div style={{ marginTop: 50 }}>
          <Link className="bmk-btn" to="/contact">
            Send Project Brief
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
