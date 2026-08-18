
from django.db import models

from django.contrib.auth.models import AbstractUser

from django.db.models.signals import post_save
from django.dispatch import receiver

from skills.models import Skill
from django.utils import timezone

# Create your models here.


class User(AbstractUser):

    ROLE_CHOICES = (
        ("candidate", "Candidate"),
        ("employer", "Employer"),
        ("admin", "Admin"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES
    )

    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    profile_image = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )

    # Email Verification

    email_verified = models.BooleanField(
        default=False
    )

    otp = models.CharField(
        max_length=6,
        blank=True,
        null=True
    )

    otp_created_at = models.DateTimeField(
        blank=True,
        null=True
    )

    # Password Reset
    
    password_reset_token = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    password_reset_expiry = models.DateTimeField(
        blank=True,
        null=True
    )

    # Premium

    premium = models.BooleanField(
        default=False
    )

    PREMIUM_CHOICES = (
        ("free", "Free"),
        ("candidate", "Candidate Premium"),
        ("employer", "Employer Premium"),
    )

    premium_type = models.CharField(
        max_length=20,
        choices=PREMIUM_CHOICES,
        default="free"
    )

    premium_expiry = models.DateTimeField(
        blank=True,
        null=True
    )

    # Dashboard

    is_profile_completed = models.BooleanField(
        default=False
    )

    last_seen = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.username




class CandidateProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="candidate_profile"
    )

    full_name = models.CharField(
        max_length=150,
        blank=True
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    location = models.CharField(
        max_length=150,
        blank=True 
    )

    headline = models.CharField(max_length=200, blank=True)

    about = models.TextField(blank=True)

    bio = models.TextField(blank=True)

    # skills = models.TextField(blank=True)
    skills = models.ManyToManyField(
        Skill,
        blank=True,
        related_name="candidates"
    )

    experience = models.TextField(blank=True)

    education = models.TextField(blank=True)

    resume = models.FileField(
        upload_to='resumes/',
        blank=True,
        null=True
    )

    profile_image = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )

    linkedin = models.URLField(
        blank=True,
        null=True
    )

    github = models.URLField(
        blank=True,
        null=True
    )

    portfolio = models.URLField(
        blank=True
    )

    def __str__(self):
        return self.user.username


class CandidateCustomSkill(models.Model):

    candidate = models.ForeignKey(
        CandidateProfile,
        on_delete=models.CASCADE,
        related_name="custom_skills"
    )

    name = models.CharField(
        max_length=100
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["name"]
        constraints = [
            models.UniqueConstraint(
                fields=["candidate", "name"],
                name="unique_candidate_custom_skill"
            )
        ]

    def __str__(self):
        return f"{self.candidate.user.username} - {self.name}"


class EmployerProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="employer_profile"
    )

    full_name = models.CharField(
        max_length=150,
        blank=True
    )

    designation = models.CharField(
        max_length=100,
        blank=True
    )

    company_name = models.CharField(
        max_length=200,
        blank=True
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    location = models.CharField(
        max_length=200,
        blank=True
    )


    website = models.URLField(
        blank=True,
        null=True
    )

    about = models.TextField(
        blank=True
    )

    profile_image = models.ImageField(
        upload_to="employers/",
        blank=True,
        null=True
    )

    def __str__(self):

        return self.user.username



@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):

    if not created:
        return

    if instance.role == "candidate":

        CandidateProfile.objects.create(
            user=instance,
            headline="",
            bio="",
            experience="",
            education=""
        )

    elif instance.role == "employer":

        EmployerProfile.objects.create(
            user=instance,
            full_name="",
            designation="",
            company_name="",
            phone="",
            location="",
            about=""
        )


