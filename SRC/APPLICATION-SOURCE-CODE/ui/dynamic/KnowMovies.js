import {init_navbar} from './utils.js'
import {links} from "./constants.js"


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

function inset_paragraph(p_i, data, attr2, attr3, fix3){
  var pre =pre_p[p_i-1];
  var i;

  for (i in data){
    var regiser = data[i];
    console.log(regiser);
    var rank = regiser["rank"];
    var name = regiser[attr2];
    var score = regiser[attr3];
    console.log(rank,name,score)
    if (fix3==true){
      score = score.toFixed(2);
    }
    pre += "    "+rank+". <b>"+name+"</b>  - "+score+"<br>";
  }
  document.getElementById("p"+p_i).innerHTML = pre;
}

function load_page(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var data = JSON.parse(this.responseText);
      inset_paragraph(1 ,data.top_genres,"name","avg_rating", true);
      inset_paragraph(2 ,data.top_actors,"name","avg_rating", true);
      inset_paragraph(3 ,data.movies, "title","num_ratings", false);
      inset_paragraph(4 ,data.genres,"name","movie_count", false);
      inset_paragraph(5 ,data.years, "release_year", "movie_count",false);
    }
  };
  xhttp.open("GET", "/all_info_for_analitics?n=5", true);
  xhttp.send();

}

/***************** On Load  ****************/


init_navbar(links);
window.toggle = toggle;
var pre_p1 = "Below are the most popular genres in our collection. Popularity is asseed through the average rating of our users for the films from each genre.<br>"
var pre_p2 = "Below are the most popular actors in our collection. Popularity is asseed through the average of user ratings over the films in our collection each actor has participated in.<br>"
var pre_p3 = "Find out which films our users were most intersted in! Below are the films from out collection with the most comments<br>"
var pre_p4 = "Below are the number of films our collection has per genre<br>"
var pre_p5 = "Below are the number of films our collection has per year<br>"
var pre_p = [pre_p1, pre_p2,pre_p3,pre_p4,pre_p5];
load_page();