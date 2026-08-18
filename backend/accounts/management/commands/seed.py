


from django.core.management.base import BaseCommand

from accounts.models import (
    User,
    CandidateProfile,
    EmployerProfile,
)

from companies.models import Company
from jobs.models import Job
from applications.models import Application


class Command(BaseCommand):

    help = "Seed JobConnect database"

    def handle(self, *args, **kwargs):

        self.stdout.write("Deleting old data...")

        Application.objects.all().delete()
        Job.objects.all().delete()
        Company.objects.all().delete()
        CandidateProfile.objects.all().delete()
        EmployerProfile.objects.all().delete()
        User.objects.all().delete()

        self.stdout.write(self.style.SUCCESS("Old data removed."))

        self.stdout.write("Creating users...")

        admin = User.objects.create_user(
            username="admin",
            email="admin@gmail.com",
            password="admin123",
            role="admin"
        )

        sabir = User.objects.create_user(
            username="sabir",
            email="sabir@gmail.com",
            password="123456",
            role="candidate"
        )

        abcd = User.objects.create_user(
            username="abcd",
            email="abcd@gmail.com",
            password="123456",
            role="candidate"
        )

        employer999 = User.objects.create_user(
            username="employer999",
            email="employer999@gmail.com",
            password="123456",
            role="employer"
        )

        company1 = User.objects.create_user(
            username="company1",
            email="company1@gmail.com",
            password="123456",
            role="employer"
        )

        sabirtech = User.objects.create_user(
            username="Sabir-Tech",
            email="sabirtech@gmail.com",
            password="123456",
            role="employer"
        )

        atharva = User.objects.create_user(
            username="Atharva-pawar",
            email="atharva@gmail.com",
            password="123456",
            role="employer"
        )

        self.stdout.write(self.style.SUCCESS("Users created."))



