from utils.config import *


def create_ex(exclude):
    if exclude == None or len(exclude) == 0:
        return "(-1)"
    ex = "("
    for id in exclude:
        ex += "{}, ".format(id)

    ex = ex[:-2] + ")"

    return ex


def get_movie_names_with_text(text):
    query = "SELECT title " \
            "FROM movies " \
            "WHERE title LIKE '%{0}%' " \
            "OR title = '{1}' " \
            "OR LOWER(title) = '{2}'".format(text, text, text)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    movies = []
    for result in db_cursor:
        movies.append(result[0])
    db_cursor.close()
    print(movies)
    return movies


def get_genre_for_movie_id(movie_id):
    query = "SELECT genre \
            FROM movies \
            WHERE id = {}".format(movie_id)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    genre = [result[0] for result in db_cursor][0]
    db_cursor.close()
    return genre


def get_plot_for_movie_id(movie_id):
    query = "SELECT plot_summary \
            FROM movies \
            WHERE id = {}".format(movie_id)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    plot = [result[0] for result in db_cursor][0]
    db_cursor.close()
    return plot


def get_poster_for_movie_id(movie_id):
    query = "SELECT poster_link \
            FROM movies \
            WHERE id = {}".format(movie_id)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    link = [result[0] for result in db_cursor][0]
    db_cursor.close()
    return link


def get_title_for_movie_id(movie_id):
    query = "SELECT title, id " \
            "FROM movies " \
            "WHERE id = {}".format(movie_id)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    title = [result[0] for result in db_cursor][0]
    db_cursor.close()
    return title


def get_movie_id_for_title(title):
    movie_id_query = "SELECT id from movies WHERE title=%s"

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(movie_id_query, (title,))
    for movie_id_tuple in db_cursor:
        movie_id = movie_id_tuple[0]
        return movie_id
    return None


def get_top_movie(exclude=None):
    ex = create_ex(exclude)
    query = "SELECT movie_id " \
            "FROM movie_ratings " \
            "WHERE id NOT IN {0} " \
            "ORDER BY normalized_rating " \
            "LIMIT 1".format(ex)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    movie = [result[0] for result in db_cursor][0]
    db_cursor.close()
    return movie


def get_top_movie_for_genre(genre, exclude=None):
    ex = create_ex(exclude)
    query = "SELECT movie_ratings.movie_id,  AVG(movie_ratings.normalized_rating) " \
            "FROM movie_ratings, movies " \
            "WHERE movies.id = movie_ratings.movie_id " \
            "AND movies.genre = \'{0}\' " \
            "AND movie_ratings.movie_id NOT IN {1} " \
            "GROUP BY  movie_ratings.movie_id " \
            "ORDER BY  AVG(movie_ratings.normalized_rating) DESC " \
            "LIMIT 1".format(genre, ex)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    movie = [result[0] for result in db_cursor][0]

    db_cursor.close()
    return movie


def get_top_movie_for_actor(actor, exclude=None):
    ex = create_ex(exclude)
    query = "SELECT movies.id, AVG(movie_ratings.normalized_rating) " \
            "FROM movies, movie_ratings, actors_movies " \
            "WHERE movies.id = movie_ratings.movie_id " \
            "AND movies.id = actors_movies.movie_id " \
            "AND actors_movies.actor_id = {0} " \
            "AND movies.id NOT IN {1} " \
            "GROUP BY movies.id " \
            "ORDER BY AVG(movie_ratings.normalized_rating) DESC " \
            "LIMIT 1".format(actor, ex)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    movie = [result[0] for result in db_cursor][0]

    db_cursor.close()
    return movie


def get_movies_per_genre_top_n(n):
    query = "SELECT genre, COUNT(id) AS c " \
            "FROM movies " \
            "GROUP BY genre " \
            "ORDER BY c DESC " \
            "LIMIT %(limit)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(limit=n))

    genres = []
    for result in db_cursor:
        name, movie_count = result[0], result[1]
        genre = dict(
            name=name.title(),
            movie_count=movie_count
        )
        genres.append(genre)
    db_cursor.close()
    return genres


def get_movies_per_year_top_n(n):
    query = "SELECT release_year, COUNT(id) AS c " \
            "FROM movies " \
            "GROUP BY release_year " \
            "ORDER BY c DESC " \
            "LIMIT %(limit)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(limit=n))

    genres = []
    for result in db_cursor:
        release_year, movie_count = result[0], result[1]
        genre = dict(
            release_year=release_year,
            movie_count=movie_count
        )
        genres.append(genre)
    db_cursor.close()
    return genres


def count_rows(table_name):
    query = "SELECT COUNT(id) " \
            f"FROM {table_name}"

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    count = [result[0] for result in db_cursor][0]
    db_cursor.close()
    return count


def get_general_data_info():
    info = dict(
        movies=count_rows("movies"),
        users=count_rows("users"),
        actors=count_rows("actors"),
        ratings=count_rows("movie_ratings"),
        appearances=count_rows("actors_movies")
    )
    return info