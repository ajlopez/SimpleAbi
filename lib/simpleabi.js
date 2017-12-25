
var maxhexadigits = Number.MAX_SAFE_INTEGER.toString(16).length;
var maxinteger = parseInt('1' + Array(maxhexadigits).join('0'), 16);


function fillLeftTo64(str, digit) {
	digit = digit == null ? '0' : digit;
	digit2 = digit + digit;
	
	if (str.length % 2)
		str = digit + str;
	
	while (str.length % 64)
		str = digit2 + str;
	
	return str;
}

function fillRightTo64(str, digit) {
	digit = digit == null ? '0' : digit;
	digit2 = digit + digit;
	
	if (str.length % 2)
		str += digit;
	
	while (str.length % 64)
		str += digit2;
	
	return str;
}

function encodeStringValue(value) {
	if (value.substring(0, 2) === '0x')
		return fillLeftTo64(value.substring(2));
	
    var length = fillLeftTo64(value.length.toString(16));
    var encoded = fillRightTo64(Buffer.from(value).toString('hex'));
    
    return length + encoded;
}

function encodeBytesValue(buffer) {
    var length = fillLeftTo64(buffer.length.toString(16));
    var encoded = fillRightTo64(buffer.toString('hex'));
    
    return length + encoded;
}

function encodeNegativeInteger(value) {
	var newvalue = maxinteger + value;
	return fillLeftTo64(newvalue.toString(16), 'f');
}

function encodeArray(value) {
	var length = fillLeftTo64(value.length.toString(16));
	var encoded = [];
	
	for (var n in value)
		encoded.push(encodeValue(value[n]));
	
	return length + encoded.join('');
}

function encodeValue(value) {
    if (typeof value === 'string')
        return encodeStringValue(value);
    
    if (value instanceof Buffer)
        return encodeBytesValue(value);
    
	if (Array.isArray(value))
		return encodeArray(value);
	
	if (value < 0)
		return encodeNegativeInteger(value);
	
  	var encoded = value.toString(16);

    return fillLeftTo64(encoded);
}

function encodeValues(values) {
	var encoded = [];
	
	for (var n in values)
		encoded.push(encodeValue(values[n]));
	
	var result = '';
	var extend = '';
	
	for (var n in encoded)
		if (encoded[n].length === 64)
			result += encoded[n];
		else {
			result += fillLeftTo64((values.length * 32 + Math.floor(extend.length / 2)).toString(16));
			extend += encoded[n];
		}
		
	return result + extend;
}

module.exports = {
    encodeValue: encodeValue,
	encodeValues: encodeValues
};

