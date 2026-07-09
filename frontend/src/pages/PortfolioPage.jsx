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

  useEffect(() => {
    portfolioAPI.getAll()
      .then(r => setProjects(r.data.results || r.data))
      .catch(() => setProjects(DEMO_PROJECTS))
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
              <div className="shuffle-btn-group">
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

              <div className="row shuffle-wrapper">
                {filtered.map(p => (
                  <div key={p.id} className="col-lg-4 col-md-6 shuffle-item">
                    <div className="project-img-container">
                      <div className="gallery-popup">
                        <img className="img-fluid" src={p.cover_image} alt={p.title} />
                        <span className="gallery-icon"><i className="fa fa-plus"></i></span>
                      </div>
                      <div className="project-item-info">
                        <div className="project-item-info-content">
                          <h3 className="project-item-title">
                            <Link to="/portfolio">{p.title}</Link>
                          </h3>
                          <p className="project-cat">{p.client_industry}</p>
                          <p style={{ color: '#fff', fontSize: '0.85rem' }}>{p.short_description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}