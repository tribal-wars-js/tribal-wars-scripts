/*
 * Created by philno.
 * 27.07.2017
 *
 * This script will send a part of your available defensive units as support.
 * Only works on place / rally point.
 * 1. Enter support destination.
 * 2. Execute script.
 * 3. Choose part of your defensive units to send (procentual).
 * 4. Script will automatically calculate and enter desired units.
 * 5. Confirm command.
 */

var form = document.getElementById('command-data-form');
/* get unit inputs. */
var units = form.getElementsByClassName('unitsInput');
/* customizable percent of total units. */
var perc = prompt('Enter percent of total units to send (decimal):', 0.5);

for (var i = 0; i < units.length; i++) {
	var unit = units[i];
	
	var name = unit.getAttribute('name');
	
	/* only send defensive units. */
	if ((name == 'spear') || (name == 'sword') || (name == 'archer') || (name == 'heavy')) {
		setUnits(unit, perc);
	} else if (name == 'knight') {
		setUnits(unit, 1);
	}
}

/* click support button. */
document.getElementById('target_support').click();

function setUnits(elem, percent) {
	/* get total / all unit count. */
	var count = elem.getAttribute('data-all-count');
	
	if (count == 0) {
		return;
	}
	count = count * percent;
	
	/* Floor value to make sure we get an integer. */
	elem.value = Math.floor(count);
}
