
var simpleabi = require('..');

exports['encode integer'] = function (test) {
    var result = simpleabi.encodeValue(42);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64);
    test.equal(result, '000000000000000000000000000000000000000000000000000000000000002a');
};

exports['encode string'] = function (test) {
    var result = simpleabi.encodeValue("hello");
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 2);
    test.equal(result, '0000000000000000000000000000000000000000000000000000000000000005' + Buffer.from('hello').toString('hex') + '000000000000000000000000000000000000000000000000000000');
};

