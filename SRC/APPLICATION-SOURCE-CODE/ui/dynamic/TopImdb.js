import {init_navbar, append_to_html_with_atterbutes} from './utils.js'
import {links, footer_text} from "./constants.js"
import {append_row_to_table, append_header_row_to_table} from "./TopPagesUtil.js"


function init_toppage(rating_type, n){
    var table_attributes, i, row_text;

    table_attributes = {"style":"width:100%", "id": "ratingtable"}
    append_to_html_with_atterbutes("ratingtablecontainer","table","ratingtable","",table_attributes)
    
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
    xhttp.open("GET", "/imdb_rated?n="+n, true);
    xhttp.send();
  
}




const number_of_rows = 10;

init_navbar(links);
init_toppage("IMDB", number_of_rows);
