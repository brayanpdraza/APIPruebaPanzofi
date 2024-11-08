from rest_framework import routers
from .API import Auditoria_Users_Session_View_Set

router = routers.DefaultRouter()

router.register('API/Auditoria_Usuarios_Sesion',Auditoria_Users_Session_View_Set,'Auditoria_Usuarios_Sesion')

urlpatterns = router.urls