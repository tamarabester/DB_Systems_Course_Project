/********************************** Home page *************************************** */

var slideIndex;

function init_homepage(){
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

class staffpick{
  constructor(title, wiki_name,wiki_link,image,summary){
    this.title = title;
    this.wiki_name = wiki_name;
    this.wiki_link = wiki_link;
    this.image = image;
    this.summary = summary;
  }
}


/************************************************************************************/

function page_not_found() {
  notfound = append_to_html("main","h2","","Page not found :(")
  notfound.setAttribute("style","margin-top:20px;")
}

function init_navbar(link_list) {
  let parentelem, childelem, appendChildElement;
  parentelem = document.getElementById('navbar')

  // insert navbat links
 for (let link of link_list) {
  childelem = document.createElement('a');
  childelem.href = link[1];
  childelem.innerText = link[0];
  appendChildElement = parentelem.appendChild(childelem)
  }
  

  // inset seach bar
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
  searchbar.setAttribute("placeholder","Search a film..")
  searchcontainer.appendChild(searchbar)
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

function insert_movie_description(id, movie, max_img_size){
  parentelem = document.getElementById(id)

  if (movie.poster!=null){
    // create image
    image = document.createElement('img')
    image.setAttribute("src","./posters/9.jpg")
    image.setAttribute("alt","Movie's poster")
    image.setAttribute("class","movieposter")
    size = "height:"+max_img_size+"px;"
    image.setAttribute("style",size)
    parentelem.appendChild(image)
  }

  wiki = document.createElement('p')
  wiki.innerText = movie.wiki
  parentelem.appendChild(wiki)

}

function insert_staff_pick(pick, max_img_size){
  staffmembers = ["Dana","Tamara","Dor","Eden"]
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

/** for home page **/

function insert_comment_of_the_day(comment){
  const title_text = comment.name + " on " + comment.film
  document.getElementById("title").innerHTML = title_text;
  document.getElementById("text").innerHTML =comment.text;
  document.getElementById("rank").innerHTML =" - "+comment.rank;
}

function append_to_html(parent_id, html_tag ,class_name, inner_text){
  let parent, child;
  parent = document.getElementById(parent_id)
  child  = document.createElement(html_tag)
  child.setAttribute("class", class_name)
  child.innerText = inner_text
  parent.appendChild(child)
  return child
}

/******************************************************************************* */
/* On page load */

const loem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo cons";
const loem_short = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla"
const loem_long = loem+loem+loem;

init_navbar([["Home","./Home.HTML"]
,["Recommended for you","./RecommendedForYou.HTML"]
,["User recommendations","./UserRating.HTML"]
,["IMDB recommendations","./IMDB.HTML"]
,["Get to know our films","./Tomatos.HTML"]
])



var pageneme = document.currentScript.getAttribute('pagename')


if (pageneme=="Home"){

  comment = new usercomment("username","this is the movie","texti text!","rank")
  staff_pick = new staffpick("Mobvie the movie", "a","a","./posters/11.jpg", "texti text!")
  insert_comment_of_the_day(comment)
  insert_staff_pick(staff_pick)

} else if (pageneme=="MoviePage"){
  const mov = new movie("this is title of movie", "plot", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ","./posters/9.jpg") 
  const mov2 = new movie("this is title of movie", "plot", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",null) 
  
  insert_movie_description("Moviedescription", mov)

  const comment1 = new usercomment("namename", "filmfilm","text","3/5") 
  const comment2 = new usercomment("namename2", "filmfilm","text.....","3/5") 
  const comment3 = new usercomment("namename2", "filmfilm","allalalalalal","3/5") 

  const comments = [comment1,comment2,comment3]
  inset_user_comments("comments!", comments)

} else if (pageneme=="hometest") {
  const comment1 = new usercomment("namename", "filmfilm",loem+"fknknvklvnfdlv","3/5") 
  const staff_pick1 = new staffpick("Mobvie the movie", "a","a","./posters/11.jpg", "texti text!")
  const staff_pick2 = new staffpick("Mobvie the movie", "a","a",null, "texti text!")
  const mov = new movie("this is title of movie", "plot", loem_long, "./posters/11.jpg")
  const max_img_size = 150;

  init_homepage()
  insert_comment_of_the_day(comment1)
  insert_staff_pick(mov, max_img_size)
  //insert_movie_description("description", mov,max_img_size)

}else{
  page_not_found()
}

//init_footer("im the footer!")