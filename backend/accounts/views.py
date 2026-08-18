


import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status

from .serializers import (RegisterSerializer, CandidateProfileSerializer, CandidateCustomSkillSerializer, EmployerProfileSerializer)
from .models import (CandidateProfile, CandidateCustomSkill, EmployerProfile)

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.utils import timezone
from datetime import timedelta
from .models import User
from jobs.models import Job
from applications.models import Application
from notifications.models import Notification


from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from utils.otp_service import generate_otp
from utils.email_service import send_otp_email


# Register
@api_view(['POST'])
def register_view(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        # return Response({
        #     'message': 'User Registered Successfully'
        # })
        return Response(
            {
                "message": "Registration successful. OTP has been sent to your email.",
                "email": serializer.instance.email,
            },
            status=status.HTTP_201_CREATED,
        )
    
    print("REGISTER ERRORS:")
    print(serializer.errors)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST"])
def verify_otp_view(request):

    email = request.data.get("email")
    otp = request.data.get("otp")

    if not email or not otp:
        return Response(
            {"error": "Email and OTP are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)

    except User.DoesNotExist:
        return Response(
            {"error": "User not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    if user.email_verified:
        return Response(
            {"message": "Email already verified."},
            status=status.HTTP_200_OK
        )

    if user.otp != otp:
        return Response(
            {"error": "Invalid OTP."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if timezone.now() > user.otp_created_at + timedelta(minutes=5):
        return Response(
            {"error": "OTP expired."},
            status=status.HTTP_400_BAD_REQUEST
        )

# verify user 
    user.email_verified = True
    user.otp = None
    user.otp_created_at = None
    user.save()

# notify admins
    admin_users = User.objects.filter(
        is_staff=True,
        is_active=True
    )

    if user.role == "employer":

        for admin in admin_users:

            Notification.objects.create(

                recipient=admin,

                notification_type="new_employer",

                title="New Employer Registered",

                message=(
                    f"{user.username} has verified their email "
                    f"and registered as an employer."
                )

            )

    else:

        for admin in admin_users:

            Notification.objects.create(

                recipient=admin,

                notification_type="new_user",

                title="New User Registered",

                message=(
                    f"{user.username} has verified their email "
                    f"and registered as a candidate."
                )

            )



    return Response(
        {
            "message": "Email verified successfully."
        },
        status=status.HTTP_200_OK
    )


@api_view(["POST"])
def login_view(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"error": "Invalid username or password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not user.email_verified:
        return Response(
            {
                "error": "Please verify your email before logging in.",
                "email": user.email,
                "verification_required": True,
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
            },
        }
    )


@api_view(["POST"])
def resend_otp_view(request):

    email = request.data.get("email")

    if not email:
        return Response(
            {"error": "Email is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(email=email)

    except User.DoesNotExist:
        return Response(
            {"error": "User not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    if user.email_verified:
        return Response(
            {"message": "Email is already verified."},
            status=status.HTTP_200_OK,
        )

    # Cooldown: 60 seconds
    if (
        user.otp_created_at
        and timezone.now() - user.otp_created_at < timedelta(seconds=60)
    ):
        remaining = 60 - int(
            (timezone.now() - user.otp_created_at).total_seconds()
        )

        return Response(
            {
                "error": f"Please wait {remaining} seconds before requesting another OTP."
            },
            status=status.HTTP_429_TOO_MANY_REQUESTS,
        )

    otp = generate_otp()

    user.otp = otp
    user.otp_created_at = timezone.now()
    user.save()

    try:
        send_otp_email(user.email, otp)
    except Exception as e:
        print("Email sending failed:", e)

    return Response(
        {
            "message": "A new OTP has been sent to your email."
        }
    )


@api_view(["POST"])
def forgot_password_view(request):

    email = request.data.get("email")

    if not email:
        return Response(
            {"error": "Email is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)

    except User.DoesNotExist:
        return Response(
            {"error": "No account found with this email."},
            status=status.HTTP_404_NOT_FOUND
        )

    otp = generate_otp()

    user.otp = otp
    user.otp_created_at = timezone.now()

    user.save()

    try:
        send_otp_email(user.email, otp)

    except Exception as e:

        print("Email Error:", e)

        return Response(
            {"error": "Unable to send OTP."},
            status=500
        )

    return Response(
        {
            "message": "OTP sent successfully.",
            "email": user.email
        }
    )


@api_view(["POST"])
def verify_reset_otp_view(request):

    email = request.data.get("email")

    otp = request.data.get("otp")

    if not email or not otp:

        return Response(
            {
                "error":"Email and OTP required."
            },
            status=400
        )

    try:

        user = User.objects.get(email=email)

    except User.DoesNotExist:

        return Response(
            {
                "error":"User not found."
            },
            status=404
        )

    if user.otp != otp:

        return Response(
            {
                "error":"Invalid OTP."
            },
            status=400
        )

    if timezone.now() > user.otp_created_at + timedelta(minutes=5):

        return Response(
            {
                "error":"OTP expired."
            },
            status=400
        )

    
    reset_token = str(uuid.uuid4())

    user.password_reset_token = reset_token
    user.password_reset_expiry = timezone.now() + timedelta(minutes=10)

    user.save()

    return Response(
        {
            "message": "OTP Verified.",
            "reset_token": reset_token
        }
    )


@api_view(["POST"])
def reset_password_view(request):

    # email = request.data.get("email")
    token = request.data.get("reset_token")

    password = request.data.get("password")

    confirm_password = request.data.get("confirm_password")

    password = request.data.get("password")

    confirm_password = request.data.get("confirm_password")

    # if not email or not password or not confirm_password:
    if not token or not password or not confirm_password:

        return Response(
            {
                "error":"All fields required."
            },
            status=400
        )

    if password != confirm_password:

        return Response(
            {
                "error":"Passwords do not match."
            },
            status=400
        )

    try:

        # user = User.objects.get(email=email)
        user = User.objects.get(
            password_reset_token=token
        )

        if timezone.now() > user.password_reset_expiry:

            return Response(
                {
                    "error": "Reset token expired."
                },
                status=400
            )

    except User.DoesNotExist:

        return Response(
            {
                "error":"User not found."
            },
            status=404
        )

    user.set_password(password)
    user.otp = None
    user.otp_created_at = None

    user.password_reset_token = None
    user.password_reset_expiry = None

    user.save()

    return Response(
        {
            "message":"Password changed successfully."
        }
    )


# Profile 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):

    profile_image = None

    if request.user.role == "candidate":

        try:

            profile = request.user.candidate_profile

            if profile.profile_image:

                profile_image = profile.profile_image.url

        except CandidateProfile.DoesNotExist:

            pass


    elif request.user.role == "employer":

        try:

            profile = request.user.employer_profile

            if profile.profile_image:

                profile_image = profile.profile_image.url

        except EmployerProfile.DoesNotExist:

            pass


    elif request.user.profile_image:

        profile_image = request.user.profile_image.url


    return Response({
        'id': request.user.id,
        'username': request.user.username,
        'email': request.user.email,
        'role': request.user.role,
        'profile_image': profile_image,
    })


# simple django test api 
@api_view(['POST'])
def test_view(request):

    username = request.data.get('username')

    return Response({
        'message': f'Hello {username}'
    })





# Candidate profile 
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def candidate_profile_view(request):

   
    profile, created = CandidateProfile.objects.prefetch_related(
        "skills",
        "custom_skills"
    ).get_or_create(
        user=request.user
    )

    # serializer = CandidateProfileSerializer(profile)
    serializer = CandidateProfileSerializer(
        profile,
        context={
            "request": request
        }
    )

    return Response(serializer.data)


# candidate's profile for employer to view 
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def employer_candidate_profile_view(request, candidate_id):

    # Only employers can use this endpoint
    if request.user.role != "employer":

        return Response(
            {
                "error": "Only employers can view candidate profiles."
            },
            status=status.HTTP_403_FORBIDDEN
        )


    # Candidate must have applied to a job belonging
    # to this employer.    
    has_applied = Application.objects.filter(
        candidate_id=candidate_id,
        job__employer=request.user
    ).exists()

    if not has_applied:

        return Response(
            {
                "error":
                "You do not have access to this candidate."
            },
            status=status.HTTP_403_FORBIDDEN
        )


    try:

        candidate = User.objects.get(
            id=candidate_id,
            role="candidate"
        )

    except User.DoesNotExist:

        return Response(
            {
                "error": "Candidate not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    profile, created = CandidateProfile.objects.prefetch_related(
        "skills",
        "custom_skills"
    ).get_or_create(
        user=candidate
    )

    serializer = CandidateProfileSerializer(
        profile,
        context={
            "request": request
        }
    )

    return Response(
        serializer.data
    )


# add custom skills
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_custom_skill_view(request):

    if request.user.role != "candidate":
        return Response(
            {
                "error": "Only candidates can add custom skills."
            },
            status=status.HTTP_403_FORBIDDEN
        )

    name = request.data.get("name", "").strip()

    if not name:
        return Response(
            {
                "error": "Skill name is required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    profile, created = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    existing = CandidateCustomSkill.objects.filter(
        candidate=profile,
        name__iexact=name
    ).first()

    if existing:
        return Response(
            CandidateCustomSkillSerializer(existing).data,
            status=status.HTTP_200_OK
        )

    custom_skill = CandidateCustomSkill.objects.create(
        candidate=profile,
        name=name
    )

    serializer = CandidateCustomSkillSerializer(
        custom_skill
    )

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED
    )



# Delete customskills
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_custom_skill_view(request, skill_id):

    if request.user.role != "candidate":
        return Response(
            {
                "error": "Only candidates can delete custom skills."
            },
            status=status.HTTP_403_FORBIDDEN
        )

    profile, created = CandidateProfile.objects.get_or_create(
        user=request.user
    )

    try:

        skill = CandidateCustomSkill.objects.get(
            id=skill_id,
            candidate=profile
        )

    except CandidateCustomSkill.DoesNotExist:

        return Response(
            {
                "error": "Custom skill not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    skill.delete()

    return Response(
        {
            "message": "Custom skill deleted successfully."
        },
        status=status.HTTP_200_OK
    )



# Update Candidate prof

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_candidate_profile_view(request):

    profile, created = CandidateProfile.objects.prefetch_related(
        "skills",
        "custom_skills"
    ).get_or_create(
        user=request.user
    )

    data = request.data.copy()

    # Important
    data.setlist(
        "skill_ids",
        request.data.getlist("skill_ids")
    )
    print(request.data)
    print(request.data.getlist("skill_ids"))

    serializer = CandidateProfileSerializer(
        profile,
        data=data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    print("========== SERIALIZER ERRORS ==========")
    print(serializer.errors)

    return Response(
        serializer.errors,
        status=400
    )

    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def employer_profile_view(request):

    profile, created = EmployerProfile.objects.get_or_create(
        user=request.user
    )

    serializer = EmployerProfileSerializer(profile)

    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_employer_profile_view(request):

    profile, created = EmployerProfile.objects.get_or_create(
        user=request.user
    )

    serializer = EmployerProfileSerializer(

        profile,

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


def public_stats_view(request):

    registered_candidates = User.objects.filter(
        role="candidate"
    ).count()

    active_jobs = Job.objects.filter(
        is_active=True
    ).count()

    applications_submitted = Application.objects.count()

    companies_hiring = Job.objects.filter(
        is_active=True,
        company__isnull=False
    ).values(
        "company_id"
    ).distinct().count()

    return JsonResponse({
        "registered_candidates": registered_candidates,
        "active_jobs": active_jobs,
        "applications_submitted": applications_submitted,
        "companies_hiring": companies_hiring,
    })

