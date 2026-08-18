


from rest_framework import serializers


class SummarySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    skills = serializers.CharField()
    education = serializers.CharField(
        required=False,
        allow_blank=True,
    )
    experience = serializers.CharField(
        required=False,
        allow_blank=True,
    )
    projects = serializers.CharField(
        required=False,
        allow_blank=True,
    )


class SaveSummarySerializer(serializers.Serializer):
    summary = serializers.CharField()



class ExperienceImprovementSerializer(serializers.Serializer):
    description = serializers.CharField()


class ProjectGeneratorSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    technologies = serializers.CharField()
    purpose = serializers.CharField()


class CoverLetterSerializer(serializers.Serializer):

    job_title = serializers.CharField(
        max_length=150
    )

    company = serializers.CharField(
        max_length=150
    )




class JobMatchSerializer(serializers.Serializer):
    # resume = serializers.CharField()
    job_description = serializers.CharField()

    resume = serializers.CharField(
        required=False,
        allow_blank=True,
    )

