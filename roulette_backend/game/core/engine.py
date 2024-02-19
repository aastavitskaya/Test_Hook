import random

from django.db.models.query import QuerySet


def spin_roulette(previous_values: QuerySet[int]) -> int:
    numbers = {
        9: 140,
        6: 140,
        2: 100,
        4: 70,
        3: 45,
        10: 45,
        7: 20,
        8: 20,
        1: 20,
        5: 15,
    }

    for num in previous_values:
        del numbers[num]

    results = []
    weights = []

    for result, weight in numbers.items():
        results.append(result)
        weights.append(weight)

    return random.choices(results, weights=weights, k=1)[0]
