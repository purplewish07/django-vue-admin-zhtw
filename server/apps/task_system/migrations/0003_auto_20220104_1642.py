# Generated by Django 3.2.6 on 2022-01-04 08:42

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('task_system', '0002_auto_20211227_1604'),
    ]

    operations = [
        # migrations.CreateModel(
            # name='Class',
            # fields=[
                # ('ID', models.AutoField(primary_key=True, serialize=False)),
                # ('ClassID', models.PositiveIntegerField()),
                # ('ClassName', models.TextField(blank=True, null=True)),
                # ('Color', models.CharField(blank=True, max_length=7, null=True)),
            # ],
            # options={
                # 'db_table': 'class',
            # },
        # ),
        # migrations.CreateModel(
            # name='Machine',
            # fields=[
                # ('ID', models.AutoField(primary_key=True, serialize=False)),
                # ('MachineID', models.PositiveIntegerField()),
                # ('MachineName', models.TextField(blank=True, null=True)),
                # ('Color', models.CharField(blank=True, max_length=7, null=True)),
            # ],
            # options={
                # 'db_table': 'machine',
            # },
        # ),
        migrations.CreateModel(
            name='Mechanical_hours',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('start_time', models.DateTimeField(default=datetime.datetime(2022, 1, 4, 8, 0, tzinfo=utc))),
                ('end_time', models.DateTimeField(default=datetime.datetime(2022, 1, 4, 17, 0, tzinfo=utc))),
                ('Subjuct', models.TextField(blank=True, null=True)),
                ('MachineID', models.JSONField()),
                ('ClassID', models.JSONField()),
            ],
            options={
                'db_table': 'mechanical_hours',
            },
        ),
        migrations.AlterField(
            model_name='test',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]