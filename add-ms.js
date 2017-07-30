/*

	Will add miliseconds to the page
*/

function setMS() {
    var element = document.getElementById("serverTime");
    var time = element.innerHTML.match(/^\d+\:\d+\:\d+/);
    var date = new Date();
    var ms = (date.getMilliseconds()).toString();
    while (ms.length < 3) {
        ms = "0" + ms;
    };
    element.innerHTML = time + ":" + ms;
}(function main() {
    window.setInterval(setMS, 1);
})();