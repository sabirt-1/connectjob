


from django.urls import path

from .views import resume_view
from .views import resume_score_view
from .views import employer_resume_view


urlpatterns = [

    path( "", resume_view, name="resume" ),
    path( "score/", resume_score_view, name="resume-score" ),
    path( "candidate/<int:user_id>/", employer_resume_view, name="employer-resume", ),

]


