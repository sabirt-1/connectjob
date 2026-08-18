

from rest_framework import serializers
from .models import Company
from jobs.models import Job




class CompanyJobSerializer(serializers.ModelSerializer):

    class Meta:

        model = Job

        fields = [
            "id",
            "title",
            "location",
            "salary",
            "job_type",
            "experience",
            "vacancies",
            "is_active",
            "created_at",
        ]




class CompanySerializer(serializers.ModelSerializer):

    jobs = CompanyJobSerializer(
        many=True,
        read_only=True
    )

    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Company
        # fields = '__all__'
        fields = [
            "id",
            "company_name",
            "logo",
            "website",
            "description",
            "industry",
            "company_size",
            "location",
            "hr_name",
            "contact_email",
            "contact_phone",
            "created_at",
            "jobs",
            "is_owner",
        ]
        read_only_fields = (
            "owner",
            "is_owner",
        )

    def get_is_owner(self, obj):

        request = self.context.get("request")

        if not request:
            return False

        if not request.user.is_authenticated:
            return False

        return obj.owner_id == request.user.id


