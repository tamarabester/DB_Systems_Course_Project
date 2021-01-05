import {append_to_html, append_to_html_with_atterbutes, init_navbar, init_footer} from './utils.js'
import {loem, loem_long, loem_short} from './constants.js'


function page_not_found() {
  notfound = append_to_html("main","h2","","Page not found :(")
  notfound.setAttribute("style","margin-top:20px;")
}


function inset_user_comments(id, usercomments){
  let parentelem, div, appendChildElement;
  parentelem = document.getElementById(id)
  for (let comment of usercomments) {

    // set comment container
    div = document.createElement('div');
    div.setAttribute('class', 'usercomment')
    appendChildElement = parentelem.appendChild(div)

    // set tittle
    title = document.createElement('p');
    title.setAttribute('class', 'usercommenttittle')
    title.innerText = comment.rank
    appendChildElement = div.appendChild(title)

    // set text
    text = document.createElement('p');
    text.setAttribute('class', 'usercommentcomment')
    text.innerText = comment.text
    appendChildElement = div.appendChild(text)

    // set user name
    username = document.createElement('span')
    username.setAttribute('class', 'usercommentcname')
    username.innerText = " - "+comment.name
    appendChildElement = text.appendChild(username)

  }
}




/** for home page **/

function init_moviepage(){
  const max_img_size = 200
  const movie = get_movie() // TODO
  const comments = get_comments_for_movie(movie) // TODO
  document.getElementById("movietitle").innerHTML = movie.title
  rating_text = "IMDB: "+movie.ratings["imdb"]+" | Rotten Tomatoes: "+movie.ratings["tomatoes"]+" | Our Users: "+movie.ratings["users"]
  document.getElementById("movieratings").innerHTML = rating_text
  document.getElementById("starring").innerHTML = "<b>Starring:</b> " + get_actor_names(movie) //TODO
  insert_movie_description("Moviedescription", movie, max_img_size)
  inset_user_comments("comments!", comments)
}


/********************************* top searchbar **************************************/

function getCompletionOptions(prefix){
  return ["lalala", "bla bla", "123"]
}

function getAutoCompleteOptions(prefix){
  options = getCompletionOptions(prefix)
  datalist = append_to_html("searchbar","datalist","datalist","")
  //datalist = append_to_html("searchbar","datalist","","")
  datalist.setAttribute("id","suggestions")

  for (option in options){
    opt = append_to_html("suggestions",option,"","")
    opt.setAttribute("value",option)
  }
  
}





/************************************************************************************ */
/*************************** Toggle for get to know page **************************** */
function slideDown(el) {
  var elem = document.getElementById(el);
  elem.style.transition = "all 2s ease-in-out";
  elem.style.height = "400px";
}

