var fs = require("fs");
var zlib = require('zlib');

fs.createReadStream('out.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('out.txt.gz'));
  
console.log("文件压缩完成。");