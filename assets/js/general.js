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
