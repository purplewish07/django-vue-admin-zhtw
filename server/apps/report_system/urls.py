from django.urls import path, include
from .views import Work_orderViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register('work_list', Work_orderViewSet, basename="work_list")

urlpatterns = [
    path('', include(router.urls)),
]
