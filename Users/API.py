from Users.models import Usuarios,Usuarios_Sesion
from rest_framework import viewsets, permissions,status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import Usuarios_Serializer,Usuarios_Detalle_Serializer,Usuarios_Sesion_Serializer
#import hashlib 

class Users_View_Set(viewsets.ModelViewSet):
    queryset=Usuarios.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Usuarios_Serializer

class Users_Detail_View_Set(viewsets.ReadOnlyModelViewSet):
    queryset=Usuarios.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Usuarios_Detalle_Serializer

    @action(detail=False, methods=['post'], url_path='by-credentials')
    def by_credentials(self, request):
        nombre_usuario = request.data.get('Nombre_Usuario')
        clave = request.data.get('Clave')
        
        usuario = Usuarios.objects.filter(Nombre_Usuario=nombre_usuario, Clave=clave).first()
        
        if usuario:
            serializer = Usuarios_Detalle_Serializer(usuario)
            return Response(serializer.data)
        else:
            return Response({"detail": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class Users_Session_View_Set(viewsets.ModelViewSet):
    queryset=Usuarios_Sesion.objects.all()
    ermission_classes = [permissions.AllowAny]
    serializer_class = Usuarios_Sesion_Serializer