import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import swiftLogo from '../assets/swift_logo.png'   // ← adjust path to match your project

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
      {/* ── Top Navbar ── */}
      <nav className={`navbar-gov${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-container">

          {/* Logo */}
          <Link to="/" className="nav-logo" aria-label="SwiftStack Solutions — Home">
            <div className="logo-icon" aria-hidden="true">
              <img src={swiftLogo} alt="SwiftStack logo" className="logo-img" />
            </div>
            <div className="logo-text">
              <span className="logo-main">SwiftStack</span>
              <span className="logo-sub">Solutions</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links" role="list">
            {NAV_LINKS.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) => `nav-link-item${isActive ? ' active' : ''}`}
                  end={path === '/'}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Language switcher (desktop) */}
          <button className="nav-lang" aria-label="Switch language" title="Switch language">
            <i className="bi bi-globe2"></i>
            EN
          </button>

          {/* CTA (desktop) */}
          <Link to="/contact" className="nav-cta">
            <i className="bi bi-chat-dots" aria-hidden="true"></i>
            Get In Touch
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger"
            onClick={openDrawer}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="side-drawer"
          >
            <i className="bi bi-list" aria-hidden="true"></i>
          </button>
        </div>
      </nav>

      {/* ── Side Drawer (mobile) ── */}
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
              <img src={swiftLogo} alt="SwiftStack logo" className="logo-img" />
            </div>
            <div className="drawer-logo-text">
              <span className="logo-main">SwiftStack</span>
              <span className="logo-sub">Solutions</span>
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
            +254 700 000 000
          </a>
        </nav>

        {/* Drawer footer */}
        <div className="drawer-footer">
          <Link to="/contact" className="drawer-cta" onClick={closeDrawer}>
            <i className="bi bi-rocket-takeoff" aria-hidden="true"></i>
            Start a Project
          </Link>

          <div className="drawer-contact-info">
            <a href="mailto:info@swiftstacksolutions.co.ke" onClick={closeDrawer}>
              <i className="bi bi-envelope-fill" aria-hidden="true"></i>
              info@swiftstacksolutions.co.ke
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" onClick={closeDrawer}>
              <i className="bi bi-linkedin" aria-hidden="true"></i>
              Follow us on LinkedIn
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}