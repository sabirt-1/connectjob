

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Job
from .serializers import JobSerializer

# from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .permissions import IsEmployer

from django.shortcuts import get_object_or_404

from companies.models import Company
from applications.models import Application
from applications.serializers import ApplicationSerializer

from django.db.models import Q, Count
from django.db.models.functions import TruncMonth

from calendar import month_abbr
from .pagination import JobPagination

# Create your views here.

# View jobs
@api_view(['GET'])
def job_list_view(request):

    jobs = Job.objects.select_related(
        "company",
        "category"
    ).prefetch_related(
        "required_skills",
        "custom_skills"
    ).filter(
        is_active=True
    )

    # Query Parameters
    title = request.GET.get("title")
    location = request.GET.get("location")
    category = request.GET.get("category")
    job_type = request.GET.get("job_type")
    experience = request.GET.get("experience")
    company = request.GET.get("company")
    salary = request.GET.get("salary")
    skill = request.GET.get("skill")
    sort = request.GET.get("sort")

    # Search
    if title:
        jobs = jobs.filter(title__icontains=title)

    if location:
        jobs = jobs.filter(location__icontains=location)

    if category:
        # jobs = jobs.filter(category_id=category)
        # jobs = jobs.filter(
        #     Q(category_id=category) |
        #     Q(custom_category__icontains=category)
        # )
        jobs = jobs.filter(
            Q(category__name__icontains=category) |
            Q(custom_category__icontains=category)
        )

    # Job Type
    if job_type:
        jobs = jobs.filter(job_type=job_type)

    # Experience
    if experience:
        jobs = jobs.filter(experience=experience)

    # Company
    if company:
        jobs = jobs.filter(company_id=company)

    # Minimum Salary
    if salary:
        jobs = jobs.filter(salary__gte=salary)

    # Required Skill
    if skill:
        # jobs = jobs.filter(required_skills__name__icontains=skill)
        # # jobs = jobs.filter(required_skills__id=skill)

        jobs = jobs.filter(
            Q(required_skills__name__icontains=skill) |
            Q(custom_skills__name__icontains=skill)
        ).distinct()

    # Sorting
    if sort == "salary_high":
        jobs = jobs.order_by("-salary")

    elif sort == "salary_low":
        jobs = jobs.order_by("salary")

    elif sort == "oldest":
        jobs = jobs.order_by("created_at")

    else:
        jobs = jobs.order_by("-created_at")

    paginator = JobPagination()

    page = paginator.paginate_queryset(
        jobs,
        request
    )

    serializer = JobSerializer(
        page,
        many=True
    )

    return paginator.get_paginated_response(
        serializer.data
    )


# Add job api
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmployer])
def create_job_view(request):

    serializer = JobSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            employer=request.user
        )

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )

# My Jobs
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployer])
def employer_jobs_view(request):

    # jobs = Job.objects.filter(
    #     employer=request.user
    # )
    jobs = Job.objects.select_related(
        "company",
        "category"
    ).prefetch_related(
        "required_skills",
        "custom_skills"
    ).filter(
        employer=request.user
    )

    serializer = JobSerializer(
        jobs,
        many=True
    )

    return Response(serializer.data)

# edit job api
@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsEmployer])
def update_job_view(request, pk):

    job = get_object_or_404(
        Job,
        pk=pk,
        employer=request.user
    )

    serializer = JobSerializer(
        job,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )

# Delete job api
@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsEmployer])
def delete_job_view(request, pk):

    job = get_object_or_404(
        Job,
        pk=pk,
        employer=request.user
    )

    job.delete()

    return Response({
        "message":"Job deleted"
    })
# better response for delete api 
    # return Response(
    #     {
    #         "message":"Job deleted successfully"
    #     },
    #     status=200
    # )



# job detail view
@api_view(["GET"])
def job_detail_view(request, pk):

    try:

        # job = Job.objects.get(id=pk)
        job = Job.objects.select_related(
            "company",
            "category"
        ).prefetch_related(
            "required_skills",
            "custom_skills"
        ).get(id=pk)

    except Job.DoesNotExist:

        return Response(
            {"error": "Job not found"},
            status=404
        )

    serializer = JobSerializer(job)

    return Response(
        serializer.data
    )

# similar jobs

@api_view(["GET"])
def similar_jobs_view(request, pk):

    # current_job = get_object_or_404(
    #     Job.objects.select_related("company"),
    #     pk=pk
    # )
    current_job = get_object_or_404(
        Job.objects.select_related(
            "company",
            "category"
        ).prefetch_related(
            "required_skills",
            "custom_skills"
        ),
        pk=pk
    )

    # jobs = Job.objects.select_related("company").filter(
    jobs = Job.objects.select_related(
        "company",
        "category"
    ).prefetch_related(
        "required_skills",
        "custom_skills"
    ).filter(
        is_active=True
    ).exclude(
        id=current_job.id
    ).filter(

        Q(location__icontains=current_job.location) |

        Q(job_type=current_job.job_type) |

        Q(experience=current_job.experience)

    ).distinct()[:6]

    serializer = JobSerializer(
        jobs,
        many=True
    )

    return Response(serializer.data)


# Employer Dashboard 

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsEmployer])
def employer_dashboard_view(request):

    jobs = Job.objects.filter(
        employer=request.user
    )

    companies = Company.objects.filter(
        owner=request.user
    )

    applications = Application.objects.filter(
        job__employer=request.user
    )

    # Status Distribution

    status_distribution = [

        {

            "status": label,

            "count": applications.filter(
                status=value
            ).count()

        }

        for value, label in Application.STATUS_CHOICES

    ]


    # Top Jobs

    top_jobs = (

        jobs.annotate(

            applications_count=Count(
                "applications"
            )

        )

        .order_by(
            "-applications_count"
        )[:5]

    )

    # Monthly Applications

    monthly_queryset = (

        applications.annotate(

            month=TruncMonth(
                "applied_at"
            )

        )

        .values(
            "month"
        )

        .annotate(

            applications=Count("id")

        )

        .order_by("month")

    )

    application_trend = [

        {

            "month": month_abbr[
                item["month"].month
            ],

            "applications": item[
                "applications"
            ]

        }

        for item in monthly_queryset

    ]

    # Hiring Rate

    total_applications = applications.count()

    hired_count = applications.filter(
        status="hired"
    ).count()

    if total_applications > 0:

        hiring_rate = round(
            (hired_count / total_applications) * 100,
            1
        )

    else:

        hiring_rate = 0


    recent_jobs = jobs.select_related(
        "company",
        "category"
    ).prefetch_related(
        "required_skills",
        "custom_skills"
    ).order_by("-id")[:5]
    # recent_jobs = jobs.order_by("-id")[:5]
    # recent_jobs = jobs.order_by("-created_at")[:5]

    recent_applications = applications.select_related(
        "candidate",
        "job"
    ).order_by("-id")[:5]
    # recent_applications = applications.select_related(
    #     "candidate",
    #     "job"
    # ).order_by("-created_at")[:5]

    return Response({

        "stats": {

            "jobs_posted": jobs.count(),

            "companies": companies.count(),

            # "applicants": applications.count(),
            "applications": applications.count(),

            "active_jobs": jobs.filter(
                is_active=True
            ).count(),

            "hiring_rate": hiring_rate,

        },

        "application_trend": application_trend,

        "status_distribution": status_distribution,

        "top_jobs": [

            {

                "title": job.title,

                "applications": job.applications_count

            }

            for job in top_jobs

        ],

        "recent_jobs": [

            {

                "id": job.id,

                "title": job.title,

                "location": job.location,

                "job_type": job.job_type,

                "applications": job.applications.count(),

                "is_active": job.is_active,

                "company_name": (
                    job.company.company_name
                    if job.company
                    else "No Company"
                ),

                "created_at": job.created_at


            }

            for job in recent_jobs

        ],

        "recent_applications": [

            {

                "id": app.id,

                "candidate": app.candidate.username,

                "job": app.job.title,

                "status": app.status,

                "company": (
                    app.job.company.company_name
                    if app.job.company
                    else "No Company"
                ),

                "location": app.job.location,

                # "applied_on": app.job.created_at
                "applied_on": app.applied_at

            }

            for app in recent_applications

        ]

        

    })



