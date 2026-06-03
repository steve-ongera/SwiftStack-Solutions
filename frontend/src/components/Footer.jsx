import { Link } from 'react-router-dom'
import { useState } from 'react'
import { newsletterAPI } from '../services/api'

const FOOTER_LINKS = [
  { to: '/about',     label: 'About Us' },
  { to: '/services',  label: 'Our Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/careers',   label: 'Careers' },
  { to: '/blog',      label: 'Insights' },
  { to: '/contact',   label: 'Contact Us' },
]

const SERVICE_LINKS = [
  'Web Development',
  'Mobile Applications',
  'Cloud Solutions',
  'AI & Machine Learning',
  'Cybersecurity',
  'IT Consulting',
]

const SOCIAL_LINKS = [
  { icon: 'bi-linkedin',  href: '#', label: 'LinkedIn' },
  { icon: 'bi-twitter-x', href: '#', label: 'X (Twitter)' },
  { icon: 'bi-github',    href: '#', label: 'GitHub' },
  { icon: 'bi-youtube',   href: '#', label: 'YouTube' },
  { icon: 'bi-facebook',  href: '#', label: 'Facebook' },
]

export default function Footer() {
  const [email, setEmail]       = useState('')
  const [subStatus, setSubStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setSubStatus('loading')
    try {
      await newsletterAPI.subscribe({ email })
      setSubStatus('success')
      setEmail('')
    } catch {
      setSubStatus('error')
    }
  }

  return (
    <footer className="footer-gov" aria-label="Site footer">
      {/* Main footer body */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">

            {/* ── Brand column ── */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo" aria-label="SwiftStack Solutions — Home">
                <div className="footer-logo-icon" aria-hidden="true">
                  <i className="bi bi-stack"></i>
                </div>
                <div>
                  <span className="footer-logo-name">SwiftStack Solutions</span>
                  <span className="footer-logo-tag">Building Tomorrow, Today</span>
                </div>
              </Link>

              <p className="footer-desc">
                A leading software development company delivering enterprise-grade digital solutions
                across Africa and beyond. ISO&nbsp;27001 certified, 97% on-time delivery.
              </p>

              {/* Trust badges */}
              <div className="footer-badges">
                <span className="footer-badge">
                  <i className="bi bi-shield-check" aria-hidden="true"></i>
                  ISO 27001
                </span>
                <span className="footer-badge">
                  <i className="bi bi-award" aria-hidden="true"></i>
                  Best Tech Firm EA&nbsp;'24
                </span>
                <span className="footer-badge">
                  <i className="bi bi-star-fill" aria-hidden="true"></i>
                  5-Star Rated
                </span>
              </div>

              {/* Socials */}
              <div className="footer-socials" role="list" aria-label="Social media links">
                {SOCIAL_LINKS.map(({ icon, href, label }) => (
                  <a
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-icon"
                    role="listitem"
                    aria-label={label}
                  >
                    <i className={`bi ${icon}`} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div className="footer-col">
              <h3 className="footer-col-title">Quick Links</h3>
              <nav className="footer-links-list" aria-label="Quick links">
                {FOOTER_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to} className="footer-link">
                    <i className="bi bi-chevron-right" aria-hidden="true"></i>
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── Services ── */}
            <div className="footer-col">
              <h3 className="footer-col-title">Services</h3>
              <div className="footer-links-list">
                {SERVICE_LINKS.map((s) => (
                  <span key={s} className="footer-link static">
                    <i className="bi bi-dot" aria-hidden="true"></i>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Contact & Newsletter ── */}
            <div className="footer-col">
              <h3 className="footer-col-title">Contact</h3>

              <address style={{ fontStyle: 'normal' }}>
                <div className="footer-contact-item">
                  <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                  <span>Westlands Business Park,<br />Nairobi, Kenya</span>
                </div>
                <div className="footer-contact-item">
                  <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                  <a href="tel:+254700000000" style={{ color: 'inherit', textDecoration: 'none' }}>
                    +254 700 000 000
                  </a>
                </div>
                <div className="footer-contact-item">
                  <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                  <a href="mailto:info@swiftstacksolutions.co.ke" style={{ color: 'inherit', textDecoration: 'none' }}>
                    info@swiftstacksolutions.co.ke
                  </a>
                </div>
                <div className="footer-contact-item">
                  <i className="bi bi-clock-fill" aria-hidden="true"></i>
                  <span>Mon – Fri, 8:00 AM – 6:00 PM EAT</span>
                </div>
              </address>

              {/* Newsletter */}
              <span className="footer-newsletter-label">Stay Updated</span>

              {subStatus === 'success' ? (
                <div className="alert-success" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                  You're subscribed. Welcome aboard!
                </div>
              ) : (
                <>
                  <form
                    onSubmit={handleSubscribe}
                    className="footer-newsletter"
                    aria-label="Newsletter subscription"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="newsletter-input"
                      aria-label="Email address for newsletter"
                      disabled={subStatus === 'loading'}
                    />
                    <button
                      type="submit"
                      className="newsletter-btn"
                      disabled={subStatus === 'loading'}
                      aria-label="Subscribe to newsletter"
                    >
                      {subStatus === 'loading'
                        ? <i className="bi bi-hourglass-split" aria-hidden="true"></i>
                        : <><i className="bi bi-send-fill" aria-hidden="true"></i> Subscribe</>
                      }
                    </button>
                  </form>

                  {subStatus === 'error' && (
                    <p className="form-error-msg" style={{ marginTop: '0.4rem' }}>
                      <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <p className="newsletter-hint">
                    <i className="bi bi-lock-fill" aria-hidden="true"></i>
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-bottom-left">
            <span>
              © {new Date().getFullYear()} SwiftStack Solutions Ltd.
              <span style={{ marginLeft: '0.35rem' }}>All rights reserved.</span>
            </span>
          </div>

          <nav className="footer-bottom-links" aria-label="Legal links">
            <a href="#">Privacy Policy</a>
            <span className="footer-bottom-sep" aria-hidden="true">·</span>
            <a href="#">Terms of Service</a>
            <span className="footer-bottom-sep" aria-hidden="true">·</span>
            <a href="#">Cookie Policy</a>
            <span className="footer-bottom-sep" aria-hidden="true">·</span>
            <a href="#">Accessibility</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}