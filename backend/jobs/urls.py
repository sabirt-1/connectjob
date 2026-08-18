

from django.urls import path
# from .views import job_list_view
# from .views import create_job_view, employer_jobs_view
# from .views import update_job_view
from .views import (
    job_list_view,
    create_job_view,
    employer_jobs_view,
    update_job_view,
    delete_job_view,
    job_detail_view,
    employer_dashboard_view,
    similar_jobs_view,
)

urlpatterns = [
    path('', job_list_view),
    path('create/', create_job_view),
    path('my-jobs/', employer_jobs_view),
    path('update/<int:pk>/', update_job_view),
    path('delete/<int:pk>/', delete_job_view),
    path('<int:pk>/', job_detail_view),
    path('employer-dashboard/', employer_dashboard_view),
    path('<int:pk>/similar/', similar_jobs_view, name='similar_jobs'),
]

