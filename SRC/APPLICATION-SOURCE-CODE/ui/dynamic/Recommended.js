import {insert_movie_description, init_navbar, init_footer} from './utils.js'
import {links} from "./constants.js"

var options = ["", "", ""];


function searchRecommendation(){
	var i;
	for (i = 0; i < 3; i++){
		if(options[i] == ""){
			console.log("good");
			return;
		}
	}

	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           	console.log(this.responseText);
            movies = JSON.parse(this.responseText);
   //          var xhttp1 = new XMLHttpRequest();
	  //  		xhttp1.onreadystatechange = function() {
	  //  			if (this.readyState == 4 && this.status == 200) {
   //         			console.log(this.responseText);
	  //          		movies = JSON.parse(this.responseText);
	  //          	}
	  //    	};
	    
			// xhttp1.open("GET", "/id_for_title?title1="+document.getElementById("opt1").innerHTML+"?title2="+document.getElementById("opt2").innerHTML+"?title3="+document.getElementById("opt3").innerHTML, true);
			// xhttp1.send();
		}
    };
	xhttp.open("GET", "/recommendation/"+document.getElementById("opt1").innerHTML+"/"+document.getElementById("opt2").innerHTML+"/"+document.getElementById("opt3").innerHTML, true);
	xhttp.send();

}
function EnterMovie() {
	var i; 
	for(i= 0; i < 3; i++){
		if(options[i] == ""){
			document.getElementById("opt".concat((i+1).toString())).innerHTML = document.getElementById("myInput").value;
			options[i] = document.getElementById("myInput").value;
			break;
		}
	}
}

function RemoveOption(i) {
	document.getElementById("opt".concat((i+1).toString())).innerHTML = "option ".concat((i+1).toString());
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
		          		b = document.createElement("DIV");
		          /*make the matching letters bold:*/
		          		b.innerHTML = arr[i].substr(0, j);
		          		b.innerHTML += "<strong>" + arr[i].substr(j, val.length) + "</strong>";
		          		b.innerHTML += arr[i].substr(val.length + j);
		          /*insert a input field that will hold the current array item's value:*/
		          		b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
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

/*An array containing all the country names in the world:*/
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
var movies;
console.log(movies);
autocomplete(document.getElementById("myInput"));
init_navbar(links);
window.EnterMovie = EnterMovie;
window.RemoveOption = RemoveOption;
window.searchRecommendation = searchRecommendation;
