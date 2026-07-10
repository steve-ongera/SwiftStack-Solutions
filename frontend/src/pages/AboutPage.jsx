// ─────────────────────────────────────────────
// AboutPage.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { teamAPI } from '../services/api'

const DEMO_TEAM = [
  { id:1, full_name:'Dr. Amara Okonkwo', job_title:'Chief Executive Officer', is_leadership:true, bio:'15+ years in enterprise software.', photo:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { id:2, full_name:'Fatima Al-Hassan', job_title:'Chief Technology Officer', is_leadership:true, bio:'Former Google engineer, AI specialist.', photo:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
  { id:3, full_name:'James Mwangi', job_title:'Head of Engineering', is_leadership:true, bio:'AWS certified solutions architect.', photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { id:4, full_name:'Amina Diallo', job_title:'Head of Design', is_leadership:true, bio:'UX leader with 10 years experience.', photo:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
]

// ── SEO Data ──
const SEO = {
  title: 'About Nairobi 1 | Leading Technology Company in Kenya',
  description: 'Nairobi 1 is a premier technology company delivering innovative digital solutions across Africa. Meet our leadership team and learn about our mission.',
  keywords: 'Nairobi 1, technology company Kenya, digital transformation Africa, software development Nairobi, IT solutions Kenya',
  author: 'Nairobi 1',
  url: 'https://nairobi1.com/about',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  type: 'website'
}

export default function AboutPage() {
  const [team, setTeam] = useState([])

  useEffect(() => {
    teamAPI.getLeadership()
      .then(r => setTeam(r.data.results || r.data))
      .catch(() => setTeam(DEMO_TEAM))
  }, [])

  const displayTeam = team.length ? team : DEMO_TEAM

  // ── Structured Data (JSON-LD) ──
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Nairobi 1",
    "description": SEO.description,
    "url": SEO.url,
    "about": {
      "@type": "Organization",
      "name": "Nairobi 1",
      "description": "Technology company providing digital solutions across Africa",
      "foundingDate": "2016",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "Kenya"
      }
    }
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{SEO.title}</title>
        <meta name="title" content={SEO.title} />
        <meta name="description" content={SEO.description} />
        <meta name="keywords" content={SEO.keywords} />
        <meta name="author" content={SEO.author} />
        <link rel="canonical" href={SEO.url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={SEO.type} />
        <meta property="og:url" content={SEO.url} />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:image" content={SEO.image} />
        <meta property="og:site_name" content="Nairobi 1" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SEO.url} />
        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
        <meta name="twitter:image" content={SEO.image} />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div>

        {/* ── Page Banner ── */}
        <div className="banner-area" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80)' }}>
          <div className="banner-text">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="banner-heading">
                    <h1 className="banner-title">About Us</h1>
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb justify-content-center">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">About Us</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── About Content ── */}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="into-title">Who We Are</h2>
                <h3 className="into-sub-title">Technology Partners You Can Trust</h3>
                <p>
                  Founded in 2016, Nairobi 1 has grown from a 3-person startup in Nairobi's Silicon Savannah
                  into a 45-strong team of world-class engineers, designers, and strategists.
                </p>
                <p>
                  We partner with startups, SMEs, and government agencies to design, build, and scale digital products
                  that create real impact. Our Pan-African perspective combined with global best practices makes us
                  uniquely positioned to understand and solve African business challenges.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-arrow">
                      <li>Nairobi, Kenya (HQ)</li>
                      <li>Founded 2016</li>
                      <li>Serving 12 Countries</li>
                      <li>ISO 27001 Certified</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-arrow">
                      <li>45+ Team Members</li>
                      <li>150+ Projects Delivered</li>
                      <li>99% Client Satisfaction</li>
                      <li>24/7 Support</li>
                    </ul>
                  </div>
                </div>
                <Link to="/contact" className="btn btn-primary mt-3">Get In Touch</Link>
              </div>
              <div className="col-lg-6 mt-4 mt-lg-0">
                <img 
                  src="https://static.wixstatic.com/media/3288de_6a26461c4db74c4c8cfef10bf07b8ece~mv2.png/v1/fill/w_1694,h_1194,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/Africa%20parts.png" 
                  alt="Nairobi 1 team" 
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="solid-bg section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ts-service-box">
                  <span className="ts-service-icon">
                    <i className="fas fa-bullseye"></i>
                  </span>
                  <div className="ts-service-box-content">
                    <h3 className="service-box-title">Our Mission</h3>
                    <p>
                      To democratise access to world-class technology by building affordable, scalable, and
                      impactful digital solutions for African businesses and beyond.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ts-service-box">
                  <span className="ts-service-icon">
                    <i className="fas fa-eye"></i>
                  </span>
                  <div className="ts-service-box-content">
                    <h3 className="service-box-title">Our Vision</h3>
                    <p>
                      To be Africa's most trusted technology partner—driving digital transformation and
                      economic growth through innovation and engineering excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Leadership Team ── */}
        <section className="section-padding">
          <div className="container">
            <div className="row text-center">
              <div className="col-12">
                <h2 className="section-title">Our People</h2>
                <h3 className="section-sub-title">Leadership Team</h3>
              </div>
            </div>

            <div className="row">
              {displayTeam.map(m => (
                <div key={m.id} className="col-lg-3 col-md-6 mb-4">
                  <div className="ts-team-wrapper">
                    <div className="ts-team-img" style={{ 
                      position: 'relative', 
                      overflow: 'hidden',
                      width: '100%',
                      aspectRatio: '3/4',
                      background: '#1a3c6e'
                    }}>
                      {m.photo ? (
                        <img 
                          loading="lazy" 
                          className="img-fluid" 
                          src={m.photo} 
                          alt={m.full_name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      ) : (
                        <div style={{ 
                          height: '100%', 
                          width: '100%',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: '#ffb600', 
                          fontSize: '5rem', 
                          fontWeight: 700 
                        }}>
                          {m.full_name[0]}
                        </div>
                      )}
                    </div>
                    <div className="ts-team-content">
                      <h3 className="ts-name">{m.full_name}</h3>
                      <p className="ts-designation">{m.job_title}</p>
                      <p className="ts-bio" style={{ fontSize: '0.85rem' }}>{m.bio}</p>
                      <div className="team-social-icons">
                        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}