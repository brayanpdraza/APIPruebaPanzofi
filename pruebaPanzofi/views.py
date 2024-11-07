from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from Users.serializers import Usuarios_Serializer
from Users.models import Usuarios,Usuarios_Sesion
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@api_view(['POST'])
def login(request):
    
    if not Usuarios.objects.filter(Nombre_Usuario=request.data['Nombre_Usuario']).exists():
        return Response({'error': 'El nombre de usuario no se encuentra registrado.'}, status=status.HTTP_404_NOT_FOUND)

    Usuario = Usuarios.objects.get(Nombre_Usuario = request.data["Nombre_Usuario"])

    token = start_user_session(Usuario)
    serializer = Usuarios_Serializer(data=request.data)
    if serializer.is_valid():
        return Response({'token':token.key,'usuario':serializer.data},status=status.HTTP_200_OK)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    serializer = Usuarios_Serializer(data=request.data)

    if Usuarios.objects.filter(Nombre_Usuario=request.data['Nombre_Usuario']).exists():
        return Response({'error': 'El nombre de usuario ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid():
        serializer.save()

        Usuario = Usuarios.objects.get(Nombre_Usuario = serializer.data["Nombre_Usuario"])
        
        Usuario.Clave = serializer.data['Clave']
        Usuario.save()

        token = start_user_session(Usuario)

        return Response({'token':token.key,'usuario':serializer.data}, status=status.HTTP_201_CREATED)

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