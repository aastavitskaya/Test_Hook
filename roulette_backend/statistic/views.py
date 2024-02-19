from django.http import JsonResponse
from django.db.models import Count
from django.views.generic.base import View

from game.models import Game, Spin
from users.models import Player


class RouletteStatisticsView(View):
    def get(self, request, *args, **kwargs):
        total_games = Game.objects.count()
        total_players = Player.objects.count()
        players = list(
            Game.objects.values("player__id")
            .annotate(total_games=Count("player_id"))
            .order_by("-total_games")
        )
        top_players = [
            {
                "id": player["player__id"],
                "total_games": player["total_games"],
                "avg_spins": round(
                    Spin.objects.filter(game__player_id=player["player__id"]).count()
                    / player["total_games"],
                    2,
                ),
            }
            for player in players
        ]

        data = {
            "total_games": total_games,
            "total_players": total_players,
            "top_players": top_players,
        }

        return JsonResponse(data)
