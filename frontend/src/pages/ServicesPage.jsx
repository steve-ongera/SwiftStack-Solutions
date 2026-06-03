// ─────────────────────────────────────────────
// ServicesPage.jsx
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
 
export default function  ServicesPage() {
  const [services, setServices] = useState([])
  useEffect(() => {
    servicesAPI.getAll().then(r => setServices(r.data.results || r.data)).catch(() => setServices(DEMO_SERVICES))
  }, [])
  const data = services.length ? services : DEMO_SERVICES
 
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <span className="section-label">What We Offer</span>
          <h1>Our Services</h1>
          <p>End-to-end technology solutions engineered for scale and impact.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div className="grid-3">
            {data.map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>
      {/* Process */}
      <section className="section-padding" style={{ background:'var(--color-navy)', color:'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span className="section-label">How We Work</span>
            <h2 style={{ color:'var(--color-white)', fontFamily:'var(--font-heading)', fontSize:'2rem', fontWeight:700 }}>Our Delivery Process</h2>
            <div className="gold-divider center"></div>
          </div>
          <div className="process-steps">
            {[['bi-search','Discovery','Understanding your goals, users, and constraints.'],
              ['bi-pencil-square','Design','Wireframing, prototyping, and architecture planning.'],
              ['bi-code-slash','Development','Agile sprints, code reviews, and continuous integration.'],
              ['bi-rocket-takeoff','Launch','Deployment, QA, performance testing, and go-live support.'],
              ['bi-arrow-repeat','Support','Ongoing maintenance, monitoring, and feature evolution.'],
            ].map(([icon, title, desc], i) => (
              <div key={title} className="process-step">
                <div className="process-step-num">{i+1}</div>
                <div className="process-step-icon"><i className={`bi ${icon}`}></i></div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .process-steps { display:flex; gap:1rem; }
        .process-step { flex:1; text-align:center; padding:1.5rem 1rem; position:relative; }
        .process-step::after { content:'→'; position:absolute; right:-0.5rem; top:2.5rem; color:var(--color-gold); font-size:1.2rem; }
        .process-step:last-child::after { display:none; }
        .process-step-num { font-family:var(--font-heading); font-size:0.7rem; font-weight:900; color:var(--color-gold); letter-spacing:1px; margin-bottom:0.5rem; }
        .process-step-icon { font-size:2rem; color:var(--color-gold); margin-bottom:0.75rem; }
        .process-step h4 { color:var(--color-white); font-size:0.95rem; margin-bottom:0.4rem; }
        .process-step p { color:rgba(255,255,255,0.6); font-size:0.8rem; line-height:1.5; }
        @media(max-width:700px){ .process-steps{ flex-direction:column; } .process-step::after{ display:none; } }
      `}</style>
    </div>
  )
}
 
 