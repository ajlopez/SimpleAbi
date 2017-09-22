
function fillLeftTo64(str) {
	if (str.length % 1)
		str = '0' + str;
	
	while (str.length % 64)
		str = '00' + str;
	
	return str;
}

function encodeValue(value) {
  	var encoded = value.toString(16);

    return fillLeftTo64(encoded);
}

module.exports = {
    encodeValue: encodeValue
};

