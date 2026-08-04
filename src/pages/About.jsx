import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Media from "../components/Media";

export default function About() {
  return (
    <div>
      <div className="bmk-about-hero">
        <Reveal>
          <Media
            image={{ src: "/assets/portrait.jpg", caption: "Mostafa Khalil — Brand Architect & Strategist" }}
          />
        </Reveal>
        <Reveal>
          <span className="mono bmk-eyebrow">About</span>
          <h1 className="serif">It's my name, my mind, my lens.</h1>
          <p>
            builtbymostafaK© is not an office. It's my field of work. Everything I create begins in
            thought and expands outward into story, identity, and experience.
          </p>
          <p>
            Sometimes that means shaping a movement. Other times it means designing a brand, writing
            a narrative, or envisioning an event. What unites it all is intention — bringing clarity,
            story, and structure to ideas that deserve to live.
          </p>
          <p className="sig">truth, by design</p>
          <div className="bmk-btn-row" style={{ marginTop: 30 }}>
            <Link className="bmk-btn" to="/work">
              Explore Inside the Work
            </Link>
            <Link className="bmk-btn ghost" to="/services">
              Work With Me
            </Link>
          </div>
        </Reveal>
      </div>

      <hr className="bmk-hr" />

      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">How I Work</span>
        </Reveal>
        <div className="bmk-values" style={{ marginTop: 40 }}>
          <div className="v">
            <span className="mono">Confidential by default</span>
            <p>
              Clients trust me with ideas at their earliest, most fragile stage — before they're
              ready for the world. That trust is held, not traded on.
            </p>
          </div>
          <div className="v">
            <span className="mono">Intentional, not volume</span>
            <p>
              No ordinary, by-the-book monthly output. Every project is worked closely and
              intentionally, from first structure to final form.
            </p>
          </div>
          <div className="v">
            <span className="mono">Rooted in Egypt &amp; MENA</span>
            <p>
              Working closely with founders and institutions across the region — building brands,
              movements, and experiences meant to last.
            </p>
          </div>
        </div>
      </section>

      <hr className="bmk-hr" />

      <section className="bmk-section">
        <Reveal>
          <div className="bmk-quote-panel">
            <p>
              I sit at the conceptual layer — before design, before marketing — where nothing exists
              yet. From messy feelings and scattered thoughts, I create the first structure, the first
              story, the first form that makes others say: "Now I see it."
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
