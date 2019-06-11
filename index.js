const express = require("express");
const fs = require('fs');
var path = require('path');

const app = express();
const configPath = "./config.json";
const imagePath = "web/img/"
var images = getImagesList(imagePath);
var photoCounter = 0;

var config = JSON.parse(fs.readFileSync(configPath));

// Static files
app.use(express.static("web"));

// Path to get info from config file
app.get("/get/cfg/:param", function (req, res) {
	// Always ask for settings on /get/{param}
	var parameter = req.params.param;
	var value = config[parameter] || "ERROR";

	console.log(`${req.ip} asked for ${parameter} (= ${value})`);

	res.send(JSON.stringify(value));
})

// Path to get next photo
app.get("/get/photo", function (req, res) {
	// Always ask for photo on /get/photo

	// Send next file and increase counter
	res.sendFile(path.join(__dirname, imagePath, images[photoCounter++]))
	if (photoCounter >= images.length) {
		photoCounter = 0;
	}
})

// Path to set variables etc.
app.get("/set", function (req, res) {
	res.send("SET test");
})

app.listen(config.port);
console.log("serving on " + config.port);

function getImagesList(path) {
	var filenames = fs.readdirSync(path);
	return filenames.filter((filename) => {
		// Only add files that are .jp(e)g, .png or .gif
		return filename.match(/\.(jpe?g|png|gif)$/);
	});
}