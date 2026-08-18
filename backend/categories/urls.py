


from django.urls import path

from .views import (
    category_list_view,
    public_category_list_view,
    create_category_view,
    update_category_view,
    delete_category_view,
)

urlpatterns = [

    path("", category_list_view ),
    path("public/", public_category_list_view ),
    path("create/", create_category_view ),
    path("<int:category_id>/update/", update_category_view),
    path("<int:category_id>/delete/", delete_category_view),

]

