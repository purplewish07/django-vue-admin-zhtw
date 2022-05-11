# Generated by Django 3.2.6 on 2021-12-27 07:46

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('OrderID', models.TextField()),
                ('CustomerID', models.TextField()),
                ('EmployeeID', models.TextField()),
                ('OrderDate', models.DateTimeField(blank=True, default=django.utils.timezone.now, help_text='開始時間', null=True, verbose_name='開始時間')),
                ('ShipName', models.TextField()),
                ('ShipCity', models.TextField()),
                ('ShipAddress', models.TextField()),
                ('ShipRegion', models.TextField()),
                ('ShipPostalCode', models.TextField()),
                ('ShipCountry', models.TextField()),
                ('Freight', models.TextField()),
                ('Verified', models.TextField()),
            ],
            options={
                'db_table': 'test',
            },
        ),
    ]
