import {append_to_html, append_to_html_with_atterbutes, init_navbar, init_footer} from './utils.js'
import {links, footer_text} from "./constants.js"


function init_carosal(){
  slideIndex = 1;
  showSlides(slideIndex);
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
}


function insert_comment_of_the_day() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var comment = JSON.parse(this.responseText)[0];
        const title_text = comment.username + " on " + comment.title
        document.getElementById("title").innerHTML = title_text;
        document.getElementById("text").innerHTML = comment.text;
        document.getElementById("rank").innerHTML =" - "+comment.rating;
      }
    };
    xhttp.open("GET", "/random_rating", true);
    xhttp.send();
}


function get_random_pick(){
      var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("GET", "/staff_pick", true);
  xhttp.send();
}

function insert_staff_pick(pick, max_img_size){
  staffmembers = ["Dana","Tamara","Dor","Edan"]
  const random = Math.floor(Math.random() * 4);

  document.getElementById("picktitle").innerHTML = picktitle

  insert_movie_description(pick,max_img_size)
  
  /*
  if (pick.image!=null){
    img = append_to_html("staffpickimage","img","staffpickimage","")
    img.setAttribute("src",pick.image)
    img.setAttribute("style","max-height:200px; max-width:auto;")
  }
  picktitle = staffmembers[random] + " recommends " + pick.title
  
  document.getElementById("staffpicktext").innerHTML = pick.summery*/
}



/***************** On Load  *************/

var slideIndex;
//var topinput;
const max_img_size = 150;

init_navbar(links);
init_carosal();
insert_comment_of_the_day();
insert_staff_pick(max_img_size); //TODO
init_footer(footer_text);

