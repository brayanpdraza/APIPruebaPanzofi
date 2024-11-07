from rest_framework import serializers
from .models import MT_Landing_Page

class MT_Landing_Page_Serializer(serializers.ModelSerializer):
    class Meta:
        model = MT_Landing_Page
        fields=('ID_MT_Landing_Page','Imagen','Titulo','Descripcion')
        read_only_fields = ('ID_MT_Landing_Page',)