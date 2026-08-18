


from django.urls import path

from .views import (
    GenerateSummaryView,
    SaveSummaryView,
    ImproveExperienceView,
    GenerateProjectView,
    GenerateCoverLetterView,
    JobMatchView,
)

app_name = "ai_resume"

urlpatterns = [

    path( "summary/", GenerateSummaryView.as_view(), name="generate-summary", ),
    path( "save-summary/", SaveSummaryView.as_view(), name="save-summary",),
    path( "improve-experience/", ImproveExperienceView.as_view(), name="improve-experience", ),
    path( "generate-project/", GenerateProjectView.as_view(), name="generate-project", ),
    path( "generate-cover-letter/", GenerateCoverLetterView.as_view(), name="generate-cover-letter", ),
    path( "job-match/", JobMatchView.as_view(), name="job-match", ),

]

