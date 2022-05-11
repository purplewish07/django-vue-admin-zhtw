from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Storage_list
from .serializers import Storage_listSerializer
from rest_framework.decorators import action
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

class Storage_listViewSet(ModelViewSet):
    """
    儲位清單-增刪改查
    """
    perms_map = {'get': '*', 'post': 'work_create',
                 'put': '*', 'delete': 'work_delete'}
    queryset = Storage_list.objects.all()
    serializer_class = Storage_listSerializer
    pagination_class = None
    search_fields = ['name']
    ordering_fields = ['pk']
    ordering = ['pk']


    # def get_serializer(self, *args, **kwargs):
        # serializer_class = self.get_serializer_class()
        # kwargs.setdefault('context', self.get_serializer_context())
        # if isinstance(self.request.data, list):
            # return serializer_class(many=True, *args, **kwargs)
        # else:
            # return serializer_class(*args, **kwargs)

    @action(methods=['post'], detail=False)
    def create_or_update(self, request, *args, **kwargs):
        items=[]
        update_time=timezone.localtime()
        for res in request.data:
            items.append(Storage_list(name=res['name'],storage_spaces=res['storage_spaces'],user=res['user'],update_time=update_time))
        Storage_list.objects.bulk_update_or_create(items, ['storage_spaces','update_time','user'], match_field='name')
        return Response(request.data, status=status.HTTP_200_OK)