from django.db import models

from django.conf import settings


# Create your models here.


class Notification(models.Model):

    TYPE_CHOICES = (
        ("job_application", "Job Application"),
        ("new_user", "New User"),
        ("new_employer", "New Employer"),
        ("application_status", "Application Status"),
    )

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    notification_type = models.CharField(
        max_length=50,
        choices=TYPE_CHOICES
    )

    title = models.CharField(
        max_length=200
    )

    message = models.TextField()

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.recipient.username} - {self.title}"

    

