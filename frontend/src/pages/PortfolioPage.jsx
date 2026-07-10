// ─────────────────────────────────────────────
// PortfolioPage.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolioAPI } from '../services/api'

const DEMO_PROJECTS = [
  { id:1, title:'FinTrack Pro', client_industry:'FinTech', short_description:'Real-time banking dashboard for 200k+ users.', cover_image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75' },
  { id:2, title:'AgriConnect', client_industry:'AgriTech', short_description:'IoT platform connecting 10,000+ farmers to markets.', cover_image:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&q=75' },
  { id:3, title:'HealthHub', client_industry:'HealthTech', short_description:'Telemedicine and EHR for 5 regional hospitals.', cover_image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=75' },
  { id:4, title:'EduBridge', client_industry:'EdTech', short_description:'Learning management system for 50+ schools.', cover_image:'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=75' },
  { id:5, title:'SmartCity', client_industry:'GovTech', short_description:'Urban planning and traffic management system.', cover_image:'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=700&q=75' },
  { id:6, title:'PayFast', client_industry:'FinTech', short_description:'Mobile payment platform processing $10M+ monthly.', cover_image:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=75' },
]

export default function PortfolioPage() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    portfolioAPI.getAll()
      .then(r => {
        const data = r.data.results || r.data || []
        setProjects(data)
        setLoading(false)
      })
      .catch(() => {
        setProjects(DEMO_PROJECTS)
        setLoading(false)
      })
  }, [])

  const data = projects.length ? projects : DEMO_PROJECTS
  const filtered = filter === 'all' ? data : data.filter(p => p.client_industry?.toLowerCase() === filter)

  const categories = ['all', ...new Set(data.map(p => p.client_industry?.toLowerCase()).filter(Boolean))]

  return (
    <div>

      {/* ── Page Banner ── */}
      <div className="banner-area" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80)' }}>
        <div className="banner-text">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="banner-heading">
                  <h1 className="banner-title">Our Portfolio</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Portfolio</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Projects Grid ── */}
      <section id="project-area" className="project-area section-padding">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="section-title">Work of Excellence</h2>
              <h3 className="section-sub-title">Our Projects</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="shuffle-btn-group" style={{ marginBottom: '40px' }}>
                {categories.map(cat => (
                  <label key={cat} className={cat === filter ? 'active' : ''}>
                    <input 
                      type="radio" 
                      name="shuffle-filter" 
                      value={cat} 
                      checked={cat === filter}
                      onChange={() => setFilter(cat)}
                    />
                    {cat === 'all' ? 'Show All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </label>
                ))}
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p className="mt-3">Loading projects...</p>
                </div>
              ) : (
                <div className="row shuffle-wrapper" style={{ rowGap: '32px' }}>
                  {filtered.length === 0 ? (
                    <div className="col-12 text-center py-5">
                      <p>No projects found for this category.</p>
                    </div>
                  ) : (
                    filtered.map(p => (
                      <div key={p.id} className="col-lg-4 col-md-6 shuffle-item mb-4">
                        <div
                          className="project-card"
                          style={{
                            background: '#fff',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
                            height: '100%',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            marginRight: '12px',
                            cursor: 'pointer',
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
                          {/* ── Fixed size image container ── */}
                          <div style={{ 
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '4/3',
                            overflow: 'hidden',
                            background: '#f0f0f0'
                          }}>
                            {p.cover_image ? (
                              <img 
                                className="img-fluid" 
                                src={p.cover_image} 
                                alt={p.title}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  display: 'block',
                                  transition: 'transform 0.6s ease',
                                
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.parentElement.querySelector('.no-image-placeholder').style.display = 'flex'
                                }}
                              />
                            ) : null}
                            {/* ── No Image Placeholder ── */}
                            <div className="no-image-placeholder" style={{
                              display: p.cover_image ? 'none' : 'flex',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'linear-gradient(135deg, #1a3c6e 0%, #2a5a8f 100%)',
                              color: '#fff',
                              textAlign: 'center',
                              padding: '20px'
                            }}>
                              <i className="fas fa-image" style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.5 }}></i>
                              <span style={{ fontWeight: '600', fontSize: '1rem' }}>No Image Available</span>
                              <span style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '5px' }}>{p.title}</span>
                            </div>
                            <span className="gallery-icon" style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              padding: '8px 12px',
                              background: '#ffb600',
                              color: '#fff',
                              borderRadius: '4px',
                              zIndex: 2,
                              fontSize: '14px'
                            }}>
                              <i className="fa fa-plus"></i>
                            </span>
                          </div>

                          {/* ── Text content, now outside the image and clearly spaced ── */}
                          <div style={{ padding: '20px 24px 24px' }}>
                            <h3 style={{
                              fontSize: '1.1rem',
                              fontWeight: '700',
                              marginBottom: '6px',
                              color: '#1a1d1f'
                            }}>
                              <Link to={`/portfolio/${p.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                {p.title}
                              </Link>
                            </h3>
                            <p style={{
                              color: '#ffb600',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              marginBottom: '12px'
                            }}>
                              {p.client_industry || 'General'}
                            </p>
                            <p style={{
                              color: '#5b5f63',
                              fontSize: '0.9rem',
                              lineHeight: '1.6',
                              margin: 0
                            }}>
                              {p.short_description || 'No description available'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}