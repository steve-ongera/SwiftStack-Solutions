// ─────────────────────────────────────────────
// BlogPage.jsx - Updated with Constra Theme
// ─────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogAPI } from '../services/api'

const DEMO_POSTS = [
  { id:1, title:'We Just Completed $17.6 Million Digital Transformation Project', content:'Lorem ipsum dolor sit amet...', created_at:'2024-07-20', cover_image:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=75', category:'Projects' },
  { id:2, title:'Thandler Airport Technology Infrastructure Expansion Named', content:'Consectetur adipiscing elit...', created_at:'2024-06-17', cover_image:'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=75', category:'Infrastructure' },
  { id:3, title:'Silicon Bench Begins Construction of Solar Facilities', content:'Sed do eiusmod tempor...', created_at:'2024-08-13', cover_image:'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=75', category:'Sustainability' },
  { id:4, title:'AI-Powered Analytics Platform Launches in Kenya', content:'Ut enim ad minim veniam...', created_at:'2024-09-01', cover_image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75', category:'AI' },
  { id:5, title:'Cloud Migration Success Story: Banking Sector', content:'Quis nostrud exercitation...', created_at:'2024-08-25', cover_image:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=75', category:'Cloud' },
  { id:6, title:'Cybersecurity Best Practices for 2024', content:'Duis aute irure dolor in...', created_at:'2024-08-10', cover_image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=75', category:'Cybersecurity' },
]

// Category can come back from the API as either a plain string (demo data)
// or a nested object { id, name, slug, color_hex } (real API serializer).
// This normalizes both shapes so we always render a string.
function getCategoryName(category) {
  if (!category) return null
  if (typeof category === 'object') return category.name
  return category
}

function getCategoryColor(category) {
  if (category && typeof category === 'object') return category.color_hex || null
  return null
}

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    blogAPI.getPosts()
      .then(r => {
        setPosts(r.data.results || r.data)
        setLoading(false)
      })
      .catch(() => {
        setPosts(DEMO_POSTS)
        setLoading(false)
      })
  }, [])

  const data = posts.length ? posts : DEMO_POSTS

  return (
    <div>

      {/* ── Page Banner ── */}
      <div className="banner-area" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80)' }}>
        <div className="banner-text">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="banner-heading">
                  <h1 className="banner-title">Our Blog</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Blog</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Blog Posts ── */}
      <section id="news" className="news section-padding">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="section-title">Latest Insights</h2>
              <h3 className="section-sub-title">From Our Blog</h3>
            </div>
          </div>

          <div className="row">
            {loading ? (
              <div className="col-12 text-center">Loading posts...</div>
            ) : (
              data.map(post => {
                const categoryName = getCategoryName(post.category)
                const categoryColor = getCategoryColor(post.category)

                return (
                  <div key={post.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="latest-post">
                      <div className="latest-post-media">
                        <Link to="/blog" className="latest-post-img">
                          <img loading="lazy" className="img-fluid" src={post.cover_image} alt={post.title} />
                        </Link>
                      </div>
                      <div className="post-body">
                        <h4 className="post-title">
                          <Link to="/blog" className="d-inline-block">{post.title}</Link>
                        </h4>
                        <div className="latest-post-meta">
                          <span className="post-item-date">
                            <i className="fa fa-clock-o"></i> {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                          {categoryName && (
                            <span
                              className="post-item-category"
                              style={{ marginLeft: '1rem', color: categoryColor || 'inherit' }}
                            >
                              <i className="fa fa-tag"></i> {categoryName}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                          {post.content?.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="general-btn text-center mt-4">
            <a href="#" className="btn btn-primary">Load More</a>
          </div>
        </div>
      </section>

    </div>
  )
}