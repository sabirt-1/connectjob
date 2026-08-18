


from django.urls import path

from .views import (
    skill_list_view,
    public_skill_list_view,
    create_skill_view,
    update_skill_view,
    delete_skill_view,
    toggle_skill_status_view,
)


urlpatterns = [

    path( "", skill_list_view, name="skill-list" ),

    path("public/", public_skill_list_view, name="public-skill-list"),

    path("create/", create_skill_view, name="create-skill"),

    path("<int:skill_id>/update/", update_skill_view, name="update-skill"),

    path("<int:skill_id>/delete/", delete_skill_view, name="delete-skill"),

    path("<int:skill_id>/toggle-status/", toggle_skill_status_view, name="toggle-skill-status",),


]

