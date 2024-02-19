from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from game.views import GameViewSet, SpinViewSet
from statistic.views import RouletteStatisticsView
from users.views import PlayerViewSet


router = DefaultRouter()
router.register("players", PlayerViewSet, basename="players")
router.register("spins", SpinViewSet, basename="spins")
router.register("games", GameViewSet, basename="games")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls), name="api"),
    path("api-token-auth/", views.obtain_auth_token, name="token_auth"),
    path("statistic/", RouletteStatisticsView.as_view(), name="statistic"),
]
