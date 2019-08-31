
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
if (Number.MAX_SAFE_INTEGER === undefined)
    Number.MAX_SAFE_INTEGER = 9007199254740991;

const maxhexadigits = Number.MAX_SAFE_INTEGER.toString(16).length;

// https://stackoverflow.com/questions/1877475/repeat-character-n-times
const maxinteger = parseInt('1' + Array(maxhexadigits).join('0'), 16);

function stringToBuffer(str, encoding) {
    if (Buffer.from)
        return Buffer.from(str, encoding);
        
    return new Buffer(str, encoding);
}

function normalizeHexaString(str) {
	if (str.substring(0, 2) === '0x')
		return str.substring(2);
	
	return str;
}

function isDigit(digit) {
    return digit >= '0' && digit <= '9';
}

function isInteger(digits) {
    for (let k = 0, l = digits.length; k < l; k++)
        if (!isDigit(digits[k]))
            return false;
        
    return true;
}

function isSafeInteger(digits) {
    let p;
    
	for (p = 0; p < digits.length; p++)
		if (digits[p] != '0')
			break;
		
	return digits.length - p < maxhexadigits;
}

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
	
    const length = fillLeftTo64(value.length.toString(16));
    const encoded = fillRightTo64(stringToBuffer(value).toString('hex'));
    
    return length + encoded;
}

function encodeBytesValue(buffer) {
    const length = fillLeftTo64(buffer.length.toString(16));
    const encoded = fillRightTo64(buffer.toString('hex'));
    
    return length + encoded;
}

function encodeNegativeInteger(value) {
	const newvalue = maxinteger + value;
	return fillLeftTo64(newvalue.toString(16), 'f');
}

function encodeArray(value) {
	const length = fillLeftTo64(value.length.toString(16));
	const encoded = [];
	
	for (var n in value)
		encoded.push(encodeValue(value[n]));
	
	return length + encoded.join('');
}

function encodeValue(value, type) {
    if (type)
        return encodeValueWithType(value, type);
    
    if (typeof value === 'string') {
        if (isInteger(value))
            return encodeValue(parseInt(value));
        
        return encodeStringValue(value);
    }
    
    if (value instanceof Buffer)
        return encodeBytesValue(value);
    
	if (Array.isArray(value))
		return encodeArray(value);
	
	if (value < 0)
		return encodeNegativeInteger(value);
	
  	const encoded = value.toString(16);

    return fillLeftTo64(encoded);
}

function encodeValueWithType(value, type) {
    if (type === 'string')
        return encodeStringValue(value.toString());
    
    if (type === 'bytes') {
        if (value.substring(0, 2).toLowerCase() === '0x')
            value = value.substring(2);
        
        const bytes = stringToBuffer(value, 'hex');
        
        return encodeValue(bytes);
    }
    
    return encodeValue(value);
}

function encodeValues(values, types) {
    if (types)
        return encodeValuesWithTypes(values, types);
    
	const encoded = [];
	
	for (var n in values)
		encoded.push(encodeValue(values[n]));
	
	let result = '';
	let extend = '';
	
	for (var n in encoded)
		if (encoded[n].length === 64)
			result += encoded[n];
		else {
			result += fillLeftTo64((values.length * 32 + Math.floor(extend.length / 2)).toString(16));
			extend += encoded[n];
		}
		
	return result + extend;
}

function encodeValuesWithTypes(values, types) {
	const encoded = [];
	
	for (var n in values)
		encoded.push(encodeValue(values[n], types[n]));
	
	let result = '';
	let extend = '';
	
	for (var n in encoded)
		if (encoded[n].length === 64)
			result += encoded[n];
		else {
			result += fillLeftTo64((values.length * 32 + Math.floor(extend.length / 2)).toString(16));
			extend += encoded[n];
		}
		
	return result + extend;
}

function splitValues(values) {
	var splits = [];
	
	for (let k = 0; k < values.length; k += 64)
		splits.push(values.substring(k, k + 64));
	
	return splits;
}

function decodeSplittedStringValue(index, splits) {
	const offset = Math.floor(parseInt('0x' + splits[index], 16) / 32);
	const length = parseInt('0x' + splits[offset], 16);
	
	const nsplits = Math.ceil(length / 32);
	
	const data = splits.slice(offset + 1, offset + 1 + nsplits).join('').substring(0, length * 2);
	
	return stringToBuffer(data, 'hex').toString();
}

function decodeValuesWithTypes(str, types) {
	const value = normalizeHexaString(str);

	const splits = splitValues(value);
	
	const result = [];
	
	for (var n in types)
		if (types[n] === 'string')
			result.push(decodeSplittedStringValue(n, splits));
		else if (types[n] === 'bool')
			result.push(asSafeInteger(splits[n]) != 0);
		else if (isSafeInteger(splits[n]))
			result.push(parseInt('0x' + splits[n], 16));
		else
			result.push('0x' + splits[n]);
	
	if (result.length === 1)
		return result[0];
	
	return result;
}

function decodeValues(str, types) {
	if (types)
		return decodeValuesWithTypes(str, types);
	
	const value = normalizeHexaString(str);
	
	if (value.length <= 64)
		return '0x' + value;

	const splits = splitValues(value);
	
	for (let n in splits)
		if (isSafeInteger(splits[n]))
			splits[n] = parseInt('0x' + splits[n], 16);
		else
			splits[n] = '0x' + splits[n];
	
	return splits;
}

function asSafeInteger(str) {
	const value = normalizeHexaString(str);
	
	if (!isSafeInteger(value))
		return str;
	
	return parseInt('0x' + value, 16);
}

module.exports = {
    encodeValue: encodeValue,
	encodeValues: encodeValues,
	decodeValues: decodeValues,
	asSafeInteger: asSafeInteger,
    stringToBuffer: stringToBuffer
};

