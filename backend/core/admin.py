"""
core/admin.py — SwiftStack Solutions
Full admin configuration for all models.
"""

from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from django.db.models import Count

from .models import (
    Technology, ServiceCategory, Service, ServiceFeature,
    Project, ProjectImage, Department, TeamMember,
    JobOpening, JobApplication, BlogCategory, BlogPost,
    Testimonial, ContactMessage, CompanyStat, PartnerLogo,
    NewsletterSubscriber,
)


# ─────────────────────────────────────────────
# SITE HEADER
# ─────────────────────────────────────────────

admin.site.site_header = "SwiftStack Solutions"
admin.site.site_title  = "SwiftStack Admin"
admin.site.index_title = "Dashboard"


# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────

def color_badge(color_hex, label):
    return format_html(
        '<span style="background:{};color:#fff;padding:2px 8px;'
        'border-radius:4px;font-size:11px;font-weight:600">{}</span>',
        color_hex, label,
    )


def star_rating(rating):
    return format_html(
        '<span style="color:#f59e0b;font-size:14px">{}</span>'
        '<span style="color:#d1d5db;font-size:14px">{}</span>',
        "★" * rating,
        "★" * (5 - rating),
    )


# ─────────────────────────────────────────────
# TECHNOLOGY
# ─────────────────────────────────────────────

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display  = ('name', 'category_badge', 'color_preview', 'icon_class', 'is_active', 'created_at')
    list_filter   = ('category', 'is_active')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('is_active',)
    ordering      = ('category', 'name')

    @admin.display(description='Category')
    def category_badge(self, obj):
        colours = {
            'frontend': '#3b82f6', 'backend': '#10b981', 'database': '#f59e0b',
            'cloud': '#8b5cf6', 'mobile': '#ec4899', 'ai_ml': '#ef4444', 'other': '#6b7280',
        }
        return color_badge(colours.get(obj.category, '#6b7280'), obj.get_category_display())

    @admin.display(description='Color')
    def color_preview(self, obj):
        return format_html(
            '<span style="background:{};display:inline-block;width:20px;height:20px;'
            'border-radius:50%;border:1px solid #e5e7eb;vertical-align:middle"></span> {}',
            obj.color_hex, obj.color_hex,
        )


# ─────────────────────────────────────────────
# SERVICES
# ─────────────────────────────────────────────

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display  = ('name', 'slug', 'icon_class', 'service_count', 'order')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order', 'name')

    @admin.display(description='Services')
    def service_count(self, obj):
        return obj.services.filter(is_active=True).count()


class ServiceFeatureInline(admin.TabularInline):
    model  = ServiceFeature
    extra  = 3
    fields = ('feature', 'order')
    ordering = ('order',)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display    = ('title', 'category', 'tier_badge', 'price_display', 'is_featured', 'is_active', 'order')
    list_filter     = ('category', 'tier', 'is_featured', 'is_active')
    search_fields   = ('title', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('technologies',)
    list_editable   = ('is_featured', 'is_active', 'order')
    inlines         = [ServiceFeatureInline]
    fieldsets = (
        (None, {'fields': ('category', 'title', 'slug', 'icon_class', 'image')}),
        ('Content', {'fields': ('short_description', 'full_description')}),
        ('Pricing & Tier', {'fields': ('tier', 'price_from')}),
        ('Technologies', {'fields': ('technologies',)}),
        ('Visibility', {'fields': ('is_featured', 'is_active', 'order')}),
    )

    @admin.display(description='Tier')
    def tier_badge(self, obj):
        colours = {'starter': '#10b981', 'professional': '#3b82f6', 'enterprise': '#8b5cf6'}
        return color_badge(colours.get(obj.tier, '#6b7280'), obj.get_tier_display())

    @admin.display(description='Price from')
    def price_display(self, obj):
        if obj.price_from:
            return f"KES {obj.price_from:,.0f}"
        return "—"


# ─────────────────────────────────────────────
# PROJECTS
# ─────────────────────────────────────────────

class ProjectImageInline(admin.TabularInline):
    model   = ProjectImage
    extra   = 2
    fields  = ('image', 'caption', 'order')
    ordering = ('order',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display    = ('title', 'client_name', 'client_industry', 'status_badge',
                       'is_featured', 'completion_date', 'duration_weeks', 'team_size')
    list_filter     = ('status', 'is_featured', 'is_active', 'client_industry')
    search_fields   = ('title', 'client_name', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('technologies', 'services')
    list_editable   = ('is_featured',)
    date_hierarchy  = 'completion_date'
    inlines         = [ProjectImageInline]
    fieldsets = (
        ('Project Info', {
            'fields': ('title', 'slug', 'status', 'is_featured', 'is_active', 'order')
        }),
        ('Client', {
            'fields': ('client_name', 'client_industry')
        }),
        ('Content', {
            'fields': ('short_description', 'full_description', 'challenge', 'solution', 'outcome')
        }),
        ('Media', {
            'fields': ('cover_image',)
        }),
        ('Links', {
            'fields': ('live_url', 'github_url')
        }),
        ('Stack & Services', {
            'fields': ('technologies', 'services')
        }),
        ('Timeline', {
            'fields': ('completion_date', 'duration_weeks', 'team_size')
        }),
    )

    @admin.display(description='Status')
    def status_badge(self, obj):
        colours = {'completed': '#10b981', 'ongoing': '#f59e0b', 'featured': '#8b5cf6'}
        return color_badge(colours.get(obj.status, '#6b7280'), obj.get_status_display())


# ─────────────────────────────────────────────
# TEAM
# ─────────────────────────────────────────────

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display  = ('name', 'slug', 'member_count')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

    @admin.display(description='Members')
    def member_count(self, obj):
        return obj.members.filter(is_active=True).count()


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display  = ('full_name', 'job_title', 'department', 'is_leadership', 'is_active', 'join_date', 'order')
    list_filter   = ('department', 'is_leadership', 'is_active')
    search_fields = ('full_name', 'job_title', 'email')
    prepopulated_fields = {'slug': ('full_name',)}
    list_editable = ('is_leadership', 'is_active', 'order')
    raw_id_fields = ('user',)
    fieldsets = (
        ('Personal', {'fields': ('user', 'full_name', 'slug', 'job_title', 'department', 'photo')}),
        ('Bio', {'fields': ('bio',)}),
        ('Contact', {'fields': ('email', 'phone')}),
        ('Social', {'fields': ('linkedin_url', 'twitter_url', 'github_url')}),
        ('Visibility', {'fields': ('is_leadership', 'is_active', 'join_date', 'order')}),
    )


# ─────────────────────────────────────────────
# CAREERS
# ─────────────────────────────────────────────

class JobApplicationInline(admin.TabularInline):
    model   = JobApplication
    extra   = 0
    fields  = ('first_name', 'last_name', 'email', 'status', 'years_of_experience', 'created_at')
    readonly_fields = ('first_name', 'last_name', 'email', 'years_of_experience', 'created_at')
    can_delete = False
    show_change_link = True

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(JobOpening)
class JobOpeningAdmin(admin.ModelAdmin):
    list_display    = ('title', 'department', 'level_badge', 'job_type', 'location',
                       'is_remote', 'deadline', 'expired_flag', 'application_count', 'is_active')
    list_filter     = ('department', 'job_type', 'level', 'is_remote', 'is_active')
    search_fields   = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('technologies',)
    list_editable   = ('is_active',)
    inlines         = [JobApplicationInline]
    fieldsets = (
        ('Role', {'fields': ('title', 'slug', 'department', 'job_type', 'level')}),
        ('Location', {'fields': ('location', 'is_remote')}),
        ('Content', {'fields': ('description', 'responsibilities', 'requirements', 'nice_to_have')}),
        ('Compensation', {'fields': ('salary_min', 'salary_max', 'salary_currency')}),
        ('Technologies', {'fields': ('technologies',)}),
        ('Settings', {'fields': ('deadline', 'is_active')}),
    )

    @admin.display(description='Level')
    def level_badge(self, obj):
        colours = {
            'junior': '#10b981', 'mid': '#3b82f6', 'senior': '#8b5cf6',
            'lead': '#f59e0b', 'manager': '#ef4444', 'director': '#dc2626',
        }
        return color_badge(colours.get(obj.level, '#6b7280'), obj.get_level_display())

    @admin.display(description='Expired', boolean=True)
    def expired_flag(self, obj):
        return obj.is_expired

    @admin.display(description='Applications')
    def application_count(self, obj):
        return obj.applications.count()


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display    = ('full_name', 'job', 'email', 'years_of_experience',
                       'status_badge', 'created_at', 'reviewed_by')
    list_filter     = ('status', 'job__department', 'created_at')
    search_fields   = ('first_name', 'last_name', 'email', 'job__title')
    readonly_fields = ('id', 'created_at', 'updated_at')
    raw_id_fields   = ('reviewed_by',)
    list_editable   = ()
    fieldsets = (
        ('Applicant', {
            'fields': ('first_name', 'last_name', 'email', 'phone',
                       'linkedin_url', 'portfolio_url')
        }),
        ('Application', {
            'fields': ('job', 'cover_letter', 'resume',
                       'years_of_experience', 'expected_salary', 'available_from')
        }),
        ('Review', {
            'fields': ('status', 'reviewer_notes', 'reviewed_by')
        }),
        ('Meta', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Full Name')
    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    @admin.display(description='Status')
    def status_badge(self, obj):
        colours = {
            'received': '#6b7280', 'reviewing': '#3b82f6', 'shortlisted': '#8b5cf6',
            'interview': '#f59e0b', 'offered': '#10b981', 'hired': '#059669',
            'rejected': '#ef4444', 'withdrawn': '#d1d5db',
        }
        return color_badge(colours.get(obj.status, '#6b7280'), obj.get_status_display())


# ─────────────────────────────────────────────
# BLOG
# ─────────────────────────────────────────────

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display  = ('name', 'slug', 'color_preview', 'post_count')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

    @admin.display(description='Color')
    def color_preview(self, obj):
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 10px;'
            'border-radius:4px;font-size:11px">{}</span>',
            obj.color_hex, obj.color_hex,
        )

    @admin.display(description='Posts')
    def post_count(self, obj):
        return obj.posts.filter(is_published=True).count()


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display    = ('title', 'author', 'category', 'is_published',
                       'published_at', 'views_count', 'read_time_minutes')
    list_filter     = ('is_published', 'is_active', 'category', 'created_at')
    search_fields   = ('title', 'excerpt', 'body')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    list_editable   = ('is_published',)
    date_hierarchy  = 'published_at'
    raw_id_fields   = ('author',)
    readonly_fields = ('views_count', 'published_at', 'created_at', 'updated_at')
    fieldsets = (
        ('Post', {'fields': ('title', 'slug', 'author', 'category')}),
        ('Content', {'fields': ('excerpt', 'body', 'cover_image', 'read_time_minutes')}),
        ('Tags', {'fields': ('tags',)}),
        ('Publishing', {'fields': ('is_published', 'is_active', 'published_at')}),
        ('Stats', {
            'fields': ('views_count', 'created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    actions = ['publish_posts', 'unpublish_posts']

    @admin.action(description='Publish selected posts')
    def publish_posts(self, request, queryset):
        updated = queryset.filter(is_published=False).update(
            is_published=True, published_at=timezone.now()
        )
        self.message_user(request, f"{updated} post(s) published.")

    @admin.action(description='Unpublish selected posts')
    def unpublish_posts(self, request, queryset):
        updated = queryset.filter(is_published=True).update(is_published=False)
        self.message_user(request, f"{updated} post(s) unpublished.")


# ─────────────────────────────────────────────
# TESTIMONIALS
# ─────────────────────────────────────────────

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ('client_name', 'client_company', 'rating_stars', 'project', 'is_featured', 'is_active')
    list_filter   = ('rating', 'is_featured', 'is_active')
    search_fields = ('client_name', 'client_company', 'content')
    list_editable = ('is_featured', 'is_active')
    raw_id_fields = ('project',)

    @admin.display(description='Rating')
    def rating_stars(self, obj):
        return star_rating(obj.rating)


# ─────────────────────────────────────────────
# CONTACT MESSAGES
# ─────────────────────────────────────────────

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display    = ('full_name', 'email', 'company', 'inquiry_type',
                       'subject', 'status_badge', 'assigned_to', 'created_at')
    list_filter     = ('status', 'inquiry_type', 'created_at')
    search_fields   = ('full_name', 'email', 'company', 'subject', 'message')
    readonly_fields = ('id', 'ip_address', 'created_at', 'updated_at')
    raw_id_fields   = ('assigned_to',)
    list_editable   = ()
    date_hierarchy  = 'created_at'
    fieldsets = (
        ('Sender', {'fields': ('full_name', 'email', 'phone', 'company')}),
        ('Message', {'fields': ('inquiry_type', 'subject', 'message', 'budget_range')}),
        ('Management', {'fields': ('status', 'assigned_to', 'replied_at')}),
        ('Meta', {
            'fields': ('id', 'ip_address', 'created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    actions = ['mark_read', 'mark_replied', 'mark_archived']

    @admin.display(description='Status')
    def status_badge(self, obj):
        colours = {
            'new': '#ef4444', 'read': '#f59e0b',
            'replied': '#10b981', 'archived': '#6b7280',
        }
        return color_badge(colours.get(obj.status, '#6b7280'), obj.get_status_display())

    @admin.action(description='Mark selected as Read')
    def mark_read(self, request, queryset):
        queryset.update(status='read')

    @admin.action(description='Mark selected as Replied')
    def mark_replied(self, request, queryset):
        queryset.update(status='replied', replied_at=timezone.now())

    @admin.action(description='Archive selected')
    def mark_archived(self, request, queryset):
        queryset.update(status='archived')


# ─────────────────────────────────────────────
# COMPANY STATS
# ─────────────────────────────────────────────

@admin.register(CompanyStat)
class CompanyStatAdmin(admin.ModelAdmin):
    list_display  = ('label', 'value', 'icon_class', 'description', 'order', 'is_active')
    list_editable = ('value', 'order', 'is_active')
    search_fields = ('label', 'description')
    ordering      = ('order',)


# ─────────────────────────────────────────────
# PARTNER LOGOS
# ─────────────────────────────────────────────

@admin.register(PartnerLogo)
class PartnerLogoAdmin(admin.ModelAdmin):
    list_display  = ('name', 'type_badge', 'website_url', 'order', 'is_active')
    list_filter   = ('is_client', 'is_active')
    search_fields = ('name',)
    list_editable = ('order', 'is_active')

    @admin.display(description='Type')
    def type_badge(self, obj):
        if obj.is_client:
            return color_badge('#3b82f6', 'Client')
        return color_badge('#8b5cf6', 'Tech Partner')


# ─────────────────────────────────────────────
# NEWSLETTER
# ─────────────────────────────────────────────

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display  = ('email', 'full_name', 'source', 'confirmed', 'confirmed_at', 'is_active', 'created_at')
    list_filter   = ('confirmed', 'source', 'is_active')
    search_fields = ('email', 'full_name')
    list_editable = ('is_active',)
    readonly_fields = ('confirmed_at', 'created_at', 'updated_at')
    date_hierarchy = 'created_at'

    actions = ['confirm_subscribers', 'deactivate_subscribers']

    @admin.action(description='Mark selected as confirmed')
    def confirm_subscribers(self, request, queryset):
        updated = queryset.filter(confirmed=False).update(
            confirmed=True, confirmed_at=timezone.now()
        )
        self.message_user(request, f"{updated} subscriber(s) confirmed.")

    @admin.action(description='Deactivate selected subscribers')
    def deactivate_subscribers(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} subscriber(s) deactivated.")