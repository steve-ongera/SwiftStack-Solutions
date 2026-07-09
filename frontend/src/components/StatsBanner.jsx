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
    <section 
      id="facts" 
      className="facts-area dark-bg"
      style={{
        background: 'linear-gradient(135deg, #0a1a2e 0%, #1a3c6e 100%)',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '300px',
        height: '300px',
        background: 'rgba(255, 182, 0, 0.05)',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-5%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 182, 0, 0.03)',
        borderRadius: '50%'
      }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="facts-wrapper">
          <div className="row">
            {data.map((stat, i) => (
              <div 
                key={i} 
                className="col-md-3 col-sm-6 ts-facts"
                style={{
                  textAlign: 'center',
                  padding: '20px 15px',
                  transition: 'transform 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div 
                  className="ts-facts-img"
                  style={{
                    marginBottom: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'rgba(255, 182, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 182, 0, 0.2)'
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 182, 0, 0.1)'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                  >
                    <i 
                      className={`fas ${stat.icon || 'fa-chart-line'}`} 
                      style={{ 
                        fontSize: '2.2rem', 
                        color: '#ffb600',
                        transition: 'all 0.3s ease'
                      }}
                    ></i>
                  </div>
                </div>
                <div className="ts-facts-content">
                  <h2 
                    className="ts-facts-num"
                    style={{
                      fontSize: '2.8rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '5px',
                      lineHeight: 1.2,
                      fontFamily: '"Montserrat", sans-serif'
                    }}
                  >
                    <span className="counterUp" data-count={parseInt(stat.value) || 0}>
                      {stat.value}
                    </span>
                  </h2>
                  <h3 
                    className="ts-facts-title"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontFamily: '"Open Sans", sans-serif'
                    }}
                  >
                    {stat.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .ts-facts {
            margin-bottom: 30px;
          }
          .ts-facts:last-child {
            margin-bottom: 0;
          }
        }
        @media (max-width: 576px) {
          .facts-area {
            padding: 40px 0 !important;
          }
          .ts-facts-num {
            font-size: 2.2rem !important;
          }
        }
      `}</style>
    </section>
  )
}