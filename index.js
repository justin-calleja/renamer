#!/usr/bin/env node

var utils = require('./src/utils');
var path = require('path');
var fs = require('fs');

// console.log(utils.dirs(__dirname));

var cwd = path.resolve(process.cwd());
utils.dirs(cwd).forEach(function(dir) {
  var absDir = path.resolve(dir);
  var mp4File = utils.findFirst(absDir, 'mp4');
  if(mp4File !== null) {
    var newFileName = dir + '.mp4';
    if(mp4File !== newFileName) {
      var newFileNameAbs = path.join(absDir, newFileName);
      var mp4FileAbs = path.join(absDir, mp4File);
      console.log('about to rename:', mp4FileAbs, 'to:', newFileNameAbs);
      fs.rename(mp4FileAbs, newFileNameAbs, function(err) {
        if (err) throw err;
        console.log('rename:', mp4File, 'to:', newFileName, 'complete');
      });
    }
  }
  // else {
  //   console.log('no mp4File found in:', absDir);
  // }
});
