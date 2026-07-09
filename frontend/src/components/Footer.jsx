// ─────────────────────────────────────────────
// Footer.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { newsletterAPI } from '../services/api'
import nairobi1Logo from '../assets/nairobi_1_logo.jpeg'

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
  { icon: 'fab fa-linkedin-in', href: '#', label: 'LinkedIn' },
  { icon: 'fab fa-twitter', href: '#', label: 'X (Twitter)' },
  { icon: 'fab fa-github', href: '#', label: 'GitHub' },
  { icon: 'fab fa-youtube', href: '#', label: 'YouTube' },
  { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook' },
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
    <footer id="footer" className="footer bg-overlay" aria-label="Site footer">
      {/* ── Main Footer ── */}
      <div className="footer-main">
        <div className="container">
          <div className="row justify-content-between">
            {/* ── About Column ── */}
            <div className="col-lg-4 col-md-6 footer-widget footer-about">
              <h3 className="widget-title">About Us</h3>
              <img 
                loading="lazy" 
                className="footer-logo" 
                src={nairobi1Logo}
                alt="Nairobi 1"
                style={{ maxHeight: '35px', marginBottom: '20px' }}
              />
              <p>
                A leading software development company delivering enterprise-grade digital solutions
                across Africa and beyond. ISO 27001 certified, 97% on-time delivery.
              </p>
              <div className="footer-social">
                <ul>
                  {SOCIAL_LINKS.map(({ icon, href, label }) => (
                    <li key={label}>
                      <a href={href} aria-label={label}>
                        <i className={icon}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Working Hours ── */}
            <div className="col-lg-4 col-md-6 footer-widget mt-5 mt-md-0">
              <h3 className="widget-title">Working Hours</h3>
              <div className="working-hours">
                We work 7 days a week, every day excluding major holidays. Contact us if you have an emergency.
                <br /><br />
                Monday - Friday: <span className="text-right">8:00 - 18:00</span>
                <br />
                Saturday: <span className="text-right">9:00 - 15:00</span>
                <br />
                Sunday and holidays: <span className="text-right">Closed</span>
              </div>
            </div>

            {/* ── Services Column ── */}
            <div className="col-lg-3 col-md-6 mt-5 mt-lg-0 footer-widget">
              <h3 className="widget-title">Our Services</h3>
              <ul className="list-arrow">
                {SERVICE_LINKS.map((s) => (
                  <li key={s}>
                    <Link to="/services">{s}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="copyright">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="copyright-info text-center">
                <span>
                  Copyright &copy; {new Date().getFullYear()}, Designed &amp; Developed by{' '}
                  <a href="https://themefisher.com" target="_blank" rel="noreferrer">Themefisher</a>
                </span>
              </div>
            </div>

            <div className="col-md-12">
              <div className="copyright-info text-center">
                <span>Distributed by <a href="https://themewagon.com/" target="_blank" rel="noreferrer">Themewagon</a></span>
              </div>
            </div>

            <div className="col-md-12">
              <div className="footer-menu text-center">
                <ul className="list-unstyled mb-0">
                  {FOOTER_LINKS.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Back to Top Button ── */}
          <div id="back-to-top" data-spy="affix" data-offset-top="10" className="back-to-top position-fixed">
            <button 
              className="btn btn-primary" 
              title="Back to Top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <i className="fa fa-angle-double-up"></i>
            </button>
          </div>
        </div>
      </div>

      {/* ── Custom Styles ── */}
      <style>{`
        /* Footer overrides */
        .footer.bg-overlay {
          position: relative;
        }
        .footer.bg-overlay::after {
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 0;
          position: absolute;
          content: '';
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .footer .container {
          position: relative;
          z-index: 1;
        }
        .footer-widget .widget-title {
          font-size: 16px;
          font-weight: 700;
          position: relative;
          margin: 0 0 30px;
          padding-left: 15px;
          text-transform: uppercase;
          color: #fff;
          border-left: 3px solid #ffb600;
        }
        .footer-social ul {
          list-style: none;
          margin: 0;
          padding: 0;
          margin-left: -13px;
        }
        .footer-social ul li {
          display: inline-block;
        }
        .footer-social ul li a i {
          display: block;
          font-size: 16px;
          color: #999;
          transition: 400ms;
          padding: 10px 13px;
        }
        .footer-social ul li:hover i {
          color: #ffb600;
        }
        .working-hours .text-right {
          float: right;
        }
        .copyright {
          background: #ffb600;
          color: #111;
          padding: 25px 0;
          position: relative;
          z-index: 1;
          font-weight: 600;
          font-size: 12px;
        }
        .footer-menu ul li {
          display: inline-block;
          line-height: 12px;
          padding-left: 15px;
        }
        .footer-menu ul li a {
          background: none;
          color: #111;
          padding: 0;
          text-decoration: none;
        }
        .footer-menu ul li a:hover {
          color: #fff;
        }
        #back-to-top {
          right: 40px;
          top: auto;
          z-index: 10;
          display: none;
        }
        #back-to-top.position-fixed {
          bottom: 20px;
          display: block;
        }
        #back-to-top .btn.btn-primary {
          width: 36px;
          height: 36px;
          line-height: 36px;
          background: rgba(0, 0, 0, 0.9);
          border-radius: 3px;
          color: #ffb600;
          font-weight: 700;
          font-size: 16px;
          padding: 0;
          border: none;
          cursor: pointer;
        }
        #back-to-top .btn.btn-primary:hover {
          color: #fff;
          background: #111;
        }
        @media (max-width: 767px) {
          #back-to-top {
            right: 15px;
          }
          #back-to-top .btn.btn-primary {
            width: 32px;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
          }
        }
        /* Newsletter subscription (your existing) */
        .footer-newsletter {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .newsletter-input {
          flex: 1;
          padding: 0.5rem 0.75rem;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          background: rgba(255,255,255,0.05);
          color: #fff;
        }
        .newsletter-input::placeholder {
          color: rgba(255,255,255,0.5);
        }
        .newsletter-btn {
          padding: 0.5rem 1rem;
          background: #ffb600;
          border: none;
          border-radius: 4px;
          color: #111;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .newsletter-btn:hover {
          background: #e6a300;
        }
        .newsletter-hint {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          margin-top: 0.3rem;
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: rgba(255,255,255,0.7);
        }
        .footer-contact-item i {
          color: #ffb600;
          margin-top: 3px;
        }
        .footer-newsletter-label {
          display: block;
          color: #fff;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.25rem;
        }
        .footer-bottom {
          background: #0d0d0d;
          padding: 1rem 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .footer-bottom-links a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.8rem;
        }
        .footer-bottom-links a:hover {
          color: #ffb600;
        }
        .footer-bottom-sep {
          color: rgba(255,255,255,0.2);
        }
        @media (max-width: 768px) {
          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}