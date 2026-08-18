from django.db import models


from accounts.models import CandidateProfile

# Create your models here.


class Education(models.Model):

    profile = models.ForeignKey(
        CandidateProfile,
        on_delete=models.CASCADE,
        related_name="educations"
    )

    degree = models.CharField(
        max_length=150
    )

    institution = models.CharField(
        max_length=200
    )

    field_of_study = models.CharField(
        max_length=150,
        blank=True
    )

    start_date = models.DateField()

    end_date = models.DateField(
        blank=True,
        null=True
    )

    grade = models.CharField(
        max_length=50,
        blank=True
    )

    description = models.TextField(
        blank=True
    )

    currently_studying = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        ordering = ["-end_date", "-start_date"]

    def __str__(self):

        return f"{self.degree} - {self.institution}"


class Experience(models.Model):

    EMPLOYMENT_TYPES = (

        ("Full-time", "Full-time"),

        ("Part-time", "Part-time"),

        ("Internship", "Internship"),

        ("Contract", "Contract"),

        ("Freelance", "Freelance"),

        ("Remote", "Remote"),

    )

    profile = models.ForeignKey(

        CandidateProfile,

        on_delete=models.CASCADE,

        related_name="experiences"

    )

    job_title = models.CharField(

        max_length=150

    )

    company_name = models.CharField(

        max_length=200

    )

    location = models.CharField(

        max_length=150,

        blank=True

    )

    employment_type = models.CharField(

        max_length=30,

        choices=EMPLOYMENT_TYPES,

        default="Full-time"

    )

    start_date = models.DateField()

    end_date = models.DateField(

        blank=True,

        null=True

    )

    currently_working = models.BooleanField(

        default=False

    )

    description = models.TextField(

        blank=True

    )

    created_at = models.DateTimeField(

        auto_now_add=True

    )

    updated_at = models.DateTimeField(

        auto_now=True

    )

    class Meta:

        ordering = [

            "-end_date",

            "-start_date"

        ]

    def __str__(self):

        return (

            f"{self.job_title} - "

            f"{self.company_name}"

        )


class Project(models.Model):

    profile = models.ForeignKey(
        CandidateProfile,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    title = models.CharField(
        max_length=200
    )

    role = models.CharField(
        max_length=150,
        blank=True
    )

    organization = models.CharField(
        max_length=200,
        blank=True
    )

    description = models.TextField()

    technologies = models.CharField(
        max_length=300,
        blank=True,
        help_text="Comma separated technologies"
    )

    project_url = models.URLField(
        blank=True
    )

    github_url = models.URLField(
        blank=True
    )

    start_date = models.DateField(
        null=True,
        blank=True
    )

    end_date = models.DateField(
        null=True,
        blank=True
    )

    currently_working = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        ordering = [

            "-created_at"

        ]

    def __str__(self):

        return self.title
    

class Certification(models.Model):

    profile = models.ForeignKey(
        CandidateProfile,
        on_delete=models.CASCADE,
        related_name="certifications"
    )

    title = models.CharField(
        max_length=200
    )

    issuing_organization = models.CharField(
        max_length=200
    )

    issue_date = models.DateField()

    expiry_date = models.DateField(
        blank=True,
        null=True
    )

    credential_id = models.CharField(
        max_length=150,
        blank=True
    )

    credential_url = models.URLField(
        blank=True
    )

    description = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        ordering = [

            "-issue_date"

        ]

    def __str__(self):

        return self.title


class Language(models.Model):

    PROFICIENCY_CHOICES = [

        ("Beginner", "Beginner"),

        ("Intermediate", "Intermediate"),

        ("Professional", "Professional"),

        ("Native", "Native"),

    ]

    profile = models.ForeignKey(

        CandidateProfile,

        on_delete=models.CASCADE,

        related_name="languages",

    )

    language = models.CharField(

        max_length=100

    )

    proficiency = models.CharField(

        max_length=20,

        choices=PROFICIENCY_CHOICES,

        default="Beginner",

    )

    created_at = models.DateTimeField(

        auto_now_add=True

    )

    updated_at = models.DateTimeField(

        auto_now=True

    )

    class Meta:

        ordering = [

            "language"

        ]

    def __str__(self):

        return f"{self.language} ({self.proficiency})"
    

