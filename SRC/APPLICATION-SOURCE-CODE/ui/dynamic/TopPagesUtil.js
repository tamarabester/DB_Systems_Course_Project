import {append_to_html, append_to_html_with_atterbutes} from './utils.js'
import {links, footer_text} from "./constants.js"


// !!! should be "top pages utils", and the top pages would just call init_toppage
// with the proper parameter !!! // 

export function append_row_to_table(table_id, row_id, row_class, cell_texts,cel_type_tag){
  var toprow_attributes = {"id":row_id}
  append_to_html_with_atterbutes(table_id,"tr",row_class,"",toprow_attributes)

  append_to_html(row_id,cel_type_tag,"",cell_texts[0])

  var title_link_attr = {"id":"title_"+row_id,"style":"text-decoration: underline; cursor: pointer;"}
  append_to_html_with_atterbutes(row_id,cel_type_tag,"","",title_link_attr)
  append_to_html("title_"+row_id,"a","",cell_texts[1])
  //var a = append_to_html(row_id,"a","","");
  //a.setAttribute("id","a"+row_id)
  //append_to_html("a"+row_id,cel_type_tag,"",cell_texts[1])
  append_to_html(row_id,cel_type_tag,"",cell_texts[2])

}

export function append_header_row_to_table(table_id, row_id, row_class, cell_texts){
  var toprow_attributes = {"id":row_id}
  append_to_html_with_atterbutes(table_id,"tr",row_class,"",toprow_attributes)

  var i;
  for (i in cell_texts){
    append_to_html(row_id,"th","",cell_texts[i])
  }
}
  
