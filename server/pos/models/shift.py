from django.db import models

from .user import User


class Shift(models.Model):
    start = models.DateTimeField(auto_now_add=True, blank=False)
    end = models.DateTimeField(blank=True, null=True)
    leader = models.ForeignKey(User)

    def __str__(self):
        return 'Skift ledet av ' + str(self.leader) + ' som startet ' + self.start.strftime('%Y-%m-%d %H:%M:%S')


class Declaration(models.Model):
    responsible = models.ForeignKey(User)
    checked_by = models.ForeignKey(User)
    incomming_balance = models.IntegerField()
    revenue = models.IntegerField()
    outgoing_balance = models.IntegerField()

    @property
    def difference(self):
        return self.outgoing_balance - self.incomming_balance - self.revenue
