from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, GroupViewSet


router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('group', GroupViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
