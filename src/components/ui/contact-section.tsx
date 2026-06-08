import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// CONSTANTS
// ============================================================================

const ACCENT = '#ff3c00';
const TEXT = '#e0e0e0';
const BORDER = 'rgba(255, 255, 255, 0.1)';
const ACCENT_BORDER = 'rgba(255, 60, 0, 0.35)';
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

const PERSON = {
  name: 'Alif Hafiz K.',
  role: 'Software Engineering Student',
  description:
    'Passionate about backend development, modern web technologies, and creating reliable digital solutions. Always open to learning, collaboration, and exciting opportunities.',
  email: 'hafizmails615@gmail.com',
  location: 'Banyuwangi, Jawa Timur, Indonesia',
  availability: 'Open for Projects & Collaboration',
};

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/AlifHafizK',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.125-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404 11.5 11.5 0 0 1 3.003.404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.243 2.874.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.824 1.102.824 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alif-hafiz-kandayas-935aa3414/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/c4lder_/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${PERSON.email}`,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

// ============================================================================
// ICONS
// ============================================================================

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const AvailabilityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// ============================================================================
// CONTACT INFO ITEM
// ============================================================================

const ContactInfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="contact-info-item">
    <div className="contact-info-icon">{icon}</div>
    <div className="contact-info-text">
      <span className="contact-info-label">{label}</span>
      <span className="contact-info-value">{value}</span>
    </div>
  </div>
);

// ============================================================================
// LEFT CARD
// ============================================================================

const ContactCard: React.FC<{ isInView: boolean }> = ({ isInView }) => (
  <div
    className="contact-card"
    style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(48px)',
      transition: `opacity 0.8s ${EASING}, transform 0.8s ${EASING}`,
    }}
  >
    {/* Card glow */}
    <div className="contact-card-glow" />

    {/* Flex content container — fills card height */}
    <div className="contact-card-content">

      {/* TOP ZONE: Avatar + Name */}
      <div>
        <div className="contact-card-header">
          {/* Avatar / initials */}
          <div className="contact-avatar">
            <span className="contact-avatar-initials">AH</span>
            <div className="contact-avatar-ring" />
          </div>
          <div>
            <div className="contact-card-name">{PERSON.name}</div>
            <div className="contact-card-role">{PERSON.role}</div>
          </div>
        </div>
        <div className="contact-divider" />
      </div>

      {/* MIDDLE ZONE: Description — grows to fill space */}
      <div className="contact-card-description-zone">
        <p className="contact-card-description">{PERSON.description}</p>
        <div className="contact-divider" />
      </div>

      {/* BOTTOM ZONE: Contact info — anchored to bottom */}
      <div className="contact-info-list">
        <ContactInfoItem icon={<EmailIcon />} label="Email" value={PERSON.email} />
        <ContactInfoItem icon={<LocationIcon />} label="Location" value={PERSON.location} />
        <ContactInfoItem icon={<AvailabilityIcon />} label="Status" value={PERSON.availability} />
      </div>

    </div>

    {/* Accent line */}
    <div className="contact-card-accent-line" />
  </div>
);

// ============================================================================
// CONTACT FORM
// ============================================================================

const ContactForm: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div
      className="contact-form-wrapper"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(48px)',
        transition: `opacity 0.8s ${EASING} 0.15s, transform 0.8s ${EASING} 0.15s`,
      }}
    >
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Row: Name + Email */}
        <div className="contact-form-row">
          <div className={`contact-field ${focused === 'name' ? 'focused' : ''}`}>
            <label className="contact-field-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              placeholder="Your full name"
              className="contact-input"
              required
            />
          </div>
          <div className={`contact-field ${focused === 'email' ? 'focused' : ''}`}>
            <label className="contact-field-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              placeholder="your@email.com"
              className="contact-input"
              required
            />
          </div>
        </div>

        {/* Subject */}
        <div className={`contact-field ${focused === 'subject' ? 'focused' : ''}`}>
          <label className="contact-field-label">Subject</label>
          <input
            type="text"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            onFocus={() => setFocused('subject')}
            onBlur={() => setFocused(null)}
            placeholder="What's this about?"
            className="contact-input"
            required
          />
        </div>

        {/* Message */}
        <div className={`contact-field ${focused === 'message' ? 'focused' : ''}`}>
          <label className="contact-field-label">Message</label>
          <textarea
            name="message"
            value={formState.message}
            onChange={handleChange}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            placeholder="Tell me about your project or idea..."
            className="contact-textarea"
            rows={5}
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" className={`contact-submit ${submitted ? 'sent' : ''}`}>
          {submitted ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>MESSAGE SENT</span>
            </>
          ) : (
            <>
              <SendIcon />
              <span>SEND MESSAGE</span>
            </>
          )}
          <div className="contact-submit-glow" />
        </button>
      </form>

      {/* Socials row */}
      <div
        className="contact-socials-wrapper"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.8s ${EASING} 0.3s, transform 0.8s ${EASING} 0.3s`,
        }}
      >
        <span className="contact-socials-label">CONNECT WITH ME</span>
        <div className="contact-socials-row">
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              aria-label={s.label}
            >
              {s.icon}
              <div className="contact-social-glow" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN SECTION
// ============================================================================

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section"
    >
      <ContactStyles />

      {/* Background layers */}
      <div className="contact-bg-radial" style={{ opacity: isInView ? 1 : 0, transition: 'opacity 2s ease-out' }} />
      <div className="contact-grid-overlay" />
      <div className="contact-contours" style={{ animation: isInView ? 'contactContourFlow 20s linear infinite' : 'none' }} />

      {/* Particles */}
      {isInView && (
        <div className="contact-particles">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="contact-particle"
              style={{
                width: `${150 + i * 40}px`,
                height: `${150 + i * 40}px`,
                left: `${[5, 20, 50, 70, 85, 95][i]}%`,
                top: `${[10, 60, 30, 75, 20, 50][i]}%`,
                animationDuration: `${16 + i * 3}s`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="contact-container">
        {/* Header */}
        <div
          className="contact-header"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(40px)',
            filter: isInView ? 'blur(0px)' : 'blur(8px)',
            transition: `all 0.8s ${EASING}`,
          }}
        >
          <div className="contact-label">[ CONTACT ]</div>
          <h2 className="contact-heading">
            LET'S BUILD<br />SOMETHING AMAZING
          </h2>
          <p className="contact-subtitle">
            Have an idea, project, collaboration, or opportunity?<br />
            I'm always excited to discuss technology, backend development, and creative digital experiences.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="contact-grid">
          <ContactCard isInView={isInView} />
          <ContactForm isInView={isInView} />
        </div>
      </div>

      <style>{`
        @keyframes contactContourFlow {
          0% { transform: translateY(0px); }
          100% { transform: translateY(20px); }
        }
        @keyframes contactFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { transform: translateY(-28px) translateX(16px); opacity: 1; }
        }
        @keyframes contactPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 60, 0, 0); }
          50% { box-shadow: 0 0 0 6px rgba(255, 60, 0, 0.08); }
        }
        @keyframes contactAvatarSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const ContactStyles = () => (
  <style>{`
    /* ================================================================
       SECTION
       ================================================================ */
    .contact-section {
      position: relative;
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #080808 100%);
      color: white;
      overflow: hidden;
    }

    /* ================================================================
       BACKGROUND LAYERS
       ================================================================ */
    .contact-bg-radial {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image:
        radial-gradient(circle at 50% 10%, rgba(255, 60, 0, 0.09) 0%, transparent 50%),
        radial-gradient(circle at 15% 70%, rgba(255, 60, 0, 0.05) 0%, transparent 45%),
        radial-gradient(circle at 85% 80%, rgba(255, 60, 0, 0.04) 0%, transparent 40%);
      transition: opacity 2s ease-out;
    }

    .contact-grid-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.5;
    }

    .contact-contours {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: repeating-radial-gradient(
        circle at 50% 50%,
        transparent 0,
        transparent 80px,
        rgba(255,255,255,0.025) 81px,
        transparent 82px
      );
    }

    .contact-particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .contact-particle {
      position: absolute;
      border-radius: 9999px;
      background: radial-gradient(circle, rgba(255,60,0,0.04) 0%, transparent 70%);
      animation: contactFloat linear infinite;
    }

    /* ================================================================
       LAYOUT
       ================================================================ */
    .contact-container {
      position: relative;
      z-index: 10;
      max-width: 1100px;
      margin: 0 auto;
      padding: 2.5rem 2rem 2rem;
      width: 100%;
    }

    @media (min-width: 640px) {
      .contact-container { padding: 2.75rem 2.5rem 2rem; }
    }

    @media (min-width: 1024px) {
      .contact-container { padding: 3rem 3rem 2.5rem; }
    }

    /* ================================================================
       HEADER
       ================================================================ */
    .contact-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .contact-label {
      font-family: 'Syncopate', sans-serif;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: ${ACCENT};
      margin-bottom: 0.65rem;
      text-transform: uppercase;
    }

    .contact-heading {
      font-family: 'Syncopate', sans-serif;
      font-size: clamp(1.1rem, 4vw, 1.9rem);
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.02em;
      color: white;
      margin: 0 0 0.7rem;
    }

    .contact-subtitle {
      font-size: clamp(0.65rem, 1.3vw, 0.75rem);
      line-height: 1.75;
      color: ${TEXT};
      font-weight: 400;
      max-width: 540px;
      margin: 0 auto;
    }

    /* ================================================================
       TWO-COLUMN GRID
       ================================================================ */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-bottom: 0;
    }

    @media (min-width: 1024px) {
      .contact-grid {
        grid-template-columns: 1fr 1.4fr;
        gap: 1rem;
        align-items: stretch;
      }
    }

    /* ================================================================
       LEFT CARD
       ================================================================ */
    .contact-card {
      position: relative;
      padding: 1.35rem;
      border-radius: 0.75rem;
      border: 1px solid ${BORDER};
      background: rgba(255,255,255,0.025);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      overflow: hidden;
      transition: border-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s ease;
      cursor: default;
    }

    .contact-card:hover {
      border-color: ${ACCENT_BORDER};
      box-shadow: 0 0 40px rgba(255, 60, 0, 0.06);
      transform: translateY(-4px);
    }

    .contact-card-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 30% 20%, rgba(255,60,0,0.09) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
      border-radius: inherit;
    }

    .contact-card:hover .contact-card-glow {
      opacity: 1;
    }

    /* Card inner flex layout — fills full card height */
    .contact-card-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    /* Middle zone — description grows to fill available space */
    .contact-card-description-zone {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .contact-card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    /* Avatar */
    .contact-avatar {
      position: relative;
      width: 44px;
      height: 44px;
      flex-shrink: 0;
    }

    .contact-avatar-initials {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      background: rgba(255,60,0,0.12);
      border: 1px solid rgba(255,60,0,0.3);
      font-family: 'Syncopate', sans-serif;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: ${ACCENT};
      animation: contactPulse 3s ease-in-out infinite;
    }

    .contact-avatar-ring {
      position: absolute;
      inset: -4px;
      border-radius: 9999px;
      border: 1px solid rgba(255,60,0,0.15);
      animation: contactAvatarSpin 12s linear infinite;
      border-top-color: rgba(255,60,0,0.4);
    }

    .contact-card-name {
      font-family: 'Syncopate', sans-serif;
      font-size: clamp(0.7rem, 1.5vw, 0.85rem);
      font-weight: 700;
      letter-spacing: 0.03em;
      color: white;
      margin-bottom: 0.2rem;
    }

    .contact-card-role {
      font-family: 'Syncopate', sans-serif;
      font-size: 0.52rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: ${ACCENT};
      opacity: 0.8;
      text-transform: uppercase;
    }

    .contact-divider {
      height: 1px;
      background: ${BORDER};
      margin: 0.65rem 0;
    }

    .contact-card-description {
      font-size: clamp(0.68rem, 1.2vw, 0.75rem);
      line-height: 1.9;
      color: ${TEXT};
      font-weight: 400;
      margin: 0;
    }

    /* Info list */
    .contact-info-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .contact-info-item {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
    }

    .contact-info-icon {
      width: 28px;
      height: 28px;
      border-radius: 0.35rem;
      border: 1px solid ${BORDER};
      background: rgba(255,255,255,0.03);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${ACCENT};
      flex-shrink: 0;
      transition: border-color 0.3s ease, background 0.3s ease;
    }

    .contact-card:hover .contact-info-icon {
      border-color: rgba(255,60,0,0.3);
      background: rgba(255,60,0,0.06);
    }

    .contact-info-text {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .contact-info-label {
      font-family: 'Syncopate', sans-serif;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: ${ACCENT};
      opacity: 0.6;
      text-transform: uppercase;
    }

    .contact-info-value {
      font-size: clamp(0.63rem, 1.1vw, 0.72rem);
      color: ${TEXT};
      font-weight: 400;
    }

    /* Accent line */
    .contact-card-accent-line {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(to right, ${ACCENT}, transparent);
      border-radius: 0 0 0.75rem 0.75rem;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .contact-card:hover .contact-card-accent-line {
      opacity: 1;
    }

    /* ================================================================
       FORM WRAPPER
       ================================================================ */
    .contact-form-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      height: 100%;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      padding: 1.35rem;
      border-radius: 0.75rem;
      border: 1px solid ${BORDER};
      background: rgba(255,255,255,0.02);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition: border-color 0.4s ease;
    }

    .contact-form:focus-within {
      border-color: ${ACCENT_BORDER};
    }

    .contact-form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.65rem;
    }

    @media (min-width: 540px) {
      .contact-form-row {
        grid-template-columns: 1fr 1fr;
      }
    }

    .contact-field {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      position: relative;
    }

    .contact-field-label {
      font-family: 'Syncopate', sans-serif;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${TEXT};
      opacity: 0.6;
      transition: opacity 0.3s ease, color 0.3s ease;
    }

    .contact-field.focused .contact-field-label {
      opacity: 1;
      color: ${ACCENT};
    }

    .contact-input,
    .contact-textarea {
      width: 100%;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 0.4rem;
      padding: 0.5rem 0.85rem;
      font-size: 0.8rem;
      color: white;
      outline: none;
      font-family: inherit;
      transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      box-sizing: border-box;
      -webkit-appearance: none;
    }

    .contact-input::placeholder,
    .contact-textarea::placeholder {
      color: rgba(255,255,255,0.25);
    }

    .contact-input:focus,
    .contact-textarea:focus {
      border-color: rgba(255,60,0,0.5);
      background: rgba(255,60,0,0.04);
      box-shadow: 0 0 0 3px rgba(255,60,0,0.08);
    }

    .contact-textarea {
      resize: vertical;
      min-height: 88px;
      line-height: 1.6;
    }

    /* Submit button */
    .contact-submit {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      padding: 0.55rem 1.5rem;
      border-radius: 0.4rem;
      border: 1px solid ${ACCENT};
      background: transparent;
      color: ${ACCENT};
      font-family: 'Syncopate', sans-serif;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      cursor: pointer;
      overflow: hidden;
      transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
      margin-top: 0.15rem;
    }

    .contact-submit:hover {
      background: ${ACCENT};
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255,60,0,0.25);
    }

    .contact-submit.sent {
      background: rgba(255,60,0,0.1);
      border-color: rgba(255,60,0,0.4);
      color: ${ACCENT};
    }

    .contact-submit-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 50%, rgba(255,60,0,0.3) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .contact-submit:hover .contact-submit-glow {
      opacity: 1;
    }

    /* ================================================================
       SOCIALS
       ================================================================ */
    .contact-socials-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
    }

    .contact-socials-label {
      font-family: 'Syncopate', sans-serif;
      font-size: 0.55rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: ${TEXT};
      opacity: 0.5;
      text-transform: uppercase;
    }

    .contact-socials-row {
      display: flex;
      gap: 0.6rem;
    }

    .contact-social-btn {
      position: relative;
      width: 34px;
      height: 34px;
      border-radius: 9999px;
      border: 1px solid ${BORDER};
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${TEXT};
      text-decoration: none;
      transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease, transform 0.3s ease;
      overflow: hidden;
    }

    .contact-social-btn:hover {
      border-color: rgba(255,60,0,0.45);
      background: rgba(255,60,0,0.08);
      color: ${ACCENT};
      transform: scale(1.12) translateY(-2px);
    }

    .contact-social-glow {
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      background: radial-gradient(circle, rgba(255,60,0,0.2) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .contact-social-btn:hover .contact-social-glow {
      opacity: 1;
    }
  `}</style>
);

export default ContactSection;
