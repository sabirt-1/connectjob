

from django.shortcuts import render, get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from .models import Skill
from .serializers import SkillSerializer


# Create your views here.

# Admin - Get All Skills

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def skill_list_view(request):

    # queryset = Skill.objects.all()
    queryset = Skill.objects.filter(
        is_active=True
    )

    serializer = SkillSerializer(
        queryset,
        many=True
    )

    return Response(serializer.data)



# Public - Active Skills Only

@api_view(["GET"])
@permission_classes([AllowAny])
def public_skill_list_view(request):

    queryset = Skill.objects.filter(
        is_active=True
    )

    serializer = SkillSerializer(
        queryset,
        many=True
    )

    return Response(serializer.data)



# Create Skill

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_skill_view(request):

    serializer = SkillSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )



# Update Skill

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_skill_view(request, skill_id):

    try:

        skill = Skill.objects.get(
            id=skill_id
        )

    except Skill.DoesNotExist:

        return Response(
            {
                "error": "Skill not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = SkillSerializer(

        skill,

        data=request.data,

        partial=True

    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST

    )


# Delete Skill

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_skill_view(request, skill_id):

    try:

        skill = Skill.objects.get(
            id=skill_id
        )

    except Skill.DoesNotExist:

        return Response(
            {
                "error": "Skill not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    skill.delete()

    return Response(

        {
            "message": "Skill deleted successfully."
        },

        status=status.HTTP_200_OK

    )


@api_view(["PATCH"])
# @permission_classes([IsAuthenticated, IsAdmin])
@permission_classes([IsAuthenticated])
def toggle_skill_status_view(request, skill_id):

    skill = get_object_or_404(
        Skill,
        id=skill_id
    )

    skill.is_active = not skill.is_active

    skill.save()

    return Response({

        "message": "Skill status updated.",

        "is_active": skill.is_active

    })


