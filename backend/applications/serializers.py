

from rest_framework import serializers
from .models import ( 
    Application, 
    SavedJob,
    RecentlyViewedJob,
)



class ApplicationSerializer(serializers.ModelSerializer):

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    company_name = serializers.CharField(
        source="job.company.company_name",
        read_only=True
    )

    candidate_name = serializers.CharField(
        source="candidate.username",
        read_only=True
    )

    candidate_id = serializers.IntegerField(
        source="candidate.id",
        read_only=True
    )

    resume = serializers.SerializerMethodField()

    class Meta:

        model = Application

        fields = [

            "id",

            "candidate",
            "candidate_id",
            "candidate_name",

            "job",
            "job_title",
            "company_name",

            "cover_letter",
            "resume",

            "status",
            "applied_at",

        ]

        extra_kwargs = {

            "candidate": {
                "required": False
            },

            "job": {
                "required": False
            }

        }

    def get_resume(self, obj):

        if not obj.resume:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(
                obj.resume.url
            )

        return obj.resume.url



class SavedJobSerializer(serializers.ModelSerializer):

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    company_name = serializers.CharField(
        source="job.company.company_name",
        read_only=True
    )

    location = serializers.CharField(
        source="job.location",
        read_only=True
    )

    salary = serializers.DecimalField(
        source="job.salary",
        max_digits=12,
        decimal_places=2,
        read_only=True
    )

    job_type = serializers.CharField(
        source="job.job_type",
        read_only=True
    )

    class Meta:

        model = SavedJob

        fields = [

            "id",

            "candidate",

            "job",

            "job_title",

            "company_name",

            "location",

            "salary",

            "job_type",

            "saved_at"

        ]

        read_only_fields = [

            "candidate",

            "saved_at"

        ]



class RecentlyViewedJobSerializer(serializers.ModelSerializer):

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    company_name = serializers.CharField(
        source="job.company.company_name",
        read_only=True
    )

    location = serializers.CharField(
        source="job.location",
        read_only=True
    )

    salary = serializers.DecimalField(
        source="job.salary",
        max_digits=12,
        decimal_places=2,
        read_only=True
    )

    job_type = serializers.CharField(
        source="job.job_type",
        read_only=True
    )

    class Meta:

        model = RecentlyViewedJob

        fields = [

            "id",

            "candidate",

            "job",

            "job_title",

            "company_name",

            "location",

            "salary",

            "job_type",

            "viewed_at"

        ]

        read_only_fields = [

            "candidate",

            "viewed_at"

        ]


