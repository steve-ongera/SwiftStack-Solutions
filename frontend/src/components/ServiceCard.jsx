// ─────────────────────────────────────────────
// ServiceCard.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ServiceCard({ service }) {
  const [imageError, setImageError] = useState(false)

  // ── Safely extract category name ──
  const getCategoryName = () => {
    if (!service.category) return 'General'
    if (typeof service.category === 'string') return service.category
    if (typeof service.category === 'object') {
      return service.category.name || service.category.title || 'General'
    }
    return 'General'
  }

  // ── Safely extract technology name ──
  const getTechName = (tech) => {
    if (!tech) return 'Tech'
    if (typeof tech === 'string') return tech
    if (typeof tech === 'object') {
      return tech.name || tech.title || tech.technology || 'Tech'
    }
    return 'Tech'
  }

  const categoryName = getCategoryName()

  return (
    <div className="ts-service-box d-flex" style={{
      background: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
      height: '100%',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      flexDirection: 'column',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)'
      e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.12)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)'
    }}
    >
      {/* ── Service Image ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        background: '#f0f0f0'
      }}>
        {service.cover_image && !imageError ? (
          <img 
            src={service.cover_image} 
            alt={service.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: 'linear-gradient(135deg, #ffb600 0%, #e0a300 100%)',
            color: '#fff'
          }}>
            <i className={`fas ${service.icon_class || 'fa-code'}`} style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>No Image Available</span>
          </div>
        )}
        
        {/* ── Tier Badge ── */}
        {service.tier && typeof service.tier === 'string' && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: service.tier === 'enterprise' ? '#ff6b35' : 
                       service.tier === 'professional' ? '#ffb600' : '#00b894',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.7rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {service.tier}
          </div>
        )}
      </div>

      {/* ── Service Content ── */}
      <div style={{ padding: '20px 24px 24px' }}>
        {/* Category Badge - Now safely rendering a string */}
        <div style={{
          display: 'inline-block',
          background: service.category?.color_hex || '#fff4da',
          color: service.category?.color_hex ? '#fff' : '#ffb600',
          padding: '2px 12px',
          borderRadius: '12px',
          fontSize: '0.7rem',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          {categoryName}
        </div>

        <h3 className="service-box-title" style={{
          fontSize: '1.1rem',
          fontWeight: '700',
          marginBottom: '8px',
          color: '#1a1d1f'
        }}>
          <a href="#" style={{ color: '#1a1d1f', textDecoration: 'none' }}>{service.title}</a>
        </h3>
        
        <p style={{
          color: '#5b5f63',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          marginBottom: '16px'
        }}>
          {service.short_description || 'No description available'}
        </p>

        {/* ── Technologies ── */}
        {service.technologies && Array.isArray(service.technologies) && service.technologies.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '0.4rem',
            flexWrap: 'wrap',
            marginTop: '0.5rem',
            marginBottom: '16px'
          }}>
            {service.technologies.slice(0, 4).map((tech, index) => {
              const techName = getTechName(tech)
              return (
                <span key={index} className="badge" style={{ 
                  background: '#1a3c6e', 
                  color: '#fff', 
                  padding: '0.2rem 0.6rem', 
                  borderRadius: '3px', 
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}>
                  {techName}
                </span>
              )
            })}
            {service.technologies.length > 4 && (
              <span className="badge" style={{ 
                background: '#f0f0f0', 
                color: '#5b5f63', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '3px', 
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>
                +{service.technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        <Link 
          to={`/services/${service.id}`} 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: '#ffb600',
            fontWeight: '700',
            fontSize: '0.85rem',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#e0a300'}
          onMouseLeave={(e) => e.target.style.color = '#ffb600'}
        >
          Learn More
          <i className="fas fa-arrow-right" style={{ marginLeft: '6px', fontSize: '0.7rem' }}></i>
        </Link>
      </div>
    </div>
  )
}