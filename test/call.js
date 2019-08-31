
const simpleabi = require('..');
const keccak256 = require('../lib/sha3').keccak_256;

exports['encode function call without arguments'] = function (test) {
    const result = simpleabi.encodeCall('increment()');
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 8);
    test.equal(result, keccak256('increment()').substring(0, 8));
};

exports['encode call with integer values'] = function (test) {
    var result = simpleabi.encodeCall('add(uint256,uint256,uint256)', [ 1, 2, 3 ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 8 + 64 * 3);
    test.equal(result, 
        keccak256('add(uint256,uint256,uint256)').substring(0, 8)
        + '000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003');
};

exports['encode call with string value'] = function (test) {
    var result = simpleabi.encodeCall('setMessage(string)', [ "hello" ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 8 + 64 * 3);
    test.equal(result, 
        keccak256('setMessage(string)').substring(0, 8)
		+ '0000000000000000000000000000000000000000000000000000000000000020'
		+ '0000000000000000000000000000000000000000000000000000000000000005'
		+ simpleabi.stringToBuffer('hello').toString('hex') + '000000000000000000000000000000000000000000000000000000');
};

exports['encode call with hexadecimal string value'] = function (test) {
    var result = simpleabi.encodeCall('setManager(address)', [ "0x01020304" ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 8 + 64);
    test.equal(result, 
        keccak256('setManager(address)').substring(0, 8)
		+ '0000000000000000000000000000000000000000000000000000000001020304');
};

exports['encode call with numeric string value as string'] = function (test) {
    var result = simpleabi.encodeCall('setMessage(string)', [ "42" ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 8 + 64 * 3);
    test.equal(result, 
        keccak256('setMessage(string)').substring(0, 8)
		+ '0000000000000000000000000000000000000000000000000000000000000020'
		+ '0000000000000000000000000000000000000000000000000000000000000002'
		+ '3432000000000000000000000000000000000000000000000000000000000000');
};

