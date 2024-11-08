from Users.models import Auditoria_Usuarios_Sesion
from rest_framework import viewsets, permissions
from .serializers import Auditoria_Usuarios_Sesion_Serializer

class Auditoria_Users_Session_View_Set(viewsets.ReadOnlyModelViewSet):
    queryset=Auditoria_Usuarios_Sesion.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Auditoria_Usuarios_Sesion_Serializer