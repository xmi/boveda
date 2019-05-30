const http = require("http");
var express = require("express")

const hostname = '127.0.0.1';
const port = 3000;
const fallbackPath = "./web/fallback.png";

var app = express();

app.use(express.static("web"));

app.listen(port);
console.log("API on " + port);
