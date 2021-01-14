import {insert_movie_description, init_navbar, init_footer} from './utils.js'
import {links} from "./constants.js"

var options = ["", "", ""];

function insert_movie_info(info){
  document.getElementById("movie").innerHTML = ""
  document.getElementById("movie_link").setAttribute("href", "/movie?id=" + info.id)
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
        document.getElementById("featuring").innerHTML = "<b>Featuring: </b>"+info.actors
    }
    if (info.summary != undefined){
        document.getElementById("summarytitle").innerHTML = "Plot summary"
        insert_movie_description("description",info.summary, info.poster_link, 300);
        document.getElementById("info").style.height="300px";
    }
}

function searchRecommendation(){
	var i;
	for (i = 0; i < 3; i++){
		if(options[i] == ""){
			return;
		}
	}

	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           	console.log(this.responseText);
            var movies = JSON.parse(this.responseText);
            var display = document.getElementById("movie")
            display.setAttribute("style", "display:block")
            insert_movie_info(movies)
            

		}
    };
	xhttp.open("GET", "/recommendation/"+document.getElementById("opt1").innerHTML+"/"+document.getElementById("opt2").innerHTML+"/"+document.getElementById("opt3").innerHTML, true);
	xhttp.send();

}
function EnterMovie() {
	var i, val;
  val = document.getElementById("myInput").value; 
  if(val == options[0] || val == options[1] || val == options[2]){
    alert("You already picked that movie!");
    return;
  }

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          movies = JSON.parse(this.responseText);
          if(movies == -1){
            alert("This movie does not exist!");
            return;
          }
          for(i= 0; i < 3; i++){
            if(options[i] == ""){
              document.getElementById("opt".concat((i+1).toString())).innerHTML = val;
              options[i] = document.getElementById("myInput").value;
              break;
    }
  }

    }
    };
  xhttp.open("GET", "/id_for_title/" + val, true);
  xhttp.send();

}

function RemoveOption(i) {
	document.getElementById("opt".concat((i+1).toString())).innerHTML = "movie ".concat((i+1).toString());
	options[i] = "";
}

function autocomplete(inp) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, j, val = this.value;
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               var arr = JSON.parse(this.responseText);
		      /*close any already open lists of autocompleted values*/
		      closeAllLists();
		      if (!val) { return false;}
		      currentFocus = -1;
		      /*create a DIV element that will contain the items (values):*/
		      a = document.createElement("DIV");
		      a.setAttribute("id", this.id + "autocomplete-list");
		      a.setAttribute("class", "autocomplete-items");
		      /*append the DIV element as a child of the autocomplete container:*/
		      document.getElementById("myInput").parentNode.appendChild(a);
		      /*for each item in the array...*/
		      for (i = 0; i < arr.length; i++) {
		        /*check if the item starts with the same letters as the text field value:*/
		        for (j = 0; j < arr[i].length - val.length; j++){
		        	if (arr[i].substr(j, val.length).toUpperCase() == val.toUpperCase()) {
		          /*create a DIV element for each matching element:*/
                  console.log(arr[i]);
		          		b = document.createElement("DIV");
		          /*make the matching letters bold:*/
		          		b.innerHTML = arr[i].substr(0, j);
		          		b.innerHTML += "<strong>" + arr[i].substr(j, val.length) + "</strong>";
		          		b.innerHTML += arr[i].substr(val.length + j);
		          /*insert a input field that will hold the current array item's value:*/
		          		b.innerHTML += "<input type='hidden' value='" + str_process(arr[i]) + "'>";
		          /*execute a function when someone clicks on the item value (DIV element):*/
		          		b.addEventListener("click", function(e) {
		              /*insert the value for the autocomplete text field:*/
		              		inp.value = this.getElementsByTagName("input")[0].value;
		              /*close the list of autocompleted values,
		              (or any other open lists of autocompleted values:*/
		            		closeAllLists();
		          		});
		          		a.appendChild(b);
		          		break;
		        	}

		        }
        
      }
      }
    };
    xhttp.open("GET", "/movie_name?text="+document.getElementById("myInput").value, true);
    xhttp.send();
    
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });

  function str_process(str){
    var i, new_str;
    new_str = "";
    for(i = 0; i < str.length; i++){
      if(str.charAt(i) == "'"){
        new_str += "&#39"
      }
      else{
        new_str += str.charAt(i)
      }
    }
    return new_str
  }
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
var movies;
console.log(movies);
autocomplete(document.getElementById("myInput"));
init_navbar(links);
window.EnterMovie = EnterMovie;
window.RemoveOption = RemoveOption;
window.searchRecommendation = searchRecommendation;
