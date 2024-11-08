from projects.models import MT_Landing_Page
from rest_framework import viewsets, permissions
from .serializers import MT_Landing_Page_Serializer

class MT_Landing_Page_View_Set(viewsets.ModelViewSet):
    queryset=MT_Landing_Page.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = MT_Landing_Page_Serializer