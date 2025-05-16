window.isIE = (function() {
    var is_default_IE11 = !!(window.msCrypto && !document.currentScript);
    var jscript_version = +(function() {
        try {return is_default_IE11 ? 11 : new Function('/*@cc_on return @_jscript_version; @*\/')()} catch(e){}
    })();

    // Workaround Test for Windows Service Pack Update (IE6 / 7). Document mode wasnt introduced until IE8, so this check works fine.
    if (jscript_version === 5.7 && !window.XMLHttpRequest) { jscript_version = 5.6 }
    if (!jscript_version) { return false }

    var ieMap = { '5': 5, '5.5': 5.5, '5.6': 6, '5.7': 7, '5.8': 8, '9': 9, '10': 10, '11': 11 };
    var envir = { 
        'jscript': jscript_version, 'mode': document.documentMode, 'is_default_IE11': is_default_IE11,
        'browser': (ieMap[jscript_version] || jscript_version)
    };

    envir[envir.browser] = (envir.browser == envir.mode); // Make sure if we're screening for IE.x as IE.x that its running as that with same document mode

    return envir;
})();
