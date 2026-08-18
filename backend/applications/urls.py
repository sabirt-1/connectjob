

from django.urls import path

from .views import (
    apply_job_view,
    my_applications_view,
    job_applicants_view,
    update_application_status_view,
    candidate_dashboard_view, 

    save_job_view,
    unsave_job_view,
    my_saved_jobs_view,
    saved_job_status_view,

    add_recent_job_view,
    my_recent_jobs_view,
    delete_application_view,
)

urlpatterns = [

    path('apply/<int:job_id>/', apply_job_view),

    path('my-applications/', my_applications_view),

    path('job-applicants/<int:job_id>/', job_applicants_view),

    path('update-status/<int:application_id>/', update_application_status_view),
    path('candidate-dashboard/', candidate_dashboard_view),


    path('save-job/<int:job_id>/', save_job_view),
    path('unsave-job/<int:job_id>/', unsave_job_view),
    path('saved-jobs/', my_saved_jobs_view),
    path('saved-status/<int:job_id>/', saved_job_status_view),

    path("recent-job/<int:job_id>/", add_recent_job_view),
    path("recent-jobs/", my_recent_jobs_view),

    path("delete/<int:application_id>/", delete_application_view),
]

