

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from jobs.models import Job
from notifications.models import Notification

from .models import (
    Application, 
    SavedJob,
    RecentlyViewedJob,
)

from .serializers import (
    ApplicationSerializer,
    SavedJobSerializer,
    RecentlyViewedJobSerializer,
)

from .permissions import IsCandidate
from jobs.permissions import IsEmployer

from .email_utils import send_application_received_email
from .email_utils import send_application_status_email


# Create your views here.

# candidate dashboard 4 cards 
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsCandidate])
def candidate_dashboard_view(request):

    applications = Application.objects.filter(
        candidate=request.user
    ).order_by("-applied_at")

    total = applications.count()

    pending = applications.filter(
        status='pending'
    ).count()

    shortlisted = applications.filter(
        status='shortlisted'
    ).count()

    rejected = applications.filter(
        status='rejected'
    ).count()

    recent = ApplicationSerializer(
        applications[:5],
        many=True,
        context={"request": request}
    ).data


    return Response({
        "total_applications": total,

        "pending": pending,

        "shortlisted": shortlisted,

        "rejected": rejected,
        "recent_applications": recent

    })


# view applied jobs
@api_view(["POST"])
@permission_classes([IsAuthenticated, IsCandidate])
def apply_job_view(request, job_id):

    try:
        job = Job.objects.get(id=job_id)

    except Job.DoesNotExist:
        return Response(
            {"error": "Job not found"},
            status=404
        )

    if Application.objects.filter(
        candidate=request.user,
        job=job
    ).exists():

        return Response(
            {"error": "Already applied"},
            status=400
        )

    serializer = ApplicationSerializer(
        data=request.data,
        context={
            "request": request
        }
    )

    if serializer.is_valid():

        application = serializer.save(
            candidate=request.user,
            job=job,
            resume=request.FILES.get("resume")
        )

        # employer notification
        Notification.objects.create(

            recipient=job.employer,

            notification_type="job_application",

            title="New Job Application",

            message=(
                f"{request.user.username} applied "
                f"for your job '{job.title}'."
            )

        )

        # AUTOMATIC APPLICATION EMAIL

        try:

            send_application_received_email(
                application
            )

        except Exception as error:

            print(
                "APPLICATION EMAIL ERROR:",
                error
            )

        return Response(
            ApplicationSerializer(
                application,
                context={
                    "request": request
                }
            ).data,
            status=201
        )


    return Response(
        serializer.errors,
        status=400
    )

# my applications
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsCandidate])
def my_applications_view(request):

    applications = Application.objects.filter(
        candidate=request.user
    )

    serializer = ApplicationSerializer(
        applications,
        many=True,
        context={"request": request}
    )

    return Response(serializer.data)

# view applicants for jobs
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployer])
def job_applicants_view(request, job_id):

    try:
        job = Job.objects.get(
            id=job_id,
            employer=request.user
        )

    except Job.DoesNotExist:

        return Response(
            {'error': 'Job not found'},
            status=404
        )

    applications = job.applications.all()

    serializer = ApplicationSerializer(
        applications,
        many=True,
        context={"request": request}
    )

    return Response(serializer.data)

# employer changes status
@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsEmployer])
def update_application_status_view(
        request,
        application_id
):

    try:

        application = Application.objects.get(
            id=application_id,
            job__employer=request.user
        )

    except Application.DoesNotExist:

        return Response(
            {'error': 'Application not found'},
            status=404
        )

    status_value = request.data.get('status')

    allowed = [
        'reviewing',
        'shortlisted',
        'rejected',
        'hired'
    ]

    if status_value not in allowed:

        return Response(
            {'error': 'Invalid status'},
            status=400
        )

    application.status = status_value
    application.save()

    status_labels = {
        "reviewing": "Reviewing",
        "shortlisted": "Shortlisted",
        "rejected": "Rejected",
        "hired": "Hired",
    }

    status_label = status_labels.get(
        status_value,
        status_value
    )

# notify candidate
    Notification.objects.create(

        recipient=application.candidate,

        notification_type="application_status",

        title="Application Status Updated",

        message=(
            f"Your application for "
            f"{application.job.title} "
            f"is now {status_label}."
        )

    )



    # AUTOMATIC STATUS EMAIL

    try:

        send_application_status_email(
            application
        )

    except Exception as error:

        print(
            "STATUS EMAIL ERROR:",
            error
        )

    return Response({
        'message': 'Status Updated'
    })


#  Delete Application

@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsEmployer])
def delete_application_view(request, application_id):

    try:
        application = Application.objects.get(
            id=application_id,
            job__employer=request.user
        )

    except Application.DoesNotExist:

        return Response(
            {"error": "Application not found"},
            status=404
        )

    application.delete()

    return Response(
        {
            "message": "Application deleted successfully."
        },
        status=200
    )


# SAVE JOB

@api_view(["POST"])
@permission_classes([IsAuthenticated, IsCandidate])
def save_job_view(request, job_id):

    try:
        job = Job.objects.get(id=job_id)

    except Job.DoesNotExist:

        return Response(
            {"error": "Job not found"},
            status=404
        )

    saved_job, created = SavedJob.objects.get_or_create(

        candidate=request.user,

        job=job

    )

    if not created:

        return Response(

            {

                "message": "Job already saved"

            },

            status=200

        )

    serializer = SavedJobSerializer(saved_job)

    return Response(serializer.data, status=201)


# UNSAVE JOB

@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsCandidate])
def unsave_job_view(request, job_id):

    deleted, _ = SavedJob.objects.filter(

        candidate=request.user,

        job_id=job_id

    ).delete()

    if deleted == 0:

        return Response(

            {

                "error": "Saved job not found"

            },

            status=404

        )

    return Response(

        {

            "message": "Job removed from saved jobs"

        }

    )


# MY SAVED JOBS

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCandidate])
def my_saved_jobs_view(request):

    saved_jobs = SavedJob.objects.filter(

        candidate=request.user

    ).select_related(

        "job",

        "job__company"

    )

    serializer = SavedJobSerializer(

        saved_jobs,

        many=True

    )

    return Response(serializer.data)


# CHECK SAVED STATUS


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCandidate])
def saved_job_status_view(request, job_id):

    is_saved = SavedJob.objects.filter(

        candidate=request.user,

        job_id=job_id

    ).exists()

    return Response(

        {

            "saved": is_saved

        }

    )


# RECENTLY VIEWED JOBS

@api_view(["POST"])
@permission_classes([IsAuthenticated, IsCandidate])
def add_recent_job_view(request, job_id):

    try:

        job = Job.objects.get(id=job_id)

    except Job.DoesNotExist:

        return Response(
            {"error": "Job not found"},
            status=404
        )

    recent_job, created = RecentlyViewedJob.objects.get_or_create(

        candidate=request.user,

        job=job

    )

    if not created:

        recent_job.save()

    serializer = RecentlyViewedJobSerializer(recent_job)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCandidate])
def my_recent_jobs_view(request):

    recent_jobs = RecentlyViewedJob.objects.filter(

        candidate=request.user

    ).select_related(

        "job",

        "job__company"

    )

    serializer = RecentlyViewedJobSerializer(

        recent_jobs,

        many=True

    )

    return Response(serializer.data)



