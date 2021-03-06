import {insert_movie_description,init_navbar, append_to_html} from './utils.js'
import {links} from "./constants.js"


function insert_info(info){
    console.log(info)
    document.getElementById("pagetitle").innerHTML = info.title
    var rating = "";
    if (info.ratings.USER!=undefined){
        rating += "Our users: "+ info.ratings.USER.toFixed(2)
        if (info.ratings.IMDB!=undefined |info.ratings.RT!=undefined){
            rating += " | "
        }
    }
    if (info.ratings.IMDB!=undefined){
        rating += "IMDB rating: " + info.ratings.IMDB.toFixed(2);
        if (info.ratings.RT!=undefined){
          rating += " | "
      }
    }
    if (info.ratings.RT!=undefined){
      rating += "Rotten Tomatoes rating: " + info.ratings.RT.toFixed(2);
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
    if (info.users_also_liked!=undefined && info.users_also_liked.length>0){
      var i;
      var pre ="";
      for (i in info.users_also_liked){
        pre+= info.users_also_liked[i]+"| "
      }
      var also_liked = info.users_also_liked.slice(3).join(", ")
      document.getElementById("also_liked").innerHTML = "<b>Users who liked this movie also liked: </b>" + also_liked
    }
}

function insert_comments(comments){
    var i, username, comment, rating;
    if (comments.length<2){
      document.getElementById("commentsection").style.display = "none";
      return;
    }
    append_to_html("commentsection","h2","","Featured comments")
    for (let i = 0; i < 3; i++){
        console.log(i)
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


function loadpage(id){
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


/* on page load */
var info, comments;
init_navbar(links);

// get movie id from URL
var queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(queryString, urlParams,id)

loadpage(id);
