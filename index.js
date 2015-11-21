#!/usr/bin/env node

var utils = require('./src/utils');
var path = require('path');
var fs = require('fs');

var ext = '.mp4';
var cwd = path.resolve(process.cwd());
var listOfFilesToRemove = [];

function move(src, target) {
  console.log('Moving:', src, '->', target);
  fs.renameSync(src, target);
  console.log('Complete:', path.basename(src), '->', path.basename(target));
  // In order to get logging to stdout in order, am doing it synchronously
  // fs.rename(src, target, function(err) {
  //   if (err) throw err;
  //   console.log('Complete:', path.basename(src), '->', path.basename(target));
  // });
}

function readdirSyncAndFilterByExt(srcpath, ext) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return !(utils.hasExt(file, ext) || file === '.DS_Store');
  }).map(function(file) {
    return path.join(srcpath, file);
  });
}

utils.dirsSync(cwd).forEach(function(dir) {
  var newFileName = dir + ext;
  var dirAbs = path.resolve(dir);
  var mp4File = utils.findFirstFileSync(dirAbs, ext);
  if(mp4File !== null) {
    if(mp4File !== newFileName) {
      move(path.join(dirAbs, mp4File), path.join(dirAbs, newFileName));
    }
  } else {
    // file not found in first dir. Try going one more level deep
    var nestedDir = utils.findFirstDirSync(dirAbs);
    if (nestedDir === null) return;
    var nestedDirAbs = path.join(dirAbs, nestedDir);
    mp4File = utils.findFirstFileSync(nestedDirAbs, ext);
    if(mp4File !== null) {
      move(path.join(nestedDirAbs, mp4File), path.join(dirAbs, newFileName));
    }
  }

  listOfFilesToRemove = listOfFilesToRemove.concat(readdirSyncAndFilterByExt(dirAbs, ext));
});

if(listOfFilesToRemove.length > 0) {
  var rimraf = require('rimraf');
  
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  console.log('===========================');
  console.log('About to delete the following:');
  console.log(listOfFilesToRemove);
  process.stdout.write('[Y/n]: ');
  process.stdin.on('data', function (text) {
    var reply = text.toString().trim();
    var replyUpper = reply.toUpperCase();
    if (replyUpper === '' || replyUpper === 'Y') {
      listOfFilesToRemove.forEach(function(file) {
        rimraf.sync(file);
        console.log('Done: rm -rf ' + file);
      });
    } else {
      console.log('Your reply was [', reply, '] Will not prceed with removing of files.');
    }

    process.exit();
  });
}

