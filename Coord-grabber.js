/*
	Grabs coordinates from map
*/

var win = (window.frames.length > 0) ? window.main : window;
var coords = [];
var outputID = 'villageList';
var encodeID = 'cbBBEncode';
var isEncoded = true;

function fnClean() {
coords = [ ];
fnRefresh();
}

function fnRefresh() {
win.$('#' + outputID).prop('value', coords.map(function (e) {
return isEncoded ? '[coord]' + e + '[/coord]' : e;
}).join(isEncoded ? 'n' : ' '));
}
win.$(win.document).ready(function () {
if (win.$('#' + outputID).length <= 0) {
if (win.game_data.screen == 'map') {
var srcHTML = '<div id="coord_picker">' /*+ '<span style="color:blue;text-decoration:underline;">dalesmckay's co-ordinate picker v7.1:</span><br/><br/>'*/ +
'<input type="checkbox" id="cbBBEncode" onClick="isEncoded=this.checked;fnRefresh();"' + (isEncoded ? 'checked' : '') + '/>BB-Codes' +
'<a href="javascript:void(0);" onclick="fnClean();"> Limpar<br/></a>' +
'<textarea id="' + outputID + '" cols="40" rows="10" value="" onFocus="this.select();"/>' +
'</div>';
ele = win.$('.minimap_container').after(win.$(srcHTML));
win.TWMap.map._handleClick = function (e) {
if (this.mover && this.mover.moveDirty) return false;
var pos = this.coordByEvent(e);
var coord = pos.join("|");
var ii = coords.indexOf(coord);
if (ii >= 0) {
coords.splice(ii, 1);
} else {
coords.push(coord);
}
fnRefresh();
return false;
};
} else {
alert("Dit script werkt op de kaart.nnRedirecting now...");
self.location = win.game_data.link_base_pure.replace(/screen=w*/i, "screen=map");
}
}
});

void(0);