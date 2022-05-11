from django.shortcuts import render
# from .models import Test
from .models import *
# from .serializers import Test_Serializer
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
import json
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class TestViewSet(viewsets.ModelViewSet):
	queryset = Test.objects.all()
	serializer_class = Test_Serializer
	perms_map = {'get': '*', 'post': 'work_create',
				 'put': 'work_update', 'delete': 'work_delete'}
	search_fields = ['name']
	ordering_fields = ['pk']
	ordering = ['pk']

	
	# def get_queryset(self):
		# inlinecount = self.request.query_params.get('$inlinecount')
		# # return self.queryset
		# result = list(self.queryset.values())
		# count = len(result)
		# return JsonResponse({result})

	def retrieve(self, request, *args, **kwargs): 
		# instance = self.get_object() 
		# serializer = self.get_serializer(instance) 
		# data = serializer.data 

		# here you can manipulate your data response 
		# return Response(data) 
		result = list(self.queryset.values())
		count = len(result)
		# return JsonResponse({"result":result,"count":count})
		return JsonResponse({result})
		
		
		
	def list(self, request, *args, **kwargs): 
		# instance = self.get_object() 
		# serializer = self.get_serializer(instance) 
		# data = serializer.data 
		# here you can manipulate your data response 
		# return Response(data) 
		result = list(self.queryset.values())
		count = len(result)
		return JsonResponse({"result":result,"count":count})
		# return JsonResponse(result,safe=False)
		
	# def retrieve(self, request, *args, **kwargs):
		# return Response({"result":[{'something': 'my custom JSON'}],"count":1})

	# def list(self, request, *args, **kwargs):
		# return Response({"result":[{'something': 'my custom JSON'}],"count":1})
		
		
	# def put(self, request, format=None):
		# pass
	def put(self, request, *args, **kwargs):
		return self.update(request, *args, **kwargs)

	# def delete(self, request, id, format=None):
		# pass
		
		
class ClassViewSet(viewsets.ModelViewSet):
	"""
	機械類別-增刪改查
	"""
	# perms_map = {'get': '*', 'post': 'work_create',
				 # 'put': '*', 'delete': 'work_delete'}
	queryset = Class.objects.all()
	serializer_class = Class_Serializer
	
	def list(self, request, *args, **kwargs): 
		result = list(self.queryset.values())
		count = len(result)
		return JsonResponse({"result":result,"count":count})
	
class MachineViewSet(viewsets.ModelViewSet):
	"""
	機械類別-增刪改查
	"""
	# perms_map = {'get': '*', 'post': 'work_create',
				 # 'put': '*', 'delete': 'work_delete'}
	queryset = Machine.objects.all()
	serializer_class = Machine_Serializer
	
	def list(self, request, *args, **kwargs): 
		result = list(self.queryset.values())
		count = len(result)
		return JsonResponse({"result":result,"count":count})
	
class Mechanical_hoursViewSet(viewsets.ModelViewSet):
	"""
	機械類別-增刪改查
	"""
	# perms_map = {'get': '*', 'post': 'work_create',
				 # 'put': '*', 'delete': 'work_delete'}
	queryset = Mechanical_hours.objects.all()
	serializer_class = Mechanical_hours_Serializer

	def list(self, request, *args, **kwargs): 
		result = list(self.queryset.values())
		count = len(result)
		return JsonResponse({"result":result,"count":count})
		# return JsonResponse(result,safe=False)