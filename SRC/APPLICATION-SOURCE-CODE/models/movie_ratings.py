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
    # TODO return list of {id, rating}
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
    query = "SELECT comment " \
    "FROM movie_ratings " \
    "WHERE movie_id = %(movie_id)s " \
    "LIMIT %(limit)s"

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(movie_id=movie_id, limit=n))

    comments = []

    for comment in db_cursor:
        comments.append(comment)

    db_cursor.close()
    return comments
