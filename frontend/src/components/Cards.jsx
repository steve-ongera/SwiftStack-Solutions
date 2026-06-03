// ─────────────────────────────────────────────
// ServiceCard.jsx
// ─────────────────────────────────────────────

export function ServiceCard({ service }) {
  return (
    <div className="card-gov service-card">
      <div className="service-icon-wrap">
        <i className={`bi ${service.icon_class || 'bi-code-slash'}`}></i>
      </div>
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.short_description}</p>
      {service.technologies?.length > 0 && (
        <div className="service-tech-tags">
          {service.technologies.slice(0, 4).map(t => (
            <span key={t.id} className="badge-gov badge-navy">{t.name}</span>
          ))}
        </div>
      )}
      <style>{`
        .service-card { cursor: default; }
        .service-icon-wrap {
          width: 56px; height: 56px;
          background: rgba(26,60,110,0.08);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem; color: var(--color-navy);
          margin-bottom: 1.25rem;
          transition: all var(--transition-base);
        }
        .service-card:hover .service-icon-wrap {
          background: var(--color-navy); color: var(--color-gold);
        }
        .service-card-title {
          font-size: 1.1rem; margin-bottom: 0.6rem;
        }
        .service-card-desc {
          font-size: 0.9rem; color: var(--color-dark-gray);
          line-height: 1.65; margin-bottom: 1.25rem;
        }
        .service-tech-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────
// TestimonialCard.jsx
// ─────────────────────────────────────────────

export function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <i
            key={i}
            className={`bi ${i < testimonial.rating ? 'bi-star-fill' : 'bi-star'}`}
          ></i>
        ))}
      </div>
      <blockquote className="testimonial-quote">"{testimonial.content}"</blockquote>
      <div className="testimonial-author">
        {testimonial.client_photo ? (
          <img src={testimonial.client_photo} alt={testimonial.client_name} className="testimonial-avatar" />
        ) : (
          <div className="testimonial-avatar-placeholder">
            {testimonial.client_name?.[0] || 'C'}
          </div>
        )}
        <div>
          <div className="testimonial-name">{testimonial.client_name}</div>
          <div className="testimonial-meta">
            {testimonial.client_title}{testimonial.client_company && `, ${testimonial.client_company}`}
          </div>
        </div>
      </div>
      <style>{`
        .testimonial-card {
          background: var(--color-white);
          border: 1px solid var(--color-light-gray);
          border-radius: var(--radius-lg);
          padding: 2rem;
          transition: box-shadow var(--transition-base);
          position: relative;
        }
        .testimonial-card::before {
          content: '"';
          position: absolute; top: 1rem; right: 1.5rem;
          font-size: 5rem; font-family: Georgia, serif;
          color: rgba(26,60,110,0.07); line-height: 1;
        }
        .testimonial-card:hover { box-shadow: var(--shadow-lg); }
        .testimonial-stars { color: var(--color-gold); margin-bottom: 1rem; font-size: 0.9rem; }
        .testimonial-quote {
          font-size: 0.95rem; color: var(--color-dark-gray);
          line-height: 1.7; font-style: italic;
          margin-bottom: 1.5rem; border: none; padding: 0;
        }
        .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
        .testimonial-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          object-fit: cover; border: 2px solid var(--color-gold);
        }
        .testimonial-avatar-placeholder {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--color-navy); color: var(--color-white);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700;
          flex-shrink: 0;
        }
        .testimonial-name { font-weight: 700; font-size: 0.9rem; color: var(--color-navy); }
        .testimonial-meta { font-size: 0.8rem; color: var(--color-mid-gray); }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────
// StatsBanner.jsx
// ─────────────────────────────────────────────

const FALLBACK_STATS = [
  { label: 'Projects Completed', value: '150+', icon_class: 'bi-check-circle', description: 'Across all industries' },
  { label: 'Happy Clients',      value: '80+',  icon_class: 'bi-people',        description: 'Active partnerships' },
  { label: 'Team Members',       value: '45+',  icon_class: 'bi-person-badge',  description: 'Expert engineers' },
  { label: 'Countries Served',   value: '12',   icon_class: 'bi-globe2',         description: 'Pan-African reach' },
]

export function StatsBanner({ stats }) {
  const data = stats?.length ? stats : FALLBACK_STATS
  return (
    <section className="stats-banner">
      <div className="container">
        <div className="stats-grid">
          {data.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-icon">
                <i className={`bi ${stat.icon_class}`}></i>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              {stat.description && <div className="stat-desc">{stat.description}</div>}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .stats-banner {
          background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
          padding: 4rem 0;
          position: relative; overflow: hidden;
        }
        .stats-banner::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          position: relative;
        }
        .stat-item {
          text-align: center; padding: 1.5rem 1rem;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .stat-item:last-child { border-right: none; }
        .stat-icon { font-size: 2rem; color: var(--color-gold); margin-bottom: 0.75rem; }
        .stat-value {
          font-family: var(--font-heading); font-size: 2.5rem;
          font-weight: 900; color: var(--color-white); line-height: 1;
          margin-bottom: 0.4rem;
        }
        .stat-label { font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.85); }
        .stat-desc { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-top: 0.25rem; }
        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
        }
      `}</style>
    </section>
  )
}