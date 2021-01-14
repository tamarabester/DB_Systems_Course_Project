create TABLE movies (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(1024) NOT NULL,
    genre VARCHAR(64) NOT NULL,
    release_year YEAR,
    plot_summary VARCHAR(2048),
    poster_link VARCHAR(2048),
    PRIMARY KEY (id)
);


create TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL UNIQUE,
    PRIMARY KEY (id),
    CONSTRAINT unique_username UNIQUE (username)

);


create TABLE actors (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64),
    PRIMARY KEY (id),
    CONSTRAINT unique_full_name UNIQUE (first_name, last_name)
);


create TABLE movie_ratings (
    id int NOT NULL AUTO_INCREMENT,
    user_id int,
    movie_id int NOT NULL,
    original_rating DOUBLE NOT NULL,
    normalized_rating DOUBLE NOT NULL,
    rating_source VARCHAR(64) NOT NULL,
    comment VARCHAR(2048),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    CONSTRAINT unique_rating_for_movie_per_source UNIQUE (movie_id, rating_source, user_id)
);


create TABLE actors_movies (
    id int NOT NULL AUTO_INCREMENT,
    actor_id int NOT NULL,
    movie_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (actor_id) REFERENCES actors(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    CONSTRAINT unique_actor_movie_appearance UNIQUE(actor_id, movie_id)
);

create INDEX  username_index ON users (username);
create INDEX  genre_index ON movies (genre);
create INDEX actor_name_index ON actors (first_name, last_name);

create INDEX movie_rating_index ON movie_ratings (movie_id);
create INDEX rating_source_index ON movie_ratings (rating_source);

create INDEX actor_index ON actors_movies (actor_id);
create INDEX movie_index ON actors_movies (movie_id);