
const simpleabi = require('..');
const keccak256 = require('../lib/sha3').keccak_256;

exports['encode function call without arguments'] = function (test) {
    const result = simpleabi.encodeCall('increment()');
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 8);
    test.equal(result, keccak256('increment()').substring(0, 8));
};

