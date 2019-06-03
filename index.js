const express = require("express");
const fs = require('fs');

const app = express();
const configPath = "./config.json";

var config = JSON.parse(fs.readFileSync(configPath));

// Static files
app.use(express.static("web"));

// Path to get any specific info
app.get("/get/:param", function (req, res) {
	// Always ask for settings on /get/{param}
	var parameter = req.params.param;
	var value = config[parameter] || "ERROR";

	console.log(`${req.ip} asked for ${parameter} (= ${value})`);

	res.send(JSON.stringify(value));
})

// Path to set variables etc.
app.get("/set", function (req, res) {
	res.send("SET test");
})

app.listen(config.port);
console.log("serving on " + config.port);