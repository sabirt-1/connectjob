from django.contrib import admin


from .models import (
    Education, 
    Experience, 
    Project,
    Certification,
    Language,
)


# Register your models here.


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):

    list_display = (
        "degree",
        "institution",
        "profile",
        "start_date",
        "end_date",
        "currently_studying",
    )

    search_fields = (
        "degree",
        "institution",
        "profile__user__username",
    )

    list_filter = (
        "currently_studying",
    )


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):

    list_display = (

        "job_title",

        "company_name",

        "employment_type",

        "profile",

        "currently_working",

    )

    search_fields = (

        "job_title",

        "company_name",

        "profile__user__username",

    )

    list_filter = (

        "employment_type",

        "currently_working",

    )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = (

        "title",

        "profile",

        "organization",

        "currently_working",

        "created_at"

    )

    search_fields = (

        "title",

        "organization",

        "profile__user__username"

    )


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):

    list_display = (

        "title",

        "issuing_organization",

        "profile",

        "issue_date",

    )

    search_fields = (

        "title",

        "issuing_organization",

        "profile__user__username",

    )

    list_filter = (

        "issue_date",

    )


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):

    list_display = (

        "language",

        "proficiency",

        "profile",

    )

    search_fields = (

        "language",

        "profile__user__username",

    )

    list_filter = (

        "proficiency",

    )


