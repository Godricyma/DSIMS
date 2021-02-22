from django.contrib.auth.models import User, Group
from rest_framework import serializers


from apps.patchimport.models import Patch


class UserSerializer(serializers.ModelSerializer):
    patch_set = serializers.PrimaryKeyRelatedField(many=True, queryset=Patch.objects.all())

    class Meta:
        model = User
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'
