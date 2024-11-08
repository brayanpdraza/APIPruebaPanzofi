from rest_framework import routers
from .API import MT_Perfiles_View_Set

router = routers.DefaultRouter()

router.register('API/Perfil',MT_Perfiles_View_Set,'Perfil')

urlpatterns = router.urls