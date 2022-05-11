from rest_framework import serializers
# from .models import Test
from .models import *

class Tag_Serializer(serializers.ModelSerializer):
	"""
	測試序列化
	"""
	class Meta:
		model = Tag
		fields = '__all__'