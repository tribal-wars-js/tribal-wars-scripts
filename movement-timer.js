/*
 * Created by philno
 * 27.07.2017
 * 
 * Will try to send unit movements / commands at the specified time.
 * The script does NOT check if you need to relog. No guarantees for accuracy.
 * You want to send the attack via place, not in the map popup!
 * You need to be on the confirm screen (script will only click 'OK' to send the movement/command).
 */

var sendAt;
var baseInterval;
var precInterval;
var utc_diff = server_utc_diff * 1000;
var counter = -1;
var offset = 20;

function main() {
    let now = getNow();
    console.log(now);

    let date = new Date(Date.now() + utc_diff);
    date = date.toISOString().replace('T', ' ').replace('Z', '');
    sendAt = prompt('Send movement at (YYYY-MM-DD hh:mm:ss.SSS):', date);
    if (sendAt == null || sendAt.length < 7) {
        return;
    }
    // make sure date is parsed as UTC.
    let sendAtString = sendAt;
    sendAt += 'Z';
    sendAt = new Date(new Date(sendAt).getTime() - Timing.offset_to_server - (offset / 2));
    console.log(sendAt);


    let millis = sendAt - now;
    console.log('Will be sent in (minutes): ' + (millis / 1000 / 60));
    baseInterval = setInterval(timeBase, 2000);

    if (baseInterval) {
        var fragment = createElem('<h3>Movement will be sent at ' + sendAtString + ' </h3><a id="workingIndicator"></a>');
        document.getElementById('content_value').appendChild(fragment);
    }
}
main();

function timeBase() {
    let now = getNow();
    let diff = sendAt - now;

    if (diff <= 6000) {
        // enter high precision mode.
        clearInterval(baseInterval);
        document.getElementById('workingIndicator').innerHTML = 'High precision mode active.';
        precInterval = setInterval(timeAccurate, offset);
        return;
    }

    if (document.getElementById('workingIndicator')) {
        if (counter == 0) {
            document.getElementById('workingIndicator').innerHTML = '.';
        } else if (counter == 1) {
            document.getElementById('workingIndicator').innerHTML = '..';
        } else if (counter >= 2) {
            document.getElementById('workingIndicator').innerHTML = '...';
            counter = -1;
        }
        counter++;
    }
}

function timeAccurate() {
    let now = getNow();
    let diff = sendAt - now;

    if (diff <= 0) {
        sendMovement();
        clearInterval(precInterval);
    }
}

function sendMovement() {
    document.getElementById('troop_confirm_go').click();
}

function getNow() {
    return new Date(Timing.getCurrentServerTime() + utc_diff);
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
