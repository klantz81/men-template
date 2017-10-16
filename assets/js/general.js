let socket = null;

export function loadScript(src, handler) {
	var sc = document.createElement("script");
	sc.type = "text/javascript";
	sc.charset = "UTF-8";
	sc.async = true;
	sc.src = src;
	sc.onload = function() {
		if (typeof(handler) == 'function')
			handler();
	};
	document.head.appendChild(sc);
}

export function setupSockets() {
	loadScript(window.location.protocol + "//" + window.location.hostname + ":3000/socket.io/socket.io.js", function() {
		var socket_reload = io(window.location.protocol + "//" + window.location.hostname + ":22280");
		socket_reload.on("file-changed", function(msg) { setTimeout(function() { window.location.reload(); }, 500); });

		socket = io(window.location.protocol + "//" + window.location.hostname + ":3000");
	});
}

export function request(event_name, args, handler) {
	socket.emit(event_name, args, handler);
}
