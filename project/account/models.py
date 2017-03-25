from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Group(models.Model):

    name = models.CharField(max_length=50)
    user = models.OneToOneField(User, related_name="account_group", blank=True, null=True)

    def __str__(self):
        return self.name

