from django.contrib.auth.models import AbstractUser


class Player(AbstractUser):
    first_name = None
    last_name = None
    age = None

    class Meta:
        verbose_name = "Игрок"
        verbose_name_plural = "Игроки"
