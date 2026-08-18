


from rest_framework import serializers

from .models import (
    Education, 
    Experience,
    Project,
    Certification,
    Language,
)


class EducationSerializer(serializers.ModelSerializer):

    class Meta:

        model = Education

        fields = "__all__"

        read_only_fields = (
            "profile",
            "created_at",
            "updated_at",
        )



class ExperienceSerializer(serializers.ModelSerializer):

    class Meta:

        model = Experience

        fields = "__all__"

        read_only_fields = (

            "profile",

            "created_at",

            "updated_at",

        )


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:

        model = Project

        fields = "__all__"

        read_only_fields = (
            "profile",
            "created_at",
            "updated_at",
        )


class CertificationSerializer(serializers.ModelSerializer):

    class Meta:

        model = Certification

        fields = "__all__"

        read_only_fields = (

            "profile",

            "created_at",

            "updated_at",

        )


class LanguageSerializer(serializers.ModelSerializer):

    class Meta:

        model = Language

        fields = "__all__"

        read_only_fields = (

            "profile",

            "created_at",

            "updated_at",

        )
        

