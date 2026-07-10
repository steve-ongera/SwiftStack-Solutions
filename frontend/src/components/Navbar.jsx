// ─────────────────────────────────────────────
// Navbar.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import nairobi1Logo from '../assets/nairobi_1_logo.jpeg'

const NAV_LINKS = [
  { path: '/',          label: 'Home',      icon: 'bi-house-door' },
  { path: '/about',     label: 'About Us',  icon: 'bi-building' },
  { path: '/services',  label: 'Services',  icon: 'bi-grid-1x2' },
  { path: '/portfolio', label: 'Portfolio', icon: 'bi-briefcase' },
  { path: '/careers',   label: 'Careers',   icon: 'bi-person-workspace' },
  { path: '/blog',      label: 'Insights',  icon: 'bi-journal-richtext' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  // Close drawer on route change
  useEffect(() => setDrawerOpen(false), [pathname])

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  // ESC key closes drawer
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setDrawerOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const openDrawer  = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      {/* ── Top Bar (Theme) ── */}
      <div id="top-bar" className="top-bar d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <ul className="top-info text-center text-md-left">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <p className="info-text">Westlands Business Park, Nairobi, Kenya</p>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <p className="info-text">+254 757 790 687</p>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <p className="info-text">info@nairobi1.com</p>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-4 top-social text-center text-md-right">
              <ul className="list-unstyled">
                <li>
                  <a title="Facebook" href="#" aria-label="Facebook">
                    <span className="social-icon"><i className="fab fa-facebook-f"></i></span>
                  </a>
                  <a title="Twitter" href="#" aria-label="Twitter">
                    <span className="social-icon"><i className="fab fa-twitter"></i></span>
                  </a>
                  <a title="LinkedIn" href="#" aria-label="LinkedIn">
                    <span className="social-icon"><i className="fab fa-linkedin-in"></i></span>
                  </a>
                  <a title="GitHub" href="#" aria-label="GitHub">
                    <span className="social-icon"><i className="fab fa-github"></i></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header id="header" className={`header-one ${scrolled ? 'navbar-fixed' : ''}`}>
        <div className="bg-white">
          <div className="container">
            <div className="logo-area">
              <div className="row align-items-center">
                {/* Logo */}
                <div className="logo col-6 col-lg-3 text-left mb-0 mb-lg-0">
                  <Link className="d-block" to="/" aria-label="Nairobi 1 — Home">
                    <img
                      loading="lazy"
                      src={nairobi1Logo}
                      alt="Nairobi 1"
                      className="header-logo-img"
                    />
                  </Link>
                </div>

                {/* Mobile-only hamburger trigger, sits opposite the logo */}
                <div className="col-6 d-flex d-lg-none justify-content-end">
                  <button
                    className="mobile-menu-trigger"
                    type="button"
                    onClick={openDrawer}
                    aria-label="Open navigation menu"
                    aria-expanded={drawerOpen}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>

                {/* Header Right - Info Boxes (desktop only) */}
                <div className="col-lg-9 header-right d-none d-lg-block">
                  <ul className="top-info-box">
                    <li>
                      <div className="info-box">
                        <div className="info-box-content">
                          <p className="info-box-title">Call Us</p>
                          <p className="info-box-subtitle">+254 757 790 687</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="info-box">
                        <div className="info-box-content">
                          <p className="info-box-title">Email Us</p>
                          <p className="info-box-subtitle">info@nairobi1.com</p>
                        </div>
                      </div>
                    </li>
                    <li className="last">
                      <div className="info-box last">
                        <div className="info-box-content">
                          <p className="info-box-title">Global Certificate</p>
                          <p className="info-box-subtitle">ISO 27001:2022</p>
                        </div>
                      </div>
                    </li>
                    <li className="header-get-a-quote">
                      <Link className="btn btn-primary" to="/contact">Get A Quote</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation (desktop only, mobile uses the drawer) ── */}
        <div className="site-navigation d-none d-lg-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav className="navbar navbar-expand-lg navbar-dark p-0">
                  <div id="navbar-collapse" className="collapse navbar-collapse d-lg-block">
                    <ul className="nav navbar-nav mr-auto">
                      {NAV_LINKS.map(({ path, label }) => (
                        <li key={path} className={`nav-item ${pathname === path ? 'active' : ''}`}>
                          <NavLink 
                            to={path} 
                            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                            end={path === '/'}
                          >
                            {label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>

            {/* Search (Theme feature) */}
            <div className="nav-search">
              <span id="search"><i className="fa fa-search"></i></span>
            </div>

            <div className="search-block" style={{ display: 'none' }}>
              <label htmlFor="search-field" className="w-100 mb-0">
                <input type="text" className="form-control" id="search-field" placeholder="Type what you want and enter" />
              </label>
              <span className="search-close">&times;</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Side Drawer (Mobile) ── */}
      <div
        className={`drawer-overlay${drawerOpen ? ' open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        id="side-drawer"
        className={`side-drawer${drawerOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="drawer-header">
          <Link to="/" className="drawer-logo" onClick={closeDrawer} aria-label="Home">
            <div className="drawer-logo-icon">
              <img src={nairobi1Logo} alt="Nairobi 1" className="logo-img drawer-logo-img" />
            </div>
            <div className="drawer-logo-text">
              <span className="logo-main">Nairobi 1</span>
            </div>
          </Link>

          <button
            className="drawer-close"
            onClick={closeDrawer}
            aria-label="Close navigation menu"
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>

        {/* Drawer navigation */}
        <nav className="drawer-nav" aria-label="Mobile navigation">
          <span className="drawer-section-label">Navigation</span>

          {NAV_LINKS.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `drawer-link${isActive ? ' active' : ''}`}
              end={path === '/'}
              onClick={closeDrawer}
            >
              <i className={`bi ${icon}`} aria-hidden="true"></i>
              {label}
            </NavLink>
          ))}

          <div className="drawer-divider" role="separator" />

          <span className="drawer-section-label">Quick Actions</span>

          <NavLink
            to="/contact"
            className={({ isActive }) => `drawer-link${isActive ? ' active' : ''}`}
            onClick={closeDrawer}
          >
            <i className="bi bi-envelope" aria-hidden="true"></i>
            Contact Us
          </NavLink>

          <a href="tel:+254700000000" className="drawer-link" onClick={closeDrawer}>
            <i className="bi bi-telephone" aria-hidden="true"></i>
            +254 757 790 687
          </a>
        </nav>

        {/* Drawer footer */}
        <div className="drawer-footer">
          <Link to="/contact" className="drawer-cta" onClick={closeDrawer}>
            <i className="bi bi-rocket-takeoff" aria-hidden="true"></i>
            Start a Project
          </Link>

          <div className="drawer-contact-info">
            <a href="mailto:info@nairobi1.com" onClick={closeDrawer}>
              <i className="bi bi-envelope-fill" aria-hidden="true"></i>
              info@nairobi1.com
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" onClick={closeDrawer}>
              <i className="bi bi-linkedin" aria-hidden="true"></i>
              Follow us on LinkedIn
            </a>
          </div>
        </div>
      </aside>

      {/* ── Custom Styles ── */}
      <style>{`
        /* Override theme defaults for your custom styles */
        .navbar-gov.scrolled {
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .nav-links .nav-link-item.active {
          color: #ffb600 !important;
        }

        /* Logo — fluid sizing, scales smoothly across all screen widths */
        .header-logo-img {
          width: clamp(150px, 22vw, 300px);
          height: auto;
          max-width: 100%;
        }

        /* Drawer logo */
        .drawer-logo-img {
          height: 52px;
          width: auto;
          max-width: 100%;
        }

        /* Sticky header shadow */
        .header-one.navbar-fixed {
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        /* Mobile hamburger trigger */
        .mobile-menu-trigger {
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          padding: 0;
        }
        .mobile-menu-trigger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #1a3c6e;
          border-radius: 2px;
          transition: all 0.2s ease;
        }
        .mobile-menu-trigger:hover span {
          background: #ffb600;
        }

        /* Drawer overlay with blur for a more polished feel */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(2px);
          z-index: 1040;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .drawer-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        /* Drawer: transform-based slide for smoother, GPU-accelerated motion */
        .side-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          max-width: 85vw;
          height: 100%;
          background: #fff;
          z-index: 1050;
          transform: translateX(100%);
          transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: -4px 0 24px rgba(0,0,0,0.12);
        }
        .side-drawer.open {
          transform: translateX(0);
        }
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }
        .drawer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .drawer-logo-text .logo-main {
          font-weight: 700;
          font-size: 1.1rem;
          color: #1a3c6e;
        }
        .drawer-logo-text .logo-sub {
          display: block;
          font-size: 0.7rem;
          color: #ffb600;
          letter-spacing: 1px;
        }
        .drawer-close {
          background: none;
          border: none;
          font-size: 1.4rem;
          cursor: pointer;
          color: #666;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .drawer-close:hover {
          background: #f5f5f5;
          color: #1a3c6e;
        }
        .drawer-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow-y: auto;
        }
        .drawer-section-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #999;
          letter-spacing: 1px;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
          font-weight: 600;
        }
        .drawer-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          border-radius: 6px;
          color: #333;
          text-decoration: none;
          transition: all 0.2s;
          font-weight: 500;
        }
        .drawer-link:hover {
          background: #f5f5f5;
          color: #1a3c6e;
        }
        .drawer-link.active {
          background: #1a3c6e;
          color: #fff;
        }
        .drawer-link i {
          font-size: 1.1rem;
          width: 1.5rem;
        }
        .drawer-divider {
          height: 1px;
          background: #eee;
          margin: 0.5rem 0;
        }
        .drawer-footer {
          border-top: 1px solid #eee;
          padding-top: 1rem;
          margin-top: auto;
        }
        .drawer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #ffb600;
          color: #fff;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
        }
        .drawer-cta:hover {
          background: #1a3c6e;
          color: #fff;
        }
        .drawer-contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 0.75rem;
        }
        .drawer-contact-info a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          text-decoration: none;
          font-size: 0.85rem;
        }
        .drawer-contact-info a:hover {
          color: #1a3c6e;
        }

        /* Mobile header spacing */
        @media (max-width: 991px) {
          .logo-area {
            padding: 0.75rem 0;
          }
          .header-logo-img {
            width: clamp(140px, 40vw, 220px);
            height: auto;
          }
          .top-info-box li {
            border: 0;
            text-align: center;
            margin: 0;
            flex: 0 0 50%;
            padding: 0;
            margin-top: 10px;
          }
        }
        @media (max-width: 575px) {
          .top-info-box li {
            flex: 0 0 100%;
          }
        }
      `}</style>
    </>
  )
}