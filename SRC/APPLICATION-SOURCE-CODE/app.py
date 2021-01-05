import os
import json
import random

from flask import Flask, request, send_from_directory

from lib.movies.movie_utils import *
from lib.staff_pick.staff_pick_utils import *
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


@app.route('/imdb_rating')
def return_imdb_ratings():
    return send_from_directory(UI_FILES_DIR, "TopImdb.html")


@app.route('/recommended')
def return_recommended():
    return send_from_directory(UI_FILES_DIR, "RecommendedForYou.html")


@app.route('/movie/<movie_id>')
def return_movie_page(movie_id):
    return send_from_directory(UI_FILES_DIR, "RecommendedForYou.html")


@app.route('/ui/<path:filename>')
def return_ui(filename):
    return send_from_directory(UI_FILES_DIR, filename)

@app.route('/images/<path:filename>')
def return_img(filename):
    return send_from_directory(UI_IMG_DIR, filename)


################################
######### API CALLS ############
################################


@app.route('/movie_name')
def get_movie_names_for_autocomplete():
    data = json.loads(request.data)
    search_text = data["text"]
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


@app.route('/user_rated')
def get_top_n_user_rated():
    n = int(request.args.get('n'))
    top_movies = get_top_n_from_source(n, "users")

    top_movies.sort(key=lambda m: -m["rating"])
    for i in range(len(top_movies)):
        movie = top_movies[i]
        movie["rank"] = i + 1

    return json.dumps(top_movies)


@app.route('/imdb_rated')
def get_top_n_imdb_rated():
    n = int(request.args.get('n'))
    top_movies = get_top_n_from_source(n, "IMDB")

    top_movies.sort(key=lambda m: -m["rating"])
    for i in range(len(top_movies)):
        movie = top_movies[i]
        movie["rank"] = i + 1

    return json.dumps(top_movies)

#
# @app.route('/recommendation')
# def get_top_n_user_rated():
#     movie1 = request.args.get('movie1')
#     movie2 = request.args.get('movie2')
#     movie3 = request.args.get('movie3')
#
#     movies = [movie1, movie2, movie3]
#     majority_genre = get_majority_genre(movies)
#     majority_actor = get_majority_actor(movies)
#     if majority_genre is not None:
#         recommendation_id = get_top_movie_for_genre(majority_genre, exclude=movies)
#     elif majority_actor is not None:
#         recommendation_id = get_top_movie_for_actor(majority_genre, exclude=movies)
#     else:
#         recommendation_id = get_top_movie(exclude=movies)
#
#     recommendation = get_full_recommendation(recommendation_id)
#     return json.dumps(recommendation)


@app.route('/movie/<movie_id>/info')
def get_movie_info(movie_id):
    movie_id = int(movie_id)
    info = get_movie_info_for_movie_id(movie_id)
    return json.dumps(info)


@app.route('/movie/<movie_id>/comments')
def get_movie_comments(movie_id):
    n = int(request.args.get('n'))
    movie_id = int(movie_id)
    comments = get_n_comments_for_movie_id(movie_id, n)
    return json.dumps(comments)



if __name__ == '__main__':
        port = 45125
        try:
            print(f"INIT DB CONNECTION {CONNECTION}")
            app.run(debug=True, host="delta-tomcat-vm", port=port)
        finally:
            if CONNECTION is not None:
                CONNECTION.close()

