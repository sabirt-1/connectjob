from django.shortcuts import render


from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from jobs.permissions import IsAdmin

from accounts.models import User
from jobs.models import Job
from companies.models import Company
from applications.models import Application

from .serializers import AdminUserSerializer

from django.shortcuts import get_object_or_404
from django.db.models import Q



# Create your views here.

# admin dashboard 
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_dashboard_view(request):

    print("User:", request.user)

    print("Authenticated:", request.user.is_authenticated)

    print("Role:", request.user.role)

    
    return Response({

        "users": User.objects.count(),

        "candidates": User.objects.filter(
            role="candidate"
        ).count(),

        "employers": User.objects.filter(
            role="employer"
        ).count(),

        "admins": User.objects.filter(
            role="admin"
        ).count(),

        "jobs": Job.objects.count(),

        "companies": Company.objects.count(),

        "applications": Application.objects.count(),

        "recent_users":[

            {

                "id":user.id,

                "username":user.username,

                "role":user.role

            }

            for user in User.objects.order_by("-id")[:5]

        ],

        "recent_jobs":[

            {

                "id":job.id,

                "title":job.title,

                "location":job.location

            }

            for job in Job.objects.order_by("-id")[:5]

        ],

        "recent_companies":[

            {

                "id":company.id,

                "company_name":company.company_name

            }

            for company in Company.objects.order_by("-id")[:5]

        ],

        "recent_applications":[

            {

                "id":application.id,

                "candidate":application.candidate.username,

                "job":application.job.title,

                "status":application.status

            }

            for application in Application.objects.select_related(

                "candidate",

                "job"

            ).order_by("-id")[:5]

        ]

    })

# admin user management 
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_users_view(request):

    # users = User.objects.all().order_by("-id")
    search = request.GET.get("search", "")

    role = request.GET.get("role", "")

    users = User.objects.all()

    if search:

        
        users = users.filter(

            Q(username__icontains=search)

            |

            Q(email__icontains=search)

        )

    if role:

        users = users.filter(

            role=role

        )

    users = users.order_by("-id")

    serializer = AdminUserSerializer(
        users,
        many=True
    )

    return Response(serializer.data)


#  User Detail view
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_user_detail_view(request, pk):

    user = get_object_or_404(

        User,

        pk=pk

    )

    data = {

        "id": user.id,

        "username": user.username,

        "email": user.email,

        "role": user.role,

        "date_joined": user.date_joined,

        "is_active": user.is_active,

    }

    if user.role == "candidate":

        profile = getattr(

            user,

            "candidate_profile",

            None

        )

        if profile:

            data["profile"] = {

                "full_name": profile.full_name,

                "phone": profile.phone,

                "location": profile.location,

                "headline": profile.headline,

                # "skills": profile.skills,
                "skills": [
                    {
                        "id": skill.id,
                        "name": skill.name
                    }
                    for skill in profile.skills.all()
                ],

                "experience": profile.experience,

                "education": profile.education,

                "resume": profile.resume.url if profile.resume else None,

                "profile_image": profile.profile_image.url if profile.profile_image else None,

            }

    elif user.role == "employer":

        profile = getattr(

            user,

            "employer_profile",

            None

        )

        if profile:

            data["profile"] = {

                "full_name": profile.full_name,

                "designation": profile.designation,

                "company_name": profile.company_name,

                "phone": profile.phone,

                "location": profile.location,

                "website": profile.website,

                "about": profile.about,

                "profile_image": profile.profile_image.url if profile.profile_image else None,

            }

    return Response(data)



# Update api
@api_view(["PATCH"])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_update_user_view(request, pk):

    user = get_object_or_404(
        User,
        pk=pk
    )

    user.username = request.data.get(
        "username",
        user.username
    )

    user.email = request.data.get(
        "email",
        user.email
    )

    role = request.data.get(
        "role"
    )

    if user == request.user and role != "admin":

        return Response(

            {

                "error": "You cannot change your own admin role."

            },

            status=400

        )
# here the admin option can be blocked from both backend and frontend  
    if role in ["candidate", "employer", "admin"]:
        user.role = role

    user.save()

    serializer = AdminUserSerializer(user)

    return Response(serializer.data)



# deleting will disabled the account but data remain safe and can relogin

@api_view(["PATCH"])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_toggle_user_status_view(request, pk):

    user = get_object_or_404(

        User,

        pk=pk

    )

    # Prevent an admin from blocking themselves
    if user == request.user:

        return Response(

            {

                "error": "You cannot block your own account."

            },

            status=400

        )

    user.is_active = not user.is_active

    user.save()

    return Response(

        {

            "message":

                "User blocked."

                if not user.is_active

                else

                "User unblocked.",

            "is_active": user.is_active

        }

    )



# confirm delete
@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_delete_user_view(request, pk):

    user = get_object_or_404(

        User,

        pk=pk

    )

    # Prevent deleting yourself
    if user == request.user:

        return Response(

            {

                "error": "You cannot delete your own account."

            },

            status=400

        )

    username = user.username

    user.delete()

    return Response(

        {

            "message": f"{username} deleted successfully."

        }

    )


