from django.urls import path, include
from .views import Storage_listViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register('storage_list', Storage_listViewSet, basename="Storage_list")

urlpatterns = [
    path('', include(router.urls)),
]
