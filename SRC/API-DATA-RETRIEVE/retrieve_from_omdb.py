import random
import requests
import mysql.connector


MYSQL_HOST = 'mysqlsrv1.cs.tau.ac.il'
MYSQL_USER = 'DbMysql19'
MYSQL_PASSWORD = 'DbMysql19'
MYSQL_DB = 'DbMysql19'

API_KEYS = ["d566f271", "e192dfe7",
            "498c6ad8", "ac3eb1c0",
            "373fbeda", "8ec46532",
            "9fb90f4b", "2642d4a3",
            "72ca173e", "cb31ccd6"
            ]

API_INDEX = 0
OMDB_BASE = "http://www.omdbapi.com/?apikey={api_key}&t={title}"
CONNECTION = None
MAX_INSERT_RETRIES = 5


def init_db_connection():
    global CONNECTION
    CONNECTION = mysql.connector.connect(
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        host=MYSQL_HOST,
        database=MYSQL_DB
    )


def get_movie_names_from_csv():
    with open("./oscars.csv", "rb")as f:
        lines = f.readlines()
        lines = [line.decode().split(",") for line in lines]
        movies = [line[4].replace("\"", "") for line in lines]
        movies = set(movies)
        return movies


def format_movie_release_year(raw_year):
    year = str(raw_year.replace(u'\u2013', '-'))
    if "-" in year:
        year = year.split("-")[0]
    return year


def get_movie_id_from_title(title, db_cursor):
    movie_id_query = "SELECT id from movies WHERE title=%s"
    db_cursor.execute(movie_id_query, (title,))
    for movie_id_tuple in db_cursor:
        movie_id = movie_id_tuple[0]
        return movie_id
    return None


def insert_movie_data(response_data):
    db_cursor = CONNECTION.cursor()
    inserted = 0

    title = str(response_data["Title"])
    movie_id = get_movie_id_from_title(title, db_cursor)
    if not movie_id:
        parameters = dict(
            title=str(response_data["Title"]),
            genre=str(response_data["Genre"].split(",")[0]),
            release_year=format_movie_release_year(response_data["Year"]),
            plot_summary=str(response_data.get("Plot")),
            poster_link=response_data.get("Poster")
        )

        query = ("INSERT INTO movies "
                 "(title, genre, release_year, plot_summary, poster_link)"
                 "VALUES (%(title)s, %(genre)s, %(release_year)s, %(plot_summary)s, %(poster_link)s)")
        print(f"Inserting movie: {parameters}")
        db_cursor.execute(query, parameters)
        movie_id = get_movie_id_from_title(title, db_cursor)
        inserted += 1

    CONNECTION.commit()
    db_cursor.close()

    return inserted, movie_id


def insert_rating_data(response_data, movie_id):
    db_cursor = CONNECTION.cursor()
    inserted = 0
    insert_rating_query = ("INSERT INTO movie_ratings"
                           "(movie_id, original_rating, normalized_rating, rating_source)"
                           "VALUES (%(movie_id)s, %(original_rating)s, %(normalized_rating)s, %(rating_source)s)")

    if "imdbRating" in response_data:
        imdb_rating = float(response_data["imdbRating"])
        imdb_rating_parameters = dict(
            movie_id=movie_id,
            original_rating=imdb_rating,
            normalized_rating=imdb_rating/2,
            rating_source="IMDB"
        )
        print(f"Inserting movie rating from IMDB: {imdb_rating}")
        db_cursor.execute(insert_rating_query, imdb_rating_parameters)
        inserted += 1

    ratings = response_data["Ratings"]
    for rating in ratings:
        if rating["Source"] == "Rotten Tomatoes":
            rt_rating = float(rating["Value"].replace("%", ""))
            rt_rating_norm = rt_rating/20
            rt_rating_parameters = dict(
                movie_id=movie_id,
                original_rating=rt_rating,
                normalized_rating=rt_rating_norm,
                rating_source="Rotten Tomatoes"
            )
            print(f"Inserting movie rating from RT: {rt_rating}")
            db_cursor.execute(insert_rating_query, rt_rating_parameters)
            inserted += 1
    CONNECTION.commit()
    db_cursor.close()
    return inserted


def insert_new_actor(first_name, last_name, db_cursor):
    query = "INSERT INTO actors (first_name, last_name) VALUES (%s, %s)"
    print(f"Inserting actor {first_name} {last_name}")
    db_cursor.execute(query, (first_name, last_name))
    inserted = 1
    return inserted


def link_actor_to_movie(actor_id, movie_id, db_cursor):
    # link actor ids to movie id
    actor_movie_query = "INSERT INTO actors_movies (actor_id, movie_id) VALUES (%s, %s)"
    print(f"Linking actor #{actor_id} to movie #{movie_id}")
    db_cursor.execute(actor_movie_query, (actor_id, movie_id))
    inserted = 1
    return inserted


def get_actor_id_by_name(first_name, last_name, db_cursor):
    # get all actor ids that where inserted
    actor_ids_query = "SELECT id from actors WHERE first_name=%s"
    if last_name:
        actor_ids_query += " AND last_name=%s"
        db_cursor.execute(actor_ids_query, (first_name, last_name))
    else:
        db_cursor.execute(actor_ids_query, (first_name,))

    # should be unique
    for actor_id in db_cursor:
        actor_id = actor_id[0]
        print(f"found existing actor {first_name} {last_name} with id {actor_id}")
        return actor_id
    return None


def insert_actors_data(response_data, movie_id):
    db_cursor = CONNECTION.cursor()
    inserted = 0

    # format actors info and insert
    actor_data_list = response_data["Actors"].split(",")
    actor_data_list = [ac.strip() for ac in actor_data_list]
    actor_data_list = [ac.split(" ") for ac in actor_data_list]

    for actor_data in actor_data_list:
        first_name = actor_data[0]
        last_name = actor_data[1] if len(actor_data) > 1 else None
        actor_id = get_actor_id_by_name(first_name, last_name, db_cursor)
        if not actor_id:
            inserted += insert_new_actor(first_name, last_name, db_cursor)
            actor_id = get_actor_id_by_name(first_name, last_name, db_cursor)
        inserted += link_actor_to_movie(actor_id, movie_id, db_cursor)

    CONNECTION.commit()
    db_cursor.close()
    return inserted


def get_omdb_response(movie):
    global API_INDEX
    tries = 0
    got_resp = False
    response = None

    while not got_resp:
        try:
            print(f"Using api key: {API_INDEX}")
            tries += 1
            title = movie.replace(" ", "+")
            url = OMDB_BASE.format(api_key=API_KEYS[API_INDEX], title=title)
            response = requests.get(url).json()

            if "Error" in response:
                if response["Error"] == 'Movie not found!':
                    return None
                else:
                    raise Exception(f"Error in response: {response['Error']}")
            else:
                got_resp = True

        except Exception:
            API_INDEX += 1
            if API_INDEX > len(API_KEYS):
                API_INDEX = 0
            if tries > MAX_INSERT_RETRIES:
                break
    return response

def get_from_ombd(movie_names):
    """
    iterate over all of the movie names from the oscars csv,
    query omdb with title until we get a response (or until no more api keys to try)
    useful data from this api:
    - movie table: genre, release_year, plot_summary, poster_link
    - ratings table: get ratings from IMDB, Rotten Tomatoes and more
    - actors table: firstname and lastname
    - actor-movies table: link an actor to a movie

    :return: None
    """
    inserted = 0
    for index, movie in enumerate(movie_names):
        response = get_omdb_response(movie)
        if not response:
            print(f"No response for movie {movie}\n")
            continue

        # check if movie exists
        db_cursor = CONNECTION.cursor()
        movie_id = get_movie_id_from_title(response["Title"], db_cursor)
        if movie_id:
            continue

        try:
            inserted_to_movies, movie_id = insert_movie_data(response)
            inserted += inserted_to_movies
            inserted += insert_rating_data(response, movie_id)
            inserted += insert_actors_data(response, movie_id)
        except Exception as e:
            print(f"Error on movie {movie}:\nresp: {response}\nerror: {e}")
            return

        print(f"########## inserted total of {inserted} new lines to all tables so far ##########\n")


def insert_movies_from_csv():
    init_db_connection()
    movies = get_movie_names_from_csv()
    get_from_ombd(movies)
    CONNECTION.close()


def insert_movies_with_random_id_from_imdb():
    init_db_connection()
    movies = []
    get_from_ombd(movies)
    CONNECTION.close()