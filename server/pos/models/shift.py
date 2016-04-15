from django.db import models

from .user import User


class Shift(models.Model):
    start = models.DateTimeField(auto_now_add=True, blank=False)
    end = models.DateTimeField(blank=True, null=True)
    leader = models.ForeignKey(User)

    def __str__(self):
        return 'Skift ledet av ' + str(self.leader) + ' som startet ' + self.start.strftime('%Y-%m-%d %H:%M:%S')
