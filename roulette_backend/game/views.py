from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ViewSet, ModelViewSet

from .models import Game, Spin
from .serializers import GameSerializer, SpinSerializer


class GameViewSet(ModelViewSet):
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]
    queryset = Game.objects.all()


class SpinViewSet(ModelViewSet):
    serializer_class = SpinSerializer
    permission_classes = [IsAuthenticated]
    queryset = Spin.objects.all()

    def perform_create(self, serializer):
        Spin.make_turn(self.request.user, serializer)
