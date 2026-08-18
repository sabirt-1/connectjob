

from django.contrib import admin

from .models import (
    User,
    CandidateProfile,
    EmployerProfile
)

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "username",
        "email",
        "role",
        "is_staff",
    )

    search_fields = (
        "username",
        "email",
    )

    list_filter = (
        "role",
        "is_staff",
    )
# 1.
# admin.site.register(User)
# class UserAdmin(admin.ModelAdmin):

#     list_display = (
#         "id",
#         "username",
#         "email",
#         "role",
#         "is_staff"
#     )

#     search_fields = (
#         "username",
#         "email"
#     )

#     list_filter = (
#         "role",
#         "is_staff"
#     )


@admin.register(CandidateProfile)
class CandidateProfileAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "full_name",
        "location",
    )

    search_fields = (
        "user__username",
        "full_name",
        "location",
    )

    filter_horizontal = (
        "skills",
    )


@admin.register(EmployerProfile)
class EmployerProfileAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "full_name",
        "company_name",
        "designation",
    )

    search_fields = (
        "user__username",
        "company_name",
    )


