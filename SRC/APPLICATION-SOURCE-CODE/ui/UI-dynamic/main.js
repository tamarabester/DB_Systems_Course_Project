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

/********************** TEMP *******************/
const loem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo cons";
const loem_short = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla"
const loem_long = loem+loem+loem;
const mov = new movie("this is title of movie", "plot", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ","./posters/9.jpg") 
const comment1 = new usercomment("namename", "filmfilm","text","3/5") 
const comment2 = new usercomment("namename2", "filmfilm","text.....","3/5") 
const comment3 = new usercomment("namename2", "filmfilm","allalalalalal","3/5") 
const  staff_pick = new staffpick("Mobvie the movie", "a","a","./posters/11.jpg", "texti text!")
const mov2 = new movie("this is title of movie", "plot", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",null) 
 
function get_movie(){
  var ratings, movv;
  ratings = {"imdb":1, "tomatoes":2, "users":3}
  movv = {"title": "MovieTITLE","ratings":ratings, "summary":loem_long, "poster":"./posters/11.jpg"}
  return movv;
}

function get_comments_for_movie(movie){
  return [comment1,comment2,comment3]
}

function get_actor_names(movie){
  var names = ["name1", "namename", "name!"];
  return names;
}

function get_top(rating_type,n){
  var movie = {"title":"TITLE","ratings":{tomatoes_rank:"1", RT:"100"}};
  var movie2 = {"title":"TITLE","ratings":{tomatoes_rank:"1", RT:"100"}};
  var movie3 = {"title":"TITLE","ratings":{tomatoes_rank:"1", RT:"100"}};
  return [movie,movie2,movie3];
}

/********************************** Home page *************************************** */

var slideIndex;
var topinput;

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

/************************************************************************************/
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

  summary = document.createElement('p')
  summary.innerText = movie.summary
  parentelem.appendChild(summary)

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

function append_to_html_with_atterbutes(parent_id, html_tag ,class_name, inner_text, attributes_dict){
  var new_elem = append_to_html(parent_id, html_tag ,class_name, inner_text)
  for (attribute_name in attributes_dict){
    new_elem.setAttribute(attribute_name,attributes_dict[attribute_name])
  }
}
/******************************************************************************* */
/******************************************************************************* */
/******************************************************************************* */
/* page init functions */

function init_homepage(){
  const max_img_size = 150;
  const comment = get_random_comment(); // TODO
  const pick = get_random_pick(); // TODO
  init_carosal();
  insert_comment_of_the_day(comment);
  insert_staff_pick(pick, max_img_size);
}


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

function append_row_to_table(table_id, row_id, row_class, cell_texts,cel_type_tag){
  toprow_attributes = {"id":row_id}
  append_to_html_with_atterbutes(table_id,"tr",row_class,"",toprow_attributes)

  for (i in cell_texts){
    append_to_html(row_id,cel_type_tag,"",cell_texts[i])
  }
}

function init_toppage(rating_type, n){
  var table_attributes;
  const top_rated_movies = get_top(rating_type,n) // TODO

  table_attributes = {"style":"width:100%", "id": "ratingtable"}
  append_to_html_with_atterbutes("ratingtablecontainer","table","ratingtable","",table_attributes)
  
  append_row_to_table("ratingtable","toprow","ratingtabletop",["Rank","Title","Rating"],"th")  

  for (i in top_rated_movies){
    var movie = top_rated_movies[i]
    console.log(movie)
    text = [movie.ratings["tomatoes_rank"],movie.title,movie.ratings["RT"]]
    append_row_to_table("ratingtable","row"+i,"",text,"td")
  }
}

function init_analytics_page(){
  insert_popular_genres()
  insert_popular_actors()
  insert_discussive_films()
  insert_films_per_genre()
  insert_films_per_year()
}
  
/******************************************************************************* */
/* On page load */

const links = [ ["Home","./Home.HTML"] ,["Recommended for you","./RecommendedForYou.HTML"]
,["User recommendations","./UserRating.HTML"] ,["IMDB recommendations","./IMDB.HTML"]
,["Get to know our films","./Tomatos.HTML"] ]

init_navbar(links)
init_footer("im the footer!")


var pageneme = document.currentScript.getAttribute('pagename')
if (pageneme=="homepage") {
  init_homepage()
} else if (pageneme=="MoviePage"){
  init_moviepage()
} else if (pageneme=="TopUsers"){
  init_toppage("users")
} else if (pageneme=="TopImdb"){
  init_toppage("imdb")
} else if (pageneme=="TopTomatoes"){
  init_toppage("tomatoes")
}else if (pageneme=="KnowMovies"){
  init_analytics_page()
} else{
  page_not_found()
}



/**************************************************************************************/

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


/************************************************************************************ */
/*************************** Toggle for get to know page **************************** */
function slideDown(el) {
  var elem = document.getElementById(el);
  elem.style.transition = "all 2s ease-in-out";
  elem.style.height = "400px";
}

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