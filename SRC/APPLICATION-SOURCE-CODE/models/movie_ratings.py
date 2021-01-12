from utils.config import *


def get_ratings_with_comments():
    query = "SELECT title, normalized_rating, comment, username " \
            "FROM movies, movie_ratings, users " \
            "WHERE movies.id = movie_ratings.movie_id " \
            "AND movie_ratings.user_id = users.id " \
            "AND movie_ratings.rating_source = 'user' LIMIT 500"

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    ratings = []
    for result in db_cursor:
        title, rating, comment, username = result[0], result[1], result[2], result[3]
        rating = dict(
            title=title,
            rating=rating,
            text=comment,
            username=username
        )
        ratings.append(rating)
    db_cursor.close()
    return ratings


def get_top_n_from_source(n, source):
    query = "SELECT title, movie_id, normalized_rating " \
            "FROM movie_ratings, movies " \
            "WHERE movies.id = movie_ratings.movie_id " \
            "AND rating_source = %(source)s " \
            "ORDER BY normalized_rating DESC " \
            "LIMIT %(limit)s"

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(limit=n, source=source))

    ratings = []
    for result in db_cursor:
        title, movie_id, rating = result[0], result[1], result[2]
        rating = dict(
            title=title,
            id=movie_id,
            rating=rating
        )
        ratings.append(rating)
    db_cursor.close()
    return ratings


def get_average_ratings_for_movie_id(movie_id):
    query = "SELECT rating_source, AVG(normalized_rating) " \
            "FROM movie_ratings " \
            "WHERE movie_id = %(movie_id)s " \
            "GROUP BY rating_source"

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(movie_id=movie_id))

    ratings = dict()
    for result in db_cursor:
        source, rating = result[0], result[1]
        ratings[source] = rating
    db_cursor.close()
    return ratings


def get_n_comments_for_movie_id(movie_id, n):
    query = "SELECT username, comment, normalized_rating " \
    "FROM movie_ratings, users " \
    "WHERE movie_ratings.user_id = users.id " \
    "AND movie_id = %(movie_id)s " \
    "LIMIT %(limit)s"

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(movie_id=movie_id, limit=n))

    comments = []

    for result in db_cursor:
        username, comment, rating  = result[0], result[1], result[2]
        comments.append(dict(comment=comment, username=username, rating=rating))

    db_cursor.close()
    return comments


def get_top_genres_by_ratings(n):
    query = "SELECT genre, AVG(movie_ratings.normalized_rating) AS r " \
            "FROM movies, movie_ratings " \
            "WHERE movie_id = movies.id " \
            "GROUP BY genre " \
            "ORDER BY r DESC " \
            "LIMIT %(limit)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(limit=n))

    genres = []
    for result in db_cursor:
        name, avg_rating = result[0], result[1]
        genre = dict(
            name=name.title(),
            avg_rating=avg_rating
        )
        genres.append(genre)
    db_cursor.close()
    return genres


def get_top_actors_by_ratings(n):
    query = "SELECT first_name, last_name, " \
            "AVG(movie_ratings.normalized_rating) AS r " \
            "FROM actors, actors_movies, movie_ratings " \
            "WHERE actors.id = actors_movies.actor_id " \
            "AND actors_movies.movie_id = movie_ratings.movie_id " \
            "GROUP BY first_name, last_name " \
            "ORDER BY r DESC " \
            "LIMIT %(limit)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(limit=n))

    actors = []
    for result in db_cursor:
        first_name, last_name, avg_rating = result[0], result[1], result[2]
        if first_name and last_name:
            name = f"{first_name} {last_name}"
        else:
            name = first_name

        actor = dict(
            name=name.title(),
            avg_rating=avg_rating
        )
        actors.append(actor)
    db_cursor.close()
    return actors


def get_top_n_movies_with_most_user_ratings(n):
    query = "SELECT title, count(movie_ratings.id) as c " \
            "FROM movies, movie_ratings " \
            "WHERE movie_id = movies.id " \
            "AND rating_source = 'USER' " \
            "GROUP BY title " \
            "ORDER BY c DESC " \
            "LIMIT %(limit)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(limit=n))

    movies = []
    for result in db_cursor:
        title, num_ratings = result[0], result[1]

        movie = dict(
            title=title.title(),
            num_ratings=num_ratings
        )
        movies.append(movie)
    db_cursor.close()
    return movies
