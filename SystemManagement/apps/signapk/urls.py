from django.urls import path,include
from django.conf.urls import url
from rest_framework import routers
from .views import ProjectViewSet, SignApk

router = routers.DefaultRouter()
router.register('project', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    url(r'^operator/$', SignApk.as_view())
]