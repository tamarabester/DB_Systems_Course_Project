from utils.config import *


def get_actors_for_movie_id(movie_id):
    query = "SELECT first_name, last_name from actors, actors_movies " \
            "WHERE actors.id = actors_movies.actor_id AND " \
            "actors_movies.movie_id = %(movie_id)s"

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(movie_id=movie_id))

    actors = []
    for result in db_cursor:
        first_name, last_name = result[0], result[1]
        if first_name and last_name:
            actors.append(f"{first_name} {last_name}")
        elif first_name:
            actors.append(first_name)

    db_cursor.close()
    return actors
