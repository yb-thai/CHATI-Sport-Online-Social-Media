# Generated by Django 3.1.7 on 2021-05-26 20:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CHATI', '0003_event_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='prize',
            new_name='price',
        ),
    ]