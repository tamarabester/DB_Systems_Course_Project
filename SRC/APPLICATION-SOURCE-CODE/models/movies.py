from utils.config import *


def create_ex(exclude):
    if exclude == None or len(exclude) == 0:
        return "('Not Exist movie2')"
    ex = "("
    for id in exclude:
        ex += "{}, ".format(id)

    ex = ex[:-2] + ")"

    return ex


def create_titles(title1, title2, title3):
    titles = "('"
    titles += title1 + "', '"
    titles += title2 + "', '"
    titles += title3 + "')"
    
    return titles
    
    
def get_movie_names_with_text(text):
    query = "SELECT title " \
            "FROM movies " \
            "WHERE title LIKE '%{0}%'".format(text)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    movies = []
    for result in db_cursor:
        movies.append(result[0])
    db_cursor.close()
    return movies


def get_genre_for_movie_id(movie_id):
    query = "SELECT genre \
            FROM movies \
            WHERE id = {}".format(movie_id)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    genre = db_cursor[0][0]
    db_cursor.close()
    return genre


def get_title_for_movie_id(movie_id):
    query = "SELECT title \
            FROM movies \
            WHERE id = {}".format(movie_id)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    title = db_cursor[0][0]
    db_cursor.close()
    return title


def get_top_movie(exclude=None):
    # TODO return id
    ex = create_ex(exclude)
    query = "SELECT id \
            FROM movie_ratings \
            WHERE id NOT IN {0} \
            ORDER BY normalized_rating \
            LIMIT 1".format(ex)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    movie = db_cursor[0][0]
    db_cursor.close()
    return movie


def get_top_movie_for_genre(genre, exclude=None):
    # TODO return id
    ex = create_ex(exclude)
    query = "SELECT movie_ratings.movie_id \
            FROM movie_ratings, movies \
            WHERE movies.id = movie_ratings.movie_id \
            AND movies.genre = {0} \
            AND movie_ratings.movie_id NOT IN {1} \
            ORDER BY normalized_rating \
            LIMIT 1".format(genre, ex)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    movie = db_cursor[0][0]

    db_cursor.close()
    return movie


def get_top_movie_for_actor(actor, exclude=None):
    # TODO return id
    ex = create_ex(exclude)
    query = "SELECT movies.id \
            FROM movies, movie_ratings, actors_movies \
            WHERE movies.id = movie_ratings.movie_id \
            AND movies.id = actors_movies.movie_id \
            AND actors_movies.actor_id = {0} \
            AND movies.id NOT IN {1} \
            ORDER BY movie_rating.normalized_rating \
            LIMIT 1".format(actor, ex)

    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)

    movie = db_cursor[0][0]

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

def get_id_for_movie(title1, title2, title3):
    query = "SELECT title, id " \
            "FROM movies " \
            "WHERE title IN %(titles)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(titles = create_titles(title1, title2, title3)))

    movie_ids = []
    for result in db_cursor:
        title, movie_id = result[0], result[1]
        movie_ids.append(movie_id)
    
    db_cursor.close()
    return movie_ids
