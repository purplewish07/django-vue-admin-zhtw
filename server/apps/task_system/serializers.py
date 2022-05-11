from rest_framework import serializers
# from .models import Test
from .models import *

class Test_Serializer(serializers.ModelSerializer):
	"""
	測試序列化
	"""
	class Meta:
		model = Test
		# fields = '__all__'
		fields = (
			"OrderID",
			"CustomerID",
			"EmployeeID",
			"OrderDate",
			"ShipName",
			"ShipCity",
			"ShipAddress",
			"ShipRegion",
			"ShipPostalCode",
			"ShipCountry",
			"Freight",
			"Verified")
			
class Class_Serializer(serializers.ModelSerializer):
	"""
	機械類別序列化
	"""
	class Meta:
		model = Class
		fields = '__all__'
		
class Machine_Serializer(serializers.ModelSerializer):
	"""
	機台序列化
	"""
	class Meta:
		model = Machine
		fields = '__all__'
		
class Mechanical_hours_Serializer(serializers.ModelSerializer):
	"""
	機械工時序列化
	"""
	class Meta:
		model = Mechanical_hours
		fields = '__all__'
