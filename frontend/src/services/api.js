/**
 * services/api.js — SwiftStack Solutions
 * Centralised Axios API service layer.
 */

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor — attach auth token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) config.headers.Authorization = `Token ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — normalise errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred.'
    return Promise.reject({ ...error, userMessage: message })
  }
)

// ─── Services ─────────────────────────────────
export const servicesAPI = {
  getAll: (params) => api.get('/services/', { params }),
  getBySlug: (slug) => api.get(`/services/${slug}/`),
  getCategories: () => api.get('/service-categories/'),
  getFeatured: () => api.get('/services/', { params: { is_featured: true } }),
}

// ─── Portfolio ────────────────────────────────
export const portfolioAPI = {
  getAll: (params) => api.get('/projects/', { params }),
  getBySlug: (slug) => api.get(`/projects/${slug}/`),
  getFeatured: () => api.get('/projects/featured/'),
}

// ─── Team ─────────────────────────────────────
export const teamAPI = {
  getAll: (params) => api.get('/team/', { params }),
  getLeadership: () => api.get('/team/', { params: { is_leadership: true } }),
  getBySlug: (slug) => api.get(`/team/${slug}/`),
}

// ─── Careers ──────────────────────────────────
export const careersAPI = {
  getJobs: (params) => api.get('/jobs/', { params }),
  getJobBySlug: (slug) => api.get(`/jobs/${slug}/`),
  applyForJob: (slug, formData) =>
    api.post(`/jobs/${slug}/apply/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

// ─── Blog ─────────────────────────────────────
export const blogAPI = {
  getPosts: (params) => api.get('/blog/', { params }),
  getPostBySlug: (slug) => api.get(`/blog/${slug}/`),
  getCategories: () => api.get('/blog-categories/'),
}

// ─── Testimonials ─────────────────────────────
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials/'),
  getFeatured: () => api.get('/testimonials/featured/'),
}

// ─── Contact ──────────────────────────────────
export const contactAPI = {
  send: (data) => api.post('/contact/', data),
}

// ─── Stats ────────────────────────────────────
export const statsAPI = {
  getAll: () => api.get('/stats/'),
}

// ─── Partners ─────────────────────────────────
export const partnersAPI = {
  getAll: (params) => api.get('/partners/', { params }),
  getClients: () => api.get('/partners/', { params: { is_client: true } }),
}

// ─── Newsletter ───────────────────────────────
export const newsletterAPI = {
  subscribe: (data) => api.post('/newsletter/subscribe/', data),
}

// ─── Technologies ─────────────────────────────
export const techAPI = {
  getAll: (params) => api.get('/technologies/', { params }),
}

export default api