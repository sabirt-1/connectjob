


from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


def send_application_received_email(application):

    candidate = application.candidate
    job = application.job
    employer = job.employer
    company = job.company

    candidate_email = candidate.email
    employer_email = employer.email

    # Candidate must have an email
    if not candidate_email:
        print("Candidate does not have an email address.")
        return

    # Company name
    if company:
        company_name = company.company_name
    else:
        company_name = "JobConnect"

    # Candidate name
    candidate_name = (
        candidate.get_full_name()
        or candidate.username
    )

    subject = (
        f"Application Received - "
        f"{job.title} | {company_name}"
    )

    context = {
        "candidate_name": candidate_name,
        "job_title": job.title,
        "company_name": company_name,
        "employer_name": (
            employer.get_full_name()
            or employer.username
        ),
    }

    html_content = render_to_string(
        "emails/application_received.html",
        context
    )

    text_content = f"""
Hi {candidate_name},

Thank you for applying for the {job.title}
position at {company_name}.

We have received your application successfully.

Our hiring team will carefully review your
application and qualifications.

If your profile matches our requirements,
we will contact you regarding the next steps.

Best Regards,

{company_name} Hiring Team

This is an automated email from JobConnect.
"""

    email = EmailMultiAlternatives(
        subject=subject,

        body=text_content,

        from_email=settings.DEFAULT_FROM_EMAIL,

        to=[candidate_email],

        reply_to=(
            [employer_email]
            if employer_email
            else [settings.DEFAULT_FROM_EMAIL]
        ),
    )

    email.attach_alternative(
        html_content,
        "text/html"
    )

    email.send(
        fail_silently=False
    )




def send_application_status_email(application):

    candidate = application.candidate
    job = application.job
    company = job.company
    employer = job.employer

    candidate_email = candidate.email
    employer_email = employer.email


    if not candidate_email:
        print("Candidate does not have an email address.")
        return

    # Company name
    if company:
        company_name = company.company_name
    else:
        company_name = "JobConnect"

    # Candidate name
    candidate_name = (
        candidate.get_full_name()
        or candidate.username
    )

    status = application.status

    status_data = {

        "reviewing": {
            "subject": (
                f"Application Under Review - {job.title}"
            ),

            "title": (
                "Your Application Is Under Review"
            ),

            "label": "Under Review",

            "message": (
                f"Your application for the "
                f"{job.title} position at "
                f"{company_name} is currently "
                f"being reviewed by the employer."
            ),
        },


        "shortlisted": {
            "subject": (
                f"Congratulations! You've Been Shortlisted "
                f"- {job.title}"
            ),

            "title": (
                "Congratulations! You've Been Shortlisted"
            ),

            "label": "Shortlisted",

            "message": (
                f"We are pleased to inform you that "
                f"your application for the {job.title} "
                f"position at {company_name} has been "
                f"shortlisted by the employer."
            ),
        },


        "rejected": {
            "subject": (
                f"Application Status Update - {job.title}"
            ),

            "title": (
                "Application Status Update"
            ),

            "label": "Not Selected",

            "message": (
                f"Thank you for applying for the "
                f"{job.title} position at "
                f"{company_name}. After reviewing "
                f"your application, the employer has "
                f"decided not to move forward with "
                f"your application at this time."
            ),
        },


        "hired": {
            "subject": (
                f"Congratulations! You've Been Hired "
                f"- {job.title}"
            ),

            "title": (
                "Congratulations! You've Been Hired"
            ),

            "label": "Hired",

            "message": (
                f"Congratulations! The employer has "
                f"selected you for the {job.title} "
                f"position at {company_name}."
            ),
        },

    }


    if status not in status_data:

        print(
            f"No email template for status: {status}"
        )

        return


    data = status_data[status]


    # HTML email context

    context = {

        "candidate_name": candidate_name,

        "job_title": job.title,

        "company_name": company_name,

        "status": status,

        "status_title": data["title"],

        "status_label": data["label"],

        "status_message": data["message"],

    }


    # Render HTML template

    html_content = render_to_string(
        "emails/application_status.html",
        context
    )


    # Plain-text fallback

    text_content = f"""
Hi {candidate_name},

{data["message"]}

Position:
{job.title}

Application Status:
{data["label"]}

Best Regards,

{company_name} Hiring Team

This is an automated email from JobConnect.
"""


    # Create email

    email = EmailMultiAlternatives(

        subject=data["subject"],

        body=text_content,

        from_email=settings.DEFAULT_FROM_EMAIL,

        to=[candidate_email],

        reply_to=(
            [employer_email]
            if employer_email
            else [settings.DEFAULT_FROM_EMAIL]
        ),

    )


    # Attach HTML version

    email.attach_alternative(
        html_content,
        "text/html"
    )


    # Send

    email.send(
        fail_silently=False
    )


    print(
        f"STATUS HTML EMAIL SENT TO: "
        f"{candidate_email}"
    )


