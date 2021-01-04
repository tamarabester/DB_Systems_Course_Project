import {init_navbar, init_footer} from './utils.js'
import {links, footer_text} from "./constants.js"
import {init_toppage} from "./TopPagesUtil.js"


const number_of_rows = 10;

init_navbar(links);
init_toppage("RT", number_of_rows);
init_footer(footer_text);