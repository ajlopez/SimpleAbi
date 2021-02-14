
const simpleabi = require('..');

exports['decode simple value'] = function (test) {
	const encoded = '0x' + simpleabi.encodeValue(1);
	
	const result = simpleabi.decodeValues(encoded);
	
	test.equal(result, 1);
}

exports['decode two simple values'] = function (test) {
	const encoded = '0x' + simpleabi.encodeValues([ 1, 2 ]);
	
	const result = simpleabi.decodeValues(encoded);
	
	test.equal(result.length, 2);
	test.equal(result[0], 1);
	test.equal(result[1], 2);
}

exports['decode values with types'] = function (test) {
	const encoded = '0x' + simpleabi.encodeValues([ 1, "hello", 2, 42 ]);
	
	const result = simpleabi.decodeValues(encoded, [ "uint256", "string", "uint256", "uint256" ]);
	
	test.equal(result.length, 4);
	test.equal(result[0], 1);
	test.equal(result[1], "hello");
	test.equal(result[2], 2);
	test.equal(result[3], 42);
}

exports['decode values with types with boolean true'] = function (test) {
	const encoded = '0x' + simpleabi.encodeValues([ 1, "hello", 2, 42 ]);
	
	const result = simpleabi.decodeValues(encoded, [ "bool", "string", "uint256", "uint256" ]);
	
	test.equal(result.length, 4);
	test.strictEqual(result[0], true);
	test.strictEqual(result[1], "hello");
	test.strictEqual(result[2], 2);
	test.strictEqual(result[3], 42);
}

exports['decode values with types with boolean false'] = function (test) {
	const encoded = '0x' + simpleabi.encodeValues([ 0, "hello", 2, 42 ]);
	
	const result = simpleabi.decodeValues(encoded, [ "bool", "string", "uint256", "uint256" ]);
	
	test.equal(result.length, 4);
	test.strictEqual(result[0], false);
	test.strictEqual(result[1], "hello");
	test.strictEqual(result[2], 2);
	test.strictEqual(result[3], 42);
}

exports['decode simple string value'] = function (test) {
	const encoded = '0x' + simpleabi.encodeValues([ "hello" ]);
	
	const result = simpleabi.decodeValues(encoded, [ "string" ]);

	test.strictEqual(result, "hello");
}

exports['decode long string value'] = function (test) {
	const str = "this is a very long string with more than 32 characters";
	
	const encoded = '0x' + simpleabi.encodeValues([ str ]);
	
	const result = simpleabi.decodeValues(encoded, [ "string" ]);

	test.strictEqual(result, str);
}

exports['decode empty string value'] = function (test) {
	const encoded = '0x' + simpleabi.encodeValues([ "" ]);
	
	const result = simpleabi.decodeValues(encoded, [ "string" ]);

	test.strictEqual(result, "");
}

exports['decode bytes value'] = function (test) {
	const encoded = '0x' + simpleabi.encodeValues([ "0x010203" ], [ "bytes" ]);
	
	const result = simpleabi.decodeValues(encoded, [ "bytes" ]);
    
    test.ok(result);
    test.ok(result instanceof Buffer);
    test.equal(result.length, 3);

	test.strictEqual(result.toString('hex'), '010203');
}

