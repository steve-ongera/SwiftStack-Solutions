"""
core/management/commands/seed_data.py
Populates the database with realistic demo data for SwiftStack Solutions.
Usage: python manage.py seed_data
       python manage.py seed_data --clear   # wipe first, then seed
"""

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify
from datetime import date, timedelta
import random


class Command(BaseCommand):
    help = "Seed the database with demo data for SwiftStack Solutions"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Clear existing data before seeding",
        )

    def handle(self, *args, **options):
        # Import here to avoid AppRegistryNotReady issues
        from core.models import (
            Technology, ServiceCategory, Service, ServiceFeature,
            Project, ProjectImage, Department, TeamMember,
            JobOpening, BlogCategory, BlogPost, Testimonial,
            ContactMessage, CompanyStat, PartnerLogo, NewsletterSubscriber,
        )

        if options["clear"]:
            self.stdout.write(self.style.WARNING("Clearing existing data..."))
            self._clear_all()

        self.stdout.write("Seeding data...")

        # Order matters – FK dependencies first
        techs       = self._seed_technologies()
        categories  = self._seed_service_categories()
        services    = self._seed_services(categories, techs)
        projects    = self._seed_projects(techs, services)
        departments = self._seed_departments()
        self._seed_team(departments)
        self._seed_jobs(departments, techs)
        blog_cats   = self._seed_blog_categories()
        superuser   = self._get_or_create_superuser()
        self._seed_blog_posts(blog_cats, techs, superuser)
        self._seed_testimonials(projects)
        self._seed_contact_messages()
        self._seed_stats()
        self._seed_partners()
        self._seed_newsletter()

        self.stdout.write(self.style.SUCCESS("✅  Seed complete!"))

    # ------------------------------------------------------------------ #
    #  CLEAR                                                               #
    # ------------------------------------------------------------------ #

    def _clear_all(self):
        from core.models import (
            NewsletterSubscriber, PartnerLogo, CompanyStat, ContactMessage,
            Testimonial, BlogPost, BlogCategory, JobOpening, TeamMember,
            Department, ProjectImage, Project, ServiceFeature, Service,
            ServiceCategory, Technology,
        )
        models = [
            NewsletterSubscriber, PartnerLogo, CompanyStat, ContactMessage,
            Testimonial, BlogPost, BlogCategory, JobOpening, TeamMember,
            Department, ProjectImage, Project, ServiceFeature, Service,
            ServiceCategory, Technology,
        ]
        for model in models:
            deleted, _ = model.objects.all().delete()
            self.stdout.write(f"  Deleted {deleted} {model.__name__} records")

    # ------------------------------------------------------------------ #
    #  SUPERUSER                                                           #
    # ------------------------------------------------------------------ #

    def _get_or_create_superuser(self):
        user, created = User.objects.get_or_create(
            username="admin",
            defaults=dict(
                email="admin@swiftstack.co.ke",
                is_staff=True,
                is_superuser=True,
                first_name="Admin",
                last_name="SwiftStack",
            ),
        )
        if created:
            user.set_password("admin1234")
            user.save()
            self.stdout.write("  Created superuser  admin / admin1234")
        return user

    # ------------------------------------------------------------------ #
    #  TECHNOLOGIES                                                        #
    # ------------------------------------------------------------------ #

    def _seed_technologies(self):
        from core.models import Technology

        data = [
            # Frontend
            ("React",         "frontend", "bi-filetype-jsx",  "#61DAFB"),
            ("Next.js",       "frontend", "bi-layout-text-window", "#000000"),
            ("Vue.js",        "frontend", "bi-filetype-vue",  "#42B883"),
            ("TypeScript",    "frontend", "bi-filetype-tsx",  "#3178C6"),
            ("Tailwind CSS",  "frontend", "bi-wind",          "#06B6D4"),
            # Backend
            ("Django",        "backend",  "bi-server",        "#092E20"),
            ("FastAPI",       "backend",  "bi-lightning",     "#009688"),
            ("Node.js",       "backend",  "bi-boxes",         "#339933"),
            ("GraphQL",       "backend",  "bi-diagram-3",     "#E10098"),
            ("REST API",      "backend",  "bi-plug",          "#FF6B35"),
            # Database
            ("PostgreSQL",    "database", "bi-database",      "#336791"),
            ("MySQL",         "database", "bi-database-fill", "#4479A1"),
            ("MongoDB",       "database", "bi-collection",    "#47A248"),
            ("Redis",         "database", "bi-lightning-fill","#DC382D"),
            # Cloud
            ("AWS",           "cloud",    "bi-cloud",         "#FF9900"),
            ("Docker",        "cloud",    "bi-box-seam",      "#2496ED"),
            ("Kubernetes",    "cloud",    "bi-diagram-2",     "#326CE5"),
            ("GitHub Actions","cloud",    "bi-git",           "#2088FF"),
            # Mobile
            ("React Native",  "mobile",   "bi-phone",         "#61DAFB"),
            ("Flutter",       "mobile",   "bi-phone-fill",    "#54C5F8"),
            # AI / ML
            ("Python",        "ai_ml",    "bi-filetype-py",   "#3776AB"),
            ("TensorFlow",    "ai_ml",    "bi-cpu",           "#FF6F00"),
            ("OpenAI API",    "ai_ml",    "bi-robot",         "#412991"),
        ]

        objs = {}
        for name, cat, icon, color in data:
            obj, _ = Technology.objects.get_or_create(
                name=name,
                defaults=dict(category=cat, icon_class=icon, color_hex=color),
            )
            objs[name] = obj
        self.stdout.write(f"  Technologies: {len(objs)}")
        return objs

    # ------------------------------------------------------------------ #
    #  SERVICE CATEGORIES                                                  #
    # ------------------------------------------------------------------ #

    def _seed_service_categories(self):
        from core.models import ServiceCategory

        data = [
            ("Web Development",     "bi-globe",          0),
            ("Mobile Development",  "bi-phone",          1),
            ("Cloud & DevOps",      "bi-cloud-arrow-up", 2),
            ("AI & Automation",     "bi-robot",          3),
            ("UI/UX Design",        "bi-palette",        4),
            ("Consulting",          "bi-briefcase",      5),
        ]

        objs = {}
        for name, icon, order in data:
            obj, _ = ServiceCategory.objects.get_or_create(
                name=name,
                defaults=dict(icon_class=icon, order=order,
                              description=f"Expert {name.lower()} services."),
            )
            objs[name] = obj
        self.stdout.write(f"  Service categories: {len(objs)}")
        return objs

    # ------------------------------------------------------------------ #
    #  SERVICES                                                            #
    # ------------------------------------------------------------------ #

    def _seed_services(self, categories, techs):
        from core.models import Service, ServiceFeature

        services_data = [
            {
                "title": "Custom Web Application Development",
                "category": "Web Development",
                "short_description": "Scalable, modern web apps built with cutting-edge frameworks.",
                "full_description": (
                    "We design and build robust web applications tailored to your business needs. "
                    "From MVPs to enterprise-grade platforms, our team handles architecture, "
                    "development, testing, and deployment."
                ),
                "tier": "professional",
                "price_from": 150000,
                "is_featured": True,
                "order": 0,
                "techs": ["React", "Django", "PostgreSQL", "AWS"],
                "features": [
                    "Responsive, mobile-first design",
                    "RESTful & GraphQL API integration",
                    "Authentication & authorisation",
                    "CI/CD pipeline setup",
                    "Post-launch support & maintenance",
                ],
            },
            {
                "title": "E-Commerce Solutions",
                "category": "Web Development",
                "short_description": "End-to-end online stores with payment gateway integration.",
                "full_description": (
                    "We build feature-rich e-commerce platforms with M-Pesa, Stripe, and PayPal "
                    "integrations, inventory management, and analytics dashboards."
                ),
                "tier": "professional",
                "price_from": 120000,
                "is_featured": True,
                "order": 1,
                "techs": ["React", "Next.js", "Django", "PostgreSQL"],
                "features": [
                    "M-Pesa & card payment integration",
                    "Product catalogue & inventory management",
                    "Order tracking & notifications",
                    "Admin dashboard with analytics",
                    "SEO-optimised storefront",
                ],
            },
            {
                "title": "Mobile App Development",
                "category": "Mobile Development",
                "short_description": "Cross-platform iOS & Android apps that users love.",
                "full_description": (
                    "Our mobile team crafts high-performance apps using React Native and Flutter, "
                    "delivering a native feel across platforms without doubling development costs."
                ),
                "tier": "professional",
                "price_from": 200000,
                "is_featured": True,
                "order": 2,
                "techs": ["React Native", "Flutter", "Node.js", "MongoDB"],
                "features": [
                    "Single codebase for iOS & Android",
                    "Offline-first architecture",
                    "Push notifications",
                    "App Store & Play Store publishing",
                    "Analytics & crash reporting",
                ],
            },
            {
                "title": "Cloud Infrastructure & DevOps",
                "category": "Cloud & DevOps",
                "short_description": "Reliable cloud setups that scale with your business.",
                "full_description": (
                    "From containerisation to fully automated CI/CD pipelines, we help you ship "
                    "faster and sleep better at night with robust monitoring and auto-scaling."
                ),
                "tier": "enterprise",
                "price_from": 80000,
                "is_featured": False,
                "order": 3,
                "techs": ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
                "features": [
                    "AWS / GCP / Azure architecture design",
                    "Docker & Kubernetes orchestration",
                    "Automated CI/CD pipelines",
                    "24/7 monitoring & alerting",
                    "Cost optimisation reviews",
                ],
            },
            {
                "title": "AI & Automation Solutions",
                "category": "AI & Automation",
                "short_description": "Intelligent systems that automate repetitive work and unlock insights.",
                "full_description": (
                    "We integrate LLMs, computer vision, and predictive analytics into your "
                    "existing workflows to reduce manual effort and surface actionable intelligence."
                ),
                "tier": "enterprise",
                "price_from": 250000,
                "is_featured": True,
                "order": 4,
                "techs": ["Python", "TensorFlow", "OpenAI API", "FastAPI"],
                "features": [
                    "Custom LLM integrations (OpenAI, Gemini)",
                    "Document intelligence & OCR",
                    "Predictive analytics dashboards",
                    "Chatbot & virtual assistant development",
                    "Process automation with n8n / Zapier",
                ],
            },
            {
                "title": "UI/UX Design & Prototyping",
                "category": "UI/UX Design",
                "short_description": "Beautiful, intuitive interfaces backed by user research.",
                "full_description": (
                    "Our designers produce wireframes, high-fidelity prototypes, and full design "
                    "systems that delight users and reduce development rework."
                ),
                "tier": "starter",
                "price_from": 50000,
                "is_featured": False,
                "order": 5,
                "techs": ["React", "Tailwind CSS", "TypeScript"],
                "features": [
                    "User research & journey mapping",
                    "Wireframes & interactive prototypes",
                    "Design system & component library",
                    "Accessibility (WCAG 2.1) compliance",
                    "Handoff to development team",
                ],
            },
        ]

        objs = []
        for d in services_data:
            svc, created = Service.objects.get_or_create(
                title=d["title"],
                defaults=dict(
                    category=categories.get(d["category"]),
                    short_description=d["short_description"],
                    full_description=d["full_description"],
                    tier=d["tier"],
                    price_from=d["price_from"],
                    is_featured=d["is_featured"],
                    order=d["order"],
                ),
            )
            if created:
                svc.technologies.set([techs[t] for t in d["techs"] if t in techs])
                for i, feat in enumerate(d["features"]):
                    ServiceFeature.objects.get_or_create(service=svc, feature=feat, defaults={"order": i})
            objs.append(svc)

        self.stdout.write(f"  Services: {len(objs)}")
        return objs

    # ------------------------------------------------------------------ #
    #  PROJECTS                                                            #
    # ------------------------------------------------------------------ #

    def _seed_projects(self, techs, services):
        from core.models import Project

        projects_data = [
            {
                "title": "Duka Digital – Multi-Vendor Marketplace",
                "client_name": "Duka Digital Ltd",
                "client_industry": "E-Commerce",
                "short_description": "Kenya's first multi-vendor electronics marketplace with M-Pesa checkout.",
                "full_description": "A fully-featured marketplace allowing hundreds of vendors to list products, manage inventory, and receive payments via M-Pesa and card.",
                "challenge": "The client needed a scalable platform that could handle thousands of concurrent users during flash sales while keeping vendor onboarding simple.",
                "solution": "We built a microservices-based architecture on AWS with auto-scaling, a React storefront, and a Django admin portal for vendors.",
                "outcome": "30,000 active users in the first 3 months. Average page load under 1.2 s. Vendor onboarding reduced from 3 days to 4 hours.",
                "status": "featured",
                "is_featured": True,
                "completion_date": date(2024, 8, 15),
                "duration_weeks": 16,
                "team_size": 5,
                "techs": ["React", "Django", "PostgreSQL", "AWS", "Redis"],
                "order": 0,
            },
            {
                "title": "AfyaTrack – Patient Management System",
                "client_name": "AfyaTrack Health",
                "client_industry": "Healthcare",
                "short_description": "Digital health platform for clinic patient records and appointment scheduling.",
                "full_description": "A HIPAA-compliant patient management system used by 20+ clinics across Nairobi, replacing paper records with a fast, offline-capable web app.",
                "challenge": "Rural clinics had unreliable internet; the system needed to work offline and sync when connectivity returned.",
                "solution": "We implemented a Progressive Web App with IndexedDB for offline storage and a background sync service worker.",
                "outcome": "Reduced patient waiting time by 40%. 98.5% data sync accuracy across 20 clinics.",
                "status": "completed",
                "is_featured": True,
                "completion_date": date(2024, 3, 1),
                "duration_weeks": 20,
                "team_size": 4,
                "techs": ["React", "FastAPI", "PostgreSQL", "Docker"],
                "order": 1,
            },
            {
                "title": "SwiftRide – Ride-Hailing Mobile App",
                "client_name": "SwiftRide Technologies",
                "client_industry": "Transport",
                "short_description": "Uber-style ride-hailing app for Nairobi with real-time tracking.",
                "full_description": "A cross-platform mobile app with driver and passenger interfaces, real-time GPS tracking, surge pricing, and M-Pesa wallet integration.",
                "challenge": "Matching drivers to passengers within 90 seconds in a city with inconsistent addresses required a custom geocoding layer.",
                "solution": "We built a custom location service using geohashing and WebSockets for sub-second driver location updates.",
                "outcome": "10,000 rides in the first month. Driver acceptance rate of 87%. Average pickup time 4.2 minutes.",
                "status": "ongoing",
                "is_featured": True,
                "completion_date": None,
                "duration_weeks": 24,
                "team_size": 6,
                "techs": ["React Native", "Node.js", "MongoDB", "Redis", "AWS"],
                "order": 2,
            },
            {
                "title": "ShambaLink – AgriTech Platform",
                "client_name": "ShambaLink Africa",
                "client_industry": "Agriculture",
                "short_description": "Connecting smallholder farmers directly to buyers via a mobile marketplace.",
                "full_description": "A dual-sided marketplace (USSD + app) that lets farmers list produce and buyers place bulk orders, with logistics coordination built in.",
                "challenge": "Most target farmers owned feature phones; the platform had to work over USSD in addition to a smartphone app.",
                "solution": "We integrated Africa's Talking USSD API for feature-phone access and built a React Native app for smartphone users sharing the same Django API.",
                "outcome": "4,200 farmers onboarded in 60 days. Average farm income increased by 22% within 6 months.",
                "status": "completed",
                "is_featured": False,
                "completion_date": date(2023, 11, 30),
                "duration_weeks": 18,
                "team_size": 4,
                "techs": ["React Native", "Django", "PostgreSQL", "Python"],
                "order": 3,
            },
            {
                "title": "FinSight – SME Financial Dashboard",
                "client_name": "FinSight Analytics",
                "client_industry": "Fintech",
                "short_description": "AI-powered financial analytics dashboard for small businesses.",
                "full_description": "A SaaS dashboard that ingests M-Pesa statements, bank exports, and manual entries to give SME owners a clear picture of cash flow, profit, and forecasts.",
                "challenge": "Parsing inconsistent M-Pesa statement formats from different periods required a robust extraction pipeline.",
                "solution": "We built a Python-based PDF parser with ML classification to normalise transactions, feeding a FastAPI backend that powers real-time charts.",
                "outcome": "500 SMEs signed up in beta. Average time-to-insight reduced from 2 days to under 5 minutes.",
                "status": "completed",
                "is_featured": False,
                "completion_date": date(2024, 1, 20),
                "duration_weeks": 14,
                "team_size": 3,
                "techs": ["Python", "FastAPI", "React", "PostgreSQL", "OpenAI API"],
                "order": 4,
            },
        ]

        objs = []
        for d in projects_data:
            proj, created = Project.objects.get_or_create(
                title=d["title"],
                defaults=dict(
                    client_name=d["client_name"],
                    client_industry=d["client_industry"],
                    short_description=d["short_description"],
                    full_description=d["full_description"],
                    challenge=d["challenge"],
                    solution=d["solution"],
                    outcome=d["outcome"],
                    status=d["status"],
                    is_featured=d["is_featured"],
                    completion_date=d["completion_date"],
                    duration_weeks=d["duration_weeks"],
                    team_size=d["team_size"],
                    order=d["order"],
                ),
            )
            if created:
                proj.technologies.set([techs[t] for t in d["techs"] if t in techs])
            objs.append(proj)

        self.stdout.write(f"  Projects: {len(objs)}")
        return objs

    # ------------------------------------------------------------------ #
    #  DEPARTMENTS                                                         #
    # ------------------------------------------------------------------ #

    def _seed_departments(self):
        from core.models import Department

        names = ["Engineering", "Design", "Product", "Sales & Marketing", "Operations", "HR"]
        objs = {}
        for name in names:
            obj, _ = Department.objects.get_or_create(name=name)
            objs[name] = obj
        self.stdout.write(f"  Departments: {len(objs)}")
        return objs

    # ------------------------------------------------------------------ #
    #  TEAM MEMBERS                                                        #
    # ------------------------------------------------------------------ #

    def _seed_team(self, departments):
        from core.models import TeamMember

        members = [
            {
                "full_name": "Brian Ochieng",
                "job_title": "CEO & Co-Founder",
                "department": "Operations",
                "bio": "Brian has 12 years of experience building software companies across East Africa. He founded SwiftStack after leading engineering teams at Safaricom and Andela.",
                "is_leadership": True,
                "order": 0,
                "linkedin_url": "https://linkedin.com",
                "join_date": date(2019, 1, 15),
            },
            {
                "full_name": "Amina Wanjiru",
                "job_title": "CTO & Co-Founder",
                "department": "Engineering",
                "bio": "Amina is a distributed systems expert with a passion for developer experience. She holds an MSc in Computer Science from the University of Nairobi.",
                "is_leadership": True,
                "order": 1,
                "linkedin_url": "https://linkedin.com",
                "join_date": date(2019, 1, 15),
            },
            {
                "full_name": "Kevin Mutua",
                "job_title": "Head of Engineering",
                "department": "Engineering",
                "bio": "Kevin leads our backend guild, specialising in Python, Django, and cloud-native architectures. He's shipped products used by millions across Africa.",
                "is_leadership": True,
                "order": 2,
                "join_date": date(2020, 3, 1),
            },
            {
                "full_name": "Mercy Njoroge",
                "job_title": "Lead UI/UX Designer",
                "department": "Design",
                "bio": "Mercy brings 7 years of product design experience, having previously worked with Twiga Foods and Flutterwave. She champions accessibility-first design.",
                "is_leadership": False,
                "order": 3,
                "join_date": date(2021, 6, 1),
            },
            {
                "full_name": "David Kamau",
                "job_title": "Senior Full-Stack Developer",
                "department": "Engineering",
                "bio": "David is a React and Django specialist who has contributed to several open-source projects. He mentors junior developers in the local tech community.",
                "is_leadership": False,
                "order": 4,
                "join_date": date(2021, 9, 1),
            },
            {
                "full_name": "Fatuma Hassan",
                "job_title": "Mobile Developer",
                "department": "Engineering",
                "bio": "Fatuma builds beautiful cross-platform mobile apps with React Native and Flutter. Her apps have a combined 50k+ downloads on the Play Store.",
                "is_leadership": False,
                "order": 5,
                "join_date": date(2022, 2, 14),
            },
            {
                "full_name": "James Karanja",
                "job_title": "DevOps Engineer",
                "department": "Engineering",
                "bio": "James keeps our infrastructure humming — from zero-downtime deployments to cost-optimised Kubernetes clusters on AWS.",
                "is_leadership": False,
                "order": 6,
                "join_date": date(2022, 5, 1),
            },
            {
                "full_name": "Grace Otieno",
                "job_title": "Business Development Manager",
                "department": "Sales & Marketing",
                "bio": "Grace drives partnerships and client relationships across East Africa. She has an MBA from Strathmore University.",
                "is_leadership": False,
                "order": 7,
                "join_date": date(2022, 8, 1),
            },
        ]

        objs = []
        for m in members:
            dept = departments.get(m.pop("department"))
            member, _ = TeamMember.objects.get_or_create(
                full_name=m["full_name"],
                defaults=dict(**m, department=dept),
            )
            objs.append(member)

        self.stdout.write(f"  Team members: {len(objs)}")
        return objs

    # ------------------------------------------------------------------ #
    #  JOB OPENINGS                                                        #
    # ------------------------------------------------------------------ #

    def _seed_jobs(self, departments, techs):
        from core.models import JobOpening

        jobs = [
            {
                "title": "Senior Backend Developer (Django/Python)",
                "department": "Engineering",
                "job_type": "full_time",
                "level": "senior",
                "description": "Join our backend guild to design and build the APIs that power our client products. You'll own features end-to-end and mentor mid-level developers.",
                "responsibilities": "Design and implement RESTful & GraphQL APIs\nWrite comprehensive tests (unit, integration)\nParticipate in architecture decisions\nCode review and mentorship\nCollaborate with DevOps on deployments",
                "requirements": "4+ years Django / Python experience\nStrong PostgreSQL skills\nFamiliarity with Docker and CI/CD\nExcellent written English\nBSc Computer Science or equivalent",
                "salary_min": 180000,
                "salary_max": 280000,
                "deadline": date.today() + timedelta(days=30),
                "techs": ["Django", "Python", "PostgreSQL", "Docker"],
            },
            {
                "title": "React Frontend Developer",
                "department": "Engineering",
                "job_type": "full_time",
                "level": "mid",
                "description": "Build fast, accessible, and beautiful user interfaces for our clients' web applications.",
                "responsibilities": "Implement pixel-perfect UI from Figma designs\nOptimise for performance and Core Web Vitals\nWrite reusable component libraries\nCollaborate closely with designers\nWrite unit tests with Vitest / Testing Library",
                "requirements": "3+ years React experience\nTypeScript proficiency\nCSS / Tailwind expertise\nGit workflow (PRs, code review)\nEye for detail",
                "salary_min": 120000,
                "salary_max": 200000,
                "deadline": date.today() + timedelta(days=21),
                "techs": ["React", "TypeScript", "Tailwind CSS"],
            },
            {
                "title": "Mobile Developer (React Native)",
                "department": "Engineering",
                "job_type": "full_time",
                "level": "mid",
                "description": "Develop cross-platform mobile apps that feel native on both iOS and Android.",
                "responsibilities": "Build features in React Native\nIntegrate with REST and WebSocket APIs\nPublish apps to App Store and Play Store\nDebug platform-specific issues\nWrite E2E tests with Detox",
                "requirements": "2+ years React Native experience\nFamiliarity with Expo\nBasic native module knowledge (iOS/Android)\nExperience with push notifications\nStrong JavaScript / TypeScript skills",
                "salary_min": 100000,
                "salary_max": 180000,
                "deadline": date.today() + timedelta(days=45),
                "techs": ["React Native", "TypeScript", "Node.js"],
            },
            {
                "title": "UI/UX Designer",
                "department": "Design",
                "job_type": "full_time",
                "level": "mid",
                "description": "Create user-centred designs for web and mobile products, from research through to developer handoff.",
                "responsibilities": "Conduct user interviews and usability tests\nProduce wireframes and high-fidelity prototypes in Figma\nMaintain and evolve design systems\nCollaborate with engineers on implementation\nChampion accessibility in every design decision",
                "requirements": "3+ years product design experience\nProficiency in Figma\nPortfolio of shipped products\nUnderstanding of frontend constraints\nExcellent communication skills",
                "salary_min": 90000,
                "salary_max": 150000,
                "deadline": date.today() + timedelta(days=14),
                "techs": ["React", "Tailwind CSS"],
            },
            {
                "title": "DevOps / Cloud Engineer",
                "department": "Engineering",
                "job_type": "full_time",
                "level": "senior",
                "is_remote": True,
                "description": "Own the infrastructure that keeps our clients' systems running reliably and efficiently.",
                "responsibilities": "Design and manage AWS infrastructure with Terraform\nBuild and maintain CI/CD pipelines\nSet up monitoring, alerting, and on-call rotations\nConduct cost optimisation reviews\nImplement security best practices",
                "requirements": "AWS Certified Solutions Architect (preferred)\n3+ years DevOps experience\nKubernetes / EKS expertise\nTerraform proficiency\nScripting in Python or Bash",
                "salary_min": 200000,
                "salary_max": 320000,
                "deadline": date.today() + timedelta(days=60),
                "techs": ["AWS", "Docker", "Kubernetes", "Python"],
            },
        ]

        count = 0
        for j in jobs:
            dept = departments.get(j.pop("department"))
            job_techs = j.pop("techs")
            is_remote = j.pop("is_remote", False)
            job, created = JobOpening.objects.get_or_create(
                title=j["title"],
                defaults=dict(**j, department=dept, location="Nairobi, Kenya", is_remote=is_remote),
            )
            if created:
                job.technologies.set([techs[t] for t in job_techs if t in techs])
            count += 1

        self.stdout.write(f"  Job openings: {count}")

    # ------------------------------------------------------------------ #
    #  BLOG                                                                #
    # ------------------------------------------------------------------ #

    def _seed_blog_categories(self):
        from core.models import BlogCategory

        cats = [
            ("Engineering",      "#1a3c6e"),
            ("Design",           "#7c3aed"),
            ("Product",          "#059669"),
            ("Company News",     "#d97706"),
            ("Tutorials",        "#dc2626"),
            ("Industry Insights","#0891b2"),
        ]
        objs = {}
        for name, color in cats:
            obj, _ = BlogCategory.objects.get_or_create(name=name, defaults={"color_hex": color})
            objs[name] = obj
        self.stdout.write(f"  Blog categories: {len(objs)}")
        return objs

    def _seed_blog_posts(self, blog_cats, techs, author):
        from core.models import BlogPost

        posts = [
            {
                "title": "Building Offline-First Web Apps with Service Workers",
                "category": "Engineering",
                "excerpt": "A practical guide to making your web app work seamlessly without internet — lessons learned from the AfyaTrack project.",
                "body": """Offline-first is no longer a nice-to-have in East Africa — it's a competitive necessity. In this post we share the architecture decisions we made on the AfyaTrack clinic management system that allowed 20 rural clinics to work without reliable internet.\n\n## The Challenge\n\nRural health facilities often have intermittent connectivity. Nurses needed to access patient records, record vitals, and schedule appointments regardless of network status.\n\n## Our Approach\n\nWe chose a Service Worker with a Cache-First strategy for static assets and a Background Sync queue for mutations. IndexedDB served as the local data store, with a lightweight sync protocol to resolve conflicts when connectivity returned.\n\n## Key Lessons\n\n1. Design your data model for eventual consistency from day one.\n2. Conflict resolution is a product decision, not just a technical one — involve stakeholders early.\n3. Test offline behaviour in CI using Playwright's network condition mocking.\n\nThe result: 98.5% data sync accuracy and zero data loss events in 12 months of production.""",
                "is_published": True,
                "read_time_minutes": 8,
                "tags": ["React", "Django", "Python"],
            },
            {
                "title": "M-Pesa STK Push Integration with Django: A Complete Guide",
                "category": "Tutorials",
                "excerpt": "Step-by-step tutorial on integrating Safaricom Daraja 2.0 API into your Django application.",
                "body": """M-Pesa is the lifeblood of Kenyan commerce. In this guide, we walk through a production-ready integration using Safaricom's Daraja 2.0 API.\n\n## Prerequisites\n\n- A Safaricom Developer account\n- A Django 4.x project\n- ngrok or a public URL for callback testing\n\n## Step 1: OAuth Token\n\nThe Daraja API uses short-lived OAuth tokens. We recommend caching them in Redis with a TTL slightly shorter than their 1-hour expiry.\n\n## Step 2: Initiating STK Push\n\nSend a POST request to the STK Push endpoint with your Business Short Code, Lipa Na M-Pesa Online Passkey, and the customer's phone number.\n\n## Step 3: Handling the Callback\n\nSafaricom will POST a callback to your endpoint within seconds. Validate the checksum, update your transaction record, and respond with a 200 OK immediately.\n\n## Production Tips\n\n- Always process callbacks asynchronously with Celery.\n- Implement idempotency keys to avoid double-processing.\n- Log everything — Safaricom support will ask for request IDs.""",
                "is_published": True,
                "read_time_minutes": 12,
                "tags": ["Django", "Python", "REST API"],
            },
            {
                "title": "Why We Chose Next.js Over Plain React for Our Client Projects",
                "category": "Engineering",
                "excerpt": "After shipping 15+ projects in both frameworks, here's our honest take on when Next.js earns its keep.",
                "body": """The question comes up in every project kick-off: plain React SPA or Next.js? After shipping dozens of projects in both, we've developed a clear decision framework.\n\n## When Next.js Wins\n\n**SEO-sensitive apps**: The App Router's server components mean Google sees your content immediately — critical for e-commerce and content sites.\n\n**Time to first byte**: Streaming SSR dramatically improves perceived performance on slower African mobile networks.\n\n**Image optimisation**: next/image alone has saved our clients significant bandwidth costs on AWS CloudFront.\n\n## When Plain React Wins\n\n**Authenticated dashboards**: If 100% of your content is behind a login, SSR buys you nothing. A Vite SPA is simpler and cheaper to host.\n\n**Tight CDN budgets**: Serverless functions cost money per invocation. A static SPA is free to host on S3 + CloudFront.\n\n## Our Current Default\n\nWe default to Next.js with the App Router for new projects and evaluate downwards from there. The ecosystem, deployment story on Vercel or EC2, and developer experience make it the safer bet for most of what we build.""",
                "is_published": True,
                "read_time_minutes": 6,
                "tags": ["React", "Next.js", "TypeScript"],
            },
            {
                "title": "SwiftStack Turns 5: Lessons from Building a Software Agency in Nairobi",
                "category": "Company News",
                "excerpt": "Five years, 60+ projects, and a few hard lessons — our CEO Brian Ochieng reflects on building SwiftStack from a co-working space.",
                "body": """Five years ago, Amina and I incorporated SwiftStack Solutions from a hot desk at iHub. We had one client, two laptops, and a shared conviction that East African businesses deserved world-class software.\n\nToday we have a team of 25, an office in Westlands, and clients across Kenya, Uganda, and the UK. Here's what we learned.\n\n## Lesson 1: Specialise Earlier Than You Think\n\nOur first two years we said yes to everything — WordPress sites, Excel automation, even a logo redesign. The projects that made us proud (and profitable) were always the complex web and mobile apps. We should have narrowed our focus by year one.\n\n## Lesson 2: Productise Your Services\n\nFixed-scope, fixed-price engagements are seductive but dangerous. Moving to time-and-materials with clear sprint reviews transformed our client relationships and our margins.\n\n## Lesson 3: Invest in Your Team's Growth\n\nWe allocate 10% of every developer's time to learning — courses, open source, internal hackathons. The compounding effect on quality and retention has been the best investment we've made.\n\nHere's to the next five years.""",
                "is_published": True,
                "read_time_minutes": 7,
                "tags": ["Python", "React"],
            },
            {
                "title": "Designing for USSD: UX Principles for Feature Phone Users",
                "category": "Design",
                "excerpt": "Lessons from the ShambaLink project on designing intuitive USSD flows for first-time smartphone users.",
                "body": """USSD menus are a 30-year-old technology still used by hundreds of millions of Africans daily. Designing for USSD requires unlearning almost everything we know about modern UX.\n\n## Constraint is a Feature\n\nYou have 182 characters per screen. No images. No back button (unless you build one). This forces radical clarity — every word must earn its place.\n\n## Key Principles We Learned\n\n**1. Start with the most common action.** Farmers used ShambaLink 80% of the time to check their current listing prices. That became option 1 on every menu.\n\n**2. Never nest more than 3 levels deep.** Users forget where they came from. If you need a 4th level, rethink the information architecture.\n\n**3. Use familiar number metaphors.** Options numbered 1-4 feel natural. Alphanumeric codes feel like a bank PIN — intimidating.\n\n**4. Test with actual users, not colleagues.** Our office team completed the USSD flow in 45 seconds. First-time users in Machakos took 4 minutes. We reworked the copy three times.""",
                "is_published": True,
                "read_time_minutes": 9,
                "tags": ["React", "TypeScript"],
            },
        ]

        count = 0
        for p in posts:
            cat = blog_cats.get(p.pop("category"))
            post_tags = p.pop("tags")
            post, created = BlogPost.objects.get_or_create(
                title=p["title"],
                defaults=dict(
                    **p,
                    author=author,
                    category=cat,
                    published_at=timezone.now() - timedelta(days=random.randint(1, 180)),
                ),
            )
            if created:
                post.tags.set([techs[t] for t in post_tags if t in techs])
            count += 1

        self.stdout.write(f"  Blog posts: {count}")

    # ------------------------------------------------------------------ #
    #  TESTIMONIALS                                                        #
    # ------------------------------------------------------------------ #

    def _seed_testimonials(self, projects):
        from core.models import Testimonial

        data = [
            {
                "client_name": "Peter Njeru",
                "client_title": "CEO",
                "client_company": "Duka Digital Ltd",
                "content": "SwiftStack delivered a platform that exceeded every expectation. The team's communication was exceptional throughout — we always knew exactly where the project stood. Within three months of launch we had 30,000 active users.",
                "rating": 5,
                "is_featured": True,
                "project_index": 0,
            },
            {
                "client_name": "Dr. Sarah Mwangi",
                "client_title": "Medical Director",
                "client_company": "AfyaTrack Health",
                "content": "The offline-first approach SwiftStack recommended was a game-changer for our rural clinics. Patient waiting times dropped by 40% and our nurses actually enjoy using the system.",
                "rating": 5,
                "is_featured": True,
                "project_index": 1,
            },
            {
                "client_name": "Alex Ouma",
                "client_title": "CTO",
                "client_company": "SwiftRide Technologies",
                "content": "We interviewed five agencies. SwiftStack won because they asked the hard technical questions before writing a single line of code. The real-time tracking system they built handles peak-hour load without breaking a sweat.",
                "rating": 5,
                "is_featured": True,
                "project_index": 2,
            },
            {
                "client_name": "Jane Adhiambo",
                "client_title": "Co-Founder",
                "client_company": "ShambaLink Africa",
                "content": "Building for USSD alongside a mobile app is genuinely complex. SwiftStack's experience with Africa's Talking APIs and the care they put into testing with real farmers made all the difference.",
                "rating": 5,
                "is_featured": False,
                "project_index": 3,
            },
            {
                "client_name": "Michael Waweru",
                "client_title": "Founder",
                "client_company": "FinSight Analytics",
                "content": "The M-Pesa statement parser they built works better than anything I've seen from much larger teams. SwiftStack punches well above their weight.",
                "rating": 4,
                "is_featured": False,
                "project_index": 4,
            },
        ]

        count = 0
        for d in data:
            proj_idx = d.pop("project_index")
            project = projects[proj_idx] if proj_idx < len(projects) else None
            Testimonial.objects.get_or_create(
                client_name=d["client_name"],
                defaults=dict(**d, project=project),
            )
            count += 1

        self.stdout.write(f"  Testimonials: {count}")

    # ------------------------------------------------------------------ #
    #  CONTACT MESSAGES                                                    #
    # ------------------------------------------------------------------ #

    def _seed_contact_messages(self):
        from core.models import ContactMessage

        messages = [
            {
                "full_name": "Samuel Kiragu",
                "email": "samuel.kiragu@example.com",
                "company": "Kiragu Holdings",
                "inquiry_type": "project",
                "subject": "E-commerce platform for retail chain",
                "message": "We are a retail chain with 12 branches across Kenya and would like to build an online store integrated with our POS system. Could you provide a quote?",
                "budget_range": "KES 500,000 – 1,000,000",
                "status": "read",
            },
            {
                "full_name": "Priya Sharma",
                "email": "priya@techstartup.io",
                "company": "TechStartup.io",
                "inquiry_type": "project",
                "subject": "MVP development for logistics app",
                "message": "We need an experienced team to build an MVP for a logistics matching platform in 3 months. Do you have availability?",
                "budget_range": "USD 30,000 – 50,000",
                "status": "replied",
            },
            {
                "full_name": "Omar Hassan",
                "email": "omar@ngoconnect.org",
                "company": "NGO Connect",
                "inquiry_type": "general",
                "subject": "NGO beneficiary management system",
                "message": "We are an NGO looking for a partner to digitise our field data collection and beneficiary tracking. We have a limited budget but a compelling mission.",
                "budget_range": "KES 200,000 – 400,000",
                "status": "new",
            },
        ]

        count = 0
        for m in messages:
            ContactMessage.objects.get_or_create(email=m["email"], subject=m["subject"], defaults=m)
            count += 1

        self.stdout.write(f"  Contact messages: {count}")

    # ------------------------------------------------------------------ #
    #  COMPANY STATS                                                       #
    # ------------------------------------------------------------------ #

    def _seed_stats(self):
        from core.models import CompanyStat

        stats = [
            ("Projects Delivered", "60+",  "bi-briefcase",      "Successful client projects across Africa", 0),
            ("Happy Clients",      "45+",  "bi-people",         "Clients who keep coming back",             1),
            ("Team Members",       "25",   "bi-person-badge",   "Talented engineers, designers & strategists", 2),
            ("Countries Served",   "6",    "bi-globe-africa",   "Kenya, Uganda, Tanzania, Rwanda, UK, UAE", 3),
            ("Uptime SLA",         "99.9%","bi-shield-check",   "Average uptime across hosted projects",    4),
            ("Years in Business",  "5+",   "bi-calendar-check", "Building software since 2019",             5),
        ]

        count = 0
        for label, value, icon, desc, order in stats:
            CompanyStat.objects.get_or_create(
                label=label,
                defaults=dict(value=value, icon_class=icon, description=desc, order=order),
            )
            count += 1

        self.stdout.write(f"  Company stats: {count}")

    # ------------------------------------------------------------------ #
    #  PARTNERS / CLIENT LOGOS                                             #
    # ------------------------------------------------------------------ #

    def _seed_partners(self):
        from core.models import PartnerLogo

        partners = [
            ("Safaricom", True,  "https://www.safaricom.co.ke", 0),
            ("AWS",       False, "https://aws.amazon.com",       1),
            ("Andela",    True,  "https://andela.com",           2),
            ("iHub",      True,  "https://ihub.co.ke",           3),
            ("Vercel",    False, "https://vercel.com",           4),
        ]

        count = 0
        for name, is_client, url, order in partners:
            # Logo images are seeded without a file — set in admin later
            PartnerLogo.objects.get_or_create(
                name=name,
                defaults=dict(is_client=is_client, website_url=url, order=order),
            )
            count += 1

        self.stdout.write(f"  Partners: {count}")

    # ------------------------------------------------------------------ #
    #  NEWSLETTER SUBSCRIBERS                                              #
    # ------------------------------------------------------------------ #

    def _seed_newsletter(self):
        from core.models import NewsletterSubscriber

        subscribers = [
            ("alice@example.com", "Alice Njeri",  True,  "blog"),
            ("bob@example.com",   "Bob Kariuki",  True,  "footer"),
            ("carol@example.com", "Carol Mutiso", False, "popup"),
        ]

        count = 0
        for email, name, confirmed, source in subscribers:
            NewsletterSubscriber.objects.get_or_create(
                email=email,
                defaults=dict(
                    full_name=name,
                    confirmed=confirmed,
                    confirmed_at=timezone.now() if confirmed else None,
                    source=source,
                ),
            )
            count += 1

        self.stdout.write(f"  Newsletter subscribers: {count}")