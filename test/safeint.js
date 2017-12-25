
var simpleabi = require('..');

exports['one as safe integer'] = function (test) {
	var result = simpleabi.asSafeInteger('0x' + simpleabi.encodeValue(1));
	
	test.strictEqual(result, 1);
}

exports['one million as safe integer'] = function (test) {
	var result = simpleabi.asSafeInteger('0x' + simpleabi.encodeValue(1000000));
	
	test.strictEqual(result, 1000000);
}

exports['big number is not a safe integer'] = function (test) {
	var number = '0x1000000000000000000000';
	var result = simpleabi.asSafeInteger(number);
	
	test.strictEqual(result, number);
}
