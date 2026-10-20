import { useEffect, useRef } from 'react';

/**
 * Screenshot or short looping video for a project. Until the asset exists
 * (`ready: false`), renders a labeled placeholder naming the file it wants.
 */
export default function Media({ media, title, className = '' }) {
  const video = useRef(null);

  // Respect reduced motion: leave looping videos paused on the poster.
  useEffect(() => {
    if (video.current && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.current.pause();
    }
  }, []);

  if (!media.ready) {
    return (
      <div className={`media media-placeholder ${className}`} role="img" aria-label={`Placeholder for ${title} screenshot`}>
        <span>
          Placeholder
          <br />
          <code>public{media.src}</code>
        </span>
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <video
        ref={video}
        className={`media ${className}`}
        src={media.src}
        poster={media.poster}
        aria-label={media.alt}
        autoPlay
        muted
        loop
        playsInline
        width="1600"
        height="1000"
      />
    );
  }

  return (
    <img className={`media ${className}`} src={media.src} alt={media.alt} width="1600" height="1000" loading="lazy" decoding="async" />
  );
}
