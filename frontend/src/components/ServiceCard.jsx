// ─────────────────────────────────────────────
// ServiceCard.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

export function ServiceCard({ service }) {
  return (
    <div className="ts-service-box d-flex">
      <div className="ts-service-box-img">
        <i className={`fas ${service.icon_class || 'fa-code'}`} style={{ fontSize: '2rem', color: '#ffb600' }}></i>
      </div>
      <div className="ts-service-box-info">
        <h3 className="service-box-title">
          <a href="#">{service.title}</a>
        </h3>
        <p>{service.short_description}</p>
        {service.technologies?.length > 0 && (
          <div className="service-tech-tags" style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {service.technologies.slice(0, 4).map(t => (
              <span key={t.id} className="badge" style={{ 
                background: '#1a3c6e', 
                color: '#fff', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '3px', 
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>
                {t.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}