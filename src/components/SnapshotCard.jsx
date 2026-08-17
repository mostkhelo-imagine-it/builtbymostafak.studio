import Reveal from "./Reveal";

/* The Clarity Snapshot lives on its own subdomain, so this always leaves the
 * site. Shared by the home page and the services page so the offer reads the
 * same in both places. */
export default function SnapshotCard({ snapshot, toolUrl, className = "" }) {
  return (
    <Reveal className={`bmk-snapshot ${className}`}>
      <span className="mono bmk-eyebrow">{snapshot.tag}</span>
      <h3 className="serif">{snapshot.title}</h3>
      <p className="copy">{snapshot.copy}</p>
      <p className="price">{snapshot.price}</p>
      <a className="bmk-btn" href={toolUrl} target="_blank" rel="noopener noreferrer">
        {snapshot.cta}
      </a>
    </Reveal>
  );
}
