import "css/styles.css";
import "css/styles.less";
import "css/styles.scss";

import {loadScript,setupSockets,request} from "./general.js"

document.addEventListener("DOMContentLoaded", function(event) {
        console.log("DOMContentLoaded");

	setupSockets();
});
