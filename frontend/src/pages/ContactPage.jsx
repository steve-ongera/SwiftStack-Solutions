// ─────────────────────────────────────────────
// ContactPage.jsx
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react'
import { contactAPI } from '../services/api'
 
export default function  ContactPage() {
  const [form, setForm] = useState({ full_name:'', email:'', phone:'', company:'', inquiry_type:'general', subject:'', message:'', budget_range:'' })
  const [status, setStatus] = useState(null)
 
  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus('loading')
    try {
      await contactAPI.send(form)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }
 
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1>Contact Us</h1>
          <p>Ready to start a project or just have a question? We'd love to hear from you.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div>
              <h2 className="section-title" style={{ marginBottom:'0.75rem' }}>Let's Talk</h2>
              <div className="gold-divider"></div>
              <p style={{ color:'var(--color-dark-gray)', marginBottom:'2.5rem', lineHeight:1.75 }}>
                Whether you need a quick consultation or are ready to kick off your next big project, our team is here to help.
              </p>
              {[
                ['bi-geo-alt-fill','Address','Westlands Business Park, 4th Floor\nNairobi, Kenya 00100'],
                ['bi-telephone-fill','Phone','+254 700 000 000\n+254 733 000 000'],
                ['bi-envelope-fill','Email','info@swiftstacksolutions.co.ke\nsupport@swiftstacksolutions.co.ke'],
                ['bi-clock-fill','Business Hours','Monday – Friday: 8:00 AM – 6:00 PM EAT\nSaturday: 9:00 AM – 1:00 PM EAT'],
              ].map(([icon, title, detail]) => (
                <div key={title} className="contact-info-item">
                  <div className="contact-info-icon"><i className={`bi ${icon}`}></i></div>
                  <div>
                    <strong>{title}</strong>
                    {detail.split('\n').map((d,i) => <p key={i}>{d}</p>)}
                  </div>
                </div>
              ))}
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70"
                alt="SwiftStack office"
                style={{ width:'100%', borderRadius:'var(--radius-md)', marginTop:'2rem', height:200, objectFit:'cover' }}
              />
            </div>
            {/* Form */}
            <div className="contact-form-card">
              <h3 style={{ fontFamily:'var(--font-heading)', marginBottom:'1.5rem', color:'var(--color-navy)' }}>
                <i className="bi bi-send-fill" style={{ color:'var(--color-gold)', marginRight:'0.5rem' }}></i>
                Send a Message
              </h3>
              {status === 'success' ? (
                <div className="alert-success" style={{ padding:'2rem', textAlign:'center', flexDirection:'column', gap:'0.75rem' }}>
                  <i className="bi bi-check-circle-fill" style={{ fontSize:'2.5rem' }}></i>
                  <div>
                    <strong style={{ display:'block', marginBottom:'0.25rem' }}>Message Sent!</strong>
                    <span style={{ fontSize:'0.9rem' }}>We'll get back to you within 24 hours.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid-2">
                    <div className="form-group"><label className="form-label-gov">Full Name *</label><input className="form-input-gov" required value={form.full_name} onChange={e => setForm({...form,full_name:e.target.value})} /></div>
                    <div className="form-group"><label className="form-label-gov">Email *</label><input type="email" className="form-input-gov" required value={form.email} onChange={e => setForm({...form,email:e.target.value})} /></div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group"><label className="form-label-gov">Phone</label><input className="form-input-gov" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} /></div>
                    <div className="form-group"><label className="form-label-gov">Company</label><input className="form-input-gov" value={form.company} onChange={e => setForm({...form,company:e.target.value})} /></div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label-gov">Inquiry Type</label>
                      <select className="form-input-gov" value={form.inquiry_type} onChange={e => setForm({...form,inquiry_type:e.target.value})}>
                        {[['general','General Inquiry'],['project','Project Quote'],['support','Technical Support'],['partnership','Partnership'],['careers','Careers'],['press','Press / Media']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label-gov">Budget Range</label><input className="form-input-gov" placeholder="e.g. $5,000 – $20,000" value={form.budget_range} onChange={e => setForm({...form,budget_range:e.target.value})} /></div>
                  </div>
                  <div className="form-group"><label className="form-label-gov">Subject *</label><input className="form-input-gov" required value={form.subject} onChange={e => setForm({...form,subject:e.target.value})} /></div>
                  <div className="form-group"><label className="form-label-gov">Message *</label><textarea className="form-input-gov" required value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Tell us about your project or question..." /></div>
                  {status === 'error' && <div className="alert-error" style={{ marginBottom:'1rem' }}><i className="bi bi-exclamation-triangle-fill"></i> Something went wrong. Please try again.</div>}
                  <button type="submit" className="btn-primary-gov" style={{ width:'100%', justifyContent:'center' }} disabled={status === 'loading'}>
                    {status === 'loading' ? <><span className="spinner-gov" style={{ width:18,height:18,borderWidth:2,flexShrink:0 }}></span> Sending...</> : <><i className="bi bi-send-fill"></i> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:4rem; }
        .contact-info-item { display:flex; gap:1rem; margin-bottom:1.5rem; }
        .contact-info-icon { width:44px; height:44px; background:rgba(26,60,110,0.08); border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center; font-size:1.1rem; color:var(--color-navy); flex-shrink:0; }
        .contact-info-item strong { display:block; font-size:0.85rem; color:var(--color-navy); margin-bottom:0.2rem; }
        .contact-info-item p { font-size:0.85rem; color:var(--color-dark-gray); margin:0; }
        .contact-form-card { background:var(--color-off-white); border:1px solid var(--color-light-gray); border-radius:var(--radius-lg); padding:2.5rem; }
        @media(max-width:900px){ .contact-grid{ grid-template-columns:1fr; } }
      `}</style>
    </div>
  )
}
 
 
// ─────────────────────────────────────────────