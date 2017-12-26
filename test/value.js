
var simpleabi = require('..');

exports['encode integer'] = function (test) {
    var result = simpleabi.encodeValue(42);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64);
    test.equal(result, '000000000000000000000000000000000000000000000000000000000000002a');
};

exports['encode negative integer'] = function (test) {
    var result = simpleabi.encodeValue(-1);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64);
    test.equal(result, 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
};

exports['encode negative integer two'] = function (test) {
    var result = simpleabi.encodeValue(-2);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64);
    test.equal(result, 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe');
};

exports['encode string'] = function (test) {
    var result = simpleabi.encodeValue("hello");
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 2);
    test.equal(result, '0000000000000000000000000000000000000000000000000000000000000005' + simpleabi.stringToBuffer('hello').toString('hex') + '000000000000000000000000000000000000000000000000000000');
};

exports['encode hexadecimal string'] = function (test) {
    var result = simpleabi.encodeValue("0x0102");
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64);
    test.equal(result, '0000000000000000000000000000000000000000000000000000000000000102');
};

exports['encode bytes'] = function (test) {
    var bytes = simpleabi.stringToBuffer('123456', 'hex');
    var result = simpleabi.encodeValue(bytes);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 2);
    test.equal(result, '00000000000000000000000000000000000000000000000000000000000000031234560000000000000000000000000000000000000000000000000000000000');
};

exports['encode integer array'] = function (test) {
    var result = simpleabi.encodeValue([ 1, 2, 3 ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 4);
    test.equal(result, '0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003');
};

