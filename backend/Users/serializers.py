from rest_framework import serializers
from .models import Usuarios,Usuarios_Sesion
from Perfiles.models import MT_Perfiles
from Perfiles.serializers import MT_Perfiles_Serializer 


class Usuarios_Serializer(serializers.ModelSerializer):

    ID_MT_Perfiles = serializers.PrimaryKeyRelatedField(queryset=MT_Perfiles.objects.all())

    class Meta:
        model = Usuarios
        fields = ('ID_Usuarios', 'ID_MT_Perfiles', 'Nombre_Usuario', 'Clave')
        read_only_fields = ('ID_Usuarios',)

class Usuarios_Detalle_Serializer(serializers.ModelSerializer):
    # Usamos el serializer anidado para mostrar los detalles del perfil
    ID_MT_Perfiles = MT_Perfiles_Serializer()
    
    class Meta:
        model = Usuarios
        fields = ('ID_Usuarios', 'ID_MT_Perfiles', 'Nombre_Usuario','Clave')
        
class Usuarios_Sesion_Serializer(serializers.ModelSerializer):
    ID_Usuarios = Usuarios_Serializer()
    class Meta:
        model = Usuarios_Sesion
        fields = ('ID_Usuarios_Sesion','ID_Usuarios', 'Inicio_Sesion', 'Boton_1', 'Boton_2', 'Tiempo')
        read_only_fields = ('ID_Usuarios_Sesion',)