import {init_navbar, append_to_html_with_atterbutes} from './utils.js'
import {links, img1,img2,img3} from "./constants.js"
import {append_row_to_table, append_header_row_to_table} from "./TopPagesUtil.js"

function loadRatingView(source, n){
  const ids = ["ratingtablecontainer_USER","ratingtablecontainer_RT","ratingtablecontainer_IMDB"];
  const cur_id = "ratingtablecontainer_"+source;

  if (source=="USER"){
    document.getElementById("imggrid").innerHTML = img1;
  }
  if (source=="IMDB"){
    document.getElementById("imggrid").innerHTML = img2;
  }
  if (source=="RT"){
    document.getElementById("imggrid").innerHTML = img3;
  }

  for(i in ids){
    document.getElementById(ids[i]).innerHTML="";
  }
  loadRatingTable(cur_id,source, n);
}

function loadRatingTable(id, source, n){
  var table_attributes, i, row_text;

  table_attributes = {"style":"width:100%", "id": "ratingtable"}
  append_to_html_with_atterbutes(id,"table","ratingtable","",table_attributes)
  
  append_header_row_to_table("ratingtable","toprow","ratingtabletop",["Rank","Title","Rating"])  

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var tops = JSON.parse(this.responseText);
      for (i in tops){
          var film = tops[i];
          var title_link_text = film.title
          row_text = [film.rank , title_link_text, film.rating]
          append_row_to_table("ratingtable","row"+i,"",row_text,"td","/movie?id="+film.id)
      }
    }
  };
  // IMDB, RT, USER
  xhttp.open("GET", "/top_rated/"+source+"?n="+n, true);
  xhttp.send();

}

/* on page load */
init_navbar(links);
document.getElementById("imggrid").innerHTML = img1;
window.loadRatingView = loadRatingView;