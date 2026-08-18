from django.shortcuts import render

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    SummarySerializer,
    ExperienceImprovementSerializer,
    ProjectGeneratorSerializer,
    CoverLetterSerializer,
    JobMatchSerializer,
)

from .services import AIResumeService
# from profilesapp.models import Profile
from accounts.models import CandidateProfile
from resume.builder import generate_resume

# Create your views here.


class PremiumRequiredMixin:
    """
    Placeholder for Premium access.

    Replace this check later with your actual
    subscription/payment system.
    """

    def has_premium_access(self, request):
        user = request.user

        # Example:
        # return user.profile.is_premium

        return True



class GenerateSummaryView(
    PremiumRequiredMixin,
    APIView,
):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        print("STEP 1 - Request received")

        serializer = SummarySerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        print("STEP 2 - Serializer valid")

        ai = AIResumeService()

        print(serializer.validated_data)

        result = ai.generate_summary(
            {
                "personal": {
                    "fullName": serializer.validated_data["name"]
                },

                "skills": serializer.validated_data["skills"],

                "education": [
                    {
                        "degree": serializer.validated_data["education"]
                    }
                ],

                "experience": [
                    {
                        "job_title": serializer.validated_data["experience"]
                    }
                ],

                "projects": [
                    {
                        "title": serializer.validated_data["projects"]
                    }
                ],
            }
        )

        print("STEP 3 - AI Generated")

        return Response(result)


class SaveSummaryView(
    PremiumRequiredMixin,
    APIView,
):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        if not self.has_premium_access(request):
            return Response(
                {
                    "detail": "Premium membership required."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        summary = request.data.get("summary")

        if not summary:
            return Response(
                {
                    "summary": [
                        "This field is required."
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        
        profile, _ = CandidateProfile.objects.get_or_create(
            user=request.user
        )

        profile.bio = summary
        profile.save()

        return Response(
            {
                "success": True,
                "message": "Resume summary updated.",
                "summary": profile.bio,
            }
        )


class ImproveExperienceView(
    PremiumRequiredMixin,
    APIView,
):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        if not self.has_premium_access(request):
            return Response(
                {
                    "detail": "Premium membership required."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = ExperienceImprovementSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        ai = AIResumeService()

        result = ai.improve_experience(
            serializer.validated_data[
                "description"
            ]
        )

        return Response(result)


class GenerateProjectView(
    PremiumRequiredMixin,
    APIView,
):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        if not self.has_premium_access(request):
            return Response(
                {
                    "detail": "Premium membership required."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = ProjectGeneratorSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        ai = AIResumeService()

        result = ai.generate_project(
            **serializer.validated_data
        )

        return Response(result)


class GenerateCoverLetterView(
    PremiumRequiredMixin,
    APIView,
):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        if not self.has_premium_access(request):
            return Response(
                {
                    "detail": "Premium membership required."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = CoverLetterSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        resume = generate_resume(
            request.user
        )

        ai = AIResumeService()

        result = ai.generate_cover_letter(
            resume=resume,
            job_title=serializer.validated_data[
                "job_title"
            ],
            company=serializer.validated_data[
                "company"
            ],
        )

        return Response(result)

class JobMatchView(
    PremiumRequiredMixin,
    APIView,
):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        if not self.has_premium_access(request):
            return Response(
                {
                    "detail": "Premium membership required."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = JobMatchSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        resume = generate_resume(
            request.user
        )

        ai = AIResumeService()

        result = ai.analyze_job_match(

            resume,

            serializer.validated_data[
                "job_description"
            ],

        )

        return Response(result)


