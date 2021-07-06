from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt import authentication


from .serializers import PatchSerializer
from .models import Patch
from .tasks import start_patch_import


class PatchViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Patch.objects.all()
    serializer_class = PatchSerializer

    def create(self, request, *args, **kwargs):
        jwt = authentication.JWTAuthentication()
        user, token = jwt.authenticate(request)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer, user)
        patch = serializer.save(owner=user)
        start_patch_import.delay(patch.id)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

