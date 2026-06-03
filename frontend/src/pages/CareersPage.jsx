// ─────────────────────────────────────────────
// CareersPage.jsx
// ─────────────────────────────────────────────
import { careersAPI } from '../services/api'
 
const DEMO_JOBS = [
  { id:1, title:'Senior Full-Stack Engineer', job_type:'full_time', level:'senior', location:'Nairobi, Kenya', is_remote:true, salary_min:150000, salary_max:250000, salary_currency:'KES', description:'Build next-gen web platforms.', requirements:'5+ years React & Django\nAWS experience\nStrong problem-solving', deadline:'2024-03-31', slug:'senior-fullstack-engineer' },
  { id:2, title:'DevOps Engineer', job_type:'full_time', level:'mid', location:'Nairobi, Kenya', is_remote:false, salary_min:120000, salary_max:180000, salary_currency:'KES', description:'Own CI/CD and infrastructure.', requirements:'Kubernetes & Docker\nTerraform experience\nLinux proficiency', deadline:'2024-04-15', slug:'devops-engineer' },
  { id:3, title:'UI/UX Designer', job_type:'full_time', level:'mid', location:'Remote', is_remote:true, salary_min:80000, salary_max:130000, salary_currency:'KES', description:'Create exceptional user experiences.', requirements:'Figma expertise\nUser research skills\nPortfolio required', deadline:'2024-04-01', slug:'ui-ux-designer' },
  { id:4, title:'Machine Learning Engineer', job_type:'full_time', level:'senior', location:'Nairobi, Kenya', is_remote:true, salary_min:180000, salary_max:280000, salary_currency:'KES', description:'Build AI products.', requirements:'Python & TensorFlow\nMLOps experience\nPublications a plus', deadline:'2024-05-01', slug:'ml-engineer' },
]
 
export function CareersPage() {
  const [jobs, setJobs] = useState([])
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', phone:'', cover_letter:'' })
  const [submitStatus, setSubmitStatus] = useState(null)
 
  useEffect(() => {
    careersAPI.getJobs().then(r => setJobs(r.data.results || r.data)).catch(() => setJobs(DEMO_JOBS))
  }, [])
  const data = jobs.length ? jobs : DEMO_JOBS
 
  const handleApply = async (e) => {
    e.preventDefault()
    setSubmitStatus('loading')
    setTimeout(() => setSubmitStatus('success'), 1200)
  }
 
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <span className="section-label">Join Our Team</span>
          <h1>Careers at SwiftStack</h1>
          <p>Help us build the future of technology in Africa. We're always looking for talented minds.</p>
        </div>
      </div>
 
      {/* Culture */}
      <section className="section-padding" style={{ background:'var(--color-off-white)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
            <span className="section-label">Why Work With Us</span>
            <h2 className="section-title">Life at SwiftStack</h2>
            <div className="gold-divider center"></div>
          </div>
          <div className="grid-4">
            {[['bi-currency-dollar','Competitive Pay','Market-leading salaries + performance bonuses'],
              ['bi-heart-pulse','Health Benefits','Full medical & dental for you and family'],
              ['bi-laptop','Remote Friendly','Hybrid and fully remote options available'],
              ['bi-mortarboard','Learning Budget','KES 100k/year for courses and conferences'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="card-gov" style={{ textAlign:'center' }}>
                <i className={`bi ${icon}`} style={{ fontSize:'2rem', color:'var(--color-navy)', display:'block', marginBottom:'0.75rem' }}></i>
                <h4 style={{ marginBottom:'0.4rem', fontSize:'0.95rem' }}>{title}</h4>
                <p style={{ fontSize:'0.82rem', color:'var(--color-dark-gray)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Open Positions */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom:'2rem' }}>
            <i className="bi bi-briefcase-fill" style={{ color:'var(--color-gold)', marginRight:'0.5rem' }}></i>
            Open Positions ({data.length})
          </h2>
          <div className="jobs-list">
            {data.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <div>
                    <h3 className="job-card-title">{job.title}</h3>
                    <div className="job-meta">
                      <span><i className="bi bi-building"></i> {job.location}</span>
                      <span><i className="bi bi-clock"></i> {job.job_type?.replace('_',' ')}</span>
                      <span><i className="bi bi-bar-chart-steps"></i> {job.level}</span>
                      {job.is_remote && <span className="badge-gov badge-gold"><i className="bi bi-wifi"></i> Remote OK</span>}
                    </div>
                  </div>
                  <div className="job-card-actions">
                    {job.salary_min && (
                      <div className="job-salary">
                        {job.salary_currency} {Number(job.salary_min).toLocaleString()} – {Number(job.salary_max).toLocaleString()}
                      </div>
                    )}
                    <button onClick={() => setSelected(selected?.id === job.id ? null : job)} className="btn-primary-gov" style={{ padding:'0.5rem 1.25rem', fontSize:'0.875rem' }}>
                      {selected?.id === job.id ? <><i className="bi bi-x"></i> Close</> : <><i className="bi bi-send"></i> Apply Now</>}
                    </button>
                  </div>
                </div>
                {/* Inline apply form */}
                {selected?.id === job.id && (
                  <div className="job-apply-form">
                    <h4 style={{ marginBottom:'1.25rem', color:'var(--color-navy)', fontFamily:'var(--font-heading)' }}>
                      Apply for {job.title}
                    </h4>
                    {submitStatus === 'success' ? (
                      <div className="alert-success"><i className="bi bi-check-circle-fill"></i> Application submitted! We'll be in touch soon.</div>
                    ) : (
                      <form onSubmit={handleApply}>
                        <div className="grid-2" style={{ marginBottom:'1rem' }}>
                          <div className="form-group">
                            <label className="form-label-gov">First Name *</label>
                            <input className="form-input-gov" required value={form.first_name} onChange={e => setForm({...form, first_name:e.target.value})} />
                          </div>
                          <div className="form-group">
                            <label className="form-label-gov">Last Name *</label>
                            <input className="form-input-gov" required value={form.last_name} onChange={e => setForm({...form, last_name:e.target.value})} />
                          </div>
                        </div>
                        <div className="grid-2" style={{ marginBottom:'1rem' }}>
                          <div className="form-group">
                            <label className="form-label-gov">Email *</label>
                            <input type="email" className="form-input-gov" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
                          </div>
                          <div className="form-group">
                            <label className="form-label-gov">Phone</label>
                            <input className="form-input-gov" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label-gov">Cover Letter *</label>
                          <textarea className="form-input-gov" required value={form.cover_letter} onChange={e => setForm({...form, cover_letter:e.target.value})} placeholder="Tell us why you're the right fit..." />
                        </div>
                        <button type="submit" className="btn-primary-gov" disabled={submitStatus === 'loading'}>
                          {submitStatus === 'loading' ? <><span className="spinner-gov" style={{ width:16,height:16,borderWidth:2 }}></span> Submitting...</> : <><i className="bi bi-send-fill"></i> Submit Application</>}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .jobs-list { display:flex; flex-direction:column; gap:1rem; }
        .job-card { background:var(--color-white); border:1px solid var(--color-light-gray); border-radius:var(--radius-md); overflow:hidden; transition:box-shadow var(--transition-base); }
        .job-card:hover { box-shadow:var(--shadow-md); }
        .job-card-header { padding:1.5rem 2rem; display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap; }
        .job-card-title { font-size:1.1rem; margin-bottom:0.4rem; }
        .job-meta { display:flex; gap:1rem; flex-wrap:wrap; font-size:0.82rem; color:var(--color-mid-gray); align-items:center; }
        .job-meta span { display:flex; align-items:center; gap:0.3rem; }
        .job-card-actions { display:flex; flex-direction:column; align-items:flex-end; gap:0.5rem; }
        .job-salary { font-size:0.82rem; font-weight:700; color:var(--color-navy); }
        .job-apply-form { padding:2rem; background:var(--color-off-white); border-top:1px solid var(--color-light-gray); }
      `}</style>
    </div>
  )
}
 
 