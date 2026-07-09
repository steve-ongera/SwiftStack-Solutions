// ─────────────────────────────────────────────
// StatsBanner.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

const FALLBACK_STATS = [
  { label: 'Projects Completed', value: '150+', icon: 'fa-check-circle' },
  { label: 'Happy Clients',      value: '80+',  icon: 'fa-users' },
  { label: 'Team Members',       value: '45+',  icon: 'fa-user-tie' },
  { label: 'Countries Served',   value: '12',   icon: 'fa-globe-africa' },
]

export function StatsBanner({ stats }) {
  const data = stats?.length ? stats : FALLBACK_STATS
  
  return (
    <section id="facts" className="facts-area dark-bg">
      <div className="container">
        <div className="facts-wrapper">
          <div className="row">
            {data.map((stat, i) => (
              <div key={i} className="col-md-3 col-sm-6 ts-facts">
                <div className="ts-facts-img">
                  <i className={`fas ${stat.icon || 'fa-chart-line'}`} style={{ fontSize: '3rem', color: '#ffb600' }}></i>
                </div>
                <div className="ts-facts-content">
                  <h2 className="ts-facts-num">
                    <span className="counterUp" data-count={parseInt(stat.value) || 0}>
                      {stat.value}
                    </span>
                  </h2>
                  <h3 className="ts-facts-title">{stat.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}