from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Work_order
from .serializers import Work_orderSerializer


# Create your views here.

class Work_orderViewSet(ModelViewSet):
    """
    製令-增刪改查
    """
    perms_map = {'get': '*', 'post': 'work_create',
                 'put': 'work_update', 'delete': 'work_delete'}
    queryset = Work_order.objects.all()
    serializer_class = Work_orderSerializer
    pagination_class = None
    search_fields = ['name']
    ordering_fields = ['pk']
    ordering = ['pk']
