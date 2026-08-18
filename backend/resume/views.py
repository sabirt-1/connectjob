


from accounts.models import CandidateProfile, User

from profilesapp.models import (
    Education,
    Experience,
    Project,
    Certification,
    Language,
)

from rest_framework.decorators import (
    api_view,
    permission_classes,
)

from rest_framework.permissions import (
    IsAuthenticated,
)

from rest_framework.response import Response

from .services import generate_resume

from jobs.permissions import IsEmployer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def resume_view(request):

    data = generate_resume(request.user)

    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def resume_score_view(request):

    user = request.user

    profile, _ = CandidateProfile.objects.get_or_create(
        user=user
    )

    score = 0

    checklist = {}

    if user.first_name or user.last_name:
        score += 10
        checklist["Name"] = True
    else:
        checklist["Name"] = False

    if user.email:
        score += 10
        checklist["Email"] = True
    else:
        checklist["Email"] = False

    if getattr(user, "phone", None):
        score += 10
        checklist["Phone"] = True
    else:
        checklist["Phone"] = False

    if getattr(user, "skills", None):
        score += 10
        checklist["Skills"] = True
    else:
        checklist["Skills"] = False

    if profile.headline:
        score += 5
        checklist["Headline"] = True
    else:
        checklist["Headline"] = False

    if profile.bio:
        score += 5
        checklist["Bio"] = True
    else:
        checklist["Bio"] = False

    if Education.objects.filter(profile=profile).exists():
        score += 15
        checklist["Education"] = True
    else:
        checklist["Education"] = False

    if Experience.objects.filter(profile=profile).exists():
        score += 15
        checklist["Experience"] = True
    else:
        checklist["Experience"] = False

    if Project.objects.filter(profile=profile).exists():
        score += 10
        checklist["Projects"] = True
    else:
        checklist["Projects"] = False

    if Certification.objects.filter(profile=profile).exists():
        score += 5
        checklist["Certifications"] = True
    else:
        checklist["Certifications"] = False

    if Language.objects.filter(profile=profile).exists():
        score += 5
        checklist["Languages"] = True
    else:
        checklist["Languages"] = False

    return Response({
        "score": score,
        "checklist": checklist
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsEmployer])
def employer_resume_view(request, user_id):

    try:

        candidate = User.objects.get(id=user_id)

    except User.DoesNotExist:

        return Response(
            {"error": "Candidate not found"},
            status=404
        )

    data = generate_resume(candidate)

    return Response(data)

