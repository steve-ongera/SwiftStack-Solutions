
// ─────────────────────────────────────────────
// StatsBanner.jsx
// ─────────────────────────────────────────────

const FALLBACK_STATS = [
  { label: 'Projects Completed', value: '150+', icon_class: 'bi-check-circle', description: 'Across all industries' },
  { label: 'Happy Clients',      value: '80+',  icon_class: 'bi-people',        description: 'Active partnerships' },
  { label: 'Team Members',       value: '45+',  icon_class: 'bi-person-badge',  description: 'Expert engineers' },
  { label: 'Countries Served',   value: '12',   icon_class: 'bi-globe2',         description: 'Pan-African reach' },
]

export function StatsBanner({ stats }) {
  const data = stats?.length ? stats : FALLBACK_STATS
  return (
    <section className="stats-banner">
      <div className="container">
        <div className="stats-grid">
          {data.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-icon">
                <i className={`bi ${stat.icon_class}`}></i>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              {stat.description && <div className="stat-desc">{stat.description}</div>}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .stats-banner {
          background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
          padding: 4rem 0;
          position: relative; overflow: hidden;
        }
        .stats-banner::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          position: relative;
        }
        .stat-item {
          text-align: center; padding: 1.5rem 1rem;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .stat-item:last-child { border-right: none; }
        .stat-icon { font-size: 2rem; color: var(--color-gold); margin-bottom: 0.75rem; }
        .stat-value {
          font-family: var(--font-heading); font-size: 2.5rem;
          font-weight: 900; color: var(--color-white); line-height: 1;
          margin-bottom: 0.4rem;
        }
        .stat-label { font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.85); }
        .stat-desc { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-top: 0.25rem; }
        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
        }
      `}</style>
    </section>
  )
}