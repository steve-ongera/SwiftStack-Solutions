import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import { ServiceCard, TestimonialCard, StatsBanner } from '../components/Cards'
import { servicesAPI, testimonialsAPI, statsAPI, portfolioAPI } from '../services/api'

/* ── Demo data (used when API is unavailable) ── */

const DEMO_SERVICES = [
  { id:1, title:'Web Development',      icon_class:'bi-globe2',        short_description:'Enterprise web applications built with React, Vue, and Django for scale and resilience.',    technologies:[] },
  { id:2, title:'Mobile Applications',  icon_class:'bi-phone',         short_description:'Native-quality iOS & Android apps using React Native and Flutter — delivered on schedule.',  technologies:[] },
  { id:3, title:'Cloud Solutions',      icon_class:'bi-cloud-arrow-up',short_description:'AWS, Azure & GCP architecture, cost optimisation, migration, and managed operations.',       technologies:[] },
  { id:4, title:'AI & Machine Learning',icon_class:'bi-robot',         short_description:'Custom ML models, NLP pipelines, and intelligent process-automation for your industry.',     technologies:[] },
  { id:5, title:'Cybersecurity',        icon_class:'bi-shield-lock',   short_description:'Vulnerability assessments, penetration testing, compliance audits, and 24/7 SOC services.',  technologies:[] },
  { id:6, title:'IT Consulting',        icon_class:'bi-lightbulb',     short_description:'Digital strategy, technology roadmaps, vendor selection, and digital transformation advisory.',technologies:[] },
]

const DEMO_PROJECTS = [
  { id:1, title:'FinTrack Pro', client_industry:'FinTech',    short_description:'Real-time banking dashboard and analytics platform for a Kenyan microfinance institution serving 200k users.',   cover_image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75', technologies:[] },
  { id:2, title:'AgriConnect',  client_industry:'AgriTech',   short_description:'End-to-end IoT platform connecting 10,000+ smallholder farmers to commodity markets and weather data.',cover_image:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&q=75', technologies:[] },
  { id:3, title:'HealthHub',    client_industry:'HealthTech', short_description:'Telemedicine, EHR, and appointment management system deployed across a network of 5 regional hospitals.',      cover_image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=75', technologies:[] },
]

const WHY_POINTS = [
  { icon:'bi-award',          title:'ISO 27001 Certified',  desc:'Enterprise-grade information security standards built into every engagement.' },
  { icon:'bi-clock-history',  title:'97% On-Time Delivery', desc:'Rigorous project governance ensures milestones are hit, consistently.' },
  { icon:'bi-headset',        title:'24 / 7 Support',       desc:'Round-the-clock technical assistance — from our engineers, not a chatbot.' },
  { icon:'bi-graph-up-arrow', title:'Scalable Architecture',desc:'Systems designed to grow 10x with your business without a rewrite.' },
]

/* ── Component ── */

export default function HomePage() {
  const [services,     setServices]     = useState([])
  const [projects,     setProjects]     = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [stats,        setStats]        = useState([])

  useEffect(() => {
    Promise.allSettled([
      servicesAPI.getAll({ is_featured: true }),
      portfolioAPI.getFeatured(),
      testimonialsAPI.getFeatured(),
      statsAPI.getAll(),
    ]).then(([svcs, projs, tests, sts]) => {
      setServices(     svcs.status  === 'fulfilled' ? (svcs.value.data.results  || svcs.value.data)  : DEMO_SERVICES)
      setProjects(     projs.status === 'fulfilled' ? projs.value.data  : DEMO_PROJECTS)
      setTestimonials( tests.status === 'fulfilled' ? tests.value.data  : [])
      setStats(        sts.status   === 'fulfilled' ? (sts.value.data.results || sts.value.data) : [])
    })
  }, [])

  const displayServices = services.length ? services : DEMO_SERVICES
  const displayProjects = projects.length ? projects : DEMO_PROJECTS

  return (
    <main>

      {/* ── Hero Carousel ── */}
      <HeroSection />

      {/* ── Stats Banner ── */}
      <StatsBanner stats={stats} />

      {/* ── Services ── */}
      <section
        className="section-padding bg-off-white"
        aria-labelledby="services-heading"
      >
        <div className="container">
          <header className="section-header">
            <span className="section-label">What We Do</span>
            <h2 className="section-title" id="services-heading">
              Comprehensive Technology Solutions
            </h2>
            <p className="section-subtitle">
              From ideation to deployment, we deliver end-to-end digital solutions tailored
              to your business goals and built for the long term.
            </p>
            <div className="gold-divider"></div>
          </header>

          <div className="grid-3">
            {displayServices.slice(0, 6).map((s, i) => (
              <div
                key={s.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <ServiceCard service={s} />
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:'3rem' }}>
            <Link to="/services" className="btn-primary-gov btn-lg">
              <i className="bi bi-arrow-right-circle" aria-hidden="true"></i>
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="section-padding" aria-labelledby="projects-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-label">Our Work</span>
            <h2 className="section-title" id="projects-heading">Featured Projects</h2>
            <p className="section-subtitle">
              Real solutions. Real impact. See how we've transformed businesses across Africa
              and accelerated their digital journeys.
            </p>
            <div className="gold-divider"></div>
          </header>

          <div className="grid-3">
            {displayProjects.map((p, i) => (
              <article
                key={p.id}
                className="project-card-home animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="project-card-img"
                  style={{ backgroundImage:`url(${p.cover_image})` }}
                  role="img"
                  aria-label={`${p.title} project cover`}
                >
                  <div className="project-industry-badge">{p.client_industry}</div>
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">{p.title}</h3>
                  <p className="project-card-desc">{p.short_description}</p>
                  <Link to="/portfolio" className="project-card-link">
                    View Details
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:'3rem' }}>
            <Link to="/portfolio" className="btn-outline-gov btn-lg">
              <i className="bi bi-grid-3x3-gap" aria-hidden="true"></i>
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why SwiftStack ── */}
      <section
        className="section-padding bg-off-white"
        aria-labelledby="why-heading"
        style={{ overflow:'hidden' }}
      >
        <div className="container">
          <div className="why-us-grid">

            {/* Content side */}
            <div className="animate-slide-in">
              <span className="section-label">Why SwiftStack</span>
              <h2 className="section-title" id="why-heading">
                Built for Impact,<br />Engineered for Scale
              </h2>
              <div className="gold-divider"></div>
              <p className="section-subtitle">
                We combine deep technical expertise with industry knowledge to deliver solutions
                that don't just work — they drive measurable, lasting business outcomes.
              </p>

              <div className="why-us-points">
                {WHY_POINTS.map(({ icon, title, desc }) => (
                  <div key={title} className="why-point">
                    <div className="why-point-icon" aria-hidden="true">
                      <i className={`bi ${icon}`}></i>
                    </div>
                    <div>
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginTop:'2rem' }}>
                <Link to="/about" className="btn-primary-gov">
                  <i className="bi bi-building" aria-hidden="true"></i>
                  Learn About Us
                </Link>
                <Link to="/contact" className="btn-outline-gov">
                  <i className="bi bi-chat-dots" aria-hidden="true"></i>
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* Image side */}
            <div className="why-us-image animate-slide-right">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="SwiftStack team collaborating on a project"
                loading="lazy"
              />
              <div className="why-us-badge" aria-label="Award: Best Tech Firm East Africa 2024">
                <i className="bi bi-trophy-fill" aria-hidden="true"></i>
                <div>
                  <strong>Best Tech Firm</strong>
                  <span>East Africa 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="section-padding" aria-labelledby="testimonials-heading">
          <div className="container">
            <header className="section-header centered">
              <span className="section-label">Client Testimonials</span>
              <h2 className="section-title" id="testimonials-heading">
                What Our Clients Say
              </h2>
              <div className="gold-divider center"></div>
            </header>
            <div className="grid-3">
              {testimonials.slice(0, 3).map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trusted Partners strip ── */}
      <section className="section-padding-sm bg-off-white" aria-label="Trusted by">
        <div className="container">
          <p className="trusted-label">
            Trusted by Leading Organisations Across Africa
          </p>
          <div className="trusted-logos">
            {['KCB Group','Safaricom','KEMRI','KenGen','KTDA','Nation Media'].map((name) => (
              <span key={name} className="trusted-logo-name">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner" aria-labelledby="cta-heading">
        <div className="container cta-content">
          <div>
            <h2 id="cta-heading">Ready to Build Something Great?</h2>
            <p>Let's discuss your project and explore how SwiftStack Solutions can help you scale.</p>
          </div>
          <div className="cta-actions">
            <Link to="/contact" className="btn-gold btn-lg">
              <i className="bi bi-rocket-takeoff" aria-hidden="true"></i>
              Start Your Project
            </Link>
            <Link to="/careers" className="btn-outline-white btn-lg">
              <i className="bi bi-person-plus" aria-hidden="true"></i>
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}