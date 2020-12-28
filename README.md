# DB_Systems_Course_Project

## home page:
 * top banner with logo, links, about us and search
 * carousel displaying different pages
 * users recommend - one random (or positive) recommendation from DB) __QUERY #1__
 * staff pick - random from list, with images and wiki info
 
 ![](https://github.com/tamarabester/DB_Systems_Course_Project/blob/main/ui_planning/home_page.png)

## other pages:
  * top rated by our users
  * top rated on IMDB
  * recommended for you
  * movie page
  
### get to know our movies
* title with drop down menu:
 * most popular genres
 * most popular actors
 * how many movies per genre
 * movies with the most comments
  ![](https://github.com/tamarabester/DB_Systems_Course_Project/blob/main/ui_planning/get_to_know_movies.png)
 
### top rated by our users:
  * table with rank, rating, title (top 20 or optional - load more) __QUERY #3__
  * 3/4 images in the bottom (later can be links)
  ![](https://github.com/tamarabester/DB_Systems_Course_Project/blob/main/ui_planning/user_rated.png)
  
### top rated on IMDB:
  * imdb logo
  * table with rank, rating, title (top 20 or optional - load more)
  * 3/4 images in the bottom (later can be links)
  ![](https://github.com/tamarabester/DB_Systems_Course_Project/blob/main/ui_planning/imdb_rated.png)

### recommended for you:
* title and explanation
* input box for movie names with autocomplete __QUERY #4__
* chosen movies should appear below with option to remove
* limited to 3 movies
* "recommend" button - when clicked the recommendation will be calculated and displayed with wiki info

  ![](https://github.com/tamarabester/DB_Systems_Course_Project/blob/main/ui_planning/recommended_for_you_1.png)
  ![](https://github.com/tamarabester/DB_Systems_Course_Project/blob/main/ui_planning/recommended_for_you_2.png)
  
  recommendation algorithm:
  * if 2 movies have the same genre: __QUERY #5__
     * return top rated movie from this genre __QUERY #6__
  * if 2 movies have the sma actor: __QUERY #7__
    * return top rated movie with this actor __QUERY #8__
  * else:
    * return random top movie from top 10 rated __QUERY #9__
    
 ### movie page
 * movie name
 * wiki info
 * 5 comments from users __QUERY #10__
   ![](https://github.com/tamarabester/DB_Systems_Course_Project/blob/main/ui_planning/movie_page.png)

## DB structure
### movies
id, title, genre, release_year,plot_summary, poster_link

### users
id, username

### movie_ratings
id, user_id, movie_id, original_rating, normalized_rating, rating_source, comment, 

comment is str(2048)
unique constraint (rating_source, movie_id)

### actors
id, first_name, last_name

### actors_movies
id, acotr_id, movie_id
unique constraint (acotr_id, movie_id)
