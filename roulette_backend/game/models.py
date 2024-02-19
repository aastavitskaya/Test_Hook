from django.db import models
from users.models import Player
from game.core.engine import spin_roulette


class Game(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Игра"
        verbose_name_plural = "Игры"
        ordering = ["-id"]


class Spin(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=True, blank=True)
    turn = models.IntegerField(default=1)
    result = models.IntegerField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Раунд"
        verbose_name_plural = "Раунды"

    @classmethod
    def make_turn(cls, player, serializer):
        turn = serializer.validated_data["turn"]
        game = Game.objects.filter(player=player).first()
        if turn == 10:
            cls.objects.create(game=game, turn=turn, result=turn)
            serializer.validated_data["result"] = 11
            serializer.validated_data["turn"] = 0
        else:
            result = 0
            if turn == 0:
                game = Game.objects.create(player=player)
                result = spin_roulette([])
            elif turn < 10:
                previous_values = cls.objects.filter(game=game).values_list(
                    "result", flat=True
                )
                result = spin_roulette(previous_values)

            if result:
                cls.objects.create(game=game, turn=turn, result=result)
                serializer.validated_data["result"] = result
                serializer.validated_data["turn"] += 1
