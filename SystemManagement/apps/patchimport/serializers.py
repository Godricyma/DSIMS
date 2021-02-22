from rest_framework import serializers


from .models import Patch


class PatchSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.name')

    class Meta:
        model = Patch
        fields = '__all__'
