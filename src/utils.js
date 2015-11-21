var fs = require('fs');
var path = require('path');

function dirsSync (srcpath) {
  // console.log("dirsSync, srcpath:", srcpath);
  return fs.readdirSync(srcpath).filter(function (file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function hasExt(filePath, ext) {
  var filePathExt = path.extname(filePath);
  return filePathExt === ext || filePathExt === ('.' + ext);
}

function findFirstFileSync (srcpath, ext) {
  // console.log("findFirstFileSync, srcpath:", srcpath);
  var readDirRes = fs.readdirSync(srcpath);
  for(var i = 0; i < readDirRes.length; i++) {
    if(hasExt(readDirRes[i], ext)) return readDirRes[i];
  }
  return null;
}

function findFirstDirSync (srcpath) {
  // console.log("findFirstDirSync, srcpath:", srcpath);
  var readDirRes = fs.readdirSync(srcpath);
  for(var i = 0; i < readDirRes.length; i++) {
    if( fs.statSync(path.join(srcpath, readDirRes[i])).isDirectory() ) return readDirRes[i];
  }
  return null;
}

module.exports = {
  dirsSync: dirsSync,
  findFirstFileSync: findFirstFileSync,
  findFirstDirSync: findFirstDirSync,
  hasExt: hasExt
};
