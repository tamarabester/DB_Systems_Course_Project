import {insert_movie_description,init_navbar, append_to_html, append_to_html_with_atterbutes} from './utils.js'
import {links} from "./constants.js"


function load1(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        }
    };
    // IMDB, RT, USER
    xhttp.open("GET", "/movie/314/info", true);
    xhttp.send();
}


function load2(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      }
    };
  // IMDB, RT, USER
  xhttp.open("GET", "/movie/314/comments?n=10", true);
  xhttp.send();
}

function insert_info(info){
    document.getElementById("pagetitle").innerHTML = info.title
    var rating = "";
    if (info.ratings.USER!=undefined){
        rating += "Our users: "+ info.ratings.USER.toFixed(2)
        if (info.ratings.IMDB!=undefined){
            rating += " | "
        }
    }
    if (info.ratings.IMDB!=undefined){
        rating += "IMDB rating: " + info.ratings.IMDB
    }
    document.getElementById("ratings").innerHTML = rating
    if (info.genre != undefined){
        document.getElementById("genre").innerHTML = "<b>Genre: </b>"+info.genre
    }
    if (info.actors.length > 0){
        console.log(info.actors.length)
        document.getElementById("featuring").innerHTML = "<b>Featuring: </b>" + info.actors.join(", ")
    }
    if (info.summary != undefined){
        document.getElementById("summarytitle").innerHTML = "Plot summary"
        insert_movie_description("description",info.summary, info.poster_link, 300);
        document.getElementById("info").style.height="500px";
    }
    if (info.users_also_liked.length>0){
      var i;
      var pre ="";
      for (i in info.users_also_liked){
        pre+= info.users_also_liked[i]+"| "
      }
      document.getElementById("also_liked").innerHTML = "<b>Users who liked this film also liked: </b>"+info.genre
    }
}

function insert_comments(comments){
    var i, username, comment, rating;
    if (comments.length<2){
        return;
    }
    append_to_html("commentsection","h2","","Featured comments")
    featuredcomments
    for (i in comments){
        username = comments[i].username;
        comment  = comments[i].comment;
        rating   = comments[i].rating.toFixed(2);
        document.getElementById("rating"+i).innerHTML = rating+"/5";
        document.getElementById("username"+i).innerHTML = username;
        document.getElementById("commenttext"+i).innerHTML = '"'+comment+'"';
    }
    if (comments.length == 2){
        document.getElementById("3rdcol").style.display = "none";
    }
}


function load12(id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        info = JSON.parse(this.responseText);
        comments =info["comments"];
        insert_comments(comments);
        insert_info(info);
        }
      };
    // IMDB, RT, USER
    xhttp.open("GET", "/movie/info?id="+id, true);
    xhttp.send();
  }
//load1();
//load2();
var info, comments;
init_navbar(links);
// get movie id from URL
var queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
console.log(queryString, urlParams,id)
load12(id);
// load_page_(id)
