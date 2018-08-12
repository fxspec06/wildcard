if (deviceType == "iOS") {
    console = new Object();
    console.log = function(log) {
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src","ios-log:#iOS#" + log);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }
    console.debug = console.log;
    console.info = console.log;
    console.warn = console.log;
    console.error = console.log;
}

if (deviceType == "webOS" && typeof enyo == "undefined") {
    location = "./requiresEnyo.html";
}

var oceanScroller, skyScroller, leadersScroller;

loadGame = function() {
    oceanScroller = new iScroll('chatScroller', {
                                vScrollbar : false,
                                hScroll : false
                                });
    skyScroller = new iScroll('chatScroller2', {
                              vScrollbar : false,
                              hScroll : false
                              });
    leadersScroller = new iScroll('leadersScroller', {
                                  vScrollbar : false,
                                  hScroll : false
                                  });
    if (deviceType == "webOS") {
        enyoComponentz = new enyoComponents().renderInto(document.getElementById("invisible"));
    }
    StageAssistant.prototype.setup();
}
loadGame();
