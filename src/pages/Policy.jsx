import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useLocale } from "../i18n";

/* Renders [label](/path) as an in-language internal link, and leaves the rest as
 * text. Policies cross-reference each other, so those links have to stay inside
 * the reader's language rather than dropping them back to English. */
function RichText({ text, href }) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  const out = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(parts[i]);
    if (parts[i + 1]) {
      out.push(
        <Link key={i} to={href(parts[i + 2])}>
          {parts[i + 1]}
        </Link>
      );
    }
  }
  return <>{out}</>;
}

export default function Policy({ which }) {
  const { t, href } = useLocale();
  const p = t.policies[which];

  return (
    <section className="bmk-section bmk-policy">
      <Reveal>
        <span className="mono bmk-eyebrow">{p.eyebrow}</span>
      </Reveal>
      <Reveal>
        <h1 className="serif">{p.title}</h1>
      </Reveal>
      <Reveal>
        <p className="updated mono">{p.updated}</p>
      </Reveal>
      <Reveal>
        <p className="intro">{p.intro}</p>
      </Reveal>

      {p.sections.map((s) => (
        <Reveal key={s.h}>
          <h2 className="serif">{s.h}</h2>
          {s.body.map((b, i) => (
            <p key={i}>{b}</p>
          ))}
        </Reveal>
      ))}

      <Reveal>
        <p className="related">
          <RichText text={p.related} href={href} />
        </p>
        <p className="contact">
          {p.contactLabel}{" "}
          <a href={`mailto:${t.EMAIL}`}>{t.EMAIL}</a>
          {p.contactNote ? ` ${p.contactNote}` : ""}
        </p>
      </Reveal>
    </section>
  );
}
