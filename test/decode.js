
var simpleabi = require('..');

exports['decode simple value'] = function (test) {
	var encoded = '0x' + simpleabi.encodeValue(1);
	
	var result = simpleabi.decodeValues(encoded);
	
	test.equal(result, 1);
}

exports['decode two simple values'] = function (test) {
	var encoded = '0x' + simpleabi.encodeValues([ 1, 2 ]);
	
	var result = simpleabi.decodeValues(encoded);
	
	test.equal(result.length, 2);
	test.equal(result[0], 1);
	test.equal(result[1], 2);
}

exports['decode values with types'] = function (test) {
	var encoded = '0x' + simpleabi.encodeValues([ 1, "hello", 2, 42 ]);
	
	var result = simpleabi.decodeValues(encoded, [ "uint256", "string", "uint256", "uint256" ]);
	
	test.equal(result.length, 4);
	test.equal(result[0], 1);
	test.equal(result[1], "hello");
	test.equal(result[2], 2);
	test.equal(result[3], 42);
}

exports['decode simple string value'] = function (test) {
	var encoded = '0x' + simpleabi.encodeValues([ "hello" ]);
	
	var result = simpleabi.decodeValues(encoded, [ "string" ]);

	test.strictEqual(result, "hello");
}

