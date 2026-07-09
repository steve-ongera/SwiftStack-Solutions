// ─────────────────────────────────────────────
// ServiceCard.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

export function ServiceCard({ service }) {
  return (
    <div 
      className="ts-service-box" 
      style={{
        background: '#fff',
        padding: '30px 25px',
        marginBottom: '30px',
        borderRadius: '0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        borderBottom: '3px solid transparent'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
        e.currentTarget.style.borderBottomColor = '#ffb600'
        e.currentTarget.style.transform = 'translateY(-5px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)'
        e.currentTarget.style.borderBottomColor = 'transparent'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div 
        className="ts-service-icon" 
        style={{
          width: '60px',
          height: '60px',
          background: 'rgba(255, 182, 0, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          fontSize: '1.8rem',
          color: '#ffb600',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#ffb600'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 182, 0, 0.1)'
          e.currentTarget.style.color = '#ffb600'
        }}
      >
        <i className={`bi ${service.icon_class || 'bi-code-slash'}`}></i>
      </div>
      <div className="ts-service-box-content">
        <h3 className="service-box-title" style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#212121',
          marginBottom: '10px',
          textTransform: 'uppercase',
          fontFamily: '"Montserrat", sans-serif'
        }}>
          {service.title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#555',
          lineHeight: '24px',
          marginBottom: '15px',
          fontFamily: '"Open Sans", sans-serif'
        }}>
          {service.short_description}
        </p>
        {service.technologies?.length > 0 && (
          <div className="service-tech-tags" style={{
            display: 'flex',
            gap: '5px',
            flexWrap: 'wrap'
          }}>
            {service.technologies.slice(0, 4).map(t => (
              <span key={t.id} style={{
                background: '#f0f0f0',
                color: '#333',
                padding: '3px 10px',
                fontSize: '11px',
                borderRadius: '3px',
                fontWeight: 600,
                fontFamily: '"Open Sans", sans-serif'
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

// ─────────────────────────────────────────────
// TestimonialCard.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

export function TestimonialCard({ testimonial }) {
  return (
    <div 
      className="quote-item" 
      style={{
        background: '#fff',
        padding: '30px',
        marginBottom: '30px',
        borderRadius: '0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        borderLeft: '3px solid #ffb600',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)'
      }}
    >
      <div className="quote-text" style={{
        fontSize: '16px',
        color: '#555',
        fontStyle: 'italic',
        lineHeight: '28px',
        marginBottom: '20px',
        fontFamily: '"Open Sans", sans-serif'
      }}>
        <i className="fas fa-quote-left" style={{
          color: '#ffb600',
          marginRight: '10px',
          fontSize: '18px'
        }}></i>
        "{testimonial.content}"
      </div>
      <div className="quote-item-footer" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        {testimonial.client_photo ? (
          <img 
            src={testimonial.client_photo} 
            alt={testimonial.client_name} 
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #ffb600'
            }}
          />
        ) : (
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#1a3c6e',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '18px',
            fontWeight: 700,
            flexShrink: 0
          }}>
            {testimonial.client_name?.[0] || 'C'}
          </div>
        )}
        <div className="quote-item-info">
          <h3 className="quote-author" style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#212121',
            margin: 0,
            fontFamily: '"Montserrat", sans-serif'
          }}>
            {testimonial.client_name}
          </h3>
          <span className="quote-subtext" style={{
            fontSize: '13px',
            color: '#777',
            fontFamily: '"Open Sans", sans-serif'
          }}>
            {testimonial.client_title}{testimonial.client_company && `, ${testimonial.client_company}`}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// StatsBanner.jsx - Updated with Constra Theme
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
    <section 
      className="facts-area dark-bg"
      style={{
        background: '#252525',
        padding: '70px 0',
        position: 'relative',
        color: '#fff'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="facts-wrapper">
          <div className="row">
            {data.slice(0, 4).map((stat, i) => (
              <div 
                key={i} 
                className="col-md-3 col-sm-6 ts-facts"
                style={{
                  textAlign: 'center',
                  padding: '20px 15px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div 
                  className="ts-facts-img"
                  style={{
                    marginBottom: '15px'
                  }}
                >
                  <i 
                    className={`bi ${stat.icon_class || 'bi-check-circle'}`} 
                    style={{ 
                      fontSize: '3rem', 
                      color: '#ffb600',
                      transition: 'all 0.3s ease'
                    }}
                  ></i>
                </div>
                <div className="ts-facts-content">
                  <h2 
                    className="ts-facts-num"
                    style={{
                      fontSize: '36px',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '5px',
                      lineHeight: 1.2,
                      fontFamily: '"Montserrat", sans-serif'
                    }}
                  >
                    <span className="counterUp">
                      {stat.value}
                    </span>
                  </h2>
                  <h3 
                    className="ts-facts-title"
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontFamily: '"Open Sans", sans-serif'
                    }}
                  >
                    {stat.label}
                  </h3>
                  {stat.description && (
                    <p style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginTop: '5px',
                      marginBottom: 0,
                      fontFamily: '"Open Sans", sans-serif'
                    }}>
                      {stat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .ts-facts {
            margin-bottom: 30px;
          }
          .ts-facts:last-child {
            margin-bottom: 0;
          }
        }
        @media (max-width: 576px) {
          .facts-area {
            padding: 40px 0 !important;
          }
          .ts-facts-num {
            font-size: 28px !important;
          }
        }
      `}</style>
    </section>
  )
}