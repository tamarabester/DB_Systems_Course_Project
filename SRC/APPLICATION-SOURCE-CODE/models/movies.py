

def create_ex(exclude):
    if exclude == None or len(exlcude) == 0:
        return "()"
    ex = "("
    for id in exclude:
        ex += "{}, ".format(id)
            
    ex = ex[:-2] + ")"
    
    return ex


def get_movie_names_with_text(text):
    query = "SELECT title \
            FROM movies \
            WHERE title LIKE '%{0}%'".format(text)
    
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query)
    
    movies = []
    for result in db_cursor:
        movies.append(result[0])
    db_cursor.close()
    return result


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
    query = "SELECT id \
            FROM movie_ratings \
            WHERE genre = {0} AND id NOT IN {1} \
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
    query = "SELECT id \
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
