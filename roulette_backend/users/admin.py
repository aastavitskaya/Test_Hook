from django.contrib import admin

from users.models import Player


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    pass
