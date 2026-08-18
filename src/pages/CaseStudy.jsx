import { Link, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import Media from "../components/Media";
import { useLocale, findCase } from "../i18n";

function Body({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return <p>{parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}</p>;
}

/* One project, on its own page. An unknown slug falls through to the site's 404
 * rather than rendering an empty shell. */
export default function CaseStudy() {
  const { slug } = useParams();
  const { t, locale, href } = useLocale();
  const p = t.workPage;
  const c = findCase(locale, slug);

  if (!c) {
    return (
      <div className="bmk-404">
        <span className="mono bmk-eyebrow">404</span>
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.body}</p>
        <Link className="bmk-btn" to={href("/work")}>
          {p.backToIndex}
        </Link>
      </div>
    );
  }

  const list = t.cases;
  const i = list.findIndex((x) => x.slug === c.slug);
  const prev = i > 0 ? list[i - 1] : null;
  const next = i < list.length - 1 ? list[i + 1] : null;

  return (
    <div>
      <div className="bmk-section tight" style={{ paddingBottom: 0 }}>
        <Reveal>
          <Link className="bmk-back mono" to={href("/work")}>
            {p.backToIndex}
          </Link>
        </Reveal>
      </div>

      <article className="bmk-case" id={c.slug}>
        <Reveal>
          <span className="tag mono">{c.tag}</span>
        </Reveal>
        <Reveal>
          <h1 className="serif">{c.title}</h1>
        </Reveal>
        <Reveal>
          <Media image={c.image} label={c.tag} />
        </Reveal>
        <div className="body-grid">
          <Reveal className="label" as="span">
            {c.label}
          </Reveal>
          <Reveal>
            {c.body.map((text, k) => (
              <Body key={k} text={text} />
            ))}
            {c.built && (
              <div className="built">
                <span className="k">{p.builtLabel}</span>
                <p>{c.built}</p>
              </div>
            )}
            {c.note && <p className="case-note">{c.note}</p>}
          </Reveal>
        </div>
        {c.gallery && (
          <Reveal>
            <div className="bmk-case-gallery">
              {c.gallery.map((g) => (
                <Media key={g.src} image={g} />
              ))}
            </div>
          </Reveal>
        )}
      </article>

      <nav className="bmk-case-nav">
        {prev ? (
          <Link className="prev" to={href(`/work/${prev.slug}`)}>
            <span className="mono">{p.prev}</span>
            <span className="serif">{prev.tag}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="next" to={href(`/work/${next.slug}`)}>
            <span className="mono">{p.next}</span>
            <span className="serif">{next.tag}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
