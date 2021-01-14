import random
import numpy as np
import mysql.connector

CONNECTION = None
MYSQL_HOST = 'mysqlsrv1.cs.tau.ac.il'
MYSQL_USER = 'DbMysql19'
MYSQL_PASSWORD = 'DbMysql19'
MYSQL_DB = 'DbMysql19'
NUM_MOVIES = 1000
NUM_USERS = 1500

BAD_RATINGS = [i for i in np.arange(0, 2.5, 0.1)] + [2.5]
GOOD_RATINGS = [i for i in np.arange(2.6, 5.0, 0.1)] + [5]

BAD_COMMENTS = [
    "{title} is the WORST!!!!!1 Absolutely the worst film that came out in {year}, even {actor} couldn't save it",
    "Watching {title} was the worst decision i made this week. Two hours of my life im never getting back..",
    "Don't waste your time on {title} - worst movie of the yearrrrr",
    "I hated {actor} in {title}, i did not believe their characters for even a second, and don't even get me started on the plot!",
    "{actor} should lose his acting licesne over this monstrosity!",
    "{actor} is soooo overrated, and the plot was just terrible. What a snooze-fest",
    "BAD. A BAD BAD MOVIE. VERY BAD",
    "I want to meet the director of {title} just so I can ask why he made this steaming pile of garbage. Terrible film."
]

GOOD_COMMENTS = [
    "I LOVVVVVVVWEEE {actor}. best movie ever.",
    "I really enjoyed {title}. {plot}",
    "{title} gives me LIFE. {plot}",
    "I don’t usually like {genre} movies, but I still enjoyed every minute of {title}. Such a good movie!",
    "{title} is my absolute favorite! I could watch this movie everyday for the rest of my life",
    "great, kid-friendly movie to watch with the whole family!",
    "perfection. {plot}",
    "loved it! {plot}",
    "Such a great holiday movie! we watch it with the whole family every year",
    "I loved {title}. {actor} is my favourite actor of all times!"
    "I loved {title}. The humour of the movie is inevitably more visual than that of the book; no belly laughs, but a lot of smiles. Some punchlines have changed, but the reasons why the jokes are funny remain the same. Not knowing exactly what's coming next is a good thing! It's all kept tasteful, classy and above the belt; there's nothing to cringe about."
    "I loved {title}. Two and a half hours is not long to explore a wonderful, magical world. Furthermore, the directors have bowed to the inevitable temptation to show us things that cannot be communicated so effectively in a book. The consequence is the feeling of a slightly breathless sprint in places.",
    "We live in a world where economics is hard. This forces practical limitations when making a movie. Time and money are sadly finite, cinema owners need to be pleased as well as fans and computer animation ain't perfect. Given these limitations, this film is about as close to human perfection as it is possible to achieve.",
    "The feel of the whole movie is everything fans could have hoped for. The dialogue is intensely measured, the colouring is suitably epic, the selection of what to leave in is really tightly considered. You get chills in your spine at the right places; you feel the triumphs as all-encompassing endorphin highs. It's clear that the production have thought long, hard and lovingly. They are true fans of the story, they are the right people for the job, it all bodes very well for the second film.",
    "As good an adaption as could ever be expected. I loved {title} so much",
    "Epic fim. One of my favourites! {plot}"
]


def init_db_connection():
    global CONNECTION
    CONNECTION = mysql.connector.connect(
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        host=MYSQL_HOST,
        database=MYSQL_DB
    )


def get_user_id_from_username(username):
    user_id = None
    user_id_query = "SELECT id from users WHERE username=%(username)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(user_id_query, dict(username=username))

    for user_id_tuple in db_cursor:
        user_id = user_id_tuple[0]
        break

    CONNECTION.commit()
    db_cursor.close()

    return user_id


def get_username_from_user_id(user_id):
    username = None
    user_id_query = "SELECT username from users WHERE id=%(id)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(user_id_query, dict(id=user_id))

    for user_id_tuple in db_cursor:
        username = user_id_tuple[0]
        break

    CONNECTION.commit()
    db_cursor.close()

    return username


def read_names_from_file():
    with open("./names.txt", "rb") as f:
        names = f.readlines()
        names = [n.decode().strip() for n in names]
        return names


def add_username(name):
    random_num = random.randrange(2020)
    username = name.replace(" ", "-")
    if random_num < 500:
        username += username[-1]*3
    if random_num > 1000:
        username = username.replace("e", "3")
        username += str(random_num)
    if random_num > 1500:
        username = username.replace("i", "!")

    user_id = get_user_id_from_username(username)
    if user_id is not None:
        return None

    print(f"Adding user {username}")
    db_cursor = CONNECTION.cursor()
    query = "INSERT INTO users (username) VALUES (%(username)s)"
    db_cursor.execute(query, dict(username=username))

    CONNECTION.commit()
    db_cursor.close()

    user_id = get_user_id_from_username(username)
    return user_id


def get_movie_info_from_movie_id(movie_id):
    title, genre, year, plot, link = None, None, None, None, None
    query = "SELECT title, genre, release_year, plot_summary, poster_link " \
            "from movies WHERE id=%(movie_id)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(movie_id=movie_id))

    for res in db_cursor:
        title, genre, year, plot, link = res[0], res[1], res[2], res[3], res[4]
        break

    db_cursor.close()

    return title, genre, year, plot, link


def get_first_actor_for_movie_id(movie_id):
    actor_id, first_name, last_name = None, None, None

    query = "SELECT actor_id from actors_movies WHERE movie_id=%(movie_id)s LIMIT 1"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(movie_id=movie_id))
    for res in db_cursor:
        actor_id = res[0]
        break

    if actor_id:
        query = "SELECT first_name, last_name from actors WHERE id=%(actor_id)s"
        db_cursor.execute(query, dict(actor_id=actor_id))
        for res in db_cursor:
            first_name, last_name = res[0], res[1]
            break

    db_cursor.close()

    if first_name and last_name:
        return f"{first_name} {last_name}"
    elif first_name:
        return first_name
    return None


def format_comment(comment, movie_id):
    title, genre, year, plot, link = get_movie_info_from_movie_id(movie_id)
    if not title or not genre:
        return None

    comment = comment.replace("{title}", title)
    comment = comment.replace("{genre}", genre)

    if "{year}" in comment:
        if not year:
            return None
        comment = comment.replace("{year}", str(year))

    if "{plot}" in comment and comment:
        if not plot:
            return None
        comment = comment.replace("{plot}", plot)

    if "{actor}" in comment:
        actor_name = get_first_actor_for_movie_id(movie_id)
        if not actor_name:
            return None
        comment = comment.replace("{actor}", actor_name)

    return comment


def has_rating(user_id, movie_id):
    user_id_query = "SELECT id from movie_ratings " \
                    "WHERE user_id=%(user_id)s " \
                    "AND movie_id=%(movie_id)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(user_id_query, dict(user_id=user_id, movie_id=movie_id))


    results = [r for r in db_cursor]
    db_cursor.close()
    return True if results else False


def add_comment(user_id, comments_list, ratings, movie_id=None):
    inserted = 0
    if not movie_id:
        movie_id = random.randint(1, NUM_MOVIES)
    if has_rating(user_id, movie_id):
        return inserted

    db_cursor = CONNECTION.cursor()
    query = "INSERT INTO movie_ratings" \
            "(user_id, movie_id, original_rating, normalized_rating, rating_source, comment)" \
            "VALUES (%(user_id)s, %(movie_id)s, %(original_rating)s, %(normalized_rating)s," \
            " %(rating_source)s, %(comment)s)"

    rating = random.choice(ratings)
    ind = random.randrange(len(comments_list))
    comment = format_comment(comments_list[ind], movie_id)
    if comment:
        params = dict(
            user_id=user_id,
            movie_id=movie_id,
            original_rating=rating,
            normalized_rating=rating,
            rating_source="USER",
            comment=comment
        )
        db_cursor.execute(query, params)
        inserted += 1

    CONNECTION.commit()
    db_cursor.close()

    return inserted


def main():
    init_db_connection()

    names = read_names_from_file()
    random_names = random.sample(names, k=NUM_USERS)
    inserted = 0
    for name in random_names:
        added = add_username(name)
        if added:
            inserted += 1
    print(f"inserted {inserted} users total")


    inserted = 0
    top_movies = [i for i in range(1,400, 2) if all(get_movie_info_from_movie_id(i))]
    print(f"running on {len(top_movies)} top movies")
    for user_id in range(NUM_USERS):
        if not get_username_from_user_id(user_id):
            continue

        inserted += add_comment(user_id, BAD_COMMENTS, BAD_RATINGS)
        inserted += add_comment(user_id, BAD_COMMENTS, BAD_RATINGS)

        for i in range(3):
            top_movie = random.choice(top_movies)
            inserted += add_comment(user_id, GOOD_COMMENTS, GOOD_RATINGS, movie_id=top_movie)

    print(f"inserted {inserted} comments total")

    if CONNECTION is not None:
        CONNECTION.close()


if __name__ == "__main__":
    main()