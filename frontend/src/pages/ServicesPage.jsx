// ─────────────────────────────────────────────
// ServicesPage.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { servicesAPI } from '../services/api'
import { ServiceCard } from '../components/Cards'

const DEMO_SERVICES = [
  { id:1, title:'Web Development', icon_class:'bi-globe2', short_description:'Enterprise-grade web apps using React, Next.js, Vue, and Django REST Framework.', technologies:[], tier:'professional' },
  { id:2, title:'Mobile Applications', icon_class:'bi-phone', short_description:'Cross-platform iOS & Android apps with React Native and Flutter.', technologies:[], tier:'professional' },
  { id:3, title:'Cloud Architecture', icon_class:'bi-cloud-arrow-up', short_description:'AWS, Azure & GCP design, migration, cost optimisation, and 24/7 management.', technologies:[], tier:'enterprise' },
  { id:4, title:'AI & Machine Learning', icon_class:'bi-robot', short_description:'Custom ML pipelines, NLP systems, computer vision, and intelligent automation.', technologies:[], tier:'enterprise' },
  { id:5, title:'Cybersecurity', icon_class:'bi-shield-lock', short_description:'Penetration testing, vulnerability assessments, SIEM, and SOC-as-a-service.', technologies:[], tier:'enterprise' },
  { id:6, title:'IT Consulting', icon_class:'bi-lightbulb', short_description:'Digital transformation strategy, technology roadmaps, and CTO advisory.', technologies:[], tier:'starter' },
  { id:7, title:'Data & Analytics', icon_class:'bi-bar-chart', short_description:'BI dashboards, data warehousing, ETL pipelines, and predictive analytics.', technologies:[], tier:'professional' },
  { id:8, title:'DevOps & CI/CD', icon_class:'bi-infinity', short_description:'Docker, Kubernetes, GitHub Actions, and infrastructure as code.', technologies:[], tier:'professional' },
  { id:9, title:'ERP & CRM Solutions', icon_class:'bi-diagram-3', short_description:'Custom Odoo, Salesforce implementations, and bespoke ERP systems.', technologies:[], tier:'enterprise' },
]

export default function ServicesPage() {
  const [services, setServices] = useState([])
  
  useEffect(() => {
    servicesAPI.getAll()
      .then(r => setServices(r.data.results || r.data))
      .catch(() => setServices(DEMO_SERVICES))
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

          <div className="row">
            {data.map(s => (
              <div key={s.id} className="col-lg-4 col-md-6 mb-4">
                <ServiceCard service={s} />
              </div>
            ))}
          </div>
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