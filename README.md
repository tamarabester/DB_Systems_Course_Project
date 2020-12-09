# DB_Systems_Course_Project

## home page:
 * top banner with logo, links, about us and search
 * carousel displaying different pages
 * users recommend - one random (or positive) recommendation from DB) __QUERY #1__
 * staff pick - random from list, with images and wiki info
 
## other pages:
  * top rated by our users
  * top rated on IMDB
  * recommended for you
 
### top rated by our users:
  * table with rank, rating, title (top 20 or optional - load more) __QUERY #3__
  * 3/4 images in the bottom (later can be links)
  
  
### top rated on IMDB:
  * imdb logo
  * table with rank, rating, title (top 20 or optional - load more)
  * 3/4 images in the bottom (later can be links)
  

### recommended for you:
* title and explanation
* input box for movie names with autocomplete __QUERY #4__
* chosen movies should appear below with option to remove
* limited to 3 movies
* "recommend" button - when clicked the recommendation will be calculated and displayed with wiki info
  
  recommendation algorithm:
  * if 2 movies have the same genre: __QUERY #5__
     * return top rated movie from this genre __QUERY #6__
  * if 2 movies have the sma actor: __QUERY #7__
    * return top rated movie with this actor __QUERY #8__
  * else:
    * return random top movie from top 10 rated __QUERY #9__
