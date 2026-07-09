// ─────────────────────────────────────────────
// HomePage.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import { ServiceCard, TestimonialCard, StatsBanner } from '../components/Cards'
import { servicesAPI, testimonialsAPI, statsAPI, portfolioAPI } from '../services/api'

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

      {/* ── Call to Action Box ── */}
      <section className="call-to-action-box no-padding">
        <div className="container">
          <div className="action-style-box">
            <div className="row align-items-center">
              <div className="col-md-8 text-center text-md-left">
                <div className="call-to-action-text">
                  <h3 className="action-title">We understand your needs on technology</h3>
                </div>
              </div>
              <div className="col-md-4 text-center text-md-right mt-3 mt-md-0">
                <div className="call-to-action-btn">
                  <Link className="btn btn-dark" to="/contact">Request Quote</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <StatsBanner stats={stats} />

      {/* ── About / Features Section ── */}
      <section id="ts-features" className="ts-features section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="ts-intro">
                <h2 className="into-title">About Us</h2>
                <h3 className="into-sub-title">We deliver landmark projects</h3>
                <p>
                  Nairobi 1 builds enterprise-grade software, cloud platforms, and AI systems
                  that power the next generation of African businesses. Founded in 2016, we've grown from
                  a 3-person startup to a 45-strong team of world-class engineers.
                </p>
              </div>

              <div className="gap-20"></div>

              <div className="row">
                <div className="col-md-6">
                  <div className="ts-service-box">
                    <span className="ts-service-icon">
                      <i className="fas fa-trophy"></i>
                    </span>
                    <div className="ts-service-box-content">
                      <h3 className="service-box-title">We've Repution for Excellence</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ts-service-box">
                    <span className="ts-service-icon">
                      <i className="fas fa-sliders-h"></i>
                    </span>
                    <div className="ts-service-box-content">
                      <h3 className="service-box-title">We Build Partnerships</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="ts-service-box">
                    <span className="ts-service-icon">
                      <i className="fas fa-thumbs-up"></i>
                    </span>
                    <div className="ts-service-box-content">
                      <h3 className="service-box-title">Guided by Commitment</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ts-service-box">
                    <span className="ts-service-icon">
                      <i className="fas fa-users"></i>
                    </span>
                    <div className="ts-service-box-content">
                      <h3 className="service-box-title">A Team of Professionals</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              <h3 className="into-sub-title">Our Values</h3>
              <p>
                We combine deep technical expertise with industry knowledge to deliver solutions
                that don't just work — they drive measurable, lasting business outcomes.
              </p>

              <div className="accordion accordion-group" id="our-values-accordion">
                <div className="card">
                  <div className="card-header p-0 bg-transparent" id="headingOne">
                    <h2 className="mb-0">
                      <button className="btn btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Innovation
                      </button>
                    </h2>
                  </div>
                  <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#our-values-accordion">
                    <div className="card-body">
                      We embrace cutting-edge technologies and creative problem-solving to deliver future-proof solutions that keep you ahead of the curve.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header p-0 bg-transparent" id="headingTwo">
                    <h2 className="mb-0">
                      <button className="btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Integrity
                      </button>
                    </h2>
                  </div>
                  <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#our-values-accordion">
                    <div className="card-body">
                      Transparency and honesty in every client engagement, from discovery to delivery and beyond. We do what we say we'll do.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header p-0 bg-transparent" id="headingThree">
                    <h2 className="mb-0">
                      <button className="btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Excellence
                      </button>
                    </h2>
                  </div>
                  <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#our-values-accordion">
                    <div className="card-body">
                      We hold ourselves to the highest standards, delivering quality that exceeds expectations and solutions that scale with your business.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section id="ts-service-area" className="ts-service-area pb-0 section-padding">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="section-title">We Are Specialists In</h2>
              <h3 className="section-sub-title">What We Do</h3>
            </div>
          </div>

          <div className="row">
            {displayServices.slice(0, 6).map((s, i) => (
              <div key={s.id} className="col-lg-4 col-md-6">
                <ServiceCard service={s} />
              </div>
            ))}
          </div>

          <div className="general-btn text-center mt-4">
            <Link className="btn btn-primary" to="/services">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ── Projects Section ── */}
      <section id="project-area" className="project-area solid-bg section-padding">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-12">
              <h2 className="section-title">Work of Excellence</h2>
              <h3 className="section-sub-title">Recent Projects</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="shuffle-btn-group">
                <label className="active" htmlFor="all">
                  <input type="radio" name="shuffle-filter" id="all" value="all" defaultChecked />Show All
                </label>
                {['Commercial', 'Education', 'Government', 'Infrastructure', 'Residential', 'Healthcare'].map(cat => (
                  <label key={cat} htmlFor={cat.toLowerCase()}>
                    <input type="radio" name="shuffle-filter" id={cat.toLowerCase()} value={cat.toLowerCase()} />{cat}
                  </label>
                ))}
              </div>

              <div className="row shuffle-wrapper">
                {displayProjects.map((p, i) => (
                  <div key={p.id} className="col-lg-4 col-md-6 shuffle-item" data-groups='["all"]'>
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12">
              <div className="general-btn text-center">
                <Link className="btn btn-primary" to="/portfolio">View All Projects</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials & Clients ── */}
      <section className="content section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="column-title">Testimonials</h3>
              <div id="testimonial-slide" className="testimonial-slide">
                {testimonials.length > 0 ? (
                  testimonials.slice(0, 3).map((t) => (
                    <TestimonialCard key={t.id} testimonial={t} />
                  ))
                ) : (
                  <>
                    <div className="item">
                      <div className="quote-item">
                        <span className="quote-text">
                          Nairobi 1 transformed our entire digital infrastructure. Their team delivered
                          a scalable solution that has grown with our business.
                        </span>
                        <div className="quote-item-footer">
                          <div className="quote-item-info">
                            <h3 className="quote-author">John Kamau</h3>
                            <span className="quote-subtext">CEO, TechVentures</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <h3 className="column-title">Trusted Partners</h3>
              <div className="row all-clients">
                {['KCB Group', 'Safaricom', 'KEMRI', 'KenGen', 'KTDA', 'Nation Media'].map((name, i) => (
                  <div key={name} className="col-sm-4 col-6">
                    <figure className="clients-logo">
                      <a href="#"><span style={{ fontWeight: 700, fontSize: '14px', color: '#333' }}>{name}</span></a>
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subscribe / Newsletter ── */}
      <section className="subscribe no-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="subscribe-call-to-acton">
                <h3>Can We Help?</h3>
                <h4>(+254) 700-000-000</h4>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="ts-newsletter row align-items-center">
                <div className="col-md-5 newsletter-introtext">
                  <h4 className="text-white mb-0">Newsletter Sign-up</h4>
                  <p className="text-white">Latest updates and news</p>
                </div>
                <div className="col-md-7 newsletter-form">
                  <form action="#" method="post">
                    <div className="form-group">
                      <label htmlFor="newsletter-email" className="content-hidden">Newsletter Email</label>
                      <input type="email" name="email" id="newsletter-email" className="form-control form-control-lg" placeholder="Your email and hit enter" autoComplete="off" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── News / Blog Section ── */}
      <section id="news" className="news section-padding">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="section-title">Latest Insights</h2>
              <h3 className="section-sub-title">From Our Blog</h3>
            </div>
          </div>

          <div className="row">
            {[
              { title: 'We Just Completed $17.6 Million Digital Transformation Project', date: 'July 20, 2024' },
              { title: 'Thandler Airport Technology Infrastructure Expansion Named', date: 'June 17, 2024' },
              { title: 'Silicon Bench Begins Construction of Solar Facilities', date: 'Aug 13, 2024' },
            ].map((post, i) => (
              <div key={i} className="col-lg-4 col-md-6 mb-4">
                <div className="latest-post">
                  <div className="latest-post-media">
                    <Link to="/blog" className="latest-post-img">
                      <img loading="lazy" className="img-fluid" src={`https://images.unsplash.com/photo-${i === 0 ? '1497366216548-37526070297c' : i === 1 ? '1531482615713-2afd69097998' : '1517694712202-14dd9538aa97'}?w=500&q=70`} alt="blog" />
                    </Link>
                  </div>
                  <div className="post-body">
                    <h4 className="post-title">
                      <Link to="/blog" className="d-inline-block">{post.title}</Link>
                    </h4>
                    <div className="latest-post-meta">
                      <span className="post-item-date">
                        <i className="fa fa-clock-o"></i> {post.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="general-btn text-center mt-4">
            <Link className="btn btn-primary" to="/blog">See All Posts</Link>
          </div>
        </div>
      </section>

    </main>
  )
}