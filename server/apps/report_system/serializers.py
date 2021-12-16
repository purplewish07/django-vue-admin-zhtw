from rest_framework import serializers
from .models import Work_order

class Work_orderSerializer(serializers.ModelSerializer):
    """
    製令序列化
    """
    class Meta:
        model = Work_order
        fields = '__all__'