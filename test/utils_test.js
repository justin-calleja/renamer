var tap = require('tap');
var path = require('path');
var utils = require('../src/utils');

tap.test('Is capable of finding all directories in a given directory', function(t) {
  t.equal(utils.dirs(path.join(__dirname, 'tmp')).length, 4);
  t.end();
});

tap.test('Is capable of finding first file with given extention in given directory', function(t) {
  t.equal(utils.findFirst(path.join(__dirname, 'tmp', 'and'), 'mp4'), 'tmp1.mp4');
  t.end();
});
