/********************************** Home page *************************************** */

function init_homepage(){
  var slideIndex = 1;
  showSlides(slideIndex);
  init_navbar(link_list);
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

/************************************************************************************/

class usercomment {
  constructor(name, film, text, rank) {
    this.name = name;
    this.film = film;
    this.text = text;
    this.rank = rank;
  }
}

class movie {
  constructor(title, plot, wiki, poster) {
    this.title = title;
    this.plot = plot;
    this.wiki = wiki;
    this.poster = poster;
  }
}


/************************************************************************************/

function page_not_found() {
  parentelem = document.getElementById("messege")
  var div = document.createElement('div');
  div.textContent = "Page not found :(";
  div.setAttribute('class', 'note');
  appendChildElement = parentelem.appendChild(div)
}

/*
<div class="navbar">
  <div id="navbarlinks">
  </div>
  <div class="searchcontainer">
    <input type="text" style="width:15%;" name="searchbar" class="right" id="searchbar" placeholder="Search a film..">
  </div>
</div>*/

function init_navbar(link_list) {

  // insert navbat links
 let parentelem, childelem, appendChildElement;
 parentelem = document.getElementById('navbarlinks')
 for (let link of link_list) {
  childelem = document.createElement('a');
  childelem.href = link[1];
  childelem.innerText = link[0];
  appendChildElement = parentelem.appendChild(childelem)
  }

  // inset seach bar
  let searchcontainer, searchbar;
  
}

function init_footer(footer_text){
  let footerdiv, text;
  footerdiv = document.getElementById("footer");
  text = document.createElement('p');
  text.innerText = footer_text;
  appendChildElement = footerdiv.appendChild(text);
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

function insert_movie_description(id, movie){
  parentelem = document.getElementById(id)

  if (movie.poster!=null){
    // create image
    image = document.createElement('img')
    image.setAttribute("src","./posters/9.jpg")
    image.setAttribute("alt","Movie's poster")
    image.setAttribute("class","movieposter")
    parentelem.appendChild(image)
  }

  wiki = document.createElement('p')
  wiki.innerText = movie.wiki
  parentelem.appendChild(wiki)

}

/******************************************************************************* */
/* On page load */

init_navbar([["Home","./Home.HTML"]
,["Recommended for you","./RecommendedForYou.HTML"]
,["User recommendations","./UserRating.HTML"]
,["IMDB recommendations","./IMDB.HTML"]
,["Get to know our films","./Tomatos.HTML"]
])

init_footer("im the footer!")

var pageneme = document.currentScript.getAttribute('pagename')

if (pageneme=="Home"){
  const comment1 = new usercomment("namename", "filmfilm","text","3/5") 
  const comment2 = new usercomment("namename2", "filmfilm","text.....","3/5") 
  const comment3 = new usercomment("namename2", "filmfilm","allalalalalal","3/5") 

  const comments = [comment1,comment2,comment3]
  inset_user_comments("comments!", comments)
}

if (pageneme=="MoviePage"){
  const mov = new movie("this is title of movie", "plot", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ","./posters/9.jpg") 
  const mov2 = new movie("this is title of movie", "plot", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",null) 
  
  insert_movie_description("Moviedescription", mov2)

  const comment1 = new usercomment("namename", "filmfilm","text","3/5") 
  const comment2 = new usercomment("namename2", "filmfilm","text.....","3/5") 
  const comment3 = new usercomment("namename2", "filmfilm","allalalalalal","3/5") 

  const comments = [comment1,comment2,comment3]
  inset_user_comments("comments!", comments)
}



else{
  page_not_found()
}

