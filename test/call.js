
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
