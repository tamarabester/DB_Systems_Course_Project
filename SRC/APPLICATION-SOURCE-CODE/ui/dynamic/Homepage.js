import {insert_movie_description, init_navbar} from './utils.js'
import {links} from "./constants.js"


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function init_btn_carosal(){
  slideIndex = 1;
  showSlides_btn(slideIndex);
}

function init_auto_carosal(){
  slideIndex = 0;
  showSlides_auto();

}

function showSlides_btn(n) {
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


function showSlides_auto() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides_auto, 2000); // Change image every 2 seconds
}




function insert_comment_of_the_day() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var comment = JSON.parse(this.responseText)[0];
        const title_text = "<u>"+comment.username+"</u>" + ' on "' + comment.title + '" ';
        document.getElementById("title").innerHTML = title_text;
        document.getElementById("text").innerHTML = '"<i>'+comment.text+'"</i> - <b>' +comment.rating.toFixed(2) +"/5</b>";
      }
    };
    xhttp.open("GET", "/random_rating", true);
    xhttp.send();
}


function get_random_pick(){
      var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText, typeof this.responseText);
      var pick = JSON.parse(this.responseText);
      console.log(pick, typeof pick);
      const staffmembers = ["Dana","Tamara","Dor","Edan"]
      const random = Math.floor(Math.random() * 4);
      const picktitle = staffmembers[random] + " recommeds" + " '"+ pick.title + "'"
      document.getElementById("picktitle").innerHTML = picktitle
      insert_movie_description("description",pick.summary, pick.image, 300);
      //document.getElementById("staffpicklink") = ?
    }
  };
  xhttp.open("GET", "/staff_pick", true);
  xhttp.send();
}

function insert_staff_pick(max_img_size){


  

  //insert_movie_description(pick,max_img_size)
  
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
init_auto_carosal();
insert_comment_of_the_day();
get_random_pick();
window.plusSlides = plusSlides;

