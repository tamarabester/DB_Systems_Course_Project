import json
import random
import sys

from flask import Flask, request, send_from_directory

from lib.movies.movie_utils import *
from lib.staff_pick.staff_pick_utils import *
# from lib.general import *
from utils.config import *

app = Flask(__name__)


################################
######### STATIC PAGES #########
################################

@app.route('/')
def return_homepage():
    return send_from_directory(UI_FILES_DIR, "Homepage.html")


@app.route('/analytics')
def return_analytics():
    return send_from_directory(UI_FILES_DIR, "KnowMovies.html")


@app.route('/user_rating')
def return_user_ratings():
    return send_from_directory(UI_FILES_DIR, "TopUsers.html")


@app.route('/top_rating')
def return_top_ratings():
    return send_from_directory(UI_FILES_DIR, "TopRating.html")


@app.route('/imdb_rating')
def return_imdb_ratings():
    return send_from_directory(UI_FILES_DIR, "TopImdb.html")


@app.route('/recommended')
def return_recommended():
    return send_from_directory(UI_FILES_DIR, "RecommendedForYou.html")


@app.route('/movie')
def return_movie_page():
    return send_from_directory(UI_FILES_DIR, "MoviePage.html")


@app.route('/ui/<path:filename>')
def return_ui(filename):
    return send_from_directory(UI_FILES_DIR, filename)


@app.route('/images/<path:filename>')
def return_img(filename):
    return send_from_directory(UI_IMG_DIR, filename)


################################
######### UTILS ################
################################

def add_rank_to_list(list_to_rank, ranking_function):
    list_to_rank.sort(key=ranking_function)
    for i in range(len(list_to_rank)):
        item = list_to_rank[i]
        item["rank"] = i + 1


################################
######### API CALLS ############
################################


@app.route('/movie_name')
def get_movie_names_for_autocomplete():
    search_text = request.args.get('text')
    movie_names = get_movie_names_with_text(search_text)
    return json.dumps(movie_names)


@app.route('/random_rating')
def get_random_rating():
    ratings = get_ratings_with_comments()
    random_rating = random.sample(ratings, k=1)
    return json.dumps(random_rating)


@app.route('/staff_pick')
def get_staff_pick():
    random_id = random.randrange(STAFF_PICK_LEN)
    pick = STAFF_PICK_MOVIES[random_id]
    wiki_summary = wikipedia.summary(pick["wiki_name"], sentences=5)
    pick["summary"] = wiki_summary
    return json.dumps(pick)


@app.route('/top_rated/<source>')
def get_top_n_user_rated(source):
    n = int(request.args.get('n'))
    top_movies = get_top_n_from_source(n, source)
    add_rank_to_list(top_movies, lambda m: -m["rating"])
    return json.dumps(top_movies)


@app.route('/imdb_rated')
def get_top_n_imdb_rated():
    n = int(request.args.get('n'))
    top_movies = get_top_n_from_source(n, "IMDB")
    add_rank_to_list(top_movies, lambda m: -m["rating"])
    return json.dumps(top_movies)


@app.route('/recommendation/<movie1>/<movie2>/<movie3>')
def get_recommendation(movie1, movie2, movie3):
    movies = [get_movie_id_for_title(m) for m in [movie1, movie2, movie3]]

    majority_genre = get_majority_genre(movies)
    majority_actor = get_majority_actor(movies)
    if majority_genre is not None:
        recommendation_id = get_top_movie_for_genre(majority_genre, exclude=movies)
    elif majority_actor is not None:
        recommendation_id = get_top_movie_for_actor(majority_genre, exclude=movies)
    else:
        recommendation_id = get_top_movie_for_genre(get_genre_for_movie_id(movies[0]), exclude=movies)

    recommendation = get_full_recommendation(recommendation_id)
    return json.dumps(recommendation)



@app.route('/movie/info')
def get_movie_info():
    movie_id = int(request.args.get('id'))
    info = get_movie_info_for_movie_id(movie_id)
    return json.dumps(info)


@app.route('/genres_popularity')
def get_genres_popularity():
    n = int(request.args.get('n'))
    genres = get_top_genres_by_ratings(n)
    add_rank_to_list(genres, lambda m: -m["avg_rating"])
    return json.dumps(genres)


@app.route('/actors_popularity')
def get_actors_popularity():
    n = int(request.args.get('n'))
    actors = get_top_actors_by_ratings(n)
    add_rank_to_list(actors, lambda m: -m["avg_rating"])
    return json.dumps(actors)


@app.route('/movies_with_most_user_ratings')
def get_movies_with_most_user_ratings():
    n = int(request.args.get('n'))
    movies = get_top_n_movies_with_most_user_ratings(n)
    add_rank_to_list(movies, lambda m: -m["num_ratings"])
    return json.dumps(movies)


@app.route('/movies_per_genre')
def get_movies_per_genre():
    n = int(request.args.get('n'))
    genres = get_movies_per_genre_top_n(n)
    add_rank_to_list(genres, lambda m: -m["movie_count"])
    return json.dumps(genres)


@app.route('/movies_per_year')
def get_movies_per_year():
    n = int(request.args.get('n'))
    years = get_movies_per_year_top_n(n)
    add_rank_to_list(years, lambda m: -m["movie_count"])
    return json.dumps(years)


@app.route('/id_for_title/<title1>/<title2>/<title3>')
def get_id_for_title(title1, title2, title3):
    movie_ids = [get_movie_id_for_title(t) for t in [title1, title2, title3]]
    return json.dumps(movie_ids)


@app.route('/analytics_data')
def get_all_info_for_analytics():
    all_info = {}
    n = int(request.args.get('n'))

    years = get_movies_per_year_top_n(n)
    add_rank_to_list(years, lambda m: -m["movie_count"])
    all_info["years"] = years

    genres = get_movies_per_genre_top_n(n)
    add_rank_to_list(genres, lambda m: -m["movie_count"])
    all_info["genres"] = genres

    movies = get_top_n_movies_with_most_user_ratings(n)
    add_rank_to_list(movies, lambda m: -m["num_ratings"])
    all_info["movies"] = movies

    top_actors = get_top_actors_by_ratings(n)
    add_rank_to_list(top_actors, lambda m: -m["avg_rating"])
    all_info["top_actors"] = top_actors

    top_genres = get_top_genres_by_ratings(n)
    add_rank_to_list(top_genres, lambda m: -m["avg_rating"])
    all_info["top_genres"] = top_genres

    return json.dumps(all_info)


########################################



if __name__ == '__main__':
    if len(sys.argv) > 1:
        port = sys.argv[1]
    else:
        port = 45124

    try:
        print(f"INIT DB CONNECTION {CONNECTION}")
        app.run(debug=True, host="delta-tomcat-vm", port=port)
    finally:
        if CONNECTION is not None:
            CONNECTION.close()