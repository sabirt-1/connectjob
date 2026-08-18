


from django.urls import path

from .views import (
    notification_list_view,
    unread_notification_count_view,
    mark_notification_read_view,
    mark_all_notifications_read_view,
)


urlpatterns = [

    path("", notification_list_view, name="notification-list"),

    path("unread-count/", unread_notification_count_view, name="notification-unread-count"),

    path("<int:notification_id>/read/", mark_notification_read_view, name="notification-read"),

    path("read-all/", mark_all_notifications_read_view, name="notification-read-all"),

]

