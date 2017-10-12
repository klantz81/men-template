import "css/styles.css";
import "css/styles.less";
import "css/styles.scss";

import {loadScript} from "./general.js"

document.addEventListener("DOMContentLoaded", function(event) {
        console.log("DOMContentLoaded");

	loadScript(window.location.protocol + "//" + window.location.hostname + ":3000/socket.io/socket.io.js", function() {
		var socket_reload = io(window.location.protocol + "//" + window.location.hostname + ":22280");
		socket_reload.on("file-changed", function(msg) { setTimeout(function() { window.location.reload(); }, 500); });

		var socket = io(window.location.protocol + "//" + window.location.hostname + ":3000");
	});
});
