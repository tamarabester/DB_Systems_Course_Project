import json
import random
from flask import Flask, request

import wikipedia

from staff_pick import *
from movie_utils import *

from models.movies import *
from models.movie_ratings import *


app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/movie_name')
def get_movie_names_for_autocomplete():
    data = json.loads(request.data)
    search_text = data["text"]
    movie_names = get_movie_names_with_text(search_text)
    return json.dumps(movie_names)


@app.route('/random_rating')
def get_random_rating():
    number_of_entries = get_number_of_ratings()
    random_id = random.randrange(number_of_entries)
    rating_entry = get_rating_entry_by_id(random_id)
    return json.dumps(rating_entry)


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
        movie_id = movie["id"]

        movie["rank"] = i + 1
        movie["title"] = get_title_for_movie_id(movie_id),

    return json.dumps(top_movies)


@app.route('/imdb_rated')
def get_top_n_imdb_rated():
    n = int(request.args.get('n'))
    top_movies = get_top_n_from_source(n, "imdb")

    top_movies.sort(key=lambda m: -m["rating"])
    for i in range(len(top_movies)):
        movie = top_movies[i]
        movie_id = movie["id"]

        movie["rank"] = i + 1
        movie["title"] = get_title_for_movie_id(movie_id),

    return json.dumps(top_movies)


@app.route('/recommendation')
def get_top_n_user_rated():
    movie1 = request.args.get('movie1')
    movie2 = request.args.get('movie2')
    movie3 = request.args.get('movie3')

    movies = [movie1, movie2, movie3]
    majority_genre = get_majority_genre(movies)
    majority_actor = get_majority_actor(movies)
    if majority_genre is not None:
        recommendation_id = get_top_movie_for_genre(majority_genre, exclude=movies)
    elif majority_actor is not None:
        recommendation_id = get_top_movie_for_actor(majority_genre, exclude=movies)
    else:
        recommendation_id = get_top_movie(exclude=movies)

    recommendation = get_full_recommendation(recommendation_id)
    return json.dumps(recommendation)


@app.route('/movie/<movie_id>/info')
def get_movie_info(movie_id):
    info = get_movie_info_for_movie_id(movie_id)
    return json.dumps(info)


@app.route('/movie/<movie_id>/comments')
def get_movie_comments(movie_id):
    n = int(request.args.get('n'))
    comments = get_n_comments_for_movie_id(movie_id, n)
    return json.dumps(comments)


if __name__ == '__main__':
    port = 45123
    app.run(debug=True, host="delta-tomcat-vm", port=port)

