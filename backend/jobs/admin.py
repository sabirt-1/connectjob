
from django.contrib import admin
from .models import Job

# Register your models here.
admin.site.register(Job)

class JobAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "company",
        "category",
        "location",
        "job_type",
        "is_active",
    )

    list_filter = (
        "category",
        "job_type",
        "is_active",
    )

    search_fields = (
        "title",
        "location",
        "description",
    )

    filter_horizontal = (
        "skills",
    )

