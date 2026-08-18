


from rest_framework import serializers

from .models import Job
from .models import JobCustomSkill


from companies.models import Company
from companies.serializers import CompanySerializer

from categories.models import Category
from categories.serializers import CategorySerializer

from skills.models import Skill
from skills.serializers import SkillSerializer





class JobCustomSkillSerializer(serializers.ModelSerializer):

    class Meta:

        model = JobCustomSkill

        fields = [
            "id",
            "name",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]




class JobSerializer(serializers.ModelSerializer):

    employer_name = serializers.CharField(
        source="employer.username",
        read_only=True
    )

    applications_count = serializers.SerializerMethodField()

    company = CompanySerializer(
        read_only=True
    )

    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(),
        source="company",
        write_only=True,
        required=False,
        allow_null=True
    )

    category = CategorySerializer(
        read_only=True
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.filter(
            is_active=True
        ),
        source="category",
        write_only=True,
        required=False,
        allow_null=True
    )

    # Admin skills returned to frontend
    required_skills = SkillSerializer(
        many=True,
        read_only=True
    )

    # Admin skills received from frontend
    required_skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.filter(
            is_active=True
        ),
        many=True,
        source="required_skills",
        write_only=True,
        required=False
    )

    # Employer custom skills
    custom_skills = JobCustomSkillSerializer(
        many=True,
        read_only=True
    )

    # Employer custom skill names received from frontend
    custom_skill_names = serializers.ListField(
        child=serializers.CharField(
            max_length=100
        ),
        write_only=True,
        required=False
    )

    class Meta:

        model = Job

        fields = [

            "id",

            "title",
            "description",
            "location",
            "salary",
            "experience",
            "job_type",
            "vacancies",

            "is_active",

            "created_at",
            "updated_at",

            "employer",
            "employer_name",

            "applications_count",

            "company",
            "company_id",

            "category",
            "category_id",
            "category_name",

            "custom_category",

            # Admin skills
            "required_skills",
            "required_skill_ids",

            # Employer custom skills
            "custom_skills",
            "custom_skill_names",
        ]

        read_only_fields = [
            "employer",
        ]

    def get_applications_count(self, obj):

        return obj.applications.count()

    def create(self, validated_data):

        # Remove M2M data before creating Job
        required_skills = validated_data.pop(
            "required_skills",
            []
        )

        # Remove custom skill names
        custom_skill_names = validated_data.pop(
            "custom_skill_names",
            []
        )

        # Create Job WITHOUT M2M field
        job = Job.objects.create(
            **validated_data
        )

        # Add admin skills
        if required_skills:

            job.required_skills.set(
                required_skills
            )

        # Add employer custom skills
        for name in custom_skill_names:

            name = name.strip()

            if not name:
                continue

            JobCustomSkill.objects.get_or_create(
                job=job,
                name=name
            )

        return job

    def update(self, instance, validated_data):

        # Remove M2M data
        required_skills = validated_data.pop(
            "required_skills",
            None
        )

        # Remove custom skills
        custom_skill_names = validated_data.pop(
            "custom_skill_names",
            None
        )

        # Update normal Job fields
        for attr, value in validated_data.items():

            setattr(
                instance,
                attr,
                value
            )

        instance.save()

        # Update admin skills
        if required_skills is not None:

            instance.required_skills.set(
                required_skills
            )

        # Update employer custom skills
        if custom_skill_names is not None:

            instance.custom_skills.all().delete()

            for name in custom_skill_names:

                name = name.strip()

                if not name:
                    continue

                JobCustomSkill.objects.get_or_create(
                    job=instance,
                    name=name
                )

        return instance




