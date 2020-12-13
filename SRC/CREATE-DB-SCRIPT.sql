CREATE TABLE movies (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(1024) NOT NULL,
    genre VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);


CREATE TABLE actors (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT unique_full_name UNIQUE (first_name, last_name)
);


CREATE TABLE movie_ratings (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    movie_id int NOT NULL,
    rating int NOT NULL,
    comment VARCHAR(2048) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    CONSTRAINT unique_rating_for_movie_per_user UNIQUE (user_id, movie_id)
);


CREATE TABLE actors_movies (
    id int NOT NULL AUTO_INCREMENT,
    actor_id int NOT NULL,
    movie_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (actor_id) REFERENCES actors(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    UNIQUE(actor_id, movie_id)
);

CREATE INDEX  username_index ON users (username);
CREATE INDEX actor_name_index ON actors (first_name, last_name);
CREATE INDEX user_movie_index ON movie_ratings (user_id, movie_id);
CREATE INDEX actor_index ON actors_movies (actor_id);
CREATE INDEX movie_index ON actors_movies (movie_id);