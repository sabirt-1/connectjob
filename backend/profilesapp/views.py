from django.shortcuts import render

from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import CandidateProfile

from .models import (
    Education, 
    Experience,
    Project,
    Certification,
    Language,
)

from .serializers import (
    EducationSerializer,
    ExperienceSerializer,
    ProjectSerializer,
    CertificationSerializer,
    LanguageSerializer,
)


# Create your views here.


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def education_list_view(request):

    # profile = CandidateProfile.objects.get(
    #     user=request.user
    # )
    # profile, created = CandidateProfile.objects.get_or_create(
    #     user=request.user
    # )
    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    educations = Education.objects.filter(
        profile=profile
    )

    serializer = EducationSerializer(
        educations,
        many=True
    )

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_education_view(request):

    # profile = CandidateProfile.objects.get(
    #     user=request.user
    # )
    # profile, created = CandidateProfile.objects.get_or_create(
    #     user=request.user
    # )
    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )
    
    serializer = EducationSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            profile=profile
        )

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_education_view(request, pk):

    # profile = CandidateProfile.objects.get(
    #     user=request.user
    # )
    # profile, created = CandidateProfile.objects.get_or_create(
    #     user=request.user
    # )
    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    # education = Education.objects.get(
    #     pk=pk,
    #     profile=profile
    # )
    education = get_object_or_404(
        Education,
        pk=pk,
        profile=profile
    )

    serializer = EducationSerializer(

        education,

        data=request.data,

        partial=True

    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_education_view(request, pk):

    # profile = CandidateProfile.objects.get(
    #     user=request.user
    # )
    # profile, created = CandidateProfile.objects.get_or_create(
    #     user=request.user
    # )
    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    # education = Education.objects.get(
    #     pk=pk,
    #     profile=profile
    # )
    education = get_object_or_404(
        Education,
        pk=pk,
        profile=profile
    )

    education.delete()

    return Response({

        "message": "Education deleted successfully."

    })



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def experience_list_view(request):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    experiences = Experience.objects.filter(
        profile=profile
    )

    serializer = ExperienceSerializer(
        experiences,
        many=True
    )

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_experience_view(request):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    serializer = ExperienceSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            profile=profile
        )

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_experience_view(request, pk):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    # education = get_object_or_404(
    #     Experience,
    #     pk=pk,
    #     profile=profile
    # )
    experience = get_object_or_404(
        Experience,
        pk=pk,
        profile=profile
    )

    serializer = ExperienceSerializer(

        # education,
        experience,

        data=request.data,

        partial=True

    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_experience_view(request, pk):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    experience = get_object_or_404(
        Experience,
        pk=pk,
        profile=profile
    )

    experience.delete()

    return Response({

        "message": "Experience deleted successfully."

    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def project_list_view(request):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    projects = Project.objects.filter(
        profile=profile
    )

    serializer = ProjectSerializer(
        projects,
        many=True
    )

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_project_view(request):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    serializer = ProjectSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            profile=profile
        )

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_project_view(request, pk):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    project = get_object_or_404(

        Project,

        pk=pk,

        profile=profile

    )

    serializer = ProjectSerializer(

        project,

        data=request.data,

        partial=True

    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_project_view(request, pk):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    project = get_object_or_404(

        Project,

        pk=pk,

        profile=profile

    )

    project.delete()

    return Response({

        "message": "Project deleted successfully."

    })

# Certificate
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def certification_list_view(request):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    certifications = Certification.objects.filter(
        profile=profile
    )

    serializer = CertificationSerializer(
        certifications,
        many=True,
    )

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_certification_view(request):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    serializer = CertificationSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(profile=profile)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_certification_view(request, pk):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    certification = get_object_or_404(

        Certification,

        pk=pk,

        profile=profile,

    )

    serializer = CertificationSerializer(

        certification,

        data=request.data,

        partial=True,

    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST,

    )

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_certification_view(request, pk):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    certification = get_object_or_404(

        Certification,

        pk=pk,

        profile=profile,

    )

    certification.delete()

    return Response(

        {

            "message": "Certification deleted successfully"

        },

        status=status.HTTP_204_NO_CONTENT,

    )

# Language
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def language_list_view(request):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    languages = Language.objects.filter(
        profile=profile
    )

    serializer = LanguageSerializer(
        languages,
        many=True,
    )

    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_language_view(request):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    serializer = LanguageSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(profile=profile)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_language_view(request, pk):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    language = get_object_or_404(

        Language,

        pk=pk,

        profile=profile,

    )

    serializer = LanguageSerializer(

        language,

        data=request.data,

        partial=True,

    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST,

    )

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_language_view(request, pk):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    language = get_object_or_404(

        Language,

        pk=pk,

        profile=profile,

    )

    language.delete()

    return Response(

        {

            "message": "Language deleted successfully"

        },

        status=status.HTTP_204_NO_CONTENT,

    )


