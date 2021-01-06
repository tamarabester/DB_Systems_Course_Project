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

function searchMovieInDB(e){
    // TODO! replace with movie search functionallity
    if (e.key === 'Enter') {
      console.log("Enter key has been pressed!")
    }
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
    let searchcontainer, searchbar;
    searchcontainer = document.createElement('div')
    searchcontainer.setAttribute("class", "searchcontainer")
    parentelem.appendChild(searchcontainer)
  
    searchbar = document.createElement('input')
    searchbar.setAttribute("type","text")
    searchbar.setAttribute("style","width:15%")
    searchbar.setAttribute("name", "searchbar")
    searchbar.setAttribute("class","right")
    searchbar.setAttribute("id","searchbar")
    searchbar.setAttribute("list","suggestions")
    searchbar.setAttribute("placeholder","Search a film..")
    searchcontainer.appendChild(searchbar)
  
    topinput = document.querySelector('#searchbar');
    topinput.addEventListener('input', userTypeInTopSearchbar);
    document.querySelector('#searchbar').addEventListener('keypress', searchMovieInDB);
  
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