
var maxhexadigits = Number.MAX_SAFE_INTEGER.toString(16).length;
var maxinteger = parseInt('1' + Array(maxhexadigits - 1).join('0'), 16);


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

function encodeValue(value) {
    if (typeof value === 'string')
        return encodeStringValue(value);
    
    if (value instanceof Buffer)
        return encodeBytesValue(value);
    
	if (value < 0)
		return encodeNegativeInteger(value);
	
  	var encoded = value.toString(16);

    return fillLeftTo64(encoded);
}

module.exports = {
    encodeValue: encodeValue
};

