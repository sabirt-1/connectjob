from django.shortcuts import render


from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer


# Create your views here.

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def notification_list_view(request):

    notifications = Notification.objects.filter(
        recipient=request.user
    )

    serializer = NotificationSerializer(
        notifications,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def unread_notification_count_view(request):

    count = Notification.objects.filter(
        recipient=request.user,
        is_read=False
    ).count()

    return Response({
        "count": count
    })


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def mark_notification_read_view(
    request,
    notification_id
):

    try:

        notification = Notification.objects.get(
            id=notification_id,
            recipient=request.user
        )

    except Notification.DoesNotExist:

        return Response(
            {
                "error": "Notification not found."
            },
            status=404
        )

    notification.is_read = True

    notification.save(
        update_fields=["is_read"]
    )

    return Response({
        "message": "Notification marked as read."
    })


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def mark_all_notifications_read_view(request):

    Notification.objects.filter(
        recipient=request.user,
        is_read=False
    ).update(
        is_read=True
    )

    return Response({
        "message": "All notifications marked as read."
    })

