from Perfiles.models import MT_Perfiles
from rest_framework import viewsets, permissions
from .serializers import MT_Perfiles_Serializer

class MT_Perfiles_View_Set(viewsets.ModelViewSet):
    queryset=MT_Perfiles.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = MT_Perfiles_Serializer