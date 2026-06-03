
// ─────────────────────────────────────────────
// TestimonialCard.jsx
// ─────────────────────────────────────────────

export function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <i
            key={i}
            className={`bi ${i < testimonial.rating ? 'bi-star-fill' : 'bi-star'}`}
          ></i>
        ))}
      </div>
      <blockquote className="testimonial-quote">"{testimonial.content}"</blockquote>
      <div className="testimonial-author">
        {testimonial.client_photo ? (
          <img src={testimonial.client_photo} alt={testimonial.client_name} className="testimonial-avatar" />
        ) : (
          <div className="testimonial-avatar-placeholder">
            {testimonial.client_name?.[0] || 'C'}
          </div>
        )}
        <div>
          <div className="testimonial-name">{testimonial.client_name}</div>
          <div className="testimonial-meta">
            {testimonial.client_title}{testimonial.client_company && `, ${testimonial.client_company}`}
          </div>
        </div>
      </div>
      <style>{`
        .testimonial-card {
          background: var(--color-white);
          border: 1px solid var(--color-light-gray);
          border-radius: var(--radius-lg);
          padding: 2rem;
          transition: box-shadow var(--transition-base);
          position: relative;
        }
        .testimonial-card::before {
          content: '"';
          position: absolute; top: 1rem; right: 1.5rem;
          font-size: 5rem; font-family: Georgia, serif;
          color: rgba(26,60,110,0.07); line-height: 1;
        }
        .testimonial-card:hover { box-shadow: var(--shadow-lg); }
        .testimonial-stars { color: var(--color-gold); margin-bottom: 1rem; font-size: 0.9rem; }
        .testimonial-quote {
          font-size: 0.95rem; color: var(--color-dark-gray);
          line-height: 1.7; font-style: italic;
          margin-bottom: 1.5rem; border: none; padding: 0;
        }
        .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
        .testimonial-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          object-fit: cover; border: 2px solid var(--color-gold);
        }
        .testimonial-avatar-placeholder {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--color-navy); color: var(--color-white);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700;
          flex-shrink: 0;
        }
        .testimonial-name { font-weight: 700; font-size: 0.9rem; color: var(--color-navy); }
        .testimonial-meta { font-size: 0.8rem; color: var(--color-mid-gray); }
      `}</style>
    </div>
  )
}
