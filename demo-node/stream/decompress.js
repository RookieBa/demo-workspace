var fs = require("fs");
var zlib = require('zlib');

fs.createReadStream('out.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('decompress.txt'));
  
console.log("文件解压完成。");