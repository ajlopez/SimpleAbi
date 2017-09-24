
function fillLeftTo64(str) {
	if (str.length % 2)
		str = '0' + str;
	
	while (str.length % 64)
		str = '00' + str;
	
	return str;
}

function fillRightTo64(str) {
	if (str.length % 2)
		str += '0';
	
	while (str.length % 64)
		str += '00';
	
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

function encodeValue(value) {
    if (typeof value === 'string')
        return encodeStringValue(value);
    
    if (value instanceof Buffer)
        return encodeBytesValue(value);
    
  	var encoded = value.toString(16);

    return fillLeftTo64(encoded);
}

module.exports = {
    encodeValue: encodeValue
};

