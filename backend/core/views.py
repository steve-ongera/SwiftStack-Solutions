"""
views.py — SwiftStack Solutions
ViewSets and API views for all endpoints.
"""

from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

from .models import (
    Technology, ServiceCategory, Service,
    Project, TeamMember, JobOpening, JobApplication,
    BlogPost, Testimonial, ContactMessage,
    CompanyStat, PartnerLogo, NewsletterSubscriber,
)
from .serializers import (
    TechnologySerializer,
    ServiceCategorySerializer, ServiceListSerializer, ServiceDetailSerializer,
    ProjectListSerializer, ProjectDetailSerializer,
    TeamMemberSerializer,
    JobOpeningListSerializer, JobOpeningDetailSerializer, JobApplicationCreateSerializer,
    BlogPostListSerializer, BlogPostDetailSerializer,
    TestimonialSerializer,
    ContactMessageCreateSerializer,
    CompanyStatSerializer, PartnerLogoSerializer,
    NewsletterSubscribeSerializer,
)


# ─────────────────────────────────────────────
# TECHNOLOGY
# ─────────────────────────────────────────────

class TechnologyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Technology.active.all()
    serializer_class = TechnologySerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['name']


# ─────────────────────────────────────────────
# SERVICES
# ─────────────────────────────────────────────

class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.active.select_related('category').prefetch_related('technologies', 'features')
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_featured', 'tier', 'category__slug']
    search_fields = ['title', 'short_description']
    ordering_fields = ['order', 'title', 'price_from']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ServiceDetailSerializer
        return ServiceListSerializer

    def get_object(self):
        queryset = self.get_queryset()
        lookup = self.kwargs.get(self.lookup_field)
        obj = get_object_or_404(queryset, slug=lookup)
        self.check_object_permissions(self.request, obj)
        return obj


# ─────────────────────────────────────────────
# PORTFOLIO / PROJECTS
# ─────────────────────────────────────────────

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.active.prefetch_related('technologies', 'services', 'images')
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_featured', 'status', 'client_industry']
    search_fields = ['title', 'client_name', 'short_description']
    ordering_fields = ['order', 'completion_date']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer

    def get_object(self):
        queryset = self.get_queryset()
        lookup = self.kwargs.get(self.lookup_field)
        obj = get_object_or_404(queryset, slug=lookup)
        self.check_object_permissions(self.request, obj)
        return obj

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        projects = self.get_queryset().filter(is_featured=True)[:6]
        serializer = ProjectListSerializer(projects, many=True, context={'request': request})
        return Response(serializer.data)


# ─────────────────────────────────────────────
# TEAM
# ─────────────────────────────────────────────

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.active.select_related('department').order_by('-is_leadership', 'order')
    serializer_class = TeamMemberSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_leadership', 'department__slug']

    def get_object(self):
        queryset = self.get_queryset()
        lookup = self.kwargs.get(self.lookup_field)
        obj = get_object_or_404(queryset, slug=lookup)
        self.check_object_permissions(self.request, obj)
        return obj


# ─────────────────────────────────────────────
# CAREERS
# ─────────────────────────────────────────────

class JobOpeningViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobOpening.active.select_related('department').prefetch_related('technologies')
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['job_type', 'level', 'is_remote', 'department__slug']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['created_at', 'deadline']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return JobOpeningDetailSerializer
        return JobOpeningListSerializer

    def get_object(self):
        queryset = self.get_queryset()
        lookup = self.kwargs.get(self.lookup_field)
        obj = get_object_or_404(queryset, slug=lookup)
        obj.views_count += 1
        obj.save(update_fields=['views_count'])
        self.check_object_permissions(self.request, obj)
        return obj

    @action(detail=True, methods=['post'], url_path='apply', permission_classes=[AllowAny])
    def apply(self, request, pk=None):
        job = self.get_object()
        if job.is_expired:
            return Response(
                {"error": "This position is no longer accepting applications."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = JobApplicationCreateSerializer(data={**request.data, 'job': job.id})
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "Your application has been submitted successfully!"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─────────────────────────────────────────────
# BLOG
# ─────────────────────────────────────────────

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True, is_active=True).select_related(
        'author', 'category'
    ).prefetch_related('tags')
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug']
    search_fields = ['title', 'excerpt', 'body']
    ordering_fields = ['published_at', 'views_count']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        return BlogPostListSerializer

    def get_object(self):
        queryset = self.get_queryset()
        lookup = self.kwargs.get(self.lookup_field)
        obj = get_object_or_404(queryset, slug=lookup)
        obj.views_count += 1
        obj.save(update_fields=['views_count'])
        self.check_object_permissions(self.request, obj)
        return obj


# ─────────────────────────────────────────────
# TESTIMONIALS
# ─────────────────────────────────────────────

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.active.select_related('project')
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_featured', 'rating']

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        testimonials = self.get_queryset().filter(is_featured=True)[:6]
        serializer = self.get_serializer(testimonials, many=True, context={'request': request})
        return Response(serializer.data)


# ─────────────────────────────────────────────
# CONTACT
# ─────────────────────────────────────────────

class ContactMessageCreateView(viewsets.GenericViewSet):
    serializer_class = ContactMessageCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            ip = (
                request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0].strip()
                or request.META.get('REMOTE_ADDR')
            )
            serializer.save(ip_address=ip)
            return Response(
                {"success": True, "message": "Thank you! We'll be in touch shortly."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─────────────────────────────────────────────
# STATS
# ─────────────────────────────────────────────

class CompanyStatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompanyStat.active.all()
    serializer_class = CompanyStatSerializer
    permission_classes = [AllowAny]


# ─────────────────────────────────────────────
# PARTNERS
# ─────────────────────────────────────────────

class PartnerLogoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PartnerLogo.active.all()
    serializer_class = PartnerLogoSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_client']


# ─────────────────────────────────────────────
# NEWSLETTER
# ─────────────────────────────────────────────

class NewsletterSubscribeViewSet(viewsets.GenericViewSet):
    serializer_class = NewsletterSubscribeSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], url_path='subscribe')
    def subscribe(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "You've been subscribed to our newsletter!"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)