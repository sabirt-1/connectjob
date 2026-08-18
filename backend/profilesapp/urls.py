


from django.urls import path

from .views import (
    education_list_view,
    create_education_view,
    update_education_view,
    delete_education_view,

    experience_list_view,
    create_experience_view,
    update_experience_view,
    delete_experience_view,

    project_list_view,
    create_project_view,
    update_project_view,
    delete_project_view,

    certification_list_view,
    create_certification_view,
    update_certification_view,
    delete_certification_view,

    language_list_view,
    create_language_view,
    update_language_view,
    delete_language_view,
)

urlpatterns = [

    # Education
    path( "education/", education_list_view ),
    path( "education/create/", create_education_view ),
    path( "education/update/<int:pk>/", update_education_view ),
    path( "education/delete/<int:pk>/", delete_education_view ),

    # Experience
    path( "experience/", experience_list_view),
    path( "experience/create/", create_experience_view),
    path( "experience/update/<int:pk>/", update_experience_view),
    path( "experience/delete/<int:pk>/", delete_experience_view),

    # Projects
    path( "project/", project_list_view),
    path( "project/create/", create_project_view),
    path( "project/update/<int:pk>/", update_project_view),
    path( "project/delete/<int:pk>/", delete_project_view),

    # Certificates
    path( "certification/", certification_list_view ),
    path( "certification/create/", create_certification_view ),
    path( "certification/update/<int:pk>/", update_certification_view ),
    path( "certification/delete/<int:pk>/", delete_certification_view ),

    # Language
    path( "language/", language_list_view),
    path( "language/create/", create_language_view),
    path( "language/update/<int:pk>/", update_language_view),
    path( "language/delete/<int:pk>/", delete_language_view),

]

