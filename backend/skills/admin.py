from django.contrib import admin


from .models import Skill


# Register your models here.

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        # "category",
        "is_active",
    )

    list_filter = (
        # "category",
        "is_active",
    )

    search_fields = (
        "name",
    )


