import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import { ServiceCard } from '../components/Cards'
import { TestimonialCard } from '../components/Cards'
import { StatsBanner } from '../components/Cards'
import { servicesAPI, testimonialsAPI, statsAPI, portfolioAPI } from '../services/api'

// Fallback data for demo
const DEMO_SERVICES = [
  { id:1, title:'Web Development', icon_class:'bi-globe2', short_description:'Enterprise web applications with React, Vue, and Django.', technologies:[] },
  { id:2, title:'Mobile Apps', icon_class:'bi-phone', short_description:'Cross-platform iOS & Android apps using React Native.', technologies:[] },
  { id:3, title:'Cloud Solutions', icon_class:'bi-cloud-arrow-up', short_description:'AWS, Azure & GCP architecture, migration, and management.', technologies:[] },
  { id:4, title:'AI & Machine Learning', icon_class:'bi-robot', short_description:'Custom ML models, NLP, and intelligent automation systems.', technologies:[] },
  { id:5, title:'Cybersecurity', icon_class:'bi-shield-lock', short_description:'Vulnerability assessments, pen testing, and SOC services.', technologies:[] },
  { id:6, title:'IT Consulting', icon_class:'bi-lightbulb', short_description:'Digital strategy, technology roadmaps, and transformation.', technologies:[] },
]

const DEMO_PROJECTS = [
  { id:1, title:'FinTrack Pro', client_industry:'Finance', short_description:'Real-time banking dashboard for a Kenyan microfinance institution.', cover_image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70', technologies:[] },
  { id:2, title:'AgriConnect', client_industry:'Agriculture', short_description:'IoT platform connecting 10,000 smallholder farmers to markets.', cover_image:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=70', technologies:[] },
  { id:3, title:'HealthHub', client_industry:'Healthcare', short_description:'Telemedicine and EHR system deployed in 5 hospitals.', cover_image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70', technologies:[] },
]

export default function HomePage() {
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [stats, setStats] = useState([])

  useEffect(() => {
    Promise.allSettled([
      servicesAPI.getAll({ is_featured: true }),
      portfolioAPI.getFeatured(),
      testimonialsAPI.getFeatured(),
      statsAPI.getAll(),
    ]).then(([svcs, projs, tests, sts]) => {
      setServices(svcs.status === 'fulfilled' ? svcs.value.data.results || svcs.value.data : DEMO_SERVICES)
      setProjects(projs.status === 'fulfilled' ? projs.value.data : DEMO_PROJECTS)
      setTestimonials(tests.status === 'fulfilled' ? tests.value.data : [])
      setStats(sts.status === 'fulfilled' ? sts.value.data.results || sts.value.data : [])
    })
  }, [])

  const displayServices = services.length ? services : DEMO_SERVICES
  const displayProjects = projects.length ? projects : DEMO_PROJECTS

  return (
    <div>
      <HeroSection />

      {/* Stats Banner */}
      <StatsBanner stats={stats} />

      {/* Services Section */}
      <section className="section-padding" style={{ background: 'var(--color-off-white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Comprehensive Technology Solutions</h2>
            <p className="section-subtitle">
              From ideation to deployment, we deliver end-to-end digital solutions tailored to your business goals.
            </p>
            <div className="gold-divider"></div>
          </div>
          <div className="grid-3">
            {displayServices.slice(0, 6).map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn-primary-gov">
              <i className="bi bi-arrow-right-circle"></i>
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Work</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Real solutions. Real impact. See how we've transformed businesses across Africa.
            </p>
            <div className="gold-divider"></div>
          </div>
          <div className="grid-3">
            {displayProjects.map(p => (
              <div key={p.id} className="project-card-home">
                <div
                  className="project-card-img"
                  style={{ backgroundImage: `url(${p.cover_image})` }}
                >
                  <div className="project-industry-badge">{p.client_industry}</div>
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">{p.title}</h3>
                  <p className="project-card-desc">{p.short_description}</p>
                  <Link to="/portfolio" className="project-card-link">
                    View Details <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/portfolio" className="btn-outline-gov">
              <i className="bi bi-grid-3x3-gap"></i>
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding why-us-section">
        <div className="container">
          <div className="why-us-grid">
            <div className="why-us-content">
              <span className="section-label">Why SwiftStack</span>
              <h2 className="section-title">Built for Impact, Engineered for Scale</h2>
              <div className="gold-divider"></div>
              <p className="section-subtitle">
                We combine deep technical expertise with industry knowledge to deliver solutions that don't just work—they drive measurable business outcomes.
              </p>
              <div className="why-us-points">
                {[
                  ['bi-award', 'ISO 27001 Certified', 'Enterprise-grade security standards'],
                  ['bi-clock-history', 'On-Time Delivery', '97% of projects delivered on schedule'],
                  ['bi-headset', '24/7 Support', 'Round-the-clock technical assistance'],
                  ['bi-graph-up-arrow', 'Scalable Architecture', 'Built to grow with your business'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="why-point">
                    <div className="why-point-icon"><i className={`bi ${icon}`}></i></div>
                    <div>
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary-gov" style={{ marginTop: '1.5rem' }}>
                <i className="bi bi-building"></i>
                Learn About Us
              </Link>
            </div>
            <div className="why-us-image">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
                alt="SwiftStack team collaboration"
              />
              <div className="why-us-badge">
                <i className="bi bi-trophy-fill"></i>
                <div>
                  <strong>Best Tech Firm</strong>
                  <span>East Africa 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--color-off-white)' }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-label">Testimonials</span>
              <h2 className="section-title">What Our Clients Say</h2>
              <div className="gold-divider center"></div>
            </div>
            <div className="grid-3">
              {testimonials.slice(0, 3).map(t => <TestimonialCard key={t.id} testimonial={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-content">
          <div>
            <h2>Ready to Build Something Great?</h2>
            <p>Let's discuss your project and explore how SwiftStack Solutions can help.</p>
          </div>
          <div className="cta-actions">
            <Link to="/contact" className="btn-gold">
              <i className="bi bi-rocket-takeoff"></i>
              Start Your Project
            </Link>
            <Link to="/careers" className="btn-outline-white">
              <i className="bi bi-person-plus"></i>
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .section-header { margin-bottom: 3rem; }
        .text-center { text-align: center; }
        .text-center .section-subtitle { margin: 0 auto; }
        .project-card-home {
          border-radius: var(--radius-md); overflow: hidden;
          border: 1px solid var(--color-light-gray);
          transition: all var(--transition-base);
        }
        .project-card-home:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
        .project-card-img {
          height: 200px; background-size: cover; background-position: center;
          position: relative;
        }
        .project-industry-badge {
          position: absolute; top: 1rem; left: 1rem;
          background: var(--color-gold); color: var(--color-navy-dark);
          padding: 0.2rem 0.7rem; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .project-card-body { padding: 1.5rem; background: var(--color-white); }
        .project-card-title { font-size: 1.05rem; margin-bottom: 0.5rem; }
        .project-card-desc { font-size: 0.875rem; color: var(--color-dark-gray); line-height: 1.6; margin-bottom: 1rem; }
        .project-card-link {
          color: var(--color-navy); font-size: 0.875rem; font-weight: 600;
          text-decoration: none; display: flex; align-items: center; gap: 0.35rem;
        }
        .project-card-link:hover { color: var(--color-gold); }
        .why-us-section { background: var(--color-white); }
        .why-us-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .why-us-points { display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1.75rem; }
        .why-point { display: flex; align-items: flex-start; gap: 1rem; }
        .why-point-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          background: rgba(26,60,110,0.08); border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; color: var(--color-navy);
        }
        .why-point strong { display: block; font-size: 0.95rem; color: var(--color-navy); margin-bottom: 2px; }
        .why-point p { font-size: 0.85rem; color: var(--color-mid-gray); margin: 0; }
        .why-us-image { position: relative; border-radius: var(--radius-lg); overflow: hidden; }
        .why-us-image img { width: 100%; height: 480px; object-fit: cover; display: block; border-radius: var(--radius-lg); }
        .why-us-badge {
          position: absolute; bottom: 2rem; left: 2rem;
          background: var(--color-navy-dark); color: var(--color-white);
          padding: 1rem 1.25rem; border-radius: var(--radius-md);
          display: flex; align-items: center; gap: 0.75rem;
          border-left: 4px solid var(--color-gold);
          box-shadow: var(--shadow-lg);
        }
        .why-us-badge i { font-size: 1.8rem; color: var(--color-gold); }
        .why-us-badge strong { display: block; font-size: 0.9rem; }
        .why-us-badge span { font-size: 0.75rem; color: rgba(255,255,255,0.6); }
        .cta-banner {
          background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
          padding: 5rem 0;
          border-top: 4px solid var(--color-gold);
        }
        .cta-content {
          display: flex; align-items: center; justify-content: space-between;
          gap: 2rem; flex-wrap: wrap;
        }
        .cta-banner h2 { font-family: var(--font-heading); color: var(--color-white); font-size: 1.9rem; margin-bottom: 0.5rem; }
        .cta-banner p { color: rgba(255,255,255,0.7); font-size: 1rem; }
        .cta-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        @media (max-width: 900px) {
          .why-us-grid { grid-template-columns: 1fr; }
          .why-us-image { display: none; }
          .cta-content { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  )
}