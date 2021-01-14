import {init_navbar, append_to_html_with_atterbutes} from './utils.js'
import {links} from "./constants.js"
import {append_row_to_table, append_header_row_to_table} from "./TopPagesUtil.js"


// function init_toppage(rating_type, n){
//     var table_attributes, i, row_text;

//     table_attributes = {"style":"width:100%", "id": "ratingtable"}
//     append_to_html_with_atterbutes("ratingtablecontainer","table","ratingtable","",table_attributes)
    
    // append_header_row_to_table("ratingtable","toprow","ratingtabletop",["Rank","Title","Rating"])  

    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //     console.log(this.responseText);
    //     var tops = JSON.parse(this.responseText);
    //     for (i in tops){
    //         var film = tops[i];
    //         var title_link_text = film.title
    //         row_text = [film.rank , title_link_text, film.rating]
    //         append_row_to_table("ratingtable","row"+i,"",row_text,"td")
    //     }
    //   }
    // };
//     // IMDB, RT, USER
//     xhttp.open("GET", "/top_rated/IMDB?n="+n, true);
//     //xhttp.open("GET", "/imdb_rated?n="+n, true);
//     xhttp.send();
  
// }


function loadRatingView(source, n){
  const ids = ["ratingtablecontainer_USER","ratingtablecontainer_RT","ratingtablecontainer_IMDB"];
  const cur_id = "ratingtablecontainer_"+source;
  var i;
  //const imggrigs = [imggrig1,imggrig2,imggrig3];
  //const random = Math.floor(Math.random() * 3);
  //document.getElementById("grid1").innerHTML = imggrigs[random]

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
          append_row_to_table("ratingtable","row"+i,"",row_text,"td")
      }
    }
  };
  // IMDB, RT, USER
  xhttp.open("GET", "/top_rated/"+source+"?n="+n, true);
  xhttp.send();

}


init_navbar(links);
window.loadRatingView = loadRatingView;