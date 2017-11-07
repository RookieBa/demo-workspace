var fs = require("fs");
var data = "test123";
var writeStream  = fs.createWriteStream("out.txt");
writeStream.write(data,"UTF-8");
writeStream.end();

writeStream.on("finish",function(){
	console.log("end write");
});

writeStream.on("error",function(err){
	console.log(err.stack);
});
console.log("end");