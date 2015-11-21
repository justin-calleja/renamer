var tap = require('tap');
var path = require('path');
var utils = require('../src/utils');

tap.test('Can find all directories in a given directory', function(t) {
  t.equal(utils.dirsSync(path.join(__dirname, 'tmp')).length, 4);
  t.end();
});

tap.test('Can find first file with given extention in given directory', function(t) {
  t.equal(utils.findFirstFileSync(path.join(__dirname, 'tmp', 'and'), 'mp4'), 'tmp1.mp4');
  t.end();
});

tap.test('Can find first directory in given directory', function(t) {
  t.equal(utils.findFirstDirSync(path.join(__dirname, 'tmp', 'goodbye')), 'onemore');
  t.equal(utils.findFirstDirSync(path.join(__dirname, 'tmp', 'and')), null);
  t.end();
});

tap.test('Can check the extension of a file, with or without period', function(t) {
  t.ok(utils.hasExt('/tmp/hello.mp4', 'mp4'));
  t.ok(utils.hasExt('/tmp/hello.mp4', '.mp4'));
  t.ok(!utils.hasExt('/tmp/hello.mp4', 'txt'));
  t.end();
});
