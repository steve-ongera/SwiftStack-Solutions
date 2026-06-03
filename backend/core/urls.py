"""
core/urls.py — SwiftStack Solutions app-level URL config
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'technologies', views.TechnologyViewSet, basename='technology')
router.register(r'service-categories', views.ServiceCategoryViewSet, basename='service-category')
router.register(r'services', views.ServiceViewSet, basename='service')
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'team', views.TeamMemberViewSet, basename='team-member')
router.register(r'jobs', views.JobOpeningViewSet, basename='job-opening')
router.register(r'blog', views.BlogPostViewSet, basename='blog-post')
router.register(r'testimonials', views.TestimonialViewSet, basename='testimonial')
router.register(r'stats', views.CompanyStatViewSet, basename='company-stat')
router.register(r'partners', views.PartnerLogoViewSet, basename='partner-logo')

# Non-router views
contact_create = views.ContactMessageCreateView.as_view({'post': 'create'})
newsletter_subscribe = views.NewsletterSubscribeViewSet.as_view({'post': 'subscribe'})

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', contact_create, name='contact-create'),
    path('newsletter/subscribe/', newsletter_subscribe, name='newsletter-subscribe'),
]