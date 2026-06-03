// ─────────────────────────────────────────────
// NotFoundPage.jsx
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react'


export default function  NotFoundPage() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'60vh', textAlign:'center', padding:'4rem 1rem' }}>
      <div style={{ fontSize:'5rem', color:'var(--color-gold)', marginBottom:'1rem' }}>
        <i className="bi bi-exclamation-triangle-fill"></i>
      </div>
      <h1 style={{ fontFamily:'var(--font-heading)', color:'var(--color-navy)', fontSize:'4rem', fontWeight:900, lineHeight:1, marginBottom:'0.5rem' }}>404</h1>
      <h2 style={{ color:'var(--color-navy)', marginBottom:'1rem' }}>Page Not Found</h2>
      <p style={{ color:'var(--color-mid-gray)', marginBottom:'2rem', maxWidth:'400px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary-gov">
        <i className="bi bi-house-fill"></i>
        Back to Home
      </Link>
    </div>
  )
}
 
