// ─────────────────────────────────────────────
// ContactPage.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contactAPI } from '../services/api'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await contactAPI.send(formData)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>

      {/* ── Page Banner ── */}
      <div className="banner-area" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80)' }}>
        <div className="banner-text">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="banner-heading">
                  <h1 className="banner-title">Contact Us</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Contact</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact Info ── */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="ts-service-box">
                <span className="ts-service-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <div className="ts-service-box-content">
                  <h3 className="service-box-title">Our Location</h3>
                  <p>Westlands Business Park, Nairobi, Kenya</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="ts-service-box">
                <span className="ts-service-icon">
                  <i className="fas fa-phone"></i>
                </span>
                <div className="ts-service-box-content">
                  <h3 className="service-box-title">Phone</h3>
                  <p><a href="tel:+254700000000" style={{ color: 'inherit' }}>+254 700 000 000</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="ts-service-box">
                <span className="ts-service-icon">
                  <i className="fas fa-envelope"></i>
                </span>
                <div className="ts-service-box-content">
                  <h3 className="service-box-title">Email</h3>
                  <p><a href="mailto:info@swiftstacksolutions.co.ke" style={{ color: 'inherit' }}>info@swiftstacksolutions.co.ke</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="solid-bg section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="column-title">Get In Touch</h3>
              <p>Have a project in mind? Let's talk about how we can help you build something great.</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    className="form-control" 
                    id="message" 
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {status === 'success' && (
                  <div className="alert alert-success">
                    <i className="fas fa-check-circle"></i> Thank you! We'll get back to you shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle"></i> Something went wrong. Please try again.
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <h3 className="column-title">Find Us</h3>
              <div className="map" style={{ height: '400px', background: '#e9ecef', borderRadius: '5px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853743783!2d36.682196721086755!3d-1.3028611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="SwiftStack Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}