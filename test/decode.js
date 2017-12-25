
var simpleabi = require('..');

exports['decode simple value'] = function (test) {
	var encoded = '0x' + simpleabi.encodeValue(1);
	
	var result = simpleabi.decodeValues(encoded);
	
	test.equal(result, 1);
}

exports['decode two simple values'] = function (test) {
	var encoded = '0x' + simpleabi.encodeValues([1,2]);
	
	var result = simpleabi.decodeValues(encoded);
	
	test.equal(result.length, 2);
	test.equal(result[0], 1);
	test.equal(result[1], 2);
}

