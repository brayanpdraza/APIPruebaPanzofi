from rest_framework import serializers
from .models import Auditoria_Usuarios_Sesion

class Auditoria_Usuarios_Sesion_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Auditoria_Usuarios_Sesion
        fields = ('ID_Auditoria_Usuarios_Sesion','ID_Usuarios', 'Inicio_Sesion','Cierre_Sesion', 'Boton_1', 'Boton_2', 'Tiempo')
        read_only_fields = ('ID_Usuarios_Sesion',)