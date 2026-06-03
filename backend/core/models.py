"""
models.py — SwiftStack Solutions
Full data layer: Services, Portfolio, Team, Careers, Blog, Contact, Stats
"""

from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
import uuid


# ─────────────────────────────────────────────
# UTILITY / ABSTRACT
# ─────────────────────────────────────────────

class TimeStampedModel(models.Model):
    """Abstract base model with created/updated timestamps."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class PublishedManager(models.Manager):
    """Returns only published/active records."""
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


# ─────────────────────────────────────────────
# TECHNOLOGY / SKILLS TAG
# ─────────────────────────────────────────────

class Technology(TimeStampedModel):
    """Tech stack tags (Python, React, AWS, etc.)"""

    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('cloud', 'Cloud & DevOps'),
        ('mobile', 'Mobile'),
        ('ai_ml', 'AI / ML'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    icon_class = models.CharField(max_length=80, blank=True, help_text="Bootstrap icon class e.g. bi-python")
    color_hex = models.CharField(max_length=7, default='#1a3c6e')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    is_active = models.BooleanField(default=True)

    objects = models.Manager()
    active = PublishedManager()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Technologies"
        ordering = ['category', 'name']


# ─────────────────────────────────────────────
# SERVICES
# ─────────────────────────────────────────────

class ServiceCategory(TimeStampedModel):
    """Groups services into categories."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    icon_class = models.CharField(max_length=80, default='bi-grid')
    order = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Service Categories"
        ordering = ['order', 'name']


class Service(TimeStampedModel):
    """Core service offerings of SwiftStack Solutions."""

    TIER_CHOICES = [
        ('starter', 'Starter'),
        ('professional', 'Professional'),
        ('enterprise', 'Enterprise'),
    ]

    category = models.ForeignKey(
        ServiceCategory, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='services'
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    short_description = models.CharField(max_length=300)
    full_description = models.TextField()
    icon_class = models.CharField(max_length=80, default='bi-code-slash', help_text="Bootstrap icon")
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    technologies = models.ManyToManyField(Technology, blank=True, related_name='services')
    tier = models.CharField(max_length=20, choices=TIER_CHOICES, default='professional')
    price_from = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    objects = models.Manager()
    active = PublishedManager()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order', 'title']


class ServiceFeature(models.Model):
    """Bullet-point features listed under a service."""
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='features')
    feature = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.service.title} — {self.feature}"

    class Meta:
        ordering = ['order']


# ─────────────────────────────────────────────
# PORTFOLIO / PROJECTS
# ─────────────────────────────────────────────

class Project(TimeStampedModel):
    """Portfolio projects showcasing work done by SwiftStack."""

    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('ongoing', 'Ongoing'),
        ('featured', 'Featured'),
    ]

    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=270, unique=True, blank=True)
    client_name = models.CharField(max_length=200, blank=True)
    client_industry = models.CharField(max_length=100, blank=True)
    short_description = models.CharField(max_length=350)
    full_description = models.TextField()
    challenge = models.TextField(blank=True, help_text="Problem statement / challenge faced")
    solution = models.TextField(blank=True, help_text="How SwiftStack solved it")
    outcome = models.TextField(blank=True, help_text="Results and impact")
    cover_image = models.ImageField(upload_to='projects/covers/', blank=True, null=True)
    technologies = models.ManyToManyField(Technology, blank=True, related_name='projects')
    services = models.ManyToManyField(Service, blank=True, related_name='projects')
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    completion_date = models.DateField(null=True, blank=True)
    duration_weeks = models.PositiveIntegerField(null=True, blank=True)
    team_size = models.PositiveIntegerField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    objects = models.Manager()
    active = PublishedManager()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-is_featured', 'order', '-completion_date']


class ProjectImage(TimeStampedModel):
    """Gallery images for a project."""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.project.title} — image {self.order}"

    class Meta:
        ordering = ['order']


# ─────────────────────────────────────────────
# TEAM MEMBERS
# ─────────────────────────────────────────────

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class TeamMember(TimeStampedModel):
    """Staff and leadership team profiles."""
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True)
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, blank=True, related_name='members'
    )
    full_name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    job_title = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='team/', blank=True, null=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    is_leadership = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    join_date = models.DateField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    objects = models.Manager()
    active = PublishedManager()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.full_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} — {self.job_title}"

    class Meta:
        ordering = ['-is_leadership', 'order', 'full_name']


# ─────────────────────────────────────────────
# CAREERS
# ─────────────────────────────────────────────

class JobOpening(TimeStampedModel):
    """Open job positions at SwiftStack Solutions."""

    TYPE_CHOICES = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
        ('remote', 'Remote'),
    ]

    LEVEL_CHOICES = [
        ('junior', 'Junior'),
        ('mid', 'Mid-Level'),
        ('senior', 'Senior'),
        ('lead', 'Lead'),
        ('manager', 'Manager'),
        ('director', 'Director'),
    ]

    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, blank=True, related_name='openings'
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    job_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='full_time')
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='mid')
    location = models.CharField(max_length=150, default='Nairobi, Kenya')
    is_remote = models.BooleanField(default=False)
    description = models.TextField()
    responsibilities = models.TextField(help_text="Comma- or newline-separated list")
    requirements = models.TextField(help_text="Comma- or newline-separated list")
    nice_to_have = models.TextField(blank=True)
    salary_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    salary_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    salary_currency = models.CharField(max_length=5, default='KES')
    technologies = models.ManyToManyField(Technology, blank=True, related_name='job_openings')
    deadline = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    views_count = models.PositiveIntegerField(default=0)

    objects = models.Manager()
    active = PublishedManager()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def is_expired(self):
        if self.deadline:
            return timezone.now().date() > self.deadline
        return False

    def __str__(self):
        return f"{self.title} ({self.get_job_type_display()})"

    class Meta:
        ordering = ['-created_at']


class JobApplication(TimeStampedModel):
    """Applicant submissions for a job opening."""

    STATUS_CHOICES = [
        ('received', 'Received'),
        ('reviewing', 'Under Review'),
        ('shortlisted', 'Shortlisted'),
        ('interview', 'Interview Scheduled'),
        ('offered', 'Offer Extended'),
        ('hired', 'Hired'),
        ('rejected', 'Not Proceeding'),
        ('withdrawn', 'Withdrawn'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job = models.ForeignKey(JobOpening, on_delete=models.CASCADE, related_name='applications')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    linkedin_url = models.URLField(blank=True)
    portfolio_url = models.URLField(blank=True)
    cover_letter = models.TextField()
    resume = models.FileField(upload_to='resumes/')
    years_of_experience = models.PositiveIntegerField(default=0)
    expected_salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    available_from = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='received')
    reviewer_notes = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_applications'
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} → {self.job.title}"

    class Meta:
        ordering = ['-created_at']
        unique_together = [['job', 'email']]


# ─────────────────────────────────────────────
# BLOG / INSIGHTS
# ─────────────────────────────────────────────

class BlogCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    color_hex = models.CharField(max_length=7, default='#1a3c6e')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Blog Categories"


class BlogPost(TimeStampedModel):
    """News, articles, and insights published by SwiftStack."""

    author = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='blog_posts'
    )
    category = models.ForeignKey(
        BlogCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts'
    )
    title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=320, unique=True, blank=True)
    excerpt = models.CharField(max_length=400)
    body = models.TextField()
    cover_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    tags = models.ManyToManyField(Technology, blank=True, related_name='blog_posts')
    is_published = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    published_at = models.DateTimeField(null=True, blank=True)
    views_count = models.PositiveIntegerField(default=0)
    read_time_minutes = models.PositiveIntegerField(default=5)

    objects = models.Manager()
    active = PublishedManager()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-published_at', '-created_at']


# ─────────────────────────────────────────────
# TESTIMONIALS
# ─────────────────────────────────────────────

class Testimonial(TimeStampedModel):
    """Client testimonials and reviews."""
    client_name = models.CharField(max_length=200)
    client_title = models.CharField(max_length=200, blank=True)
    client_company = models.CharField(max_length=200, blank=True)
    client_photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    project = models.ForeignKey(
        Project, on_delete=models.SET_NULL, null=True, blank=True, related_name='testimonials'
    )
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(
        default=5, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = models.Manager()
    active = PublishedManager()

    def __str__(self):
        return f"{self.client_name} ({self.client_company}) — {self.rating}★"

    class Meta:
        ordering = ['-is_featured', '-rating', '-created_at']


# ─────────────────────────────────────────────
# CONTACT
# ─────────────────────────────────────────────

class ContactMessage(TimeStampedModel):
    """Inbound messages from the contact form."""

    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('archived', 'Archived'),
    ]

    INQUIRY_CHOICES = [
        ('general', 'General Inquiry'),
        ('project', 'Project Quote'),
        ('support', 'Technical Support'),
        ('partnership', 'Partnership'),
        ('careers', 'Careers'),
        ('press', 'Press / Media'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    company = models.CharField(max_length=200, blank=True)
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_CHOICES, default='general')
    subject = models.CharField(max_length=300)
    message = models.TextField()
    budget_range = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    assigned_to = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_messages'
    )
    replied_at = models.DateTimeField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        return f"{self.full_name} — {self.subject} [{self.get_status_display()}]"

    class Meta:
        ordering = ['-created_at']


# ─────────────────────────────────────────────
# COMPANY STATS
# ─────────────────────────────────────────────

class CompanyStat(TimeStampedModel):
    """Dynamic counters displayed on the homepage (projects, clients, etc.)."""
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50, help_text="e.g. '150+' or '99%'")
    icon_class = models.CharField(max_length=80, default='bi-bar-chart')
    description = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    objects = models.Manager()
    active = PublishedManager()

    def __str__(self):
        return f"{self.label}: {self.value}"

    class Meta:
        ordering = ['order']


# ─────────────────────────────────────────────
# PARTNERS / CLIENTS LOGOS
# ─────────────────────────────────────────────

class PartnerLogo(TimeStampedModel):
    """Logos of client companies or technology partners."""
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='partners/')
    website_url = models.URLField(blank=True)
    is_client = models.BooleanField(default=True, help_text="True=client, False=tech partner")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    objects = models.Manager()
    active = PublishedManager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order', 'name']


# ─────────────────────────────────────────────
# NEWSLETTER
# ─────────────────────────────────────────────

class NewsletterSubscriber(TimeStampedModel):
    """Email list for company newsletter."""
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)
    confirmed = models.BooleanField(default=False)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    source = models.CharField(
        max_length=50,
        choices=[('footer', 'Footer Form'), ('blog', 'Blog Page'), ('popup', 'Popup')],
        default='footer'
    )

    objects = models.Manager()
    active = PublishedManager()

    def __str__(self):
        return self.email

    class Meta:
        ordering = ['-created_at']