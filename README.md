# SwiftStack Solutions — Full-Stack Web Platform

![SwiftStack Solutions](https://img.shields.io/badge/SwiftStack-Solutions-1a3c6e?style=for-the-badge)
![Django](https://img.shields.io/badge/Django-4.2-092E20?style=for-the-badge&logo=django)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap)

---

##  Overview

**SwiftStack Solutions** is a full-stack corporate web platform for a modern software company. Built with Django REST Framework on the backend and React 18 on the frontend, it features a professional government-style theme with Bootstrap Icons.

---

##  Project Structure

```
swiftstack/
├── backend/                        # Django project root
│   ├── manage.py
│   ├── requirements.txt
│   ├── swiftstack/                 # Main Django config
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py                 # Main URL dispatcher
│   │   └── wsgi.py
│   └── core/                      # Core Django app
│       ├── models.py               # All data models (~400 lines)
│       ├── serializers.py          # DRF serializers
│       ├── views.py                # API ViewSets & views
│       ├── urls.py                 # App-level URLs
│       └── admin.py
│
└── frontend/                      # React 18 + Vite project
    ├── index.html                  # Entry HTML (Bootstrap + government theme)
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx                # React entry point
        ├── App.jsx                 # Router & layout
        ├── services/
        │   └── api.js              # Axios API service layer
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── HeroSection.jsx
        │   ├── ServiceCard.jsx
        │   ├── TestimonialCard.jsx
        │   └── StatsBanner.jsx
        └── pages/
            ├── HomePage.jsx
            ├── AboutPage.jsx
            ├── ServicesPage.jsx
            ├── PortfolioPage.jsx
            ├── CareersPage.jsx
            ├── ContactPage.jsx
            └── NotFoundPage.jsx
```

---

##  Backend Setup (Django)

### Prerequisites
- Python 3.10+
- pip
- virtualenv

### Installation

```bash
# 1. Navigate to backend
cd backend

# 2. Create & activate virtual environment
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Apply migrations
python manage.py makemigrations
python manage.py migrate

# 5. Create superuser
python manage.py createsuperuser

# 6. Load sample data (optional)
python manage.py loaddata fixtures/sample_data.json

# 7. Run dev server
python manage.py runserver
```

### `requirements.txt`
```
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.0
django-filter==23.3
Pillow==10.1.0
python-decouple==3.8
dj-database-url==2.1.0
whitenoise==6.6.0
gunicorn==21.2.0
```

### Environment Variables (`.env`)
```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

---

##  Frontend Setup (React + Vite)

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

### `package.json` dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

---

##  Data Models

| Model | Description |
|---|---|
| `Service` | Company service offerings with icon, description, pricing tier |
| `Project` | Portfolio projects with tech stack, images, client info |
| `TeamMember` | Staff profiles with role, bio, social links |
| `JobOpening` | Career listings with requirements, salary range |
| `JobApplication` | Applicant submissions linked to openings |
| `BlogPost` | News & insights articles with tags |
| `Testimonial` | Client testimonials with ratings |
| `ContactMessage` | Inbound contact form submissions |
| `CompanyStats` | Dynamic stats (clients, projects, years, awards) |
| `Technology` | Tech stack tags used across projects |
| `NewsletterSubscriber` | Email subscribers |
| `PartnerLogo` | Partner/client logo gallery |

---

##  API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services/` | List all services |
| GET | `/api/projects/` | List portfolio projects |
| GET | `/api/projects/?featured=true` | Featured projects only |
| GET | `/api/team/` | Team members |
| GET | `/api/jobs/` | Open positions |
| POST | `/api/jobs/{id}/apply/` | Submit job application |
| GET | `/api/testimonials/` | Client testimonials |
| POST | `/api/contact/` | Submit contact message |
| POST | `/api/newsletter/subscribe/` | Subscribe to newsletter |
| GET | `/api/stats/` | Company statistics |
| GET | `/api/blog/` | Blog posts |
| GET | `/api/blog/{slug}/` | Single blog post |

---

##  Theme

The frontend uses a **professional government-style theme**:

- **Primary color**: `#1a3c6e` (deep navy blue)
- **Accent color**: `#c8a84b` (government gold)
- **Typography**: Merriweather (headings) + Source Sans Pro (body)
- **Icons**: Bootstrap Icons 1.11 via CDN
- **Images**: Unsplash integration for hero and project imagery

---

##  Deployment

### Backend (Production)
```bash
# Collect static files
python manage.py collectstatic

# Run with gunicorn
gunicorn swiftstack.wsgi:application --bind 0.0.0.0:8000
```

### Frontend (Production)
```bash
npm run build
# Serve dist/ with nginx or upload to CDN
```

---

##  License

MIT License — © 2024 SwiftStack Solutions

---

##  Author

Built for **SwiftStack Solutions** · Nairobi, Kenya