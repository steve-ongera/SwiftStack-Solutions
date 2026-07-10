// ─────────────────────────────────────────────
// ServicesPage.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { servicesAPI } from '../services/api'

const DEMO_SERVICES = [
  { 
    id:1, 
    title:'Web Development', 
    icon_class:'bi-globe2', 
    short_description:'Enterprise-grade web apps using React, Next.js, Vue, and Django REST Framework.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    technologies:['React','Django','Next.js'],
    tier:'professional' 
  },
  { 
    id:2, 
    title:'Mobile Applications', 
    icon_class:'bi-phone', 
    short_description:'Cross-platform iOS & Android apps with React Native and Flutter.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    technologies:['React Native','Flutter'],
    tier:'professional' 
  },
  { 
    id:3, 
    title:'Cloud Architecture', 
    icon_class:'bi-cloud-arrow-up', 
    short_description:'AWS, Azure & GCP design, migration, cost optimisation, and 24/7 management.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
    technologies:['AWS','Azure','GCP'],
    tier:'enterprise' 
  },
  { 
    id:4, 
    title:'AI & Machine Learning', 
    icon_class:'bi-robot', 
    short_description:'Custom ML pipelines, NLP systems, computer vision, and intelligent automation.',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80',
    technologies:['TensorFlow','PyTorch'],
    tier:'enterprise' 
  },
  { 
    id:5, 
    title:'Cybersecurity', 
    icon_class:'bi-shield-lock', 
    short_description:'Penetration testing, vulnerability assessments, SIEM, and SOC-as-a-service.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    technologies:['SIEM','Pen Testing'],
    tier:'enterprise' 
  },
  { 
    id:6, 
    title:'IT Consulting', 
    icon_class:'bi-lightbulb', 
    short_description:'Digital transformation strategy, technology roadmaps, and CTO advisory.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
    technologies:['Strategy','Advisory'],
    tier:'starter' 
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    servicesAPI.getAll()
      .then(r => {
        const data = r.data.results || r.data || []
        setServices(data)
        setLoading(false)
      })
      .catch(() => {
        setServices(DEMO_SERVICES)
        setLoading(false)
      })
  }, [])

  const data = services.length ? services : DEMO_SERVICES

  return (
    <div>

      {/* ── Page Banner ── */}
      <div className="banner-area" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80)' }}>
        <div className="banner-text">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="banner-heading">
                  <h1 className="banner-title">Our Services</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Services</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section id="ts-service-area" className="ts-service-area section-padding">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="section-title">What We Offer</h2>
              <h3 className="section-sub-title">Our Services</h3>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-3">Loading services...</p>
            </div>
          ) : (
            <div className="row">
              {data.map(s => (
                <div key={s.id} className="col-lg-4 col-md-6 mb-4">
                  <ServiceCard service={s} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="section-padding" style={{ background: '#23282d', color: '#fff' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="section-title" style={{ color: '#fff' }}>How We Work</h2>
              <h3 className="section-sub-title" style={{ color: '#ffb600' }}>Our Delivery Process</h3>
            </div>
          </div>

          <div className="row text-center mt-4">
            {[
              { icon: 'fa-search', title: 'Discovery', desc: 'Understanding your goals, users, and constraints.' },
              { icon: 'fa-pencil-alt', title: 'Design', desc: 'Wireframing, prototyping, and architecture planning.' },
              { icon: 'fa-code', title: 'Development', desc: 'Agile sprints, code reviews, and continuous integration.' },
              { icon: 'fa-rocket', title: 'Launch', desc: 'Deployment, QA, performance testing, and go-live support.' },
              { icon: 'fa-sync', title: 'Support', desc: 'Ongoing maintenance, monitoring, and feature evolution.' },
            ].map((step, i) => (
              <div key={i} className="col-lg-2 col-md-4 col-6 mb-4">
                <div style={{ fontSize: '2.5rem', color: '#ffb600', marginBottom: '1rem' }}>
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <h5 style={{ color: '#fff', fontSize: '0.95rem' }}>{step.title}</h5>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="general-btn text-center mt-4">
            <Link to="/contact" className="btn btn-primary">Get Started Today</Link>
          </div>
        </div>
      </section>

    </div>
  )
}

// ── ServiceCard Component ──
function ServiceCard({ service }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="ts-service-box-bg" style={{
      background: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
      height: '100%',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      marginRight: '8px',
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
      {/* Service Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        background: '#f0f0f0'
      }}>
        {service.image && !imageError ? (
          <img 
            src={service.image} 
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
            <i className={service.icon_class || 'bi-box'} style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>No Image Available</span>
          </div>
        )}
        
        {/* Tier Badge */}
        {service.tier && (
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

      {/* Service Content */}
      <div style={{ padding: '20px 24px 24px' }}>
        <h4 style={{
          fontSize: '1.1rem',
          fontWeight: '700',
          marginBottom: '8px',
          color: '#1a1d1f'
        }}>
          {service.title}
        </h4>
        
        <p style={{
          color: '#5b5f63',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          marginBottom: '16px'
        }}>
          {service.short_description || 'No description available'}
        </p>

        {/* Technologies */}
        {service.technologies && service.technologies.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '16px'
          }}>
            {service.technologies.slice(0, 3).map((tech, idx) => {
              const label = typeof tech === 'string' ? tech : (tech?.name ?? '')
              const key = typeof tech === 'string' ? `${tech}-${idx}` : (tech?.id ?? idx)

              return (
                <span key={key} style={{
                  background: '#f0f0f0',
                  color: '#1a1d1f',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}>
                  {label}
                </span>
              )
            })}
            {service.technologies.length > 3 && (
              <span style={{
                background: '#f0f0f0',
                color: '#5b5f63',
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>
                +{service.technologies.length - 3} more
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