import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// CONSTANTS
// ============================================================================

const ACCENT = '#ff5a1f';
const TEXT = '#e0e0e0';
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const scrollTo = (href: string) => {
  document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
};

// ============================================================================
// ICONS
// ============================================================================

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.921l4.255 5.649zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.25 8.25 0 0 0 4.83 1.56V6.79a4.85 4.85 0 0 1-1.06-.1z" />
  </svg>
);

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: <InstagramIcon /> },
  { label: 'X', href: 'https://x.com', icon: <XIcon /> },
  { label: 'TikTok', href: 'https://tiktok.com', icon: <TikTokIcon /> },
];

// ============================================================================
// COMPONENT
// ============================================================================

const FooterSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, []);

  return (
    <footer ref={ref} className="ft-root">
      <FooterStyles />

      {/* Top divider with orange center glow */}
      <div className="ft-divider-wrap">
        <div className="ft-divider" />
      </div>

      {/* Subtle bg glow */}
      <div className="ft-bg-glow" style={{ opacity: inView ? 1 : 0 }} />
      <div className="ft-grid" />

      <div
        className="ft-inner"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity 0.7s ${EASING}, transform 0.7s ${EASING}`,
        }}
      >
        {/* ── MAIN ROW ── */}
        <div className="ft-main">

          {/* LEFT */}
          <div className="ft-left">
            {/* Logo + name on same row */}
            <div className="ft-identity">
              <div className="ft-logo">AH</div>
              <span className="ft-name">Alif Hafiz K.</span>
            </div>
            {/* Roles */}
            <div className="ft-roles">
              <span>Software Engineering Student</span>
              <span className="ft-role-dot" />
              <span>Backend Development Enthusiast</span>
            </div>
            {/* Desc */}
            <p className="ft-desc">
              Passionate about backend development, web technologies, and creating scalable digital solutions with clean architecture and modern development practices.
            </p>
          </div>

          {/* CENTER */}
          <div className="ft-nav">
            <div className="ft-col-title">NAVIGATION</div>
            <ul className="ft-nav-list">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="ft-nav-link"
                    onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                  >
                    {l.label}
                    <span className="ft-nav-line" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="ft-social">
            <div className="ft-col-title">SOCIAL MEDIA</div>
            <div className="ft-social-row">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                  <div className="ft-social-glow" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bar-divider" />
        <div className="ft-bar">
          <p className="ft-copy">
            &copy; 2026 <span className="ft-copy-accent">Alif Hafiz K.</span> &mdash; All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const FooterStyles = () => (
  <style>{`
    .ft-root {
      position: relative;
      width: 100%;
      background: #080808;
      overflow: hidden;
    }

    /* Top divider */
    .ft-divider-wrap {
      position: relative;
      width: 100%;
      height: 1px;
      overflow: visible;
    }
    .ft-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(255,255,255,0.06) 20%,
        rgba(255, 90, 31, 0.45) 50%,
        rgba(255,255,255,0.06) 80%,
        transparent 100%
      );
      box-shadow: 0 0 18px 2px rgba(255, 90, 31, 0.18);
    }

    /* Background */
    .ft-bg-glow {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255, 90, 31, 0.07) 0%, transparent 60%);
      transition: opacity 1.5s ease;
    }
    .ft-grid {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
      background-size: 50px 50px;
    }

    /* Inner container */
    .ft-inner {
      position: relative;
      z-index: 10;
      max-width: 1280px;
      margin: 0 auto;
      padding: 2.25rem 1.5rem 1.5rem;
    }
    @media (min-width: 640px)  { .ft-inner { padding: 2.5rem 2.5rem 1.5rem; } }
    @media (min-width: 1024px) { .ft-inner { padding: 2.75rem 4rem 1.75rem; } }

    /* Main three-column row */
    .ft-main {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-bottom: 1.75rem;
    }
    @media (min-width: 640px) {
      .ft-main { grid-template-columns: 1fr 1fr; gap: 1.5rem 2rem; }
    }
    @media (min-width: 1024px) {
      .ft-main { grid-template-columns: 1.8fr 1fr 1fr; gap: 2.5rem; align-items: start; }
    }

    /* ── LEFT ── */
    .ft-identity {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.6rem;
    }
    .ft-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 90, 31, 0.35);
      background: rgba(255, 90, 31, 0.09);
      font-family: 'Syncopate', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: ${ACCENT};
      flex-shrink: 0;
      transition: border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
    }
    .ft-logo:hover {
      border-color: rgba(255, 90, 31, 0.6);
      box-shadow: 0 0 14px rgba(255, 90, 31, 0.18);
    }
    .ft-name {
      font-family: 'Syncopate', sans-serif;
      font-size: clamp(0.8rem, 1.8vw, 1rem);
      font-weight: 700;
      letter-spacing: 0.04em;
      color: white;
    }
    .ft-roles {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.35rem;
      font-family: 'Syncopate', sans-serif;
      font-size: 0.56rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: ${ACCENT};
      opacity: 0.7;
      text-transform: uppercase;
      margin-bottom: 0.85rem;
    }
    .ft-role-dot {
      display: inline-block;
      width: 3px;
      height: 3px;
      border-radius: 9999px;
      background: ${ACCENT};
      opacity: 0.5;
    }
    .ft-desc {
      font-size: clamp(0.75rem, 1.3vw, 0.82rem);
      line-height: 1.75;
      color: ${TEXT};
      opacity: 0.55;
      margin: 0;
      max-width: 380px;
    }

    /* ── CENTER ── */
    .ft-col-title {
      font-family: 'Syncopate', sans-serif;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: ${ACCENT};
      text-transform: uppercase;
      margin-bottom: 1rem;
      padding-bottom: 0.6rem;
      position: relative;
    }
    .ft-col-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 20px;
      height: 1px;
      background: ${ACCENT};
      opacity: 0.45;
    }
    .ft-nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .ft-nav-link {
      position: relative;
      display: inline-block;
      text-decoration: none;
      color: ${TEXT};
      font-size: 0.85rem;
      opacity: 0.65;
      padding-bottom: 2px;
      transition: opacity 0.25s ease, color 0.25s ease;
      overflow: hidden;
    }
    .ft-nav-link:hover {
      opacity: 1;
      color: white;
    }
    .ft-nav-line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 0;
      background: ${ACCENT};
      box-shadow: 0 0 5px rgba(255, 90, 31, 0.55);
      transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ft-nav-link:hover .ft-nav-line { width: 100%; }

    /* ── RIGHT ── */
    .ft-social-row {
      display: flex;
      flex-direction: row;
      gap: 0.65rem;
    }
    .ft-social-btn {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 9999px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${TEXT};
      text-decoration: none;
      overflow: hidden;
      transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    }
    .ft-social-btn:hover {
      border-color: rgba(255, 90, 31, 0.5);
      background: rgba(255, 90, 31, 0.1);
      color: ${ACCENT};
      transform: scale(1.1) translateY(-2px);
      box-shadow: 0 4px 16px rgba(255, 90, 31, 0.2);
    }
    .ft-social-glow {
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      background: radial-gradient(circle, rgba(255, 90, 31, 0.25) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    .ft-social-btn:hover .ft-social-glow { opacity: 1; }

    /* ── BOTTOM BAR ── */
    .ft-bar-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent);
      margin-bottom: 1.1rem;
    }
    .ft-bar {
      display: flex;
      justify-content: center;
    }
    .ft-copy {
      font-size: clamp(0.68rem, 1.2vw, 0.75rem);
      color: ${TEXT};
      opacity: 0.35;
      margin: 0;
      letter-spacing: 0.03em;
    }
    .ft-copy-accent {
      color: ${ACCENT};
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `}</style>
);

export default FooterSection;
