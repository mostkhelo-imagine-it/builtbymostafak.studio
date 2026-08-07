import { useLocale } from "../i18n";

export default function Contact() {
  const { t } = useLocale();
  const c = t.contact;

  return (
    <div className="bmk-contact">
      <span className="mono bmk-eyebrow">{c.eyebrow}</span>
      <h1 className="serif">
        {c.title}
        <br />
        <em>{c.titleEm}</em>
      </h1>
      <p className="intro">{c.intro}</p>
      <a className="email-big" href={`mailto:${t.EMAIL}?subject=Project%20Brief`}>
        {t.EMAIL}
      </a>
      <div className="fields">
        {c.fields.map((f) => (
          <div className="field" key={f.k}>
            <span className="mono">{f.k}</span>
            <div className="val">{f.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
