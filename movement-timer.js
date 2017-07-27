/*
 * Created by philno
 * 27.07.2017
 * 
 * Will try to send unit movements / commands at the specified time.
 * The script does NOT check if you need to relog. No guarantees for accuracy.
 * You need to be on the confirm screen (script will only click 'OK' to send the movement/command).
 */

var sendAt;
var counter;
var interval;

function main() {
	sendAt = prompt('Send attack at (hh:mm:ss):');
	if (sendAt == null || sendAt.length != 8) {
		return;
	}
	counter = -10;
	interval = setInterval(autoTime, 100);
	if (interval) {
		var fragment = createElem('<h3>Movement will be sent at ' + sendAt + ' </h3><a id="workingIndicator"></a>');
		document.getElementById('content_value').appendChild(fragment);
	}
}
main();

function autoTime() {
	var now = document.getElementById('serverTime').innerText;
	if (now == sendAt) {
		document.getElementById('troop_confirm_go').click();
		clearInterval(interval);
		return;
	}
	
	if (document.getElementById('workingIndicator')) {
		if (counter == 0) {
			document.getElementById('workingIndicator').innerHTML = '.';
		} else if (counter == 10) {
			document.getElementById('workingIndicator').innerHTML = '..';
		} else if (counter >= 20) {
			document.getElementById('workingIndicator').innerHTML = '...';
			counter = -10;
		}

		counter++;
	}
}

function createElem(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
