var fs = require("fs")
var http = require("http")

var data = fs.readFileSync("src/assets/inventory.json","utf8");
fs.writeFileSync("mydata.json",data);
