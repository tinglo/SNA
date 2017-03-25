# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-25 09:32
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20170325_0920'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='user',
            field=models.ManyToManyField(related_name='account_groups', to=settings.AUTH_USER_MODEL),
        ),
    ]