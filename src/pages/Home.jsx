import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Media from "../components/Media";
import { helpCards, approach, cases } from "../content";

export default function Home() {
  const preview = cases.slice(0, 4);

  return (
    <>
      <section className="bmk-hero">
        <div className="bmk-hero-bg">
          <img src="/assets/evening-session.jpg" alt="" aria-hidden="true" />
        </div>
        <div className="bmk-hero-content">
          <span className="mono bmk-eyebrow">Creative Studio — Egypt &amp; MENA</span>
          <h1 className="serif">
            I help founders, leaders, and creators turn <em>what they feel</em> into brands people
            can see, trust, and believe in.
          </h1>
          <div className="bmk-underline-wrap">
            <svg viewBox="0 0 520 30" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="bmk-scribble"
                d="M6,22 C40,4 70,28 110,14 C150,2 180,26 230,12 Q280,-2 330,16 C370,28 410,6 460,15 C480,18 500,12 514,16"
              />
            </svg>
          </div>
          <p className="lead">
            My work begins wherever clarity is missing. Sometimes it's the start of an idea. Other
            times it's when something established needs to evolve. In both cases, I help shape what's
            inside into something others can understand and connect with.
          </p>
          <div className="bmk-btn-row">
            <Link className="bmk-btn" to="/contact">
              Schedule a Clarity Session
            </Link>
            <Link className="bmk-btn ghost" to="/work">
              Explore Inside the Work
            </Link>
          </div>
        </div>
      </section>

      <hr className="bmk-hr" />

      {/* Story */}
      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">The Story Behind the Studio</span>
        </Reveal>
        <div style={{ marginTop: 56 }}>
          <div className="bmk-story-row">
            <Reveal className="bmk-media-wrap">
              <Media
                image={{ src: "/assets/land-walk.jpg", caption: "On site — reading the ground first" }}
              />
            </Reveal>
            <Reveal>
              <span className="num">I'm not an agency</span>
              <p>
                I don't deliver volume or monthly content. My work is not typical agency output —
                it's not about a flashy logo, a neat campaign, or a clean brochure. I sit at the
                conceptual layer, before design and before marketing, where nothing exists yet. From
                messy feelings and scattered thoughts, I create the first structure, the first story,
                the first form that makes others say: "Now I see it."
              </p>
            </Reveal>
          </div>

          <div className="bmk-story-row flip">
            <Reveal className="bmk-media-wrap">
              <Media image={{ src: "/assets/portrait.jpg", caption: "Mostafa Khalil — Brand Architect & Strategist" }} />
            </Reveal>
            <Reveal>
              <span className="num">Intentional, not ordinary</span>
              <p>
                I work closely and intentionally with founders and institutions across Egypt and the
                MENA region, turning fragile ideas into living structures, brands, and experiences
                built to last. Everything I create begins in thought and expands outward into story,
                identity, and experience.
              </p>
            </Reveal>
          </div>

          <div className="bmk-story-row">
            <Reveal className="bmk-media-wrap">
              <Media
                image={{ src: "/assets/evening-session.jpg", caption: "Evening session on site" }}
              />
            </Reveal>
            <Reveal>
              <span className="num">My work is often confidential</span>
              <p>
                Clients trust me with ideas at their earliest stage, when they're not yet ready for
                the world. I hold that trust, shape it into clarity, and reveal it when the time is
                right. Some projects remain private; others become public movements. All carry
                transformation — and each moves through the same rhythm of care, precision, and
                truth.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="bmk-hr" />

      {/* How I help */}
      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">How I Help</span>
        </Reveal>
        <Reveal>
          <h2 className="serif bmk-h2">
            I help institutions, leaders, and creators bring clarity, story, and structure to what
            they're building.
          </h2>
        </Reveal>
        <div className="bmk-grid-3">
          {helpCards.map((c) => (
            <Reveal key={c.idx} className="bmk-card">
              <span className="idx mono">{c.idx}</span>
              <h3 className="serif">{c.title}</h3>
              <p>{c.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="bmk-hr" />

      {/* Work preview */}
      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">Inside the Work</span>
        </Reveal>
        <Reveal>
          <h2 className="serif bmk-h2">
            Every project carries a moment of clarity — the point where an idea becomes real.
          </h2>
        </Reveal>
        <div className="bmk-work-grid">
          {preview.map((w) => (
            <Reveal key={w.slug} as="div">
              <Link className="bmk-work-card" to={`/work#${w.slug}`}>
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
            <Link className="bmk-btn ghost" to="/work">
              See all stories
            </Link>
          </div>
        </Reveal>
      </section>

      <hr className="bmk-hr" />

      {/* Approach */}
      <section className="bmk-section">
        <Reveal>
          <span className="mono bmk-eyebrow">My Approach</span>
        </Reveal>
        <Reveal>
          <div className="bmk-quote-panel" style={{ marginTop: 30 }}>
            <p>
              Every collaboration begins with clarity. Whether I'm shaping something new or guiding
              an existing brand into its next chapter, the rhythm is always the same.
            </p>
            <div className="bmk-rhythm">Clarity → Form → Expression → Growth</div>
          </div>
        </Reveal>
        <div className="bmk-approach-grid">
          {approach.map((a) => (
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
