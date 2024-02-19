from django.contrib import admin

from game.models import Game, Spin


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    pass


@admin.register(Spin)
class SpinAdmin(admin.ModelAdmin):
    pass
