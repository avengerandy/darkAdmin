//import * as helperModule from './lib/myhelpermodule/myhelpermodule'
//import * as _ from 'lodash';
import * as JQuery from "jquery";
const $ = JQuery.default;
import '../css/bootstrapSlateTheme.min.css';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import '../css/index.scss';

$(".nav-icon").click(function() {
    $(this).toggleClass('nav-icon-x');
    $(".leftBar").toggleClass('leftBarOpen');
});
