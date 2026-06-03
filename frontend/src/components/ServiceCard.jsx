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
