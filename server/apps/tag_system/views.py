from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Tag
from .serializers import Tag_Serializer


# Create your views here.

class Tag_ViewSet(ModelViewSet):
    """
    Tag-增刪改查
    """
    perms_map = {'get': '*', 'post': 'work_create',
                 'put': '*', 'delete': 'work_delete'}
    queryset = Tag.objects.all()
    serializer_class = Tag_Serializer
    pagination_class = None
    search_fields = ['tagid']
    ordering_fields = ['pk']
    ordering = ['pk']
