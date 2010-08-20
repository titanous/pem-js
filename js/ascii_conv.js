/*
 * JavaScript ASCII Converter
 *
 * useage: have a form with text inputstrs named "chars", "dec", "hex", "bin" and
 * "delimiter". on suitable events call from_char(), from_dec(), from_hex() or
 * from_bin() with the form as the only argument.
 *
 * TPO 2001/2004
 *
 * Modified Feb 2009 by Tim Stamp (timstamp.co.uk) to remove dependencies
 *  on traditional HTML-style form naming and referencing conventions
 * and redeveloped code to cope with and correctly translate unprintable characters
 * Also modified to parse Hexadecimal strings regardless of separators being used.
 *
 * Each function is now self-dependant, no external module is used, making copying
 * and pasting functions where necessary much simpler.
 */

function hex_from_dec(inputstr, delimiter) {
	var outputstr = '';
	var hex = "0123456789abcdef";
	hex = hex.split('');
	inputstr = inputstr.replace(/[^0-9]/g, ',');
	inputstr = inputstr.replace(/,0*/g, ',');
	inputstr = inputstr.replace(/,,*/g, ',');
	inputstr = inputstr.split(',');
	for(var i=0; i<inputstr.length; i++) {
		if(i > 0) outputstr += delimiter;
		if(!delimiter && i % 32 == 0 && i > 0) outputstr += '\n';
		var n = parseInt(inputstr[i]);
		outputstr += hex[(n >> 4) & 0xf] + hex[n & 0xf];
	}
	return outputstr;
}

function hex_from_oct(inputstr, delimiter) {
	var outputstr = '';
	var hex = "0123456789abcdef";
	hex = hex.split('');
	inputstr = inputstr.replace(/[^0-9]/g, ',');
	inputstr = inputstr.replace(/,0*/g, ',');
	inputstr = inputstr.replace(/,,*/g, ',');
	inputstr = inputstr.split(',');
	for(var i=0; i<inputstr.length; i++) {
		if(i > 0) outputstr += delimiter;
		if(!delimiter && i % 32 == 0 && i > 0) outputstr += '\n';
		var n = parseInt(inputstr[i], 8);
		outputstr += hex[(n >> 4) & 0xf] + hex[n & 0xf];
	}
	return outputstr;
}

function chars_from_hex(inputstr, delimiter) {
	var outputstr = '';
	inputstr = inputstr.replace(/^(0x)?/g, '');
	inputstr = inputstr.replace(/[^A-Fa-f0-9]/g, '');
	inputstr = inputstr.split('');
	for(var i=0; i<inputstr.length; i+=2) {
		outputstr += String.fromCharCode(parseInt(inputstr[i]+''+inputstr[i+1], 16));
	}
	return outputstr;
}

function hex_from_chars(inputstr, delimiter) {
	var outputstr = '';
	var hex = "0123456789abcdef";
	hex = hex.split('');
	var i, n;
	var inputarr = inputstr.split('');
	for(var i=0; i<inputarr.length; i++) {
		if(i > 0) outputstr += delimiter;
		if(!delimiter && i % 32 == 0 && i > 0) outputstr += '\n';
		n = inputstr.charCodeAt(i);
		outputstr += hex[(n >> 4) & 0xf] + hex[n & 0xf];
	}
	return outputstr;
}

function dec_from_hex(inputstr,delimiter) {
	var outputstr = '';
	if(!delimiter) delimiter = ' ';
    inputstr = inputstr.replace(/^(0x)?/g, '');
	inputstr = inputstr.replace(/[^A-Fa-f0-9]/g, '');
	inputstr = inputstr.split('');
	for(var i=0; i<inputstr.length; i+=2) {
        if(i > 0) outputstr += delimiter;
		outputstr += parseInt(inputstr[i]+''+inputstr[i+1], 16);
	}
	return outputstr;
}

function oct_from_hex(inputstr,delimiter) {
	var outputstr = '';
	if(!delimiter) delimiter = ' ';
    inputstr = inputstr.replace(/^(0x)?/g, '');
	inputstr = inputstr.replace(/[^A-Fa-f0-9]/g, '');
	inputstr = inputstr.split('');
	var hexstr = "";
	for(var i=0; i<inputstr.length; i+=2) {
        if(i > 0) outputstr += delimiter;
		hexstr = parseInt(inputstr[i]+''+inputstr[i+1], 16);
		outputstr += hexstr.toString(8);
	}
	return outputstr;
}

function bin_from_hex(inputstr, delimiter) {
	var outputstr = '';
    inputstr = inputstr.replace(/^(0x)?/g, '');
	inputstr = inputstr.replace(/[^A-Fa-f0-9]/g, '');
	inputstr = inputstr.split('');
	for(var i=0; i<inputstr.length; i+=2) {
        if(i > 0) outputstr += delimiter;
		if(!delimiter && i % 8 == 0 && i > 0) outputstr += '\n';
		var n = parseInt(inputstr[i]+''+inputstr[i+1], 16);
		n = n.toString(2);
 		while(n.length<8) n='0'+n;
		outputstr += n;
	}
	return outputstr;
}

function hex_from_bin(inputstr, delimiter){
	var outputstr = '';
	var hex = "0123456789abcdef";
	hex = hex.split('');
	inputstr = inputstr.replace(/[^0-1]/g, ',');
	inputstr = inputstr.replace(/,,*/g, ',');
	inputstr = inputstr.split(',');
	for (var i in inputstr) {
		if(i > 0) outputstr += delimiter;
		if(!delimiter && c % 32 == 0 && c > 0) outputstr += '\n';
		var n = parseInt(inputstr[i], 2);
		outputstr += hex[(n >> 4) & 0xf] + hex[n & 0xf];
	}
	return outputstr;
}