import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// CONFIGURATION & CONTENT CONSTANTS
// ============================================================================

const ABOUT_CONTENT = {
  label: '[ ABOUT ]',
  heading: 'Turning Curiosity Into Backend Solutions',
  description:
    'Vocational School\'s student majoring Software Engineering who is enthusiast focused on backend development. Love exploring new technologies & building what happens behind the scenes. Passionate about writing clean logic, designing RESTful APIs, and optimizing databases. Turning coffee into efficient server-side code.',
};

const TECHNOLOGY_CARDS = [
  { title: 'Backend Development', delay: 0 },
  { title: 'API Development', delay: 0.1 },
  { title: 'Database Management', delay: 0.2 },
  { title: 'System Architecture', delay: 0.3 },
];

const TECH_STACK = [
  'Node.js',
  'Express.js',
  'Laravel',
  'PHP',
  'MySQL',
  'PostgreSQL',
  'Docker',
  'Git',
  'REST API',
];

const ANIMATION_CONFIG = {
  staggerDelay: 0.05,
  containerDelay: 0.4,
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  scrollThreshold: 0.2,
};

const COLOR_CONFIG = {
  bg: '#0a0a0a',
  bgGradient: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%)',
  accent: '#ff3c00',
  text: '#e0e0e0',
  border: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.3)',
};

// ============================================================================
// COMPONENT
// ============================================================================

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for scroll reveal animation
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
      id="about"
      className="relative min-h-screen w-full text-white overflow-hidden"
      style={{ background: COLOR_CONFIG.bgGradient }}
    >
      <GlobalStyles />
      {/* ====================================================================
          BACKGROUND LAYERS - Visual Effects
          ==================================================================== */}

      {/* Animated contour radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none about-bg-glow"
        style={{
          backgroundImage: `
            radial-gradient(circle at 40% 20%, rgba(255, 60, 0, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 60, 0, 0.05) 0%, transparent 50%)
          `,
          opacity: isInView ? 1 : 0,
          transition: 'opacity 2s ease-out',
        }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none about-grid-overlay" />

      {/* Animated contour lines */}
      <div
        className="absolute inset-0 pointer-events-none about-contours"
        style={{
          animation: isInView ? 'contourFlow 20s linear infinite' : 'none',
        }}
      />

      {/* ====================================================================
          MAIN CONTENT CONTAINER
          ==================================================================== */}

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* ================================================================
              LEFT COLUMN - About Content (Heading, Label, Description)
              ================================================================ */}

          <div
            className="about-content-left"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(40px)',
              transition: `all ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing}`,
              filter: isInView ? 'blur(0px)' : 'blur(8px)',
            }}
          >
            {/* About Label */}
            <div className="about-label">
              {ABOUT_CONTENT.label}
            </div>

            {/* Main Heading */}
            <h2 className="about-heading">
              {ABOUT_CONTENT.heading}
            </h2>

            {/* Description Paragraph */}
            <p className="about-description">
              {ABOUT_CONTENT.description}
            </p>
          </div>

          {/* ================================================================
              RIGHT COLUMN - Technology Cards & Tech Stack Pills
              ================================================================ */}

          <div className="about-content-right">
            {/* Technology Cards Container */}
            <div className="about-cards-container">
              {TECHNOLOGY_CARDS.map((tech, index) => (
                <TechnologyCard
                  key={index}
                  title={tech.title}
                  delay={tech.delay}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Tech Stack Pills Container */}
            <div className="about-techstack-container">
              <p className="about-techstack-label">TECH STACK</p>
              <div className="about-pills-wrapper">
                {TECH_STACK.map((tech, index) => (
                  <TechPill
                    key={index}
                    tech={tech}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          FLOATING PARTICLES - Decorative Elements
          ==================================================================== */}

      {isInView && (
        <div className="about-particles-container">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="about-particle"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 20 + 15}s ease-in-out infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes expandWidth {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 1;
          }
        }

        @keyframes contourFlow {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(20px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

// ============================================================================
// TECHNOLOGY CARD COMPONENT
// ============================================================================

interface TechnologyCardProps {
  title: string;
  delay: number;
  isInView: boolean;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ title, delay, isInView }) => {
  return (
    <div
      className="about-card"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateX(0)' : 'translateX(40px)',
        transition: `all ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing} ${delay}s`,
      }}
    >
      {/* Card glow effect (hidden by default, shows on hover) */}
      <div className="about-card-glow" />

      {/* Card content */}
      <div className="about-card-content">
        <p className="about-card-title">{title}</p>
        <div className="about-card-underline" />
      </div>
    </div>
  );
};

// ============================================================================
// TECH PILL COMPONENT
// ============================================================================

interface TechPillProps {
  tech: string;
  index: number;
  isInView: boolean;
}

const TechPill: React.FC<TechPillProps> = ({ tech, index, isInView }) => {
  return (
    <div
      className="about-pill"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ${ANIMATION_CONFIG.easing} ${ANIMATION_CONFIG.containerDelay + index * ANIMATION_CONFIG.staggerDelay}s`,
      }}
    >
      <div className="about-pill-content">{tech}</div>
    </div>
  );
};

// ============================================================================
// TAILWIND CSS CLASSES & STYLING
// ============================================================================

const GlobalStyles = () => (
  <style>{`
    /* ====================================================================
       BACKGROUND LAYERS
       ==================================================================== */

    .about-bg-glow {
      background-image:
        radial-gradient(circle at 40% 20%, rgba(255, 60, 0, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 60, 0, 0.05) 0%, transparent 50%);
    }

    .about-grid-overlay {
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.5;
    }

    .about-contours {
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
       CONTENT SECTIONS
       ==================================================================== */

    .about-content-left {
      display: flex;
      flex-direction: column;
    }

    .about-content-right {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* ====================================================================
       LABELS & TYPOGRAPHY
       ==================================================================== */

    .about-label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      font-family: 'Syncopate', sans-serif;
      color: ${COLOR_CONFIG.accent};
      margin-bottom: 1.5rem;
      text-transform: uppercase;
    }

    @media (max-width: 640px) {
      .about-label {
        margin-bottom: 1rem;
      }
    }

    .about-heading {
      font-size: clamp(1.875rem, 8vw, 3.75rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      font-family: 'Syncopate', sans-serif;
      color: white;
      margin-bottom: 1.5rem;
    }

    @media (max-width: 640px) {
      .about-heading {
        margin-bottom: 1rem;
      }
    }

    .about-description {
      font-size: clamp(0.875rem, 2vw, 1rem);
      line-height: 1.8;
      color: ${COLOR_CONFIG.text};
      font-weight: 400;
    }

    /* ====================================================================
       TECHNOLOGY CARDS
       ==================================================================== */

    .about-cards-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .about-card {
      position: relative;
      cursor: pointer;
      group: 'card';
    }

    .about-card-glow {
      position: absolute;
      inset: 0;
      border-radius: 0.5rem;
      opacity: 0;
      blur: 40px;
      background: radial-gradient(circle, rgba(255, 60, 0, 0.4) 0%, transparent 70%);
      transition: opacity 0.5s ease;
      filter: blur(40px);
    }

    .about-card:hover .about-card-glow {
      opacity: 1;
    }

    .about-card-content {
      position: relative;
      padding: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid ${COLOR_CONFIG.border};
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(10px);
      transition: border-color 0.5s ease;
    }

    @media (max-width: 640px) {
      .about-card-content {
        padding: 1rem;
      }
    }

    .about-card:hover .about-card-content {
      border-color: ${COLOR_CONFIG.borderHover};
    }

    .about-card-title {
      font-family: 'Syncopate', sans-serif;
      font-weight: 500;
      letter-spacing: 0.05em;
      color: white;
      font-size: clamp(0.875rem, 2vw, 1rem);
      margin: 0;
    }

    .about-card-underline {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(to right, rgba(255, 60, 0, 1), transparent);
      border-radius: 0 0 0.5rem 0;
      width: 0%;
      animation: expandWidth 0.8s ease-out forwards;
      transition: height 0.5s ease;
    }

    @media (max-width: 640px) {
      .about-card-underline {
        height: 3px;
      }
    }

    .about-card:hover .about-card-underline {
      height: 5px;
    }

    /* ====================================================================
       TECH STACK SECTION
       ==================================================================== */

    .about-techstack-container {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid ${COLOR_CONFIG.border};
    }

    .about-techstack-label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      font-family: 'Syncopate', sans-serif;
      color: ${COLOR_CONFIG.accent};
      margin: 0 0 1.5rem 0;
      text-transform: uppercase;
    }

    @media (max-width: 640px) {
      .about-techstack-label {
        margin-bottom: 1rem;
      }
    }

    .about-pills-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    /* ====================================================================
       TECH PILLS
       ==================================================================== */

    .about-pill {
      cursor: pointer;
    }

    .about-pill-content {
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: clamp(0.75rem, 1.5vw, 0.875rem);
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      font-family: 'Syncopate', sans-serif;
      letter-spacing: 0.05em;
      color: ${COLOR_CONFIG.text};
      transition: border-color 0.3s ease, background 0.3s ease;
      display: inline-block;
      font-weight: 500;
    }

    @media (max-width: 640px) {
      .about-pill-content {
        padding: 0.375rem 0.75rem;
      }
    }

    .about-pill:hover .about-pill-content {
      border-color: rgba(255, 60, 0, 0.5);
      background: rgba(255, 60, 0, 0.05);
    }

    /* ====================================================================
       FLOATING PARTICLES
       ==================================================================== */

    .about-particles-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .about-particle {
      position: absolute;
      border-radius: 9999px;
      background: radial-gradient(circle, rgba(255, 60, 0, 0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    /* ====================================================================
       KEYFRAME ANIMATIONS
       ==================================================================== */

    @keyframes expandWidth {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
      }
      50% {
        transform: translateY(-30px) translateX(20px);
        opacity: 1;
      }
    }

    @keyframes contourFlow {
      0% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(20px);
      }
    }

    /* ====================================================================
       ACCESSIBILITY & REDUCED MOTION
       ==================================================================== */

    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }
  `}</style>
);

export default AboutSection;
