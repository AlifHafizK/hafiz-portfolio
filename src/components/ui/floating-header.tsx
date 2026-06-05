import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

const HEADER_CONFIG = {
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  logoSize: 'clamp(2rem, 5vw, 2.5rem)',
  animationDuration: '0.4s',
  scrollThreshold: 50,
};

const COLOR_PALETTE = {
  bg: '#0a0a0a',
  text: '#e0e0e0',
  accent: '#ff5a1f',
  border: 'rgba(255, 255, 255, 0.05)',
  borderHover: 'rgba(255, 90, 31, 0.3)',
  backdrop: 'rgba(10, 10, 10, 0.15)',
};

// ============================================================================
// FLOATING HEADER COMPONENT
// ============================================================================

const FloatingHeader: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  // Handle scroll to determine header appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > HEADER_CONFIG.scrollThreshold;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling to sections
  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);

    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        /* ====================================================================
           ROOT VARIABLES
           ==================================================================== */

        :root {
          --header-bg: ${COLOR_PALETTE.bg};
          --header-text: ${COLOR_PALETTE.text};
          --header-accent: ${COLOR_PALETTE.accent};
          --header-border: ${COLOR_PALETTE.border};
          --header-border-hover: ${COLOR_PALETTE.borderHover};
          --header-backdrop: ${COLOR_PALETTE.backdrop};
          --header-duration: ${HEADER_CONFIG.animationDuration};
        }

        /* ====================================================================
           FLOATING HEADER
           ==================================================================== */

        .floating-header {
          position: fixed;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1400px;
          z-index: 1000;
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid var(--header-border);
          background: linear-gradient(135deg,
            rgba(10, 10, 10, 0.12) 0%,
            rgba(15, 15, 15, 0.10) 100%
          );
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        }

        /* Scrolled state - slightly darker */
        .floating-header.scrolled {
          background: linear-gradient(135deg,
            rgba(10, 10, 10, 0.25) 0%,
            rgba(15, 15, 15, 0.20) 100%
          );
          border-color: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
        }

        /* ====================================================================
           LOGO SECTION
           ==================================================================== */

        .header-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${HEADER_CONFIG.logoSize};
          height: ${HEADER_CONFIG.logoSize};
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
          font-family: 'Syncopate', sans-serif;
          font-weight: 700;
          font-size: ${HEADER_CONFIG.logoSize};
          color: var(--header-text);
          text-decoration: none;
          letter-spacing: -0.02em;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header-logo::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 8px;
          background: radial-gradient(circle, rgba(255, 90, 31, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .header-logo:hover::before {
          opacity: 1;
        }

        .header-logo:hover {
          color: var(--header-accent);
          transform: scale(1.05);
          filter: drop-shadow(0 0 8px rgba(255, 90, 31, 0.3));
        }

        /* ====================================================================
           NAVIGATION
           ==================================================================== */

        .header-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-left: auto;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          font-family: 'Syncopate', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--header-text);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--header-accent), transparent);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: var(--header-accent);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: var(--header-accent);
        }

        .nav-link.active::after {
          width: 100%;
          background: var(--header-accent);
        }

        /* ====================================================================
           MOBILE MENU BUTTON
           ==================================================================== */

        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          margin-left: 1rem;
          position: relative;
          width: 24px;
          height: 24px;
          z-index: 1001;
        }

        .mobile-menu-button span {
          display: block;
          position: absolute;
          width: 100%;
          height: 2px;
          background: var(--header-text);
          left: 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu-button span:nth-child(1) {
          top: 6px;
        }

        .mobile-menu-button span:nth-child(2) {
          top: 11px;
        }

        .mobile-menu-button span:nth-child(3) {
          top: 16px;
        }

        .mobile-menu-button.open span:nth-child(1) {
          transform: translateY(5px) rotate(45deg);
        }

        .mobile-menu-button.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-button.open span:nth-child(3) {
          transform: translateY(-5px) rotate(-45deg);
        }

        /* ====================================================================
           MOBILE MENU
           ==================================================================== */

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,
            rgba(10, 10, 10, 0.98) 0%,
            rgba(15, 15, 15, 0.95) 100%
          );
          backdrop-filter: blur(20px);
          z-index: 999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          align-items: center;
          text-align: center;
        }

        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-menu-link {
          font-family: 'Syncopate', sans-serif;
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--header-text);
          text-decoration: none;
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease;
        }

        .mobile-menu-link:hover {
          color: var(--header-accent);
        }

        .mobile-menu-link::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background: var(--header-accent);
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mobile-menu-link:hover::after {
          opacity: 1;
        }

        /* ====================================================================
           RESPONSIVE DESIGN
           ==================================================================== */

        @media (max-width: 768px) {
          .floating-header {
            width: 95%;
            padding: 1rem 1.5rem;
            top: 1rem;
          }

          .header-nav {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }

          .nav-links {
            gap: 1.5rem;
          }
        }

        /* ====================================================================
           ANIMATIONS
           ==================================================================== */

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Main Header */}
      <header
        ref={headerRef}
        className={`floating-header ${isScrolled ? 'scrolled' : ''}`}
      >
        {/* Logo */}
        <a href="#home" className="header-logo" onClick={(e) => {
          e.preventDefault();
          setActiveLink('#home');
          document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          AH
        </a>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <ul className="nav-links">
            {HEADER_CONFIG.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-menu-links">
            {HEADER_CONFIG.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FloatingHeader;
