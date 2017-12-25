
var simpleabi = require('..');

exports['encode integer values'] = function (test) {
    var result = simpleabi.encodeValues([ 1, 2, 3 ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 3);
    test.equal(result, '000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003');
};

exports['encode string value'] = function (test) {
    var result = simpleabi.encodeValues([ "hello" ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 3);
    test.equal(result, 
		'0000000000000000000000000000000000000000000000000000000000000020'
		+ '0000000000000000000000000000000000000000000000000000000000000005'
		+ Buffer.from('hello').toString('hex') + '000000000000000000000000000000000000000000000000000000');
};

exports['encode two string value'] = function (test) {
    var result = simpleabi.encodeValues([ "hello", "world" ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 6);
    test.equal(result, 
		'0000000000000000000000000000000000000000000000000000000000000040'
		+ '0000000000000000000000000000000000000000000000000000000000000080'
		+ '0000000000000000000000000000000000000000000000000000000000000005'
		+ Buffer.from('hello').toString('hex') + '000000000000000000000000000000000000000000000000000000'
		+ '0000000000000000000000000000000000000000000000000000000000000005'
		+ Buffer.from('world').toString('hex') + '000000000000000000000000000000000000000000000000000000');
};
