/*
 * Created by philno.
 * 27.07.2017
 * 
 * This script will count your units on various overview screens, e.g. combined or commands overview.
 * Tribal wars premium account required!
 * Result/sum will be displayed at the bottom of the table.
 */

function main() {
	var table = document.getElementsByClassName('vis overview_table')[0];
	
	var movements = table.getElementsByTagName('tr');
	var units = [];
	
	var unitOffset = 0;
	
	for (var i=0; i < movements.length; i++) {
		/* get current unit row. */
		var currentUnits = movements[i].getElementsByClassName('unit-item');
		
		if (currentUnits == null || currentUnits.length == 0) {
			continue;
		}
		
		/* Save unit offset. */
		unitOffset = currentUnits[0].cellIndex;
		
		for (var k=0; k < currentUnits.length; k++) {
			/* make sure value is treated as a number. */
			var number = currentUnits[k].innerText * 1;
			
			/* add to overall sum. */
			if (units[k] == null) {
				units.push(number);
			} else {
				units[k] += number;
			}
		}
	}
	
	var entries = movements[0].getElementsByTagName('th').length;
	var output = '<tr>';
	var unitCounter = 0;
	for (var i=0; i < entries; i++) {
		var field = '';
		if (i < unitOffset || unitCounter >= units.length) {
			/* non-unit column. ignore. */
			
		} else {
			/* unit column. */
			field = units[unitCounter];
			unitCounter++;
		}
		
		output += '<td>' + field + '</td>';
	}
	output += '</tr>';
	/* append unit icons. */
	output += movements[0].outerHTML;
	
	/* append output. */
	table.getElementsByTagName('tbody')[0].id = 'commandsBody';
	$('#commandsBody').append(output);
	
	console.log('result:');
	console.log(units);
}
main()
