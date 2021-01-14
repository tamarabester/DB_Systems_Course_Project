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
          document.getElementById("searchbar").parentNode.appendChild(a);
          /*for each item in the array...*/
          for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            for (j = 0; j < arr[i].length - val.length; j++){
              if (arr[i].substr(j, val.length).toUpperCase() == val.toUpperCase()) {
              /*create a DIV element for each matching element:*/
                  /*console.log(arr[i])*/
                  b = document.createElement("DIV");

              /*make the matching letters bold:*/
                  b.innerHTML = arr[i].substr(0, j);
                  b.innerHTML += "<strong>" + arr[i].substr(j, val.length) + "</strong>";
                  b.innerHTML += arr[i].substr(val.length + j);
              /*insert a input field that will hold the current array item's value:*/
                  b.innerHTML += "<input type='hidden' value='" + str_process(arr[i]) + "' + padding-left:20px'>";

                  /*b.getElementsByTagName('input').setAttribute("type", "");
                  b.getElementsByTagName('input').setAttribute("style", "padding-left:20px")*/
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
    xhttp.open("GET", "/movie_name?text="+document.getElementById("searchbar").value, true);
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

/**
 * insets a child element to the html and returns that element.
 * for example:
 * <div id="divid"></div> ==> 
 * ==> append_to_html("divid", "p", "CLASS","TEXT") ==>
 * ==> <div id="divid"><p class="CLASS">TEXT</p></div>
 * @param {string} parent_id the id of the element on which we wish to append a new element
 * @param {string} html_tag the html tag for the new element
 * @param {string} class_name costum class name, for styling. if no class is needed, insert ""
 * @param {string} inner_text inner text for the new element. to keep empty insert ""
 * @return the new elemet. the same as: document.getElementById(<new element's id>)
 */
function append_to_html(parent_id, html_tag ,class_name, inner_text){
    let parent, child;
    parent = document.getElementById(parent_id)
    child  = document.createElement(html_tag)
    child.setAttribute("class", class_name)
    child.innerText = inner_text
    parent.appendChild(child)
    return child
}


  /**
 * same as append_to_html, but the new element can recive new attributes via the attributes_dict param.
 *
 * for example:
 * <div id="divid"></div> ==> 
 * ==> append_to_html("divid", "p", "CLASS","TEXT",{"style","display:inline-block;"}) ==>
 * ==> <div id="divid"><p class="CLASS" style="display:inline-block;">TEXT</p></div>
 * @param {string} parent_id the id of the element on which we wish to append a new element
 * @param {string} html_tag the html tag for the new element
 * @param {string} class_name costum class name, for styling. if no class is needed, insert ""
 * @param {string} inner_text inner text for the new element. to keep empty insert ""
 * @param {dict}  attributes_dict a dict with string keys which are names of attributes and string values which are values of attributes
 * @return the new elemet. the same as: document.getElementById(<new element's id>)
 */
function append_to_html_with_atterbutes(parent_id, html_tag ,class_name, inner_text, attributes_dict){
  var attribute_name;
  var new_elem = append_to_html(parent_id, html_tag ,class_name, inner_text)
    for (attribute_name in attributes_dict){
      new_elem.setAttribute(attribute_name,attributes_dict[attribute_name])
    }
}

function userTypeInTopSearchbar(e) {
    getAutoCompleteOptions(e.target.value)
    //console.log(e.target.value);
}

function SearchMovie(){

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var movies = JSON.parse(this.responseText);
            if(movies.length == 0){
              alert("not a valid movie!")
              return
            }
            window.location.replace("/movie?movie=" + movies[0].toString());

    }
    };
  xhttp.open("GET", "/id_for_title/"+document.getElementById("searchbar").value, true);
  xhttp.send();

}


 
function init_navbar(link_list) {
    let parentelem, childelem, topinput;
    parentelem = document.getElementById('navbar')
  
    // insert navbat links
   for (let link of link_list) {
    childelem = document.createElement('a');
    childelem.href = link[1];
    childelem.innerText = link[0];
    parentelem.appendChild(childelem)
    }
    
  
    // inset search bar
    let searchcontainer, searchbar, form, button;
    form = document.createElement('form')
    form.setAttribute("autocomplete", "off")
    form.setAttribute("action", "/action_page.php")
    searchcontainer = document.createElement('div')
    searchcontainer.setAttribute("class", "autocomplete")
    document.getElementById("containercontainer").appendChild(form)
    form.appendChild(searchcontainer)
  
    searchbar = document.createElement('input')
    searchbar.setAttribute("type","text")
    searchbar.setAttribute("name", "searchbar")
    searchbar.setAttribute("id","searchbar")
    searchbar.setAttribute("list","suggestions")
    searchbar.setAttribute("placeholder","Search a film..")
    searchcontainer.appendChild(searchbar)

    button = document.createElement('a')
    button.setAttribute("class", "btn")
    button.setAttribute("type", "submit")
    button.setAttribute("onclick", "SearchMovie()")
    button.innerHTML = "Search"

    containercontainer.appendChild(button)
  
    autocomplete(searchbar)
    button.addEventListener("click", SearchMovie)
  
}
  
function init_footer(footer_text){
    let footerdiv, text;
    footerdiv = document.getElementById("footer");
    text = document.createElement('p');
    text.innerText = footer_text;
    footerdiv.appendChild(text);
}


function insert_movie_description(id, text, img, max_img_size){
    let parentelem, image, size, summary;
    parentelem = document.getElementById(id)
  
    if (img!=null){
      // create image
      image = document.createElement('img')
      image.setAttribute("src",img)
      image.setAttribute("alt","Movie's poster")
      image.setAttribute("class","movieposter")
      size = "height:"+max_img_size+"px;"
      image.setAttribute("style",size)
      parentelem.appendChild(image)
    }
  
    summary = document.createElement('p')
    summary.innerText = text
    parentelem.appendChild(summary)
  
}

export {append_to_html, append_to_html_with_atterbutes, init_navbar, init_footer, insert_movie_description};
