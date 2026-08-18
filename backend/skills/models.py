from django.db import models


# from categories.models import Category


# Create your models here.


class Skill(models.Model):

    # category = models.ForeignKey(
    #     Category,
    #     on_delete=models.CASCADE,
    #     related_name="skills"
    # )

    name = models.CharField(
        max_length=100,
        unique=True
    )  

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        ordering = ["name"]

    def __str__(self):

        return self.name


