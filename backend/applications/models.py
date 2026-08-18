

from django.db import models

from django.conf import settings
from jobs.models import Job

# Create your models here.


class Application(models.Model):

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('reviewing', 'Reviewing'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
        ('hired', 'Hired'),
    )

    candidate = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='applications'
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name='applications'
    )

    cover_letter = models.TextField(
        blank=True,
        null=True
    )

    resume = models.FileField(
        upload_to='resumes/'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    applied_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.candidate.username} - {self.job.title}"
    



class SavedJob(models.Model):

    candidate = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="saved_jobs"
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="saved_by"
    )

    saved_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        unique_together = (
            "candidate",
            "job"
        )

        ordering = ["-saved_at"]

    def __str__(self):

        return f"{self.candidate.username} saved {self.job.title}"



class RecentlyViewedJob(models.Model):

    candidate = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recent_jobs"
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="recent_views"
    )

    viewed_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        unique_together = (
            "candidate",
            "job"
        )

        ordering = [
            "-viewed_at"
        ]

    def __str__(self):

        return f"{self.candidate.username} viewed {self.job.title}"


