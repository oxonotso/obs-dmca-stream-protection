// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
var urlParams;
(function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

var dateTimeText = document.getElementById("dateTimeText");
if (urlParams["style"]) dateTimeText.setAttribute("style", urlParams["style"]);
if (urlParams["bodyStyle"]) document.body.setAttribute("style", urlParams["bodyStyle"]);

var c;
setInterval(
c = function() {
    dateTimeText.innerText = moment().format(urlParams["format"] || '');
}, 1000);

function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                console.log("readyState complete at last");
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            console.log("onload and others")
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
//https://raw.githubusercontent.com/oxonotso/obs-dmca-stream-protection/master/js/moment.min.js
loadScript("js/moment-with-locales.min.js", function(){
  console.log("collected lattest bugfix :(. todo? make a version check ...")//initialization code
  c();
});
console.log("here");
