from django.urls import path, include
# from django.conf.urls import include, url
# from .views import TestViewSet
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register('task_list', TestViewSet, basename="task_list")
router.register('Machine', MachineViewSet, basename="Machine")
router.register('Class', ClassViewSet, basename="Class")
router.register('Mechanical_hours', Mechanical_hoursViewSet, basename="Mechanical_hours")

urlpatterns = [
	path('', include(router.urls)),
	# url(r'^task_list/$', TestViewSet),
]
