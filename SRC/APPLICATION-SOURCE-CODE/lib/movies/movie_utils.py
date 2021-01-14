import wikipedia
from models.actor_movies import *
from models.movie_ratings import *
from models.movies import *


def get_majority_genre(movies):
    genres = dict()
    for movie_id in movies:
        genre = get_genre_for_movie_id(movie_id)
        genres[genre] = genres.get(genre, 0) + 1

    max_genre_name = None
    max_genre_count = 0
    for genre, count in genres.items():
        if count > max_genre_count:
            max_genre_count = count
            max_genre_name = genre

    if max_genre_count == 1:
        return None

    return max_genre_name


def get_majority_actor(movies):
    actors = dict()
    for movie_id in movies:
        movie_actors = get_actors_for_movie_id(movie_id)
        for actor in movie_actors:
            actors[actor] = actors.get(actor, 0) + 1

    max_actor_name = None
    max_actor_count = 0
    for actor, count in actors.items():
        if count > max_actor_count:
            max_actor_count = count
            max_actor_name = actor

    if max_actor_count == 1:
        return None

    return max_actor_name


def get_movie_info_for_movie_id(movie_id):
    movie_info = dict(
        title=get_title_for_movie_id(movie_id),
        genre=get_genre_for_movie_id(movie_id),
        poster_link=get_poster_for_movie_id(movie_id),
        ratings=get_average_ratings_for_movie_id(movie_id),
        actors=get_actors_for_movie_id(movie_id),
        id=movie_id,
    )

    # try to add summary from wiki
    try:
        wiki_summary = wikipedia.summary(movie_info["title"], sentences=5)
        movie_info["summary"] = wiki_summary
    except Exception as e:
        pass

    return movie_info


def get_full_recommendation(recommendation_id):
    return get_movie_info_for_movie_id(recommendation_id)