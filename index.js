var express = require("express")

const port = 3000;
const app = express();

// Static files
app.use(express.static("web"));

// Path to get any specific info
app.get("/get", function (req, res) {
	res.send("GET test");
})

// Path to set variables etc.
app.get("/set", function (req, res) {
	res.send("SET test");
})

app.listen(port);
console.log("serving on " + port);
