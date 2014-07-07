'use strict';

var exec = require('child_process').exec;
var dirtohash = require('../lib/dirtohash.js');


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var newDir = 'testDir2';
var newHash = {
  _type: 'dir',
  _path: 'test/testDir',
  testDir: {
    _type: 'dir',
    _path: 'test/testDir',
    'example.txt': {
      _type: 'file',
      _path: 'test/testDir',
      _contents: 'This is example 1.\n'
    },
    'example2.md': {
      _type: 'file',
      _path: 'test/testDir',
      _contents: 'This is example 2.\n'
    }
  }
};
exports.dirtohash = {
  setUp: function(done) {
    // setup here
    done();
  },
  tearDown: function(done) {
    exec('rm -rf test/' + newDir, function(err, out) {
      console.log(out);
      if (err) {
        console.log(err);
      }
      done();
    });
  },
  'dirToHash': function(test) {
    test.expect(1);
    // tests here
    test.deepEqual(dirtohash.dirToHash('test/testDir'), newHash, 'should be able to read tree to hash.');
    test.done();
  },
  'hashToDir': function(test) {
    test.expect(1);
    // tests here

    var newHash = {
      _type: 'dir',
      _path: 'test/testDir2',
      testDir: {
        _type: 'dir',
        _path: 'test/testDir2',
        'example.txt': {
          _type: 'file',
          _path: 'test/testDir2/testDir',
          _contents: 'This is example 1.\n'
        },
        'example2.md': {
          _type: 'file',
          _path: 'test/testDir2/testDir',
          _contents: 'This is example 2.\n'
        }
      }
    };
    console.log(newHash);
    dirtohash.hashToDir('test/' + newDir, newHash);
    test.deepEqual(
      dirtohash.dirToHash('test/' + newDir)[newDir],
      newHash,
      'should write hash to tree.'
    );
    test.done();
  }
};
