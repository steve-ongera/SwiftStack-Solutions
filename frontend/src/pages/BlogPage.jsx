// ─────────────────────────────────────────────
// BlogPage.jsx
// ─────────────────────────────────────────────
import { blogAPI } from '../services/api'
 
const DEMO_POSTS = [
  { id:1, title:'Building Scalable APIs with Django REST Framework', slug:'scalable-apis-django', excerpt:'A deep dive into best practices for high-performance REST APIs.', cover_image:'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=70', published_at:'2024-01-15', read_time_minutes:8, category:{ name:'Engineering', color_hex:'#1a3c6e' } },
  { id:2, title:'React 18 Concurrent Features: A Practical Guide', slug:'react-18-concurrent', excerpt:'How to take advantage of React 18s concurrent rendering model.', cover_image:'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=70', published_at:'2024-01-28', read_time_minutes:6, category:{ name:'Frontend', color_hex:'#0277bd' } },
  { id:3, title:'Digital Transformation in African Healthcare', slug:'digital-health-africa', excerpt:'Case studies and lessons from deploying health-tech across East Africa.', cover_image:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=70', published_at:'2024-02-05', read_time_minutes:10, category:{ name:'Industry Insights', color_hex:'#2e7d32' } },
]
 
export function BlogPage() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    blogAPI.getPosts().then(r => setPosts(r.data.results || r.data)).catch(() => setPosts(DEMO_POSTS))
  }, [])
  const data = posts.length ? posts : DEMO_POSTS
 
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <span className="section-label">Knowledge Hub</span>
          <h1>Insights & Perspectives</h1>
          <p>Engineering articles, industry analysis, and innovation stories from our team.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div className="grid-3">
            {data.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-img" style={{ backgroundImage:`url(${post.cover_image})` }}>
                  {post.category && (
                    <span className="blog-category-badge" style={{ background: post.category.color_hex }}>
                      {post.category.name}
                    </span>
                  )}
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span><i className="bi bi-calendar3"></i> {new Date(post.published_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>
                    <span><i className="bi bi-clock"></i> {post.read_time_minutes} min read</span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <a href="#" className="blog-read-more">
                    Read Article <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .blog-card { background:var(--color-white); border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--color-light-gray); transition:all var(--transition-base); }
        .blog-card:hover { box-shadow:var(--shadow-lg); transform:translateY(-4px); }
        .blog-card-img { height:200px; background-size:cover; background-position:center; position:relative; }
        .blog-category-badge { position:absolute; bottom:1rem; left:1rem; color:white; padding:0.2rem 0.7rem; border-radius:100px; font-size:0.72rem; font-weight:700; letter-spacing:0.5px; }
        .blog-card-body { padding:1.5rem; }
        .blog-meta { display:flex; gap:1rem; font-size:0.78rem; color:var(--color-mid-gray); margin-bottom:0.75rem; }
        .blog-meta span { display:flex; align-items:center; gap:0.3rem; }
        .blog-card-title { font-size:1rem; margin-bottom:0.6rem; line-height:1.4; }
        .blog-card-excerpt { font-size:0.875rem; color:var(--color-dark-gray); line-height:1.65; margin-bottom:1.25rem; }
        .blog-read-more { color:var(--color-navy); font-size:0.875rem; font-weight:600; text-decoration:none; display:flex; align-items:center; gap:0.35rem; }
        .blog-read-more:hover { color:var(--color-gold); }
      `}</style>
    </div>
  )
}
 