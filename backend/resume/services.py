


from accounts.models import CandidateProfile

from profilesapp.models import (
    Education,
    Experience,
    Project,
    Certification,
    Language,
)


def generate_resume(user):

    profile, _ = CandidateProfile.objects.get_or_create(
        user=user
    )

    return {

        "personal": {

            "fullName": f"{user.first_name} {user.last_name}".strip(),

            "email": user.email,

            "phone": user.phone,

            # "skills": user.skills,
            "skills": "",

            "headline": profile.headline,

            "bio": profile.bio,

            "location": profile.location,

            "linkedin": profile.linkedin,

            "github": profile.github,

            "portfolio": profile.portfolio,

            "profileImage": (
                user.profile_image.url
                if user.profile_image
                else None
            ),

        },

        "education": list(

            Education.objects.filter(
                profile=profile
            ).values()

        ),

        "experience": list(

            Experience.objects.filter(
                profile=profile
            ).values()

        ),

        "projects": list(

            Project.objects.filter(
                profile=profile
            ).values()

        ),

        "certifications": list(

            Certification.objects.filter(
                profile=profile
            ).values()

        ),

        "languages": list(

            Language.objects.filter(
                profile=profile
            ).values()

        ),

    }








