from django.contrib.auth.hashers import make_password
from rest_framework.serializers import ModelSerializer

from users.models import Player


class PlayerModelSerializer(ModelSerializer):
    class Meta:
        model = Player
        fields = [
            "id",
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
