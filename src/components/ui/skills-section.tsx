import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// CONFIGURATION & CONTENT CONSTANTS
// ============================================================================

const SKILLS_CONTENT = {
  label: '[ SKILLS ]',
  heading: 'MY EXPERTISE',
  subtitle:
    'A combination of technical knowledge and personal strengths that help me build solutions and collaborate effectively.',
};

const HARD_SKILLS = [
  {
    logo: 'java',
    title: 'Java Development',
    description:
      'Experienced in object-oriented programming, data structures, algorithms, and building scalable desktop applications. Comfortable creating clean, maintainable, and efficient code using Java.',
    technologies: ['Java', 'OOP', 'Collections', 'Swing', 'MySQL'],
    sertificate: 'https://drive.google.com/file/d/1KdADBQ0vfXWEg6I4BoOy41LDeHaEYmrs/view?usp=drive_link',
  },
  {
    logo: 'javascript',
    title: 'Frontend Development',
    description:
      'Skilled in creating responsive and interactive user interfaces using modern frontend technologies. Focused on delivering clean designs and smooth user experiences.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'React'],
  },
  {
    logo: 'php',
    title: 'Backend Development',
    description:
      'Passionate about server-side development, RESTful APIs, database integration, and application architecture. Enjoy building reliable systems that power modern web applications.',
    technologies: ['PHP', 'Laravel', 'REST API', 'MySQL', 'PostgreSQL'],
  },
];

const SOFT_SKILLS = [
  {
    icon: 'shield',
    title: 'Honesty',
    description:
      'Always prioritizing integrity, transparency, and ethical decision-making in every project and responsibility.',
  },
  {
    icon: 'check',
    title: 'Responsibility',
    description:
      'Committed to completing tasks on time, maintaining quality standards, and taking ownership of every assignment.',
  },
  {
    icon: 'message',
    title: 'Communicative',
    description:
      'Able to communicate ideas clearly, collaborate effectively within teams, and actively listen to feedback.',
  },
];

const ANIMATION_CONFIG = {
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  scrollThreshold: 0.15,
  staggerDelay: 0.1,
};

const COLOR_CONFIG = {
  bg: '#0a0a0a',
  bgGradient: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%)',
  accent: '#ff3c00',
  text: '#e0e0e0',
  border: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.3)',
  accentBorderHover: 'rgba(255, 60, 0, 0.4)',
};

// ============================================================================
// SVG ICON COMPONENTS
// ============================================================================

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const MessageIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const JavaLogo = () => (
  <svg width="32" height="32" viewBox="0 0 256 256" fill="none">
    <path d="M96 180c-32 12-64 16-64 0 0-12 20-20 40-16l24 16z" fill="#e0e0e0" opacity="0.9" />
    <path d="M160 84c0 0 32-20 16-44-12-16-28-8-28-8s20-20 40-4c20 16 0 40-12 48l-16 8z" fill="#e0e0e0" opacity="0.7" />
    <path d="M88 200c16 8 56 12 88-4 32-16 44-40 44-56 0 0-12 36-52 52-40 16-76 12-80 8z" fill="#e0e0e0" opacity="0.5" />
    <path d="M108 156c0 0-24 12-12 24s20 0 20 0" stroke="#e0e0e0" strokeWidth="4" fill="none" opacity="0.6" />
    <path d="M120 100c-8 8-32 32-16 56 0 0-16-8-12-28s24-28 28-28z" fill="#ff3c00" opacity="0.8" />
    <path d="M140 108c-4 12 0 28 12 36s24 4 24 4-12 4-24-4-16-24-12-36z" fill="#ff3c00" opacity="0.6" />
  </svg>
);

const JavaScriptLogo = () => (
  <svg width="32" height="32" viewBox="0 0 256 256">
    <rect x="0" y="0" width="256" height="256" rx="24" fill="#e0e0e0" opacity="0.1" />
    <text x="128" y="170" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="100" fill="#e0e0e0" opacity="0.85">JS</text>
  </svg>
);

const PhpLogo = () => (
  <svg width="40" height="24" viewBox="0 0 256 144">
    <text x="128" y="108" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="100" fill="#e0e0e0" opacity="0.85">php</text>
  </svg>
);

const LOGO_MAP: Record<string, React.FC> = {
  java: JavaLogo,
  javascript: JavaScriptLogo,
  php: PhpLogo,
};

const ICON_MAP: Record<string, React.FC> = {
  shield: ShieldIcon,
  check: CheckIcon,
  message: MessageIcon,
};

// ============================================================================
// EXPANDING SKILL CARD - HARD SKILL
// ============================================================================

interface HardSkillCardProps {
  logo: string;
  title: string;
  description: string;
  technologies: string[];
  index: number;
  isInView: boolean;
}

const HardSkillCard: React.FC<HardSkillCardProps> = ({
  logo,
  title,
  description,
  technologies,
  index,
  isInView,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const LogoComponent = LOGO_MAP[logo];

  return (
    <div
      className={`skill-expanding-card ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing} ${index * ANIMATION_CONFIG.staggerDelay}s`,
      }}
    >
      {/* Glow effect */}
      <div className="skill-card-glow" />

      {/* Card content */}
      <div className="skill-card-inner">
        {/* Header: Logo + Title */}
        <div className="skill-card-header">
          <div className="skill-card-logo">
            {LogoComponent && <LogoComponent />}
          </div>
          <h3 className="skill-card-title">{title}</h3>
        </div>

        {/* Expandable content */}
        <div className="skill-card-expandable">
          <p className="skill-card-description">{description}</p>
          <div className="skill-card-techs">
            {technologies.map((tech, i) => (
              <span key={i} className="skill-card-tech-pill">{tech}</span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="skill-card-accent-line" />
      </div>
    </div>
  );
};

// ============================================================================
// EXPANDING SKILL CARD - SOFT SKILL
// ============================================================================

interface SoftSkillCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}

const SoftSkillCard: React.FC<SoftSkillCardProps> = ({
  icon,
  title,
  description,
  index,
  isInView,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = ICON_MAP[icon];

  return (
    <div
      className={`skill-expanding-card skill-soft-card ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing} ${index * ANIMATION_CONFIG.staggerDelay}s`,
      }}
    >
      {/* Glow effect */}
      <div className="skill-card-glow" />

      {/* Card content */}
      <div className="skill-card-inner">
        {/* Header: Icon + Title */}
        <div className="skill-card-header">
          <div className="skill-card-icon">
            {IconComponent && <IconComponent />}
          </div>
          <h3 className="skill-card-title">{title}</h3>
        </div>

        {/* Expandable content */}
        <div className="skill-card-expandable">
          <p className="skill-card-description">{description}</p>
        </div>

        {/* Bottom accent line */}
        <div className="skill-card-accent-line" />
      </div>
    </div>
  );
};

// ============================================================================
// SKILLS SECTION COMPONENT
// ============================================================================

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: ANIMATION_CONFIG.scrollThreshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full text-white overflow-hidden"
      style={{ background: COLOR_CONFIG.bgGradient }}
    >
      <SkillStyles />

      {/* Background layers */}
      <div
        className="absolute inset-0 pointer-events-none skill-bg-glow"
        style={{
          backgroundImage: `
            radial-gradient(circle at 60% 30%, rgba(255, 60, 0, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(255, 60, 0, 0.04) 0%, transparent 50%)
          `,
          opacity: isInView ? 1 : 0,
          transition: 'opacity 2s ease-out',
        }}
      />
      <div className="absolute inset-0 pointer-events-none skill-grid-overlay" />
      <div
        className="absolute inset-0 pointer-events-none skill-contours"
        style={{
          animation: isInView ? 'skillContourFlow 20s linear infinite' : 'none',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section header */}
          <div
            className="skill-header"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(40px)',
              transition: `all ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing}`,
              filter: isInView ? 'blur(0px)' : 'blur(8px)',
            }}
          >
            <div className="skill-label">{SKILLS_CONTENT.label}</div>
            <h2 className="skill-heading">{SKILLS_CONTENT.heading}</h2>
            <p className="skill-subtitle">{SKILLS_CONTENT.subtitle}</p>
          </div>

          {/* Hard Skills */}
          <div className="skill-section-label">HARD SKILLS</div>
          <div className="skill-cards-grid">
            {HARD_SKILLS.map((skill, index) => (
              <HardSkillCard
                key={index}
                logo={skill.logo}
                title={skill.title}
                description={skill.description}
                technologies={skill.technologies}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Soft Skills */}
          <div className="skill-section-label skill-section-label-soft">SOFT SKILLS</div>
          <div className="skill-cards-grid skill-cards-grid-soft">
            {SOFT_SKILLS.map((skill, index) => (
              <SoftSkillCard
                key={index}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {isInView && (
        <div className="skill-particles-container">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="skill-particle"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `skillFloat ${Math.random() * 20 + 15}s ease-in-out infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes skillContourFlow {
          0% { transform: translateY(0px); }
          100% { transform: translateY(20px); }
        }
        @keyframes skillFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { transform: translateY(-30px) translateX(20px); opacity: 1; }
        }
        @keyframes skillExpandLine {
          from { width: 0%; }
          to { width: 100%; }
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

const SkillStyles = () => (
  <style>{`
    /* ====================================================================
       BACKGROUND LAYERS
       ==================================================================== */

    .skill-bg-glow {
      background-image:
        radial-gradient(circle at 60% 30%, rgba(255, 60, 0, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 30% 70%, rgba(255, 60, 0, 0.04) 0%, transparent 50%);
    }

    .skill-grid-overlay {
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.5;
    }

    .skill-contours {
      background-image:
        repeating-radial-gradient(
          circle at 50% 50%,
          transparent 0,
          transparent 80px,
          rgba(255, 255, 255, 0.03) 81px,
          transparent 82px
        );
    }

    /* ====================================================================
       SECTION HEADER
       ==================================================================== */

    .skill-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .skill-label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      font-family: 'Syncopate', sans-serif;
      color: ${COLOR_CONFIG.accent};
      margin-bottom: 1.5rem;
      text-transform: uppercase;
    }

    .skill-heading {
      font-size: clamp(1.875rem, 8vw, 3.75rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      font-family: 'Syncopate', sans-serif;
      color: white;
      margin-bottom: 1.5rem;
    }

    .skill-subtitle {
      font-size: clamp(0.875rem, 2vw, 1rem);
      line-height: 1.8;
      color: ${COLOR_CONFIG.text};
      font-weight: 400;
      max-width: 700px;
      margin: 0 auto;
    }

    /* ====================================================================
       SECTION LABELS
       ==================================================================== */

    .skill-section-label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      font-family: 'Syncopate', sans-serif;
      color: ${COLOR_CONFIG.accent};
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      margin-top: 3rem;
    }

    .skill-section-label-soft {
      margin-top: 3rem;
    }

    /* ====================================================================
       CARD GRID
       ==================================================================== */

    .skill-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }

    .skill-cards-grid-soft {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1024px) {
      .skill-cards-grid,
      .skill-cards-grid-soft {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .skill-cards-grid,
      .skill-cards-grid-soft {
        grid-template-columns: 1fr;
      }
    }

    /* ====================================================================
       EXPANDING CARD
       ==================================================================== */

    .skill-expanding-card {
      position: relative;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .skill-card-glow {
      position: absolute;
      inset: 0;
      border-radius: 0.5rem;
      opacity: 0;
      background: radial-gradient(circle, rgba(255, 60, 0, 0.3) 0%, transparent 70%);
      transition: opacity 0.5s ease;
      filter: blur(40px);
      pointer-events: none;
    }

    .skill-expanding-card:hover .skill-card-glow {
      opacity: 1;
    }

    .skill-card-inner {
      position: relative;
      padding: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid ${COLOR_CONFIG.border};
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(10px);
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }

    @media (max-width: 640px) {
      .skill-card-inner {
        padding: 1.25rem;
      }
    }

    .skill-expanding-card:hover .skill-card-inner {
      border-color: ${COLOR_CONFIG.accentBorderHover};
      background: rgba(255, 255, 255, 0.04);
      box-shadow: 0 0 30px rgba(255, 60, 0, 0.05);
    }

    /* ====================================================================
       CARD HEADER
       ==================================================================== */

    .skill-card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0;
      transition: margin-bottom 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .skill-expanding-card:hover .skill-card-header,
    .skill-expanding-card.expanded .skill-card-header {
      margin-bottom: 1rem;
    }

    .skill-card-logo,
    .skill-card-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 8px;
      border: 1px solid ${COLOR_CONFIG.border};
      background: rgba(255, 255, 255, 0.03);
      color: ${COLOR_CONFIG.text};
      flex-shrink: 0;
      transition: all 0.5s ease;
    }

    .skill-expanding-card:hover .skill-card-logo,
    .skill-expanding-card:hover .skill-card-icon {
      border-color: rgba(255, 60, 0, 0.3);
      color: ${COLOR_CONFIG.accent};
    }

    .skill-card-title {
      font-family: 'Syncopate', sans-serif;
      font-weight: 500;
      letter-spacing: 0.05em;
      color: white;
      font-size: clamp(0.8rem, 1.5vw, 0.95rem);
      margin: 0;
      transition: color 0.3s ease;
    }

    .skill-expanding-card:hover .skill-card-title {
      color: ${COLOR_CONFIG.accent};
    }

    /* ====================================================================
       EXPANDABLE CONTENT
       ==================================================================== */

    .skill-card-expandable {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.4s ease 0.1s;
    }

    .skill-expanding-card:hover .skill-card-expandable,
    .skill-expanding-card.expanded .skill-card-expandable {
      max-height: 300px;
      opacity: 1;
    }

    .skill-card-description {
      font-size: clamp(0.8rem, 1.5vw, 0.9rem);
      line-height: 1.7;
      color: ${COLOR_CONFIG.text};
      margin: 0 0 1rem 0;
      font-weight: 400;
    }

    /* ====================================================================
       TECH PILLS (inside cards)
       ==================================================================== */

    .skill-card-techs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-card-tech-pill {
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      font-size: clamp(0.65rem, 1.2vw, 0.8rem);
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      font-family: 'Syncopate', sans-serif;
      letter-spacing: 0.05em;
      color: ${COLOR_CONFIG.text};
      display: inline-block;
      font-weight: 500;
      transition: border-color 0.3s ease, background 0.3s ease;
    }

    .skill-expanding-card:hover .skill-card-tech-pill {
      border-color: rgba(255, 60, 0, 0.3);
      background: rgba(255, 60, 0, 0.05);
    }

    /* ====================================================================
       ACCENT LINE
       ==================================================================== */

    .skill-card-accent-line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 0;
      background: linear-gradient(to right, ${COLOR_CONFIG.accent}, transparent);
      border-radius: 0 0 0.5rem 0;
      transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .skill-expanding-card:hover .skill-card-accent-line {
      width: 100%;
    }

    /* ====================================================================
       SOFT SKILL CARD VARIATION
       ==================================================================== */

    .skill-soft-card .skill-card-inner {
      background: rgba(255, 255, 255, 0.015);
    }

    .skill-soft-card:hover .skill-card-inner {
      background: rgba(255, 255, 255, 0.035);
    }

    /* ====================================================================
       FLOATING PARTICLES
       ==================================================================== */

    .skill-particles-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .skill-particle {
      position: absolute;
      border-radius: 9999px;
      background: radial-gradient(circle, rgba(255, 60, 0, 0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    /* ====================================================================
       ACCESSIBILITY
       ==================================================================== */

    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }
  `}</style>
);

export default SkillsSection;
