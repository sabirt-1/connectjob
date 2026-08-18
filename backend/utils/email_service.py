


from django.core.mail import send_mail
from django.conf import settings


def send_otp_email(email, otp):

    subject = "JobConnect AI - Email Verification"

    message = f"""
Hello,

Your JobConnect verification code is:

{otp}

This OTP is valid for 5 minutes.

If you did not create an account, ignore this email.

Regards,
JobConnect AI Team
"""

    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [email],
        fail_silently=False,
    )

