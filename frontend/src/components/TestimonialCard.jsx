// ─────────────────────────────────────────────
// TestimonialCard.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

export function TestimonialCard({ testimonial }) {
  return (
    <div className="item">
      <div className="quote-item">
        <span className="quote-text">
          "{testimonial.content}"
        </span>

        <div className="quote-item-footer">
          {testimonial.client_photo ? (
            <img 
              loading="lazy" 
              className="testimonial-thumb" 
              src={testimonial.client_photo} 
              alt={testimonial.client_name} 
            />
          ) : (
            <div className="testimonial-avatar-placeholder" style={{
              width: '80px',
              height: '80px',
              borderRadius: '5px',
              background: '#1a3c6e',
              color: '#ffb600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 700,
              float: 'left',
              marginRight: '20px'
            }}>
              {testimonial.client_name?.[0] || 'C'}
            </div>
          )}
          <div className="quote-item-info">
            <h3 className="quote-author">{testimonial.client_name}</h3>
            <span className="quote-subtext">
              {testimonial.client_title}{testimonial.client_company && `, ${testimonial.client_company}`}
            </span>
            {/* Stars */}
            <div style={{ marginTop: '0.25rem' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star${i < (testimonial.rating || 5) ? '' : '-o'}`}
                  style={{ color: i < (testimonial.rating || 5) ? '#ffb600' : '#ddd', fontSize: '0.8rem' }}
                ></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}