from rest_framework import serializers
from .models import Game, Spin


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["id", "player"]


class SpinSerializer(serializers.ModelSerializer):

    class Meta:
        model = Spin
        fields = ["id", "game", "turn", "result"]
