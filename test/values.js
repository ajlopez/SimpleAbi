
const simpleabi = require('..');

exports['encode integer values'] = function (test) {
    const result = simpleabi.encodeValues([ 1, 2, 3 ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 3);
    test.equal(result, '000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003');
};

exports['encode string value'] = function (test) {
    const result = simpleabi.encodeValues([ "hello" ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 3);
    test.equal(result, 
		'0000000000000000000000000000000000000000000000000000000000000020'
		+ '0000000000000000000000000000000000000000000000000000000000000005'
		+ simpleabi.stringToBuffer('hello').toString('hex') + '000000000000000000000000000000000000000000000000000000');
};

exports['encode hexadecimal string value'] = function (test) {
    const result = simpleabi.encodeValues([ "0x01020304" ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64);
    test.equal(result, 
		'0000000000000000000000000000000000000000000000000000000001020304');
};

exports['encode numeric string value as string'] = function (test) {
    const result = simpleabi.encodeValues([ "42" ], [ 'string' ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 3);
    test.equal(result, 
		  '0000000000000000000000000000000000000000000000000000000000000020'
		+ '0000000000000000000000000000000000000000000000000000000000000002'
		+ '3432000000000000000000000000000000000000000000000000000000000000');
};

exports['encode numeric string value as unsigned integer'] = function (test) {
    const result = simpleabi.encodeValues([ "42" ], [ 'uint256' ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64);
    test.equal(result, 
		  '000000000000000000000000000000000000000000000000000000000000002a');
};

exports['encode two numeric strings value as string'] = function (test) {
    const result = simpleabi.encodeValues([ "42", "1" ], [ 'string', 'string' ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 6);
    test.equal(result, 
		  '0000000000000000000000000000000000000000000000000000000000000040'
		+ '0000000000000000000000000000000000000000000000000000000000000080'
		+ '0000000000000000000000000000000000000000000000000000000000000002'
		+ '3432000000000000000000000000000000000000000000000000000000000000'
		+ '0000000000000000000000000000000000000000000000000000000000000001'
		+ '3100000000000000000000000000000000000000000000000000000000000000');
};

exports['encode hexadecimal string as bytes'] = function (test) {
    const result = simpleabi.encodeValues([ '0x123456' ], [ 'bytes' ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 3);
    test.equal(result, 
		'0000000000000000000000000000000000000000000000000000000000000020'
		+ '0000000000000000000000000000000000000000000000000000000000000003'
		+ '1234560000000000000000000000000000000000000000000000000000000000');
};

exports['encode hexadecimal string as bytes<n>'] = function (test) {
	const value = '0x123456789abcdef0123456789abcdef0123456789abcdef0';
    
    for (let k = 1; k <= 32; k++) {
        const result = simpleabi.encodeValues([ value ], [ 'bytes' + k ]);
        
        test.ok(result);
        test.equal(typeof result, 'string');
        test.equal(result.length, 64);
        test.equal(result, 
            (value.substring(2, 2 + k * 2) + '00000000000000000000000000000000000000000000000000000000000000000000').substring(0, 64));
    }
};

exports['encode number as bytes<n>'] = function (test) {
	const value = 1;
    
    for (let k = 1; k <= 32; k++) {
        const result = simpleabi.encodeValues([ value ], [ 'bytes' + k ]);
        
        test.ok(result);
        test.equal(typeof result, 'string');
        test.equal(result.length, 64);
        test.equal(result, 
            ('01' + '00000000000000000000000000000000000000000000000000000000000000000000').substring(0, 64));
    }
};

exports['encode two string value'] = function (test) {
    const result = simpleabi.encodeValues([ "hello", "world" ]);
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 64 * 6);
    test.equal(result, 
		'0000000000000000000000000000000000000000000000000000000000000040'
		+ '0000000000000000000000000000000000000000000000000000000000000080'
		+ '0000000000000000000000000000000000000000000000000000000000000005'
		+ simpleabi.stringToBuffer('hello').toString('hex') + '000000000000000000000000000000000000000000000000000000'
		+ '0000000000000000000000000000000000000000000000000000000000000005'
		+ simpleabi.stringToBuffer('world').toString('hex') + '000000000000000000000000000000000000000000000000000000');
};

