import random
import mysql.connector

CONNECTION = None
MYSQL_HOST = 'mysqlsrv1.cs.tau.ac.il'
MYSQL_USER = 'DbMysql19'
MYSQL_PASSWORD = 'DbMysql19'
MYSQL_DB = 'DbMysql19'
NUM_MOVIES = 1000
NUM_USERS = 1000

BAD_RATINGS = [i/4 for i in range(21)]
GOOD_RATINGS =[i+5 for i in BAD_RATINGS]

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
    title, genre, year, plot = None, None, None, None
    query = "SELECT title, genre, release_year, plot_summary from movies WHERE id=%(movie_id)s"
    db_cursor = CONNECTION.cursor()
    db_cursor.execute(query, dict(movie_id=movie_id))

    for res in db_cursor:
        title, genre, year, plot = res[0], res[1], res[2], res[3]
        break

    db_cursor.close()

    return title, genre, year, plot


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
    title, genre, year, plot = get_movie_info_from_movie_id(movie_id)
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


def add_comment(user_id, comments_list, ratings):
    inserted = 0

    db_cursor = CONNECTION.cursor()
    query = "INSERT INTO movie_ratings" \
            "(user_id, movie_id, original_rating, normalized_rating, rating_source, comment)" \
            "VALUES (%(user_id)s, %(movie_id)s, %(original_rating)s, %(normalized_rating)s," \
            " %(rating_source)s, %(comment)s)"

    ind = random.randrange(len(comments_list))
    movie_id = random.randint(1, NUM_MOVIES)
    comment = format_comment(comments_list[ind], movie_id)
    rating = random.choice(ratings)

    try:
        print(f"Comment: {comment}")
    except UnicodeEncodeError:
        print("cannot print")

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
    for name in random_names:
        add_username(name)

    for user_id in range(NUM_USERS):
        try:
            add_comment(user_id, BAD_COMMENTS, BAD_RATINGS)
            add_comment(user_id, BAD_COMMENTS, BAD_RATINGS)
            add_comment(user_id, GOOD_COMMENTS, GOOD_RATINGS)
            add_comment(user_id, GOOD_COMMENTS, GOOD_RATINGS)
        except:
            continue


if __name__ == "__main__":
    main()