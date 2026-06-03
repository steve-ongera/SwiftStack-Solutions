// ─────────────────────────────────────────────
// PortfolioPage.jsx
// ─────────────────────────────────────────────
import { portfolioAPI } from '../services/api'
 
const DEMO_PROJECTS = [
  { id:1, title:'FinTrack Pro', client_name:'Kenya Finance Corp', client_industry:'Finance', short_description:'Real-time banking analytics dashboard for a Kenyan microfinance institution serving 50,000+ customers.', cover_image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70', status:'completed', technologies:[] },
  { id:2, title:'AgriConnect Platform', client_name:'AgriTech Kenya', client_industry:'Agriculture', short_description:'IoT-powered platform connecting 10,000 smallholder farmers to commodity markets and buyers.', cover_image:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=70', status:'featured', technologies:[] },
  { id:3, title:'HealthHub EHR', client_name:'NairobiHealth Group', client_industry:'Healthcare', short_description:'Electronic health records and telemedicine platform deployed across 5 hospitals.', cover_image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70', status:'completed', technologies:[] },
  { id:4, title:'GovPortal KE', client_name:'Ministry of ICT', client_industry:'Government', short_description:'Citizen services portal handling 1M+ monthly transactions for e-government services.', cover_image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=70', status:'featured', technologies:[] },
  { id:5, title:'ShopEase Mobile', client_name:'Eastleigh Traders', client_industry:'E-Commerce', short_description:'Mobile commerce app with M-Pesa integration, serving 200+ vendors.', cover_image:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=70', status:'completed', technologies:[] },
  { id:6, title:'LogiTrack', client_name:'Swift Logistics', client_industry:'Logistics', short_description:'Fleet management and real-time cargo tracking system for 500+ vehicles.', cover_image:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=70', status:'completed', technologies:[] },
]
 
export function PortfolioPage() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  useEffect(() => {
    portfolioAPI.getAll().then(r => setProjects(r.data.results || r.data)).catch(() => setProjects(DEMO_PROJECTS))
  }, [])
  const data = projects.length ? projects : DEMO_PROJECTS
  const industries = ['all', ...new Set(data.map(p => p.client_industry).filter(Boolean))]
  const filtered = filter === 'all' ? data : data.filter(p => p.client_industry === filter)
 
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <span className="section-label">Our Work</span>
          <h1>Project Portfolio</h1>
          <p>Real solutions delivering real impact across Africa and beyond.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          {/* Filter tabs */}
          <div className="portfolio-filters">
            {industries.map(ind => (
              <button key={ind} onClick={() => setFilter(ind)} className={`filter-btn ${filter === ind ? 'active' : ''}`}>
                {ind === 'all' ? 'All Projects' : ind}
              </button>
            ))}
          </div>
          <div className="grid-3">
            {filtered.map(p => (
              <div key={p.id} className="portfolio-card">
                <div className="portfolio-card-img" style={{ backgroundImage:`url(${p.cover_image})` }}>
                  {p.status === 'featured' && (
                    <div className="portfolio-featured-badge"><i className="bi bi-star-fill"></i> Featured</div>
                  )}
                  <div className="portfolio-overlay">
                    <div className="portfolio-overlay-content">
                      <span className="portfolio-industry">{p.client_industry}</span>
                      <p>{p.short_description}</p>
                      {p.live_url && <a href={p.live_url} className="portfolio-view-btn"><i className="bi bi-box-arrow-up-right"></i> View Live</a>}
                    </div>
                  </div>
                </div>
                <div className="portfolio-card-body">
                  <h3 className="portfolio-card-title">{p.title}</h3>
                  {p.client_name && <div className="portfolio-client"><i className="bi bi-building"></i> {p.client_name}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .portfolio-filters { display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:2.5rem; }
        .filter-btn { padding:0.45rem 1.1rem; border:1.5px solid var(--color-light-gray); background:var(--color-white); border-radius:100px; font-size:0.82rem; font-weight:600; cursor:pointer; transition:all var(--transition-fast); color:var(--color-dark-gray); }
        .filter-btn:hover, .filter-btn.active { background:var(--color-navy); border-color:var(--color-navy); color:var(--color-white); }
        .portfolio-card { border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--color-light-gray); }
        .portfolio-card-img { height:220px; background-size:cover; background-position:center; position:relative; }
        .portfolio-featured-badge { position:absolute; top:1rem; right:1rem; background:var(--color-gold); color:var(--color-navy-dark); padding:0.25rem 0.6rem; border-radius:100px; font-size:0.72rem; font-weight:700; }
        .portfolio-overlay { position:absolute; inset:0; background:rgba(17,40,80,0.92); opacity:0; transition:opacity var(--transition-base); display:flex; align-items:center; justify-content:center; padding:1.5rem; }
        .portfolio-card:hover .portfolio-overlay { opacity:1; }
        .portfolio-overlay-content { text-align:center; color:var(--color-white); }
        .portfolio-industry { font-size:0.75rem; letter-spacing:1px; text-transform:uppercase; color:var(--color-gold); font-weight:700; display:block; margin-bottom:0.5rem; }
        .portfolio-overlay-content p { font-size:0.85rem; opacity:0.85; line-height:1.6; margin-bottom:1rem; }
        .portfolio-view-btn { display:inline-flex; align-items:center; gap:0.4rem; color:var(--color-navy-dark); background:var(--color-gold); padding:0.4rem 1rem; border-radius:var(--radius-sm); font-size:0.8rem; font-weight:700; text-decoration:none; }
        .portfolio-card-body { padding:1.25rem; background:var(--color-white); }
        .portfolio-card-title { font-size:1rem; margin-bottom:0.3rem; }
        .portfolio-client { font-size:0.8rem; color:var(--color-mid-gray); display:flex; align-items:center; gap:0.3rem; }
      `}</style>
    </div>
  )
}
 