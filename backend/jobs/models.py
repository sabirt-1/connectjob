
from django.db import models
from django.conf import settings

from companies.models import Company
from categories.models import Category
from skills.models import Skill

# Create your models here.

class Job(models.Model):

    JOB_TYPE_CHOICES = (
        ('full-time', 'Full Time'),
        ('part-time', 'Part Time'),
        ('remote', 'Remote'),
        ('internship', 'Internship'),
    )

    employer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='jobs'
    )

    title = models.CharField(max_length=200)

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='jobs',
        null=True,
        blank=True
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="jobs"
    )

    required_skills = models.ManyToManyField(
        Skill,
        blank=True,
        related_name="jobs"
    )

    custom_category = models.CharField(
        max_length=150,
        blank=True,
        null=True
    )

    description = models.TextField()

    location = models.CharField(max_length=200)

    salary = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    experience = models.CharField(max_length=100)

    job_type = models.CharField(
        max_length=20,
        choices=JOB_TYPE_CHOICES
    )

    vacancies = models.PositiveIntegerField(default=1)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title
    



class JobCustomSkill(models.Model):

    job = models.ForeignKey(
        Job,
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
                fields=["job", "name"],
                name="unique_job_custom_skill"
            )
        ]

    def __str__(self):
        return f"{self.job.title} - {self.name}"




