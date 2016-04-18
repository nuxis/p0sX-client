from django.db import models


class User(models.Model):
    card = models.CharField(max_length=255, unique=True, primary_key=True)
    name = models.CharField(max_length=255)
    max_credit = models.IntegerField()

    def __str__(self):
        return self.name
