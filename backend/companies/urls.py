
from django.urls import path

from .views import (
    create_company_view,
    my_companies_view,
    my_company_view,
    update_company_view,
    delete_company_view,
    company_list_view,
    company_detail_view,
)

urlpatterns = [

    path('', company_list_view),
    path('create/',create_company_view),
    path('my-companies/',my_companies_view),
    path('my-company/', my_company_view),
    path('<int:pk>/update/', update_company_view),
    path("<int:pk>/delete/", delete_company_view),
    path('<int:pk>/', company_detail_view),
    
]

