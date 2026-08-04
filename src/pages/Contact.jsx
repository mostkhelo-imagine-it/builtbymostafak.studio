import { EMAIL } from "../content";

export default function Contact() {
  return (
    <div className="bmk-contact">
      <span className="mono bmk-eyebrow">Get in Touch</span>
      <h1 className="serif">
        If you're building something real,
        <br />
        <em>I'm ready when you are.</em>
      </h1>
      <p className="intro">
        My work often starts with a conversation before it starts with a brief. Reach out, and tell me
        what you're carrying.
      </p>
      <a className="email-big" href={`mailto:${EMAIL}?subject=Project%20Brief`}>
        {EMAIL}
      </a>
      <div className="fields">
        <div className="field">
          <span className="mono">Based in</span>
          <div className="val">Egypt — working across MENA</div>
        </div>
        <div className="field">
          <span className="mono">Response time</span>
          <div className="val">Within a few days</div>
        </div>
        <div className="field">
          <span className="mono">Best for</span>
          <div className="val">Founders, institutions, creators</div>
        </div>
      </div>
    </div>
  );
}
