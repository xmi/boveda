const express = require("express");
const fs = require('fs');
var path = require('path');

const app = express();
const configPath = "./web/config.json";
const imagePath = "./web/img/"
var images = getImagesList(imagePath);
var photoCounter = 0;

// Port must be between 1000 and 10000
var config = JSON.parse(fs.readFileSync(configPath));

// Static files
app.use(express.static("web"));

// Path to get next photo
app.get("/get/photo", function (req, res) {
	// Always ask for photo on /get/photo

	// Send next file and increase counter
	res.sendFile(`/home/pi/boveda/web/img/${images[photoCounter++]}`)
	if (photoCounter >= images.length) {
		photoCounter = 0;
	}
})

// Reload the config file
app.get("/refresh", function (req, res) {
	console.log(`Refreshing server by request of ${req.ip}`)
	photoCounter = 0;
	res.send("OK");
	httpServer.close();
	images = getImagesList(imagePath);
	httpServer.listen(config.port);
})

// Path to set variables etc.
app.get("/set", function (req, res) {
	console.log(req.query);
	var tempConfig = config;

	// TEMP:
	// clients should call /refresh to save changes
	tempConfig.port = req.query.port || config.port;
	tempConfig.malditaPerImage = req.query.malditaPerImage || config.malditaPerImage;
	tempConfig.cycleInterval = req.query.cycleInterval || config.cycleInterval;

	
	fs.writeFile(configPath, JSON.stringify(tempConfig), function (err) {
		if (err) {
			res.send("not OK")
			console.log(err);
			return 
		}
			console.log(JSON.stringify(tempConfig));
		console.log('writing to ' + configPath);
	});
	res.send("OK")
})

httpServer = require('http').createServer(app);
httpServer.listen(config.port);
console.log("serving on " + config.port);

function getImagesList(path) {
	var filenames = fs.readdirSync(path);
	return filenames.filter((filename) => {
		// Only add files that are .jp(e)g, .png or .gif
		return filename.match(/\.(jpe?g|png|gif|mp4)$/);
	});
}