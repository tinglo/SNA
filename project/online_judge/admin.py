from django.contrib import admin

from .models import ScoreRecord 
# Register your models here.

class ScoreRecordAdmin(admin.ModelAdmin):
    readonly_fields = ('create_at',)

admin.site.register(ScoreRecord, ScoreRecordAdmin)
