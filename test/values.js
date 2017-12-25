
var simpleabi = require('..');

exports['encode integer values'] = function (test) {
    var result = simpleabi.encodeValues([ 1, 2, 3 ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 3);
    test.equal(result, '000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003');
};

