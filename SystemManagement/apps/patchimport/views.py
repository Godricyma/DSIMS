from rest_framework import viewsets
from rest_framework import permissions


from .serializers import PatchSerializer
from .models import Patch


class PatchViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Patch.objects.all()
    serializer_class = PatchSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
