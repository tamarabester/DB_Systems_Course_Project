export const links = [ ["Home","./"] ,["Recommended for you","./recommended"]
,["User recommendations","./user_rating"] ,["IMDB recommendations","./imdb_rating"]
,["Get to know our films","./analytics"] ]

export const footer_text = "A very nice site, with very nice films!"


// all the below constants are for dev w/o DB.. 
export const loem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo cons";
export const loem_short = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla"
export const loem_long = loem+loem+loem;

class usercomment {
    constructor(name, film, text, rank) {
      this.name = name;
      this.film = film;
      this.text = text;
      this.rank = rank;
    }
  }
  
  class movie {
    constructor(title, plot, wiki, poster) {
      this.title = title;
      this.plot = plot;
      this.wiki = wiki;
      this.poster = poster;
    }
  }
  
  class staffpick{
    constructor(title, wiki_name,wiki_link,image,summary){
      this.title = title;
      this.wiki_name = wiki_name;
      this.wiki_link = wiki_link;
      this.image = image;
      this.summary = summary;
    }
  }



/********************** TEMP *******************/

const mov = new movie("this is title of movie", "plot", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ","./posters/9.jpg") 
const comment1 = new usercomment("namename", "filmfilm","text","3/5") 
const comment2 = new usercomment("namename2", "filmfilm","text.....","3/5") 
const comment3 = new usercomment("namename2", "filmfilm","allalalalalal","3/5") 
const  staff_pick = new staffpick("Mobvie the movie", "a","a","./posters/11.jpg", "texti text!")
const mov2 = new movie("this is title of movie", "plot", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",null) 
 
function get_movie(){
  var ratings, movv;
  ratings = {"imdb":1, "tomatoes":2, "users":3}
  movv = {"title": "MovieTITLE","ratings":ratings, "summary":loem_long, "poster":"./posters/11.jpg"}
  return movv;
}

function get_comments_for_movie(movie){
  return [comment1,comment2,comment3]
}

function get_actor_names(movie){
  var names = ["name1", "namename", "name!"];
  return names;
}

function get_top(rating_type,n){
  var movie = {"title":"TITLE","ratings":{tomatoes_rank:"1", RT:"100"}};
  var movie2 = {"title":"TITLE","ratings":{tomatoes_rank:"1", RT:"100"}};
  var movie3 = {"title":"TITLE","ratings":{tomatoes_rank:"1", RT:"100"}};
  return [movie,movie2,movie3];
}

