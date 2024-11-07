from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from Users.serializers import Usuarios_Serializer
from Users.models import Usuarios,Usuarios_Sesion
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password,check_password

@api_view(['POST'])
def login(request):
    
    try:
        # Intentar obtener el usuario directamente
        Usuario = Usuarios.objects.get(Nombre_Usuario=request.data["Nombre_Usuario"])
    except Usuarios.DoesNotExist:
        # Si no existe, retornamos el error 404
        return Response({'error': 'El nombre de usuario no se encuentra registrado.'}, status=status.HTTP_404_NOT_FOUND)

    if not check_password(request.data['Clave'], Usuario.Clave):
        return Response({'error': 'Contraseña incorrecta.'}, status=status.HTTP_400_BAD_REQUEST)

    token = start_user_session(Usuario)

    usuario_serializado = Usuarios_Serializer(Usuario)

    return Response({'token':token.key,'usuario':usuario_serializado.data},status=status.HTTP_200_OK)
    

@api_view(['POST'])
def register(request):
    serializer = Usuarios_Serializer(data=request.data)

    if Usuarios.objects.filter(Nombre_Usuario=request.data['Nombre_Usuario']).exists():
        return Response({'error': 'El nombre de usuario ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid():
        serializer.save()

        Usuario = Usuarios.objects.get(Nombre_Usuario = serializer.data["Nombre_Usuario"])
        
        Usuario.Clave =  make_password(serializer.data['Clave'])
        Usuario.save()

        token = start_user_session(Usuario)

        usuario_serializado = Usuarios_Serializer(Usuario)

        return Response({'token':token.key,'usuario':usuario_serializado.data}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

def start_user_session(Usuario):
    
    session, created = Usuarios_Sesion.objects.get_or_create(ID_Usuarios=Usuario)
    if not created:
        session.end_session()
    session.start_session()

    user, _ = User.objects.get_or_create(username=Usuario.Nombre_Usuario)
    Token.objects.filter(user=user).delete()
    token = Token.objects.create(user=user)

    return token