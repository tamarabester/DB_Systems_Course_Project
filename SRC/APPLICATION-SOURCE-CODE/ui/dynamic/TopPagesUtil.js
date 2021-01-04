import {append_to_html, append_to_html_with_atterbutes} from './utils.js'
import {links, footer_text} from "./constants.js"


// !!! should be "top pages utils", and the top pages would just call init_toppage
// with the proper parameter !!! // 

function append_row_to_table(table_id, row_id, row_class, cell_texts,cel_type_tag){
    toprow_attributes = {"id":row_id}
    append_to_html_with_atterbutes(table_id,"tr",row_class,"",toprow_attributes)
  
    for (i in cell_texts){
      append_to_html(row_id,cel_type_tag,"",cell_texts[i])
    }
}
  
export function init_toppage(rating_type, n){
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
