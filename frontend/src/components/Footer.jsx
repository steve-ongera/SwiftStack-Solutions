import { Link } from 'react-router-dom'
import { useState } from 'react'
import { newsletterAPI } from '../services/api'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState(null)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    try {
      await newsletterAPI.subscribe({ email })
      setSubStatus('success')
      setEmail('')
    } catch {
      setSubStatus('error')
    }
  }

  return (
    <footer className="footer-gov">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <i className="bi bi-stack"></i>
                </div>
                <div>
                  <div className="footer-logo-name">SwiftStack Solutions</div>
                  <div className="footer-logo-tag">Building Tomorrow, Today</div>
                </div>
              </div>
              <p className="footer-desc">
                A leading software development company delivering enterprise-grade digital solutions across Africa and beyond.
              </p>
              <div className="footer-socials">
                {[
                  ['bi-linkedin', '#'],
                  ['bi-twitter-x', '#'],
                  ['bi-github', '#'],
                  ['bi-youtube', '#'],
                  ['bi-facebook', '#'],
                ].map(([icon, href]) => (
                  <a key={icon} href={href} target="_blank" rel="noreferrer" className="social-icon">
                    <i className={`bi ${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Quick Links</h4>
              {[
                ['/about', 'About Us'],
                ['/services', 'Our Services'],
                ['/portfolio', 'Portfolio'],
                ['/careers', 'Careers'],
                ['/blog', 'Insights'],
                ['/contact', 'Contact Us'],
              ].map(([to, label]) => (
                <Link key={to} to={to} className="footer-link">
                  <i className="bi bi-chevron-right"></i> {label}
                </Link>
              ))}
            </div>

            {/* Services */}
            <div className="footer-col">
              <h4 className="footer-col-title">Services</h4>
              {[
                'Web Development',
                'Mobile Applications',
                'Cloud Solutions',
                'AI & Machine Learning',
                'Cybersecurity',
                'IT Consulting',
              ].map((s) => (
                <span key={s} className="footer-link static">
                  <i className="bi bi-dot"></i> {s}
                </span>
              ))}
            </div>

            {/* Contact & Newsletter */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact</h4>
              <div className="footer-contact-item">
                <i className="bi bi-geo-alt-fill"></i>
                <span>Westlands Business Park,<br />Nairobi, Kenya</span>
              </div>
              <div className="footer-contact-item">
                <i className="bi bi-telephone-fill"></i>
                <span>+254 700 000 000</span>
              </div>
              <div className="footer-contact-item">
                <i className="bi bi-envelope-fill"></i>
                <span>info@swiftstacksolutions.co.ke</span>
              </div>

              <h4 className="footer-col-title" style={{ marginTop: '1.5rem' }}>Newsletter</h4>
              {subStatus === 'success' ? (
                <div className="alert-success" style={{ fontSize: '0.85rem' }}>
                  <i className="bi bi-check-circle-fill"></i> Subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="footer-newsletter">
                  <input
                    type="email" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">
                    <i className="bi bi-send-fill"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} SwiftStack Solutions Ltd. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-gov { background: var(--color-charcoal); color: rgba(255,255,255,0.75); }
        .footer-main { padding: 4rem 0 3rem; }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
        }
        .footer-logo { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .footer-logo-icon {
          width: 42px; height: 42px; background: var(--color-gold);
          border-radius: var(--radius-sm); display: flex; align-items: center;
          justify-content: center; font-size: 1.3rem; color: var(--color-navy-dark);
          flex-shrink: 0;
        }
        .footer-logo-name { font-family: var(--font-heading); color: var(--color-white); font-size: 1rem; font-weight: 700; }
        .footer-logo-tag { font-size: 0.65rem; color: var(--color-gold); letter-spacing: 2px; text-transform: uppercase; }
        .footer-desc { font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.25rem; }
        .footer-socials { display: flex; gap: 0.6rem; }
        .social-icon {
          width: 36px; height: 36px; border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; font-size: 0.95rem;
          transition: all var(--transition-fast);
        }
        .social-icon:hover { background: var(--color-gold); color: var(--color-navy-dark); }
        .footer-col-title {
          font-family: var(--font-heading); color: var(--color-white);
          font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--color-gold);
          display: inline-block;
        }
        .footer-link, .footer-link.static {
          display: flex; align-items: center; gap: 0.3rem;
          color: rgba(255,255,255,0.65); text-decoration: none;
          font-size: 0.875rem; padding: 0.25rem 0;
          transition: color var(--transition-fast);
        }
        .footer-link:hover { color: var(--color-gold); }
        .footer-contact-item {
          display: flex; align-items: flex-start; gap: 0.6rem;
          font-size: 0.875rem; margin-bottom: 0.75rem; color: rgba(255,255,255,0.65);
        }
        .footer-contact-item i { color: var(--color-gold); margin-top: 2px; flex-shrink: 0; }
        .footer-newsletter { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
        .newsletter-input {
          flex: 1; padding: 0.6rem 0.8rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: var(--radius-sm); color: var(--color-white);
          font-size: 0.85rem; outline: none;
        }
        .newsletter-input:focus { border-color: var(--color-gold); }
        .newsletter-btn {
          background: var(--color-gold); color: var(--color-navy-dark);
          border: none; border-radius: var(--radius-sm);
          padding: 0 0.9rem; cursor: pointer; font-size: 1rem;
          transition: background var(--transition-fast);
        }
        .newsletter-btn:hover { background: var(--color-gold-dark); }
        .footer-bottom {
          background: var(--color-navy-dark);
          border-top: 2px solid var(--color-gold);
          padding: 1rem 0;
        }
        .footer-bottom-inner {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.8rem; color: rgba(255,255,255,0.5);
          flex-wrap: wrap; gap: 0.5rem;
        }
        .footer-bottom-links { display: flex; gap: 1.5rem; }
        .footer-bottom-links a { color: rgba(255,255,255,0.5); text-decoration: none; }
        .footer-bottom-links a:hover { color: var(--color-gold); }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  )
}