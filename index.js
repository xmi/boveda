const http = require("http");
var express = require("express")

const hostname = '127.0.0.1';
const port = 3000;
const fallbackPath = "./fallback.png";

var app = express();

app.get("/", function(req, res) {
	res.send("Hello world");
});

app.listen(port);
console.log("API on " + port);
