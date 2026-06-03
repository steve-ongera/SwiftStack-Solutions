import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="hero">
      {/* Background image via Unsplash */}
      <div
        className="hero-bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80)',
        }}
      />
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-badge animate-fade-up">
          <i className="bi bi-patch-check-fill"></i>
          Trusted by 150+ enterprises across Africa
        </div>
        <h1 className="hero-title animate-fade-up delay-100">
          Engineering Digital<br />
          <span className="hero-title-accent">Excellence</span>
        </h1>
        <p className="hero-subtitle animate-fade-up delay-200">
          SwiftStack Solutions builds enterprise-grade software, cloud platforms, and AI systems
          that power the next generation of African businesses.
        </p>
        <div className="hero-actions animate-fade-up delay-300">
          <Link to="/portfolio" className="btn-gold">
            <i className="bi bi-briefcase-fill"></i>
            View Our Work
          </Link>
          <Link to="/contact" className="btn-outline-white">
            <i className="bi bi-telephone-fill"></i>
            Get a Free Quote
          </Link>
        </div>

        {/* Floating stats */}
        <div className="hero-stats animate-fade-up delay-400">
          {[
            { value: '150+', label: 'Projects Delivered', icon: 'bi-check-circle-fill' },
            { value: '80+',  label: 'Happy Clients',      icon: 'bi-people-fill' },
            { value: '8+',   label: 'Years Experience',   icon: 'bi-calendar-check-fill' },
            { value: '99%',  label: 'Client Satisfaction', icon: 'bi-star-fill' },
          ].map(({ value, label, icon }) => (
            <div key={label} className="hero-stat">
              <i className={`bi ${icon}`}></i>
              <div>
                <div className="hero-stat-value">{value}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <i className="bi bi-chevron-double-down"></i>
      </div>

      <style>{`
        .hero {
          position: relative; min-height: 92vh;
          display: flex; align-items: center; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          background-attachment: fixed;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            135deg,
            rgba(17,40,80,0.93) 0%,
            rgba(26,60,110,0.88) 50%,
            rgba(26,60,110,0.7) 100%
          );
        }
        .hero-content {
          position: relative; z-index: 1;
          padding-top: 3rem; padding-bottom: 5rem;
          max-width: 780px;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(200,168,75,0.2);
          border: 1px solid rgba(200,168,75,0.4);
          color: var(--color-gold-light);
          padding: 0.45rem 1rem; border-radius: 100px;
          font-size: 0.82rem; font-weight: 600;
          margin-bottom: 1.5rem; letter-spacing: 0.3px;
        }
        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900; color: var(--color-white);
          line-height: 1.15; margin-bottom: 1.5rem;
        }
        .hero-title-accent { color: var(--color-gold); }
        .hero-subtitle {
          color: rgba(255,255,255,0.8); font-size: 1.15rem;
          line-height: 1.75; margin-bottom: 2.5rem; max-width: 600px;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 4rem; }
        .btn-outline-white {
          background: transparent; border: 2px solid rgba(255,255,255,0.6);
          color: var(--color-white); padding: 0.75rem 2rem;
          border-radius: var(--radius-sm); font-size: 0.95rem; font-weight: 600;
          text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;
          transition: all var(--transition-base);
        }
        .btn-outline-white:hover {
          background: rgba(255,255,255,0.1); border-color: var(--color-white);
        }
        .hero-stats {
          display: flex; gap: 2rem; flex-wrap: wrap;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.15);
        }
        .hero-stat {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .hero-stat i { font-size: 1.4rem; color: var(--color-gold); }
        .hero-stat-value {
          font-family: var(--font-heading); font-size: 1.5rem;
          font-weight: 700; color: var(--color-white); line-height: 1;
        }
        .hero-stat-label { font-size: 0.75rem; color: rgba(255,255,255,0.6); margin-top: 2px; }
        .hero-scroll {
          position: absolute; bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.4); font-size: 1.1rem;
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  )
}