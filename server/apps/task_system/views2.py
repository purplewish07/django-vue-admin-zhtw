from django.shortcuts import render
from .models import Test
from odata_query.django import apply_odata_query
import json
from django.http import JsonResponse



# Create your views here.
def TestViewSet(odata_query="id eq 2"):
	orm_query = Test.objects  # This can be a Manager or a QuerySet.
	# odata_query = "name eq 'test'"  # This will usually come from a query string parameter.

	query = apply_odata_query(orm_query, odata_query)
	results = query.all()
	# return JsonResponse(results)