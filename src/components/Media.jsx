/*
 * Renders real photography when it exists, and a branded plate when it doesn't.
 * Cases without their own imagery deliberately fall back to the signature mark
 * rather than borrowing an unrelated photo.
 */
export default function Media({ image, label, className = "", style = {} }) {
  if (image) {
    return (
      <figure className={`bmk-fig bmk-media ${className}`} style={style}>
        <img src={image.src} alt={image.alt || image.caption || label || ""} loading="lazy" />
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
    );
  }
  return (
    <div className={`bmk-plate bmk-media ${className}`} style={style}>
      <img src="/assets/wordmark.png" alt="" aria-hidden="true" />
      {label && <span>{label}</span>}
    </div>
  );
}
