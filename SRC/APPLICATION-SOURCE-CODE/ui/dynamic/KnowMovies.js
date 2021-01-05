import {insert_movie_description, init_navbar, init_footer} from './utils.js'
import {links, footer_text} from "./constants.js"


/***************** button operation  ****************/

function toggleUp(btn,p){
    p.style.transition = "all 1s ease-in-out";
    p.style.height = "0px";
    btn.innerHTML = "+";
    btn.setAttribute("style","font-size:18px;")
}

function toggleDown(btn,p, pheight){
  p.style.height = pheight;
  p.style.transition = "all 1s ease-in-out";
  btn.innerHTML = "-";
}

function toggleSwitch(btn,p, pheight){
  if (p.style.height == "0px") {
    toggleDown(btn,p,pheight)
  } else {
    toggleUp(btn,p)
  }
}

function toggle(bid,pid,h) {
  var i, pp, bb;
  const togglebtns = ["btn1","btn2","btn3","btn4","btn5"]
  const toggleps = ["p1","p2","p3","p4","p5"]
  var p = document.getElementById(pid);
  var btn = document.getElementById(bid);
  const pheight = h+"px"

  for (i in togglebtns){
    if (togglebtns[i]==bid){
      toggleSwitch(btn,p,pheight)
    }else{
      pp = document.getElementById(toggleps[i])
      bb = document.getElementById(togglebtns[i])
      toggleUp(bb,pp)
    }
  }
}


/***************** content retrival  ****************/

function insert_popular_genres(){
    var i;
    var pre = "Below are the most popular genres in our collection. Popularity is asseed through the average rating of our users for the films from each genre.<br>"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var genres = JSON.parse(this.responseText)
        for (i in genres){
            var genre = genres[i];
            pre += "    "+genre.Rank+". <b>"+genre.Name+"</b> [average score: "+genre.Score+"]<br>";
        }
        document.getElementById("p1").innerHTML = pre;
      }
    };
    xhttp.open("GET", "/genres_popularity", true);
    xhttp.send();
}

function insert_popular_actors(){
    var i;
    var pre = "Below are the most popular actors in our collection. Popularity is asseed through the average of user ratings over the films in our collection each actor has participated in.<br>"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var actors = JSON.parse(this.responseText)
        for (i in actors){
            var actor = actors[i];
            pre += "    "+actor.Rank+". <b>"+actor.Name+"</b> [average score: "+actor.Score+"]<br>";
        }
        document.getElementById("p2").innerHTML = pre;
      }
    };
    xhttp.open("GET", "/actors_popularity", true);
    xhttp.send();
}

function insert_discussive_films(){
    var i;
    var pre = "Find out which films our users were most intersted in! Below are the films from out collection with the most comments<br>"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var films = JSON.parse(this.responseText)
        for (i in films){
            var film = films[i];
            pre += "    "+film.Rank+". <b>"+film.Name+"</b> ["+film.comment_num+" comments]<br>";
        }
        document.getElementById("p3").innerHTML = pre;
      }
    };
    xhttp.open("GET", "/discussive_films", true);
    xhttp.send();

}

function insert_films_per_genre(){
    console.log("in film per genre!")
    var i;
    var pre = "Below are the number of films our collection has per genre<br>"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var genres = JSON.parse(this.responseText)
        for (i in genres){
            var film = genres[i];
            pre += "    "+film.Rank+". <b>"+film.Name+"</b>  - "+film.num+"<br>";
        }
        document.getElementById("p4").innerHTML = pre;
      }
    };
    xhttp.open("GET", "/film_per_genre", true);
    xhttp.send();
}

function insert_films_per_year(){
    console.log("in film per genre!")

    var i;
    var pre = "Below are the number of films our collection has per year<br>"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var years = JSON.parse(this.responseText)
        for (i in years){
            var film = years[i];
            pre += "    "+film.Rank+". <b>"+film.Name+"</b>  - "+film.num+"<br>";
        }
        document.getElementById("p5").innerHTML = pre;
      }
    };
    xhttp.open("GET", "/film_per_year", true);
    xhttp.send();

}


/***************** On Load  ****************/

var genres_h, actors_h, disscusive_h, films_genres_h, films_year_h

init_navbar(links);
insert_popular_genres();
insert_popular_actors();
insert_discussive_films();
insert_films_per_genre(films_genres_h);
insert_films_per_year(films_year_h);
window.toggle = toggle;