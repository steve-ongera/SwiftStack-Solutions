import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { path: '/',          label: 'Home',      icon: 'bi-house' },
  { path: '/about',     label: 'About Us',  icon: 'bi-building' },
  { path: '/services',  label: 'Services',  icon: 'bi-grid' },
  { path: '/portfolio', label: 'Portfolio', icon: 'bi-briefcase' },
  { path: '/careers',   label: 'Careers',   icon: 'bi-person-workspace' },
  { path: '/blog',      label: 'Insights',  icon: 'bi-journal-richtext' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <nav className={`navbar-gov ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="logo-icon">
            <i className="bi bi-stack"></i>
          </div>
          <div className="logo-text">
            <span className="logo-main">SwiftStack</span>
            <span className="logo-sub">Solutions</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                end={path === '/'}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to="/contact" className="nav-cta">
          <i className="bi bi-chat-dots"></i>
          Get In Touch
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
              end={path === '/'}
            >
              <i className={`bi ${icon}`}></i>
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="mobile-cta">
            <i className="bi bi-envelope"></i>
            Contact Us
          </Link>
        </div>
      )}

      <style>{`
        .navbar-gov {
          position: sticky; top: 0; z-index: 1000;
          background: var(--color-navy-dark);
          border-bottom: 3px solid var(--color-gold);
          transition: all var(--transition-base);
        }
        .navbar-gov.scrolled {
          box-shadow: var(--shadow-xl);
          background: rgba(17,40,80,0.98);
          backdrop-filter: blur(8px);
        }
        .nav-container {
          max-width: 1200px; margin: 0 auto;
          padding: 0 1.5rem;
          display: flex; align-items: center;
          height: 68px; gap: 2rem;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 0.75rem;
          text-decoration: none; flex-shrink: 0;
        }
        .logo-icon {
          width: 40px; height: 40px;
          background: var(--color-gold);
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; color: var(--color-navy-dark);
        }
        .logo-text { display: flex; flex-direction: column; line-height: 1.1; }
        .logo-main {
          font-family: var(--font-heading);
          font-size: 1.05rem; font-weight: 700;
          color: var(--color-white); letter-spacing: 0.3px;
        }
        .logo-sub {
          font-size: 0.65rem; font-weight: 600;
          color: var(--color-gold); letter-spacing: 2px;
          text-transform: uppercase;
        }
        .nav-links {
          display: flex; align-items: center; gap: 0.25rem;
          list-style: none; margin: 0 auto;
        }
        .nav-link-item {
          text-decoration: none;
          color: rgba(255,255,255,0.75);
          font-size: 0.9rem; font-weight: 500;
          padding: 0.5rem 0.9rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          position: relative;
        }
        .nav-link-item:hover, .nav-link-item.active {
          color: var(--color-white);
          background: rgba(255,255,255,0.08);
        }
        .nav-link-item.active::after {
          content: '';
          position: absolute; bottom: -3px; left: 50%;
          transform: translateX(-50%);
          width: 20px; height: 2px;
          background: var(--color-gold);
          border-radius: 1px;
        }
        .nav-cta {
          background: var(--color-gold);
          color: var(--color-navy-dark);
          padding: 0.55rem 1.25rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem; font-weight: 700;
          text-decoration: none; flex-shrink: 0;
          display: flex; align-items: center; gap: 0.4rem;
          transition: all var(--transition-fast);
        }
        .nav-cta:hover { background: var(--color-gold-dark); transform: translateY(-1px); }
        .hamburger {
          display: none; background: none; border: none;
          color: var(--color-white); font-size: 1.5rem;
          cursor: pointer; padding: 0.25rem;
          margin-left: auto;
        }
        .mobile-menu {
          background: var(--color-navy-dark);
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 1rem 1.5rem 1.5rem;
          display: flex; flex-direction: column; gap: 0.25rem;
        }
        .mobile-link {
          display: flex; align-items: center; gap: 0.75rem;
          color: rgba(255,255,255,0.8); text-decoration: none;
          padding: 0.75rem 1rem; border-radius: var(--radius-sm);
          font-size: 0.95rem; font-weight: 500;
          transition: all var(--transition-fast);
        }
        .mobile-link:hover, .mobile-link.active {
          background: rgba(255,255,255,0.08); color: var(--color-white);
        }
        .mobile-cta {
          display: flex; align-items: center; gap: 0.75rem;
          background: var(--color-gold); color: var(--color-navy-dark);
          padding: 0.75rem 1rem; border-radius: var(--radius-sm);
          font-size: 0.95rem; font-weight: 700;
          text-decoration: none; margin-top: 0.75rem;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: block; }
        }
      `}</style>
    </nav>
  )
}