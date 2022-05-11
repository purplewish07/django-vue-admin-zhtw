from django.urls import path, include
from .views import Tag_ViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register('tag', Tag_ViewSet, basename="tag")

urlpatterns = [
    path('', include(router.urls)),
]
