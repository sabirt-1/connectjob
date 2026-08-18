

from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Company
from .serializers import CompanySerializer

from jobs.permissions import IsEmployer

# Create your views here.

# Create company
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmployer])
def create_company_view(request):

    serializer = CompanySerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save( owner=request.user )

        return Response( serializer.data, status=201 )

    return Response( serializer.errors, status=400 )

# Employers companies
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployer])
def my_companies_view(request):

    companies = Company.objects.filter( owner=request.user )

    serializer = CompanySerializer( companies, many=True )

    return Response(serializer.data)



@api_view(["GET"])
@permission_classes([IsAuthenticated, IsEmployer])
def my_company_view(request):

    company = Company.objects.filter(
        owner=request.user
    ).first()

    if not company:

        return Response(
            None,
            status=200
        )

    serializer = CompanySerializer(company)

    return Response(serializer.data)




@api_view(['GET'])
def company_list_view(request):

    companies = Company.objects.all()
    serializer = CompanySerializer( companies, many=True )

    return Response(serializer.data)



@api_view(['GET'])
def company_detail_view(request, pk):

    company = get_object_or_404(
        Company.objects.prefetch_related("jobs"),
        pk=pk
    )

    serializer = CompanySerializer(
        company,
        context={
            "request":request
        }
    )

    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsEmployer])
def update_company_view(request, pk):

    company = get_object_or_404(
        Company,
        pk=pk,
        owner=request.user
    )

    serializer = CompanySerializer(
        company,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=400)



@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsEmployer])
def delete_company_view(request, pk):

    company = get_object_or_404(
        Company,
        pk=pk,
        owner=request.user
    )

    company.delete()

    return Response(
        {
            "message": "Company deleted successfully."
        },
        status=204
    )



