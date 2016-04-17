from django.db import models


class User(models.Model):
    name = models.CharField(max_length=255)
    max_credit = models.IntegerField()
    card = models.CharField(max_length=255)

    def __str__(self):
        return self.name
