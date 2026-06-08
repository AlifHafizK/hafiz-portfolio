import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterSection from './footer-section';

// ============================================================================
// CONFIGURATION
// ============================================================================

const COLOR_CONFIG = {
  bg: '#0a0a0a',
  accent: '#ff3c00',
  text: '#e0e0e0',
  border: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.3)',
  accentBorderHover: 'rgba(255, 60, 0, 0.4)',
};

const ANIMATION_CONFIG = {
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  staggerDelay: 0.08,
};

const PROJECTS = [
  {
    id: 1,
    title: 'Java Calculator',
    category: 'Desktop Application',
    status: 'Completed',
    description:
      'A calculator application built using Java with clean architecture and object-oriented programming principles. Features a clean Swing UI, full arithmetic operations, and modular code organization.',
    technologies: ['Java', 'Swing', 'OOP'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'Java Cashier System',
    category: 'Desktop Application',
    status: 'Completed',
    description:
      'A cashier management application for handling transactions and sales efficiently. Includes product catalog, transaction logging, and MySQL database integration for persistent data storage.',
    technologies: ['Java', 'MySQL', 'Swing'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'News Website',
    category: 'Frontend Development',
    status: 'Completed',
    description:
      'Responsive news platform with organized categories and modern reading experience. Features dynamic content rendering, category filtering, and a mobile-first responsive layout.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200',
    github: '#',
    demo: '#',
  },
  {
    id: 4,
    title: 'Application Loading Screen',
    category: 'UI Development',
    status: 'Completed',
    description:
      'Custom loading screen focused on user experience and visual feedback. Implements smooth CSS animations, progress indicators, and a polished transition into the main application.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f232?auto=format&fit=crop&q=80&w=1200',
    github: '#',
    demo: '#',
  },
  {
    id: 5,
    title: 'Website Login Page',
    category: 'Frontend Development',
    status: 'Completed',
    description:
      'Responsive login interface with validation and modern UX patterns. Includes real-time form validation, password visibility toggle, and accessible error messaging.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200',
    github: '#',
    demo: '#',
  },
  {
    id: 6,
    title: 'Personal Portfolio',
    category: 'Web Development',
    status: 'Completed',
    description:
      'Personal portfolio showcasing skills, projects, and experience. Built with React, TypeScript, and TailwindCSS featuring dark futuristic design, smooth animations, and responsive layout.',
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1467233604571-6b68b31c55ac?auto=format&fit=crop&q=80&w=1200',
    github: '#',
    demo: '#',
  },
  {
    id: 7,
    title: 'Shoe Store Website',
    category: 'Backend Development',
    status: 'Completed',
    description:
      'E-commerce website with product catalog and database integration. Features product browsing, shopping cart functionality, and a PHP/MySQL backend for data management.',
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=1200',
    github: '#',
    demo: '#',
  },
];

// ============================================================================
// PROJECT DETAIL CARD
// ============================================================================

interface ProjectDetailCardProps {
  project: typeof PROJECTS[number];
  index: number;
  isInView: boolean;
}

const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({ project, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="pp-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing} ${index * ANIMATION_CONFIG.staggerDelay}s`,
      }}
    >
      <div className="pp-card-glow" />

      {/* Image */}
      <div className="pp-card-image-wrap">
        <div
          className="pp-card-image"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="pp-card-image-overlay" />
        <span className="pp-card-status">{project.status}</span>
      </div>

      {/* Content */}
      <div className="pp-card-body">
        <span className="pp-card-category">{project.category}</span>
        <h3 className="pp-card-title">{project.title}</h3>
        <p className="pp-card-desc">{project.description}</p>

        <div className="pp-card-techs">
          {project.technologies.map((tech, i) => (
            <span key={i} className="pp-card-tech">{tech}</span>
          ))}
        </div>

        <div className="pp-card-links">
          <a href={project.github} className="pp-card-link" onClick={(e) => e.preventDefault()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.125-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404 11.5 11.5 0 0 1 3.003.404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.243 2.874.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.824 1.102.824 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Source Code</span>
          </a>
          <a href={project.demo} className="pp-card-link pp-card-link-accent" onClick={(e) => e.preventDefault()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Live Demo</span>
          </a>
        </div>
      </div>

      {/* Accent line */}
      <div className={`pp-card-accent-line ${isHovered ? 'active' : ''}`} />
    </div>
  );
};

// ============================================================================
// PROJECTS PAGE
// ============================================================================

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.05 }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    return () => { if (gridRef.current) observer.unobserve(gridRef.current); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');

        :root {
          --bg: #0a0a0a;
          --silver: #e0e0e0;
          --accent: #ff3c00;
        }

        .pp-root {
          background-color: var(--bg);
          color: var(--silver);
          font-family: 'Syncopate', sans-serif;
          overflow-x: hidden;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Background layers */
        .pp-bg-glow {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(circle at 50% 10%, rgba(255, 60, 0, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(255, 60, 0, 0.03) 0%, transparent 45%);
          z-index: 0;
        }

        .pp-grid-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.5;
          z-index: 0;
        }

        .pp-grain {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 100;
          opacity: 0.15;
          filter: url(#ppGrain);
        }

        /* Back button */
        .pp-back-btn {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--silver);
          font-family: 'Syncopate', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          min-height: 44px;
        }

        .pp-back-btn:hover {
          border-color: rgba(255, 60, 0, 0.4);
          color: var(--accent);
          transform: translateX(-4px);
        }

        .pp-back-btn svg {
          transition: transform 0.3s ease;
        }

        .pp-back-btn:hover svg {
          transform: translateX(-3px);
        }

        @media (max-width: 640px) {
          .pp-back-btn {
            top: 1rem;
            left: 1rem;
            padding: 0.5rem 1rem;
            font-size: 0.55rem;
          }
        }

        /* Hero header */
        .pp-hero {
          position: relative;
          z-index: 10;
          padding: 8rem 2rem 3rem;
          text-align: center;
        }

        @media (min-width: 640px) {
          .pp-hero { padding: 8rem 2.5rem 3.5rem; }
        }

        @media (min-width: 1024px) {
          .pp-hero { padding: 8rem 3rem 4rem; }
        }

        .pp-hero-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .pp-hero-heading {
          font-size: clamp(1.875rem, 8vw, 3.75rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: white;
          margin: 0 0 1.5rem;
        }

        .pp-hero-subtitle {
          font-size: clamp(0.875rem, 2vw, 1rem);
          line-height: 1.8;
          color: var(--silver);
          font-weight: 400;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Content container */
        .pp-container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .pp-container { padding: 0 2.5rem 4rem; }
        }

        @media (min-width: 1024px) {
          .pp-container { padding: 0 3rem 5rem; }
        }

        /* Projects grid */
        .pp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .pp-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        }

        @media (min-width: 1024px) {
          .pp-grid { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        }

        /* Card */
        .pp-card {
          position: relative;
          border-radius: 0.75rem;
          border: 1px solid ${COLOR_CONFIG.border};
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
        }

        .pp-card:hover {
          border-color: ${COLOR_CONFIG.accentBorderHover};
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(255, 60, 0, 0.08);
        }

        .pp-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, rgba(255, 60, 0, 0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }

        .pp-card:hover .pp-card-glow {
          opacity: 1;
        }

        /* Image */
        .pp-card-image-wrap {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          overflow: hidden;
        }

        .pp-card-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: grayscale(0.8) contrast(1.1) brightness(0.5);
          transition: filter 0.5s ease, transform 0.5s ease;
        }

        .pp-card:hover .pp-card-image {
          filter: grayscale(0.3) contrast(1.15) brightness(0.45);
          transform: scale(1.05);
        }

        .pp-card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(10, 10, 10, 0.7) 100%);
        }

        .pp-card-status {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 60, 0, 0.35);
          background: rgba(255, 60, 0, 0.1);
          backdrop-filter: blur(8px);
          color: var(--accent);
        }

        /* Body */
        .pp-card-body {
          position: relative;
          z-index: 2;
          padding: 1.25rem;
        }

        @media (max-width: 640px) {
          .pp-card-body { padding: 1rem; }
        }

        .pp-card-category {
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent);
          text-transform: uppercase;
          opacity: 0.7;
        }

        .pp-card-title {
          font-family: 'Syncopate', sans-serif;
          font-size: clamp(0.8rem, 1.5vw, 0.95rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          color: white;
          margin: 0.4rem 0 0.65rem;
        }

        .pp-card:hover .pp-card-title {
          color: var(--accent);
        }

        .pp-card-desc {
          font-size: clamp(0.75rem, 1.2vw, 0.85rem);
          line-height: 1.7;
          color: var(--silver);
          font-weight: 400;
          margin: 0 0 1rem;
        }

        .pp-card-techs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .pp-card-tech {
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          font-size: clamp(0.6rem, 1vw, 0.7rem);
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
          font-family: 'Syncopate', sans-serif;
          letter-spacing: 0.05em;
          color: var(--silver);
          display: inline-block;
          font-weight: 500;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .pp-card:hover .pp-card-tech {
          border-color: rgba(255, 60, 0, 0.25);
          background: rgba(255, 60, 0, 0.05);
        }

        /* Links */
        .pp-card-links {
          display: flex;
          gap: 0.75rem;
        }

        .pp-card-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.75rem;
          border-radius: 0.35rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.03);
          color: var(--silver);
          font-family: 'Syncopate', sans-serif;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
          min-height: 36px;
        }

        .pp-card-link:hover {
          border-color: rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.06);
          color: white;
        }

        .pp-card-link-accent {
          border-color: rgba(255, 60, 0, 0.3);
          color: var(--accent);
        }

        .pp-card-link-accent:hover {
          border-color: rgba(255, 60, 0, 0.6);
          background: rgba(255, 60, 0, 0.08);
          color: var(--accent);
        }

        /* Accent line */
        .pp-card-accent-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(to right, var(--accent), transparent);
          border-radius: 0 0 0.75rem 0;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 3;
        }

        .pp-card-accent-line.active {
          width: 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="pp-root">
        {/* Grain filter */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <filter id="ppGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        <div className="pp-bg-glow" />
        <div className="pp-grid-overlay" />
        <div className="pp-grain" />

        {/* Back button */}
        <button className="pp-back-btn" onClick={() => navigate('/')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Home</span>
        </button>

        {/* Hero header */}
        <div className="pp-hero">
          <div className="pp-hero-label">[ FULL PORTFOLIO ]</div>
          <h1 className="pp-hero-heading">ALL PROJECTS</h1>
          <p className="pp-hero-subtitle">
            A complete showcase of my work across desktop applications, frontend development, backend systems, and UI design.
          </p>
        </div>

        {/* Projects grid */}
        <div className="pp-container">
          <div className="pp-grid" ref={gridRef}>
            {PROJECTS.map((project, index) => (
              <ProjectDetailCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <FooterSection />
      </div>
    </>
  );
};

export default ProjectsPage;
