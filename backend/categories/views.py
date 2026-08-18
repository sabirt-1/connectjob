
from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Category
from .serializers import CategorySerializer


# Create your views here.



@api_view(["GET"])
@permission_classes([AllowAny])
def category_list_view(request):

    # categories = Category.objects.filter(
    #     is_active=True
    # )
    categories = Category.objects.all()

    serializer = CategorySerializer(
        categories,
        many=True
    )

    return Response(serializer.data)



@api_view(["GET"])
@permission_classes([AllowAny])
def public_category_list_view(request):

    categories = Category.objects.filter(
        is_active=True
    )

    serializer = CategorySerializer(
        categories,
        many=True
    )

    return Response(serializer.data)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_category_view(request):

    serializer = CategorySerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_category_view(request, category_id):

    try:

        category = Category.objects.get(id=category_id)

    except Category.DoesNotExist:

        return Response(
            {
                "error": "Category not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = CategorySerializer(

        category,

        data=request.data,

        partial=True

    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST

    )

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_category_view(request, category_id):

    try:

        category = Category.objects.get(id=category_id)

    except Category.DoesNotExist:

        return Response(

            {
                "error": "Category not found."
            },

            status=status.HTTP_404_NOT_FOUND

        )

    category.delete()

    return Response(

        {
            "message": "Category deleted successfully."
        },

        status=status.HTTP_200_OK

    )

