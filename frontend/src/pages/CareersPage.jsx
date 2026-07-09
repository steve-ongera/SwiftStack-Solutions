// ─────────────────────────────────────────────
// CareersPage.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { careersAPI } from '../services/api'

const DEMO_JOBS = [
  { id:1, title:'Senior Software Engineer', location:'Nairobi, Kenya', type:'Full-time', department:'Engineering', description:'Build enterprise-scale applications using React, Python, and cloud technologies.', posted_date:'2024-09-01' },
  { id:2, title:'Cloud Solutions Architect', location:'Remote', type:'Full-time', department:'Cloud', description:'Design and implement cloud infrastructure on AWS, Azure, or GCP.', posted_date:'2024-08-28' },
  { id:3, title:'UX/UI Designer', location:'Nairobi, Kenya', type:'Full-time', department:'Design', description:'Create beautiful, intuitive user experiences for web and mobile applications.', posted_date:'2024-08-25' },
  { id:4, title:'Machine Learning Engineer', location:'Remote', type:'Contract', department:'AI', description:'Develop and deploy ML models for real-world business applications.', posted_date:'2024-08-20' },
  { id:5, title:'DevOps Engineer', location:'Nairobi, Kenya', type:'Full-time', department:'Operations', description:'Manage CI/CD pipelines, container orchestration, and infrastructure automation.', posted_date:'2024-08-15' },
  { id:6, title:'Project Manager', location:'Nairobi, Kenya', type:'Full-time', department:'Management', description:'Lead cross-functional teams to deliver complex software projects on time.', posted_date:'2024-08-10' },
]

const BENEFITS = [
  { icon: 'fa-graduation-cap', title: 'Learning & Development', desc: 'Continuous learning opportunities and professional development budget.' },
  { icon: 'fa-heart', title: 'Health Insurance', desc: 'Comprehensive medical cover for you and your family.' },
  { icon: 'fa-home', title: 'Remote Work', desc: 'Flexible work arrangements and remote-first culture.' },
  { icon: 'fa-hand-holding-usd', title: 'Competitive Salary', desc: 'Market-leading compensation with regular reviews.' },
]

// department can come back from the API as either a plain string (demo data)
// or a nested object { id, name, slug, color_hex } (real API serializer).
// This normalizes both shapes so we always work with a string.
function getDepartmentName(department) {
  if (!department) return null
  if (typeof department === 'object') return department.name
  return department
}

export default function CareersPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    careersAPI.getJobs()
      .then(r => {
        setJobs(r.data.results || r.data)
        setLoading(false)
      })
      .catch(() => {
        setJobs(DEMO_JOBS)
        setLoading(false)
      })
  }, [])

  const data = jobs.length ? jobs : DEMO_JOBS
  const filtered = filter === 'all'
    ? data
    : data.filter(j => getDepartmentName(j.department)?.toLowerCase() === filter)
  const departments = ['all', ...new Set(data.map(j => getDepartmentName(j.department)?.toLowerCase()).filter(Boolean))]

  return (
    <div>

      {/* ── Page Banner ── */}
      <div className="banner-area" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80)' }}>
        <div className="banner-text">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="banner-heading">
                  <h1 className="banner-title">Join Our Team</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Careers</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Benefits ── */}
      <section className="section-padding">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="section-title">Why Join Us</h2>
              <h3 className="section-sub-title">Benefits & Perks</h3>
            </div>
          </div>

          <div className="row">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="col-lg-3 col-md-6 mb-4">
                <div className="ts-service-box text-center">
                  <span className="ts-service-icon">
                    <i className={`fas ${benefit.icon}`}></i>
                  </span>
                  <div className="ts-service-box-content">
                    <h3 className="service-box-title">{benefit.title}</h3>
                    <p>{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job Listings ── */}
      <section className="solid-bg section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="column-title">Open Positions</h3>

              <div className="shuffle-btn-group" style={{ marginBottom: '2rem' }}>
                {departments.map(dept => (
                  <label key={dept} className={dept === filter ? 'active' : ''}>
                    <input 
                      type="radio" 
                      name="job-filter" 
                      value={dept} 
                      checked={dept === filter}
                      onChange={() => setFilter(dept)}
                    />
                    {dept === 'all' ? 'All Departments' : dept.charAt(0).toUpperCase() + dept.slice(1)}
                  </label>
                ))}
              </div>

              {loading ? (
                <p>Loading jobs...</p>
              ) : (
                filtered.map(job => (
                  <div key={job.id} className="job-item" style={{ 
                    background: '#fff', 
                    padding: '1.5rem', 
                    marginBottom: '1rem', 
                    borderRadius: '5px',
                    borderLeft: '3px solid #ffb600'
                  }}>
                    <div className="row align-items-center">
                      <div className="col-lg-4">
                        <h4 style={{ margin: 0 }}>{job.title}</h4>
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>{getDepartmentName(job.department)}</span>
                      </div>
                      <div className="col-lg-3">
                        <i className="fas fa-map-marker-alt" style={{ color: '#ffb600' }}></i> {job.location}
                      </div>
                      <div className="col-lg-2">
                        <span className="badge" style={{ background: '#ffb600', padding: '0.3rem 0.8rem', borderRadius: '20px', color: '#fff' }}>
                          {job.type}
                        </span>
                      </div>
                      <div className="col-lg-3 text-lg-right">
                        <Link to="/contact" className="btn btn-primary btn-sm">Apply Now</Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}