// Detect IE without User-agent hacks. | Supports minification. | MIT license | Version 1.1.8 | https://github.com/Ashraile/detect-IE
// Returns either `false` or an object containing the browser version and document mode of Internet Explorer that is running.

window.isIE = (function(window, document, undefined) {

	var envir, is_default_IE11 = !!( !document['currentScript'] && window.msCrypto ); // future proof window.msCrypto check by also checking for currentScript

	var mapIE = { '5': 5, '5.5': 5.5, '5.6': 6, '5.7': 7, '5.8': 8, '9': 9, '10': 10, '11': 11 }; // `@_jscript_version` mapped to IE browser versions.

	var jscript_version = Number( new Function("/*@cc_on return @_jscript_version; @*\/")() ) || (is_default_IE11 ? 11 : undefined);

	/*	Unknown values for IE < 5. Estimates: '1': 3, '3': 4, '5.01': 5.01, but anything below IE 5.5 is bs anyway.
		msCrypto (with the prefix) is only defined in IE11 in IE11 document mode. (Checked via Browserstack)
		Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/crypto
		Shoutout to https://stackoverflow.com/users/5807141/j-j for the overlooked comment on msCrypto:
		https://stackoverflow.com/questions/21825157/internet-explorer-11-detection

		Conditional compilation is a special comment syntax that executes in IE only. Regular browsers will interpret this syntax as a normal comment.
		`@_jscript_version` is an internal jscript variable only accessible within conditional compilation, that does not change with IE document mode.
		
		By default, IE11** and other browsers do not interpret conditional compilation, so this check is as follows:
		Number( new Function("")() ) -> Number(undefined) -> NaN
		Instead of for example IE9:
		Number( new Function("return '9'")() ) -> Number('9') -> 9
		
		** If IE11's documentMode has been changed from the default, `@_jscript_version` becomes exposed again, and returns "11". And
		"is_default_IE11" will return `false`. (Yep, textbook Microsoft)

		Values: IE6 / 7: "5.6" or "5.7", IE8: "5.8", IE9: "9", IE10: "10", IE11 alt-doc mode: "11", IE11 / NOT IE: `undefined`.
	*/

	if (!jscript_version) { return false }

	///  Workaround Test for Windows Service Pack Update (IE6 / 7). Document mode wasnt introduced until IE8, so this check works fine.
	if (jscript_version === 5.7 && !window.XMLHttpRequest) { jscript_version = 5.6 }

	envir = { jscript: jscript_version, mode: document.documentMode, is_default_IE11: is_default_IE11 };

	envir.browser = mapIE[ String(jscript_version) ] || jscript_version;

	envir[envir.browser] = (envir.browser == envir.mode); // we want to make sure if we're screening for IE.x as IE.x that its running as that with same doc mode

	return envir;

})(window, document);
