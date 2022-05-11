from rest_framework import serializers
from .models import Storage_list
# from django.utils import timezone

class Storage_listSerializer(serializers.ModelSerializer):
    """
    儲位清單序列化
    """
    class Meta:
        model = Storage_list
        fields = '__all__'
        extra_kwargs = {'storage_spaces': {'required': True}} 

    # def create(self, validated_data):
        # Storage_list, created = Storage_list.objects.update_or_create(
            # name=validated_data.get('name', None), storage_spaces=validated_data.get('storage_spaces', None),
            # defaults={'name': name,'storage_spaces': storage_spaces})

        # return Storage_list

    # def create_or_update(self, validated_data):
        # print(0)
        # print(validated_data)
        # name=validated_data.get('name', None)
        # storage_spaces=validated_data.get('storage_spaces', None)
        # print(name)
        # print(storage_spaces)
        # update_time=timezone.localtime()
        # print(update_time)
        # items=[Storage_list(name=name,storage_spaces=storage_spaces,update_time=update_time)]
        # print(1)
        # Storage_list.objects.bulk_update_or_create(items, ['storage_spaces','update_time'], match_field='name')
        # print(2)
        # # return Storage_list.objects.create(**validated_data)
        # return 0
