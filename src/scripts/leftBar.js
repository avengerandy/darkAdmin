import * as JQuery from "jquery";
const $ = JQuery.default;
import '../css/bootstrapSlateTheme.min.css';
import '../css/leftBar.scss';

$(".nav-icon").click(function() {
    $(this).toggleClass('nav-icon-x');
    $(".leftBar").toggleClass('leftBarOpen');
});
