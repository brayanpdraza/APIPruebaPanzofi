from rest_framework import routers
from .API import Users_View_Set,Users_Session_View_Set,Users_Detail_View_Set

router = routers.DefaultRouter()

router.register('API/User',Users_View_Set,'User')
router.register('API/User_Detail',Users_Detail_View_Set,'User_Detail')
router.register('API/User_Session',Users_Session_View_Set,'User_Session')

urlpatterns = router.urls