from rest_framework import routers
from .API import MT_Landing_Page_View_Set

router = routers.DefaultRouter()

router.register('API/MT_Landing_Page',MT_Landing_Page_View_Set,'MT_Landing_Page')

urlpatterns = router.urls