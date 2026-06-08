import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// CONFIGURATION & CONTENT CONSTANTS
// ============================================================================

const PROJECTS_CONTENT = {
  label: '[ PROJECTS ]',
  heading: 'FEATURED WORKS',
  subtitle:
    'A collection of projects that showcase my journey in software engineering, frontend development, backend development, and problem solving.',
};

const PROJECTS = [
  {
    id: 1,
    title: 'Java Calculator',
    category: 'Desktop Application',
    description:
      'A calculator application built using Java with clean architecture and object-oriented programming principles.',
    technologies: ['Java', 'Swing', 'OOP'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    title: 'Java Cashier System',
    category: 'Desktop Application',
    description:
      'A cashier management application for handling transactions and sales efficiently.',
    technologies: ['Java', 'MySQL', 'Swing'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    title: 'News Website',
    category: 'Frontend Development',
    description:
      'Responsive news platform with organized categories and modern reading experience.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 4,
    title: 'Application Loading Screen',
    category: 'UI Development',
    description:
      'Custom loading screen focused on user experience and visual feedback.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f232?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 5,
    title: 'Website Login Page',
    category: 'Frontend Development',
    description:
      'Responsive login interface with validation and modern UX patterns.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image:
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 6,
    title: 'Personal Portfolio',
    category: 'Web Development',
    description:
      'Personal portfolio showcasing skills, projects, and experience.',
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
    image:
      'https://images.unsplash.com/photo-1467233604571-6b68b31c55ac?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 7,
    title: 'Shoe Store Website',
    category: 'Backend Development',
    description:
      'E-commerce website with product catalog and database integration.',
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    image:
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=1200',
  },
];

const ANIMATION_CONFIG = {
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  scrollThreshold: 0.1,
  staggerDelay: 0.08,
  expandDuration: '0.6s',
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
// EXPANDING CARD COMPONENT
// ============================================================================

interface ProjectCardProps {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  isActive: boolean;
  onActivate: () => void;
  index: number;
  isInView: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  description,
  technologies,
  image,
  isActive,
  onActivate,
  index,
  isInView,
}) => {
  return (
    <div
      className={`project-card-wrapper ${isActive ? 'active' : ''}`}
      onMouseEnter={onActivate}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing} ${index * ANIMATION_CONFIG.staggerDelay}s, transform ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing} ${index * ANIMATION_CONFIG.staggerDelay}s, flex ${ANIMATION_CONFIG.expandDuration} ${ANIMATION_CONFIG.easing}`,
      }}
    >
      {/* Card container */}
      <div className="project-card-inner">
        {/* Background image */}
        <div
          className="project-card-bg"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Dark overlay gradient */}
        <div className="project-card-overlay" />

        {/* Orange glow on active */}
        <div className="project-card-glow" />

        {/* Content */}
        <div className="project-card-content">
          {/* Category label */}
          <span className="project-card-category">{category}</span>

          {/* Title */}
          <h3 className="project-card-title">{title}</h3>

          {/* Expanded content */}
          <div className="project-card-expanded">
            <p className="project-card-description">{description}</p>

            {/* Technologies */}
            <div className="project-card-techs">
              {technologies.map((tech, i) => (
                <span key={i} className="project-card-tech-pill">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Active indicator line */}
        <div className="project-card-indicator" />
      </div>
    </div>
  );
};

// ============================================================================
// PROJECTS SECTION COMPONENT
// ============================================================================

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

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
      id="projects"
      className="relative min-h-screen w-full text-white overflow-hidden"
      style={{ background: COLOR_CONFIG.bgGradient }}
    >
      <ProjectStyles />

      {/* Background layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 20%, rgba(255, 60, 0, 0.07) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(255, 60, 0, 0.04) 0%, transparent 50%)
          `,
          opacity: isInView ? 1 : 0,
          transition: 'opacity 2s ease-out',
        }}
      />
      <div className="absolute inset-0 pointer-events-none projects-grid-overlay" />
      <div
        className="absolute inset-0 pointer-events-none projects-contours"
        style={{
          animation: isInView ? 'projectsContourFlow 20s linear infinite' : 'none',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16 py-12 md:py-16 lg:py-16">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section header */}
          <div
            className="projects-header"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(40px)',
              transition: `all ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing}`,
              filter: isInView ? 'blur(0px)' : 'blur(8px)',
            }}
          >
            <div className="projects-label">{PROJECTS_CONTENT.label}</div>
            <h2 className="projects-heading">{PROJECTS_CONTENT.heading}</h2>
            <p className="projects-subtitle">{PROJECTS_CONTENT.subtitle}</p>
          </div>

          {/* Expanding cards gallery */}
          <div className="projects-cards-gallery">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                category={project.category}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                isActive={activeIndex === index}
                onActivate={() => setActiveIndex(index)}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* CTA — Explore More Projects */}
          <div
            className="projects-cta-wrapper"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(24px)',
              transition: `all 0.8s ${ANIMATION_CONFIG.easing} 0.4s`,
            }}
          >
            <button className="projects-cta-btn" onClick={() => navigate('/projects')}>
              <span>EXPLORE ALL PROJECTS</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              <div className="projects-cta-glow" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {isInView && (
        <div className="projects-particles-container">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="projects-particle"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `projectsFloat ${Math.random() * 20 + 15}s ease-in-out infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes projectsContourFlow {
          0% { transform: translateY(0px); }
          100% { transform: translateY(20px); }
        }
        @keyframes projectsFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { transform: translateY(-30px) translateX(20px); opacity: 1; }
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

const ProjectStyles = () => (
  <style>{`
    /* ====================================================================
       BACKGROUND LAYERS
       ==================================================================== */

    .projects-grid-overlay {
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.5;
    }

    .projects-contours {
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

    .projects-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .projects-label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      font-family: 'Syncopate', sans-serif;
      color: ${COLOR_CONFIG.accent};
      margin-bottom: 1.5rem;
      text-transform: uppercase;
    }

    .projects-heading {
      font-size: clamp(1.875rem, 8vw, 3.75rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      font-family: 'Syncopate', sans-serif;
      color: white;
      margin-bottom: 1.5rem;
    }

    .projects-subtitle {
      font-size: clamp(0.875rem, 2vw, 1rem);
      line-height: 1.8;
      color: ${COLOR_CONFIG.text};
      font-weight: 400;
      max-width: 700px;
      margin: 0 auto;
    }

    @media (max-width: 640px) {
      .projects-header {
        margin-bottom: 1.5rem;
      }
      .projects-label {
        margin-bottom: 1rem;
        font-size: 0.65rem;
      }
      .projects-heading {
        margin-bottom: 1rem;
      }
      .projects-subtitle {
        font-size: 0.8rem;
      }
    }

    /* ====================================================================
       CARDS GALLERY - HORIZONTAL EXPANDING LAYOUT
       ==================================================================== */

    .projects-cards-gallery {
      display: flex;
      gap: 0.75rem;
      height: 420px;
      width: 100%;
    }

    /* ====================================================================
       INDIVIDUAL CARD WRAPPER
       ==================================================================== */

    .project-card-wrapper {
      position: relative;
      flex: 0.5;
      min-width: 0;
      cursor: pointer;
      border-radius: 0.5rem;
      overflow: hidden;
      transition: flex ${ANIMATION_CONFIG.expandDuration} cubic-bezier(0.16, 1, 0.3, 1);
    }

    .project-card-wrapper.active {
      flex: 4;
    }

    /* ====================================================================
       CARD INNER
       ==================================================================== */

    .project-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
      overflow: hidden;
      border: 1px solid ${COLOR_CONFIG.border};
      transition: border-color 0.5s ease;
    }

    .project-card-wrapper:hover .project-card-inner,
    .project-card-wrapper.active .project-card-inner {
      border-color: ${COLOR_CONFIG.accentBorderHover};
    }

    /* ====================================================================
       CARD BACKGROUND IMAGE
       ==================================================================== */

    .project-card-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: grayscale(1) contrast(1.1) brightness(0.4);
      transition: filter 0.6s ease, transform 0.6s ease;
    }

    .project-card-wrapper:hover .project-card-bg {
      filter: grayscale(0.6) contrast(1.15) brightness(0.35);
      transform: scale(1.05);
    }

    .project-card-wrapper.active .project-card-bg {
      filter: grayscale(0.4) contrast(1.2) brightness(0.3);
      transform: scale(1.05);
    }

    /* ====================================================================
       CARD OVERLAY
       ==================================================================== */

    .project-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(10, 10, 10, 0.2) 0%,
        rgba(10, 10, 10, 0.6) 50%,
        rgba(10, 10, 10, 0.95) 100%
      );
      transition: background 0.5s ease;
    }

    .project-card-wrapper.active .project-card-overlay {
      background: linear-gradient(
        180deg,
        rgba(10, 10, 10, 0.1) 0%,
        rgba(10, 10, 10, 0.5) 40%,
        rgba(10, 10, 10, 0.9) 100%
      );
    }

    /* ====================================================================
       CARD GLOW
       ==================================================================== */

    .project-card-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at 50% 80%,
        rgba(255, 60, 0, 0.12) 0%,
        transparent 60%
      );
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }

    .project-card-wrapper.active .project-card-glow {
      opacity: 1;
    }

    /* ====================================================================
       CARD CONTENT
       ==================================================================== */

    .project-card-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    @media (max-width: 640px) {
      .project-card-content {
        padding: 1rem;
      }
    }

    .project-card-category {
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      font-family: 'Syncopate', sans-serif;
      color: ${COLOR_CONFIG.accent};
      text-transform: uppercase;
      opacity: 0.7;
      margin-bottom: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: opacity 0.3s ease;
    }

    .project-card-wrapper.active .project-card-category {
      opacity: 1;
    }

    .project-card-title {
      font-family: 'Syncopate', sans-serif;
      font-weight: 700;
      letter-spacing: 0.02em;
      color: white;
      font-size: clamp(0.75rem, 1.5vw, 1.1rem);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.3s ease;
    }

    .project-card-wrapper.active .project-card-title {
      white-space: normal;
      font-size: clamp(1rem, 2.5vw, 1.5rem);
      color: ${COLOR_CONFIG.accent};
    }

    /* ====================================================================
       EXPANDED CONTENT
       ==================================================================== */

    .project-card-expanded {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.4s ease 0.15s;
    }

    .project-card-wrapper.active .project-card-expanded {
      max-height: 250px;
      opacity: 1;
    }

    .project-card-description {
      font-size: clamp(0.8rem, 1.2vw, 0.95rem);
      line-height: 1.7;
      color: ${COLOR_CONFIG.text};
      margin: 0.75rem 0 1rem 0;
      font-weight: 400;
    }

    /* ====================================================================
       TECH PILLS
       ==================================================================== */

    .project-card-techs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .project-card-tech-pill {
      padding: 0.3rem 0.65rem;
      border-radius: 9999px;
      font-size: clamp(0.6rem, 1vw, 0.75rem);
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      font-family: 'Syncopate', sans-serif;
      letter-spacing: 0.05em;
      color: ${COLOR_CONFIG.text};
      display: inline-block;
      font-weight: 500;
      transition: border-color 0.3s ease, background 0.3s ease;
    }

    .project-card-wrapper.active .project-card-tech-pill {
      border-color: rgba(255, 60, 0, 0.3);
      background: rgba(255, 60, 0, 0.08);
    }

    /* ====================================================================
       ACTIVE INDICATOR LINE
       ==================================================================== */

    .project-card-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: ${COLOR_CONFIG.accent};
      transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 3;
    }

    .project-card-wrapper.active .project-card-indicator {
      width: 100%;
    }

    /* ====================================================================
       RESPONSIVE - TABLET
       ==================================================================== */

    @media (max-width: 1024px) {
      .projects-cards-gallery {
        height: 360px;
        gap: 0.5rem;
      }

      .project-card-wrapper {
        flex: 0.6;
      }

      .project-card-wrapper.active {
        flex: 3.5;
      }
    }

    /* ====================================================================
       RESPONSIVE - MOBILE (SWIPABLE)
       ==================================================================== */

    @media (max-width: 640px) {
      .projects-cards-gallery {
        height: 460px;
        flex-direction: column;
        gap: 0.5rem;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }

      .projects-cards-gallery::-webkit-scrollbar {
        display: none;
      }

      .project-card-wrapper {
        flex: none !important;
        height: 100%;
        min-height: 100%;
        scroll-snap-align: start;
      }

      .project-card-wrapper.active {
        flex: none !important;
      }
    }

    /* ====================================================================
       FLOATING PARTICLES
       ==================================================================== */

    .projects-particles-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .projects-particle {
      position: absolute;
      border-radius: 9999px;
      background: radial-gradient(circle, rgba(255, 60, 0, 0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    /* ====================================================================
       CTA BUTTON — Explore More Projects
       ==================================================================== */

    .projects-cta-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    @media (max-width: 640px) {
      .projects-cta-wrapper {
        margin-top: 1.5rem;
      }
    }

    .projects-cta-btn {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 60, 0, 0.35);
      background: rgba(255, 60, 0, 0.06);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: ${COLOR_CONFIG.accent};
      font-family: 'Syncopate', sans-serif;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      min-height: 44px;
    }

    .projects-cta-btn:hover {
      background: rgba(255, 60, 0, 0.12);
      border-color: rgba(255, 60, 0, 0.6);
      transform: translateY(-3px);
      box-shadow: 0 8px 32px rgba(255, 60, 0, 0.15);
    }

    .projects-cta-btn:hover svg {
      transform: translateX(3px);
    }

    .projects-cta-btn svg {
      transition: transform 0.3s ease;
    }

    .projects-cta-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 50%, rgba(255, 60, 0, 0.2) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .projects-cta-btn:hover .projects-cta-glow {
      opacity: 1;
    }

    @media (max-width: 640px) {
      .projects-cta-btn {
        padding: 0.65rem 1.5rem;
        font-size: 0.6rem;
      }
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

export default ProjectsSection;
