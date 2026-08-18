


from accounts.models import CandidateProfile

from profilesapp.models import (
    Education,
    Experience,
    Project,
    Certification,
    Language,
    # Skill,
)
from skills.models import Skill


def generate_resume(user):
    """
    Collect all candidate resume data in one place.

    This is the single source of truth used by:
    - Resume templates
    - PDF export
    - DOCX export
    - Resume score
    - AI Resume
    - Employer resume preview
    """

    profile, _ = CandidateProfile.objects.get_or_create(
        user=user
    )

    # skills = Skill.objects.filter(
    #     profile=profile
    # )

    return {

        "personal": {

            "fullName": (
                f"{user.first_name} {user.last_name}"
            ).strip(),

            "email": user.email,

            "phone": getattr(
                user,
                "phone",
                "",
            ),

            "headline": profile.headline,

            "bio": profile.bio,

            "location": profile.location,

            "linkedin": profile.linkedin,

            "github": profile.github,

            "portfolio": profile.portfolio,

            "profileImage": (
                user.profile_image.url
                if getattr(
                    user,
                    "profile_image",
                    None,
                )
                else None
            ),
        },

        # "skills": list(
        #     skills.values()
        # ),
        "skills": ", ".join(
            profile.skills.values_list(
                "name",
                flat=True
            )
        ),

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

