
var simpleabi = require('..');

exports['decode simple value'] = function (test) {
	var encoded = '0x' + simpleabi.encodeValue(1);
	
	var result = simpleabi.decodeValues(encoded);
	
	test.equal(result, 1);
}

