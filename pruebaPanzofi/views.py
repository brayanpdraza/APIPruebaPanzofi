from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from Users.serializers import Usuarios_Serializer
from Users.models import Usuarios,Usuarios_Sesion
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

@api_view(['POST'])
def login(request):
    
    try:
        # Intentar obtener el usuario directamente
        Usuario = Usuarios.objects.get(Nombre_Usuario=request.data["Nombre_Usuario"])
    except Usuarios.DoesNotExist:
        # Si no existe, retornamos el error 404
        return Response({'error': 'El usuario {} no se encuentra registrado.'.format(request.data["Nombre_Usuario"])}, status=status.HTTP_404_NOT_FOUND)

    if not check_password(request.data['Clave'], Usuario.Clave):
        return Response({'error': 'Contraseña incorrecta.'}, status=status.HTTP_400_BAD_REQUEST)

    token = start_user_session(Usuario)

    usuario_serializado = Usuarios_Serializer(Usuario)

    return Response({'token':token.key,'usuario':usuario_serializado.data},status=status.HTTP_200_OK)
    

@api_view(['POST'])
def register(request):
    if Usuarios.objects.filter(Nombre_Usuario=request.data['Nombre_Usuario']).exists():
        return Response({'error': 'El nombre de usuario ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = Usuarios_Serializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        Usuario = Usuarios.objects.get(Nombre_Usuario = serializer.data["Nombre_Usuario"])
        
        Usuario.Clave =  make_password(serializer.data['Clave'])
        Usuario.save()

        token = start_user_session(Usuario)

        usuario_serializado = Usuarios_Serializer(Usuario)

        return Response({'token':token.key,'usuario':usuario_serializado.data}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def AumentoContadorBoton(request):
    
    user = request.user  # El usuario ya es una instancia de User, no hace falta buscarlo nuevamente
    Usuario = Usuarios.objects.get(Nombre_Usuario=user.username)  # Obtener la instancia de Usuarios asociada

    button_number = request.data.get('Boton')

    if button_number not in [1, 2]:  # Solo se permiten los botones 1 y 2
        return Response({'error': 'Botón inválido.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        session = Usuarios_Sesion.objects.get(ID_Usuarios=Usuario)
    except Usuarios_Sesion.DoesNotExist:
        return Response({'error': 'No se ha encontrado la sesión del usuario.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Llamar al método 'increment_click' para incrementar el contador del botón
    session.increment_click(button_number)

    return Response({"Contador Boton {} aumentado".format(button_number)},status=status.HTTP_200_OK)


def start_user_session(Usuario):
    
    session, created = Usuarios_Sesion.objects.get_or_create(ID_Usuarios=Usuario)
    if not created:
        session.end_session()
    session.start_session()

    user, _ = User.objects.get_or_create(username=Usuario.Nombre_Usuario)
    Token.objects.filter(user=user).delete()
    token = Token.objects.create(user=user)

    return token