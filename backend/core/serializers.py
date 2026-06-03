"""
serializers.py — SwiftStack Solutions
DRF serializers for all models.
"""

from rest_framework import serializers
from .models import (
    Technology, ServiceCategory, Service, ServiceFeature,
    Project, ProjectImage, Department, TeamMember,
    JobOpening, JobApplication, BlogCategory, BlogPost,
    Testimonial, ContactMessage, CompanyStat,
    PartnerLogo, NewsletterSubscriber,
)


# ─────────────────────────────────────────────
# TECHNOLOGY
# ─────────────────────────────────────────────

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'name', 'slug', 'icon_class', 'color_hex', 'category']


# ─────────────────────────────────────────────
# SERVICES
# ─────────────────────────────────────────────

class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ['id', 'feature', 'order']


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'slug', 'description', 'icon_class', 'order']


class ServiceListSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'short_description',
            'icon_class', 'image', 'category', 'technologies',
            'tier', 'price_from', 'is_featured', 'order',
        ]


class ServiceDetailSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    features = ServiceFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'short_description', 'full_description',
            'icon_class', 'image', 'category', 'technologies', 'features',
            'tier', 'price_from', 'is_featured', 'order', 'created_at',
        ]


# ─────────────────────────────────────────────
# PORTFOLIO / PROJECTS
# ─────────────────────────────────────────────

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']


class ProjectListSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'client_name', 'client_industry',
            'short_description', 'cover_image', 'technologies',
            'status', 'is_featured', 'completion_date', 'order',
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)
    services = ServiceListSerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'client_name', 'client_industry',
            'short_description', 'full_description', 'challenge', 'solution', 'outcome',
            'cover_image', 'technologies', 'services', 'images',
            'live_url', 'github_url', 'status', 'is_featured',
            'completion_date', 'duration_weeks', 'team_size', 'order',
        ]


# ─────────────────────────────────────────────
# TEAM
# ─────────────────────────────────────────────

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'slug']


class TeamMemberSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = TeamMember
        fields = [
            'id', 'full_name', 'slug', 'job_title', 'bio', 'photo',
            'department', 'email', 'linkedin_url', 'twitter_url', 'github_url',
            'is_leadership', 'join_date', 'order',
        ]


# ─────────────────────────────────────────────
# CAREERS
# ─────────────────────────────────────────────

class JobOpeningListSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    is_expired = serializers.ReadOnlyField()

    class Meta:
        model = JobOpening
        fields = [
            'id', 'title', 'slug', 'department', 'job_type', 'level',
            'location', 'is_remote', 'salary_min', 'salary_max', 'salary_currency',
            'technologies', 'deadline', 'is_expired', 'views_count', 'created_at',
        ]


class JobOpeningDetailSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    is_expired = serializers.ReadOnlyField()

    class Meta:
        model = JobOpening
        fields = [
            'id', 'title', 'slug', 'department', 'job_type', 'level',
            'location', 'is_remote', 'description', 'responsibilities',
            'requirements', 'nice_to_have',
            'salary_min', 'salary_max', 'salary_currency',
            'technologies', 'deadline', 'is_expired', 'views_count', 'created_at',
        ]


class JobApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            'job', 'first_name', 'last_name', 'email', 'phone',
            'linkedin_url', 'portfolio_url', 'cover_letter', 'resume',
            'years_of_experience', 'expected_salary', 'available_from',
        ]

    def validate_email(self, value):
        return value.lower().strip()

    def validate(self, data):
        job = data.get('job')
        email = data.get('email', '').lower().strip()
        if job and JobApplication.objects.filter(job=job, email=email).exists():
            raise serializers.ValidationError(
                {"email": "You have already applied for this position."}
            )
        return data


# ─────────────────────────────────────────────
# BLOG
# ─────────────────────────────────────────────

class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'color_hex']


class BlogPostListSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'cover_image',
            'category', 'author_name', 'published_at',
            'views_count', 'read_time_minutes',
        ]

    def get_author_name(self, obj):
        if obj.author:
            return obj.author.get_full_name() or obj.author.username
        return 'SwiftStack Team'


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    tags = TechnologySerializer(many=True, read_only=True)
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'body', 'cover_image',
            'category', 'tags', 'author_name', 'published_at',
            'views_count', 'read_time_minutes', 'created_at',
        ]

    def get_author_name(self, obj):
        if obj.author:
            return obj.author.get_full_name() or obj.author.username
        return 'SwiftStack Team'


# ─────────────────────────────────────────────
# TESTIMONIALS
# ─────────────────────────────────────────────

class TestimonialSerializer(serializers.ModelSerializer):
    project_title = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_title', 'client_company',
            'client_photo', 'content', 'rating', 'is_featured',
            'project_title', 'created_at',
        ]

    def get_project_title(self, obj):
        return obj.project.title if obj.project else None


# ─────────────────────────────────────────────
# CONTACT
# ─────────────────────────────────────────────

class ContactMessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            'full_name', 'email', 'phone', 'company',
            'inquiry_type', 'subject', 'message', 'budget_range',
        ]

    def validate_email(self, value):
        return value.lower().strip()

    def validate_message(self, value):
        if len(value.strip()) < 20:
            raise serializers.ValidationError("Message must be at least 20 characters.")
        return value


# ─────────────────────────────────────────────
# STATS
# ─────────────────────────────────────────────

class CompanyStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyStat
        fields = ['id', 'label', 'value', 'icon_class', 'description', 'order']


# ─────────────────────────────────────────────
# PARTNERS
# ─────────────────────────────────────────────

class PartnerLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerLogo
        fields = ['id', 'name', 'logo', 'website_url', 'is_client', 'order']


# ─────────────────────────────────────────────
# NEWSLETTER
# ─────────────────────────────────────────────

class NewsletterSubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email', 'full_name', 'source']

    def validate_email(self, value):
        email = value.lower().strip()
        if NewsletterSubscriber.objects.filter(email=email, is_active=True).exists():
            raise serializers.ValidationError("This email is already subscribed.")
        return email