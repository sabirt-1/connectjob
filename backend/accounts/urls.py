from django.urls import path
from .views import register_view
from .views import profile_view
from .views import test_view
from .views import candidate_profile_view
from .views import update_candidate_profile_view
from .views import employer_profile_view
from .views import update_employer_profile_view
from .views import verify_otp_view
from .views import login_view
from .views import resend_otp_view
from .views import forgot_password_view
from .views import verify_reset_otp_view
from .views import reset_password_view
from .views import employer_candidate_profile_view
from .views import add_custom_skill_view
from .views import delete_custom_skill_view
from .views import public_stats_view


urlpatterns = [
    path('register/', register_view),
    path("stats/", public_stats_view),
    path("forgot-password/", forgot_password_view),
    path("verify-reset-otp/", verify_reset_otp_view),
    path("reset-password/", reset_password_view),
    path("resend-otp/", resend_otp_view),
    path("login/", login_view),
    path("verify-otp/", verify_otp_view),
    path('profile/', profile_view),
    path('test/', test_view),
    path('candidate-profile/', candidate_profile_view),
    path('candidate-profile/update/', update_candidate_profile_view),
    path('employer-profile/', employer_profile_view),
    path('employer-profile/update/', update_employer_profile_view),
    path('employer/candidate/<int:candidate_id>/', employer_candidate_profile_view),
    path('candidate/custom-skills/', add_custom_skill_view,name='add-custom-skill'),
    path('candidate/custom-skills/<int:skill_id>/', delete_custom_skill_view, name='delete-custom-skill'),
]

