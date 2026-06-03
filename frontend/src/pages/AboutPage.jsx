import { useEffect, useState } from 'react'
import { teamAPI } from '../services/api'

const DEMO_TEAM = [
  { id:1, full_name:'Dr. Amara Okonkwo', job_title:'Chief Executive Officer', is_leadership:true, bio:'15+ years in enterprise software.', photo:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=70' },
  { id:2, full_name:'Fatima Al-Hassan', job_title:'Chief Technology Officer', is_leadership:true, bio:'Former Google engineer, AI specialist.', photo:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=70' },
  { id:3, full_name:'James Mwangi', job_title:'Head of Engineering', is_leadership:true, bio:'AWS certified solutions architect.', photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=70' },
  { id:4, full_name:'Amina Diallo', job_title:'Head of Design', is_leadership:true, bio:'UX leader with 10 years experience.', photo:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=70' },
]

const VALUES = [
  { icon:'bi-lightbulb-fill', title:'Innovation First', desc:'We embrace cutting-edge technologies and creative problem-solving to deliver future-proof solutions.' },
  { icon:'bi-shield-fill-check', title:'Integrity Always', desc:'Transparency and honesty in every client engagement, from discovery to delivery and beyond.' },
  { icon:'bi-people-fill', title:'People-Centric', desc:'Our team and clients are our greatest assets. We invest deeply in both.' },
  { icon:'bi-graph-up-arrow', title:'Excellence in Execution', desc:'We hold ourselves to the highest standards, delivering quality that exceeds expectations.' },
]

export default function AboutPage() {
  const [team, setTeam] = useState([])

  useEffect(() => {
    teamAPI.getLeadership()
      .then(r => setTeam(r.data.results || r.data))
      .catch(() => setTeam(DEMO_TEAM))
  }, [])

  const displayTeam = team.length ? team : DEMO_TEAM

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1>About SwiftStack Solutions</h1>
          <p>A decade of delivering enterprise technology solutions across Africa and beyond.</p>
        </div>
      </div>

      {/* Mission + Image */}
      <section className="section-padding">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">Technology Partners You Can Trust</h2>
              <div className="gold-divider"></div>
              <p style={{ color:'var(--color-dark-gray)', lineHeight:1.8, marginBottom:'1.25rem' }}>
                Founded in 2016, SwiftStack Solutions has grown from a 3-person startup in Nairobi's Silicon Savannah into a 45-strong team of world-class engineers, designers, and strategists.
              </p>
              <p style={{ color:'var(--color-dark-gray)', lineHeight:1.8, marginBottom:'2rem' }}>
                We partner with startups, SMEs, and government agencies to design, build, and scale digital products that create real impact. Our Pan-African perspective combined with global best practices makes us uniquely positioned to understand and solve African business challenges.
              </p>
              <div className="about-highlights">
                {[
                  ['bi-geo-alt-fill', 'Nairobi, Kenya (HQ)'],
                  ['bi-calendar-fill', 'Founded 2016'],
                  ['bi-globe2', 'Serving 12 Countries'],
                  ['bi-award-fill', 'ISO 27001 Certified'],
                ].map(([icon, text]) => (
                  <div key={text} className="about-highlight">
                    <i className={`bi ${icon}`} style={{color:'var(--color-gold)'}}></i>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-images">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80"
                alt="SwiftStack office"
                className="about-img-main"
              />
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=70"
                alt="Team at work"
                className="about-img-secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding" style={{ background:'var(--color-off-white)' }}>
        <div className="container">
          <div className="grid-2">
            <div className="mv-card mv-mission">
              <div className="mv-icon"><i className="bi bi-bullseye"></i></div>
              <h3>Our Mission</h3>
              <p>
                To democratise access to world-class technology by building affordable, scalable, and impactful digital solutions for African businesses and beyond.
              </p>
            </div>
            <div className="mv-card mv-vision">
              <div className="mv-icon"><i className="bi bi-eye-fill"></i></div>
              <h3>Our Vision</h3>
              <p>
                To be Africa's most trusted technology partner—driving digital transformation and economic growth through innovation and engineering excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <div className="gold-divider center"></div>
          </div>
          <div className="grid-4">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="card-gov value-card">
                <i className={`bi ${icon} value-icon`}></i>
                <h4 style={{ marginBottom:'0.6rem', fontSize:'1rem' }}>{title}</h4>
                <p style={{ fontSize:'0.875rem', color:'var(--color-dark-gray)', lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding" style={{ background:'var(--color-off-white)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span className="section-label">The People Behind SwiftStack</span>
            <h2 className="section-title">Leadership Team</h2>
            <div className="gold-divider center"></div>
          </div>
          <div className="grid-4">
            {displayTeam.map(m => (
              <div key={m.id} className="team-card">
                <div className="team-card-photo">
                  {m.photo ? (
                    <img src={m.photo} alt={m.full_name} />
                  ) : (
                    <div className="team-card-initial">{m.full_name[0]}</div>
                  )}
                </div>
                <div className="team-card-body">
                  <h4 className="team-card-name">{m.full_name}</h4>
                  <div className="team-card-title">{m.job_title}</div>
                  {m.bio && <p className="team-card-bio">{m.bio}</p>}
                  <div className="team-card-socials">
                    {m.linkedin_url && <a href={m.linkedin_url}><i className="bi bi-linkedin"></i></a>}
                    {m.twitter_url  && <a href={m.twitter_url}><i className="bi bi-twitter-x"></i></a>}
                    {m.github_url   && <a href={m.github_url}><i className="bi bi-github"></i></a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; }
        .about-highlights { display:flex; flex-wrap:wrap; gap:0.75rem 2rem; }
        .about-highlight { display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; font-weight:600; color:var(--color-navy); }
        .about-images { position:relative; }
        .about-img-main { width:100%; height:400px; object-fit:cover; border-radius:var(--radius-lg); display:block; }
        .about-img-secondary {
          position:absolute; bottom:-2rem; right:-2rem;
          width:180px; height:140px; object-fit:cover;
          border-radius:var(--radius-md); border:4px solid var(--color-white);
          box-shadow:var(--shadow-lg);
        }
        .mv-card {
          padding:2.5rem; border-radius:var(--radius-lg); position:relative; overflow:hidden;
        }
        .mv-mission { background:var(--color-navy); color:var(--color-white); }
        .mv-vision { background:var(--color-gold); color:var(--color-navy-dark); }
        .mv-icon { font-size:2.5rem; margin-bottom:1rem; }
        .mv-mission .mv-icon { color:var(--color-gold); }
        .mv-vision .mv-icon { color:var(--color-navy); }
        .mv-card h3 { font-size:1.4rem; margin-bottom:0.75rem; color:inherit; }
        .mv-card p { line-height:1.75; opacity:0.9; }
        .value-icon { font-size:1.8rem; color:var(--color-navy); margin-bottom:1rem; display:block; }
        .team-card { background:var(--color-white); border-radius:var(--radius-lg); overflow:hidden; border:1px solid var(--color-light-gray); transition:all var(--transition-base); }
        .team-card:hover { box-shadow:var(--shadow-lg); transform:translateY(-4px); }
        .team-card-photo { height:200px; overflow:hidden; background:var(--color-navy); display:flex; align-items:center; justify-content:center; }
        .team-card-photo img { width:100%; height:100%; object-fit:cover; object-position:top; }
        .team-card-initial { font-family:var(--font-heading); font-size:4rem; font-weight:700; color:var(--color-gold); }
        .team-card-body { padding:1.25rem; }
        .team-card-name { font-size:1rem; margin-bottom:0.25rem; }
        .team-card-title { font-size:0.8rem; color:var(--color-gold-dark); font-weight:600; letter-spacing:0.3px; margin-bottom:0.6rem; }
        .team-card-bio { font-size:0.82rem; color:var(--color-mid-gray); margin-bottom:0.75rem; line-height:1.55; }
        .team-card-socials { display:flex; gap:0.5rem; }
        .team-card-socials a { color:var(--color-mid-gray); font-size:0.95rem; text-decoration:none; transition:color var(--transition-fast); }
        .team-card-socials a:hover { color:var(--color-navy); }
        @media (max-width:900px) { .about-grid { grid-template-columns:1fr; } .about-images { display:none; } }
      `}</style>
    </div>
  )
}