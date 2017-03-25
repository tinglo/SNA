from django.db import models
from django.contrib.auth.models import User

from account.models import Group

class ScoreRecord(models.Model):
    
    user = models.ForeignKey(User, blank=True, null=True)
    group = models.ForeignKey(Group, blank=True, null=True)
    filename = models.CharField(max_length=255)
    nmi = models.FloatField(default=0.0)
    anc = models.FloatField(default=0.0)
    total_score = models.FloatField(default=0.0)
    create_at = models.DateTimeField(auto_now_add=True)    
 
    def __str__(self):
        return self.group.name

    def serialize(self):

        score_record = {
            "username": self.user.username,
            "group": self.group.name,
            "uploaded_time": self.create_at.strftime("%c"),
            "nmi": self.nmi,
            "anc": self.anc,
            "total_score": self.total_score,
        }

        return score_record
    
