from rest_framework import serializers
from .models import MT_Perfiles

class MT_Perfiles_Serializer(serializers.ModelSerializer):
    class Meta:
        model = MT_Perfiles
        fields = ('ID_MT_Perfiles', 'Nombre_Perfil', 'Jerarquia', 'Descripcion')