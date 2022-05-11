from django.db import models
from django.utils import timezone
from datetime import datetime


# Create your models here.

class Test(models.Model):
	id = models.AutoField(primary_key=True)
	OrderID = models.TextField()
	CustomerID = models.TextField(null=True, blank=True)
	EmployeeID = models.TextField(null=True, blank=True)
	OrderDate =models.DateTimeField(default=timezone.now, verbose_name='開始時間', help_text='開始時間', null=True, blank=True)
	ShipName = models.TextField(null=True, blank=True)
	ShipCity = models.TextField(null=True, blank=True)
	ShipAddress = models.TextField(null=True, blank=True)
	ShipRegion = models.TextField(null=True, blank=True)
	ShipPostalCode = models.TextField(null=True, blank=True)
	ShipCountry = models.TextField(null=True, blank=True)
	Freight = models.TextField(null=True, blank=True)
	Verified = models.TextField(null=True, blank=True)


	class Meta:
		db_table = "test"

class Machine(models.Model):
	ID = models.AutoField(primary_key=True)
	MachineID = models.PositiveIntegerField()
	MachineName = models.TextField(null=True, blank=True)
	Color = models.CharField(max_length=7,null=True, blank=True)
	
	class Meta:
		db_table = "machine"

		
class Class(models.Model):
	ID = models.AutoField(primary_key=True)
	ClassID = models.PositiveIntegerField()
	ClassName = models.TextField(null=True, blank=True)
	Color = models.CharField(max_length=7,null=True, blank=True)
	
	class Meta:
		db_table = "class"

class Mechanical_hours(models.Model):
	ID = models.AutoField(primary_key=True)
	start_time = models.DateTimeField(null=True, blank=True)
	end_time = models.DateTimeField(null=True, blank=True)
	Subject = models.TextField(null=True, blank=True)
	MachineID = models.JSONField()
	ClassID = models.JSONField()
	
	class Meta:
		db_table = "mechanical_hours"
		
