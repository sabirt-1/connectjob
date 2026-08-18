from django.db import models

from django.conf import settings

# Create your models here.

class Company(models.Model):

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='companies'
    )

    company_name = models.CharField(max_length=255)

    logo = models.ImageField(
        upload_to='company_logos/',
        blank=True,
        null=True
    )

    website = models.URLField(
        blank=True,
        null=True
    )

    description = models.TextField()

    industry = models.CharField(
        max_length=200,
        blank=True
    )

    company_size = models.CharField(
        max_length=100,
        blank=True
    )

    location = models.CharField(
        max_length=255,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    hr_name = models.CharField(max_length=100)

    contact_email = models.EmailField()

    contact_phone = models.CharField(max_length=20)

    def __str__(self):
        return self.company_name
    
    