

from rest_framework import serializers

from django.utils import timezone

from utils.otp_service import generate_otp
from utils.email_service import send_otp_email

from .models import (
    User, 
    CandidateProfile, 
    EmployerProfile,
    CandidateCustomSkill
)

from skills.models import Skill
from skills.serializers import SkillSerializer


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User

        fields = [
            'id',
            'username',
            'email',
            'password',
            'role',
            'phone',
        ]

    def validate_role(self, value):

        allowed =  [
            "candidate",
            "employer",
            "admin"
        ]

        if value not in allowed:

            raise serializers.ValidationError(
                "Invalid role"
            )
        
        return value

    
    def create(self, validated_data):

        password = validated_data.pop("password")

        otp = generate_otp()

        user = User(**validated_data)

        user.set_password(password)

        if user.role == "admin":

            user.email_verified = True

        else:

            user.email_verified = False

        user.email_verified = False

        user.otp = otp

        user.otp_created_at = timezone.now()

        user.save()

        
        if user.role != "admin":
            try:
                send_otp_email(user.email, otp)
            except Exception as e:
                print("Email sending failed:", e)

        return user
    


class CandidateCustomSkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = CandidateCustomSkill

        fields = [
            "id",
            "name",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]


class CandidateProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    # Used when returning the profile
    # Backend/admin predefined skills
    skills = SkillSerializer(
        many=True,
        read_only=True
    )

    # Used when updating the profile
    # Candidate selects predefined skills
    skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.filter(
            is_active=True
        ),
        source="skills",
        many=True,
        write_only=True,
        required=False
    )

    # Candidate manually added skills
    custom_skills = CandidateCustomSkillSerializer(
        many=True,
        read_only=True
    )

    resume = serializers.SerializerMethodField()

    def get_resume(self, obj):

        if not obj.resume:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(
                obj.resume.url
            )

        return obj.resume.url



    class Meta:

        model = CandidateProfile

        fields = [

            "id",
            "user",

            "username",
            "email",

            "full_name",
            "phone",
            "location",

            "headline",
            "about",
            "bio",

            "skills",
            "skill_ids",

            # Candidate-created skills
            "custom_skills",

            "experience",
            "education",

            "resume",
            "profile_image",

            "linkedin",
            "github",
            "portfolio",

        ]

        read_only_fields = (
            "user",
        )

    

class EmployerProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:

        model = EmployerProfile

        fields = "__all__"


