import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { notes } from "../content";

export default function Notes() {
  return (
    <section className="bmk-section">
      <Reveal>
        <span className="mono bmk-eyebrow">Field Notes</span>
      </Reveal>
      <Reveal>
        <h1 className="serif bmk-h2" style={{ fontSize: "clamp(30px,4.4vw,48px)" }}>
          A quiet space for reflection.
        </h1>
      </Reveal>
      <Reveal>
        <p style={{ color: "var(--text2)", maxWidth: 560, marginTop: 20, lineHeight: 1.75, fontSize: 16 }}>
          Short writings about clarity, creativity, and what it means to build something real.
        </p>
      </Reveal>

      <div className="bmk-notes">
        {notes.map((n) => (
          <Reveal key={n.n} className="bmk-note">
            <span className="n">{n.n}</span>
            <h3>{n.title}</h3>
            <p>{n.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p style={{ color: "var(--text2)", maxWidth: 620, marginTop: 50, lineHeight: 1.8, fontSize: 16 }}>
          Each note is a small piece of what I've learned walking beside founders and creators. If one
          of them feels close to your own story, we can explore it together.
        </p>
        <div style={{ marginTop: 30 }}>
          <Link className="bmk-btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
