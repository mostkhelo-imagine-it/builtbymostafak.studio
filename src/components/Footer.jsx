import { Link } from "react-router-dom";
import { EMAIL } from "../content";

export default function Footer() {
  return (
    <footer className="bmk-footer">
      <img className="mark" src="/assets/wordmark.png" alt="" aria-hidden="true" />
      <p className="mono bmk-eyebrow">Not an office. A field of work.</p>
      <p>
        Everything I create begins in thought and expands outward — into story, identity, and
        experience. Sometimes that means shaping a movement, other times designing a brand, writing a
        narrative, or envisioning an event.
      </p>
      <p className="signoff">It's my name, my mind, my lens.</p>
      <p className="final">
        If you're building something real and want to build it right — I'm ready when you are.
      </p>
      <div style={{ marginTop: 40 }}>
        <Link className="bmk-btn" to="/contact">
          Send Project Brief
        </Link>
      </div>
      <div className="bottom-row">
        <span>© 2026 builtbymostafaK© — Creative Studio. Clarity. Story. Structure.</span>
        <span>No cookies. No tracking. Only clarity.</span>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </footer>
  );
}
