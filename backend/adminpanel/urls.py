

from django.urls import path

from .views import admin_dashboard_view
from .views import admin_users_view
from .views import admin_user_detail_view
from .views import admin_update_user_view
from .views import admin_toggle_user_status_view
from .views import admin_delete_user_view



urlpatterns = [

    path( "dashboard/", admin_dashboard_view ),
    path( "users/", admin_users_view ),
    path( "users/<int:pk>/", admin_user_detail_view ),
    path( "users/<int:pk>/update/", admin_update_user_view),
    path( "users/<int:pk>/toggle-status/", admin_toggle_user_status_view),
    path( "users/<int:pk>/delete/", admin_delete_user_view),
 
]


