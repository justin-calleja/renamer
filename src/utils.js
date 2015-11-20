var fs = require('fs');
var path = require('path');

function dirs (srcpath) {
  return fs.readdirSync(srcpath).filter(function (file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function isExt(filePath, ext) {
  var filePathExt = path.extname(filePath);
  return filePathExt === ext || filePathExt === ('.' + ext);
}

function findFirst (srcpath, ext) {
  var dirArray = fs.readdirSync(srcpath);
  for(var i = 0; i < dirArray.length; i++) {
    if(isExt(dirArray[i], ext)) return dirArray[i];
  }
  return null;
}

module.exports = {
  dirs: dirs,
  findFirst: findFirst
};
