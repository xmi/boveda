const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const fallbackPath = "./fallback.png";

const server = http.createServer((req, res) => {

	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = fallbackPath;

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
		default:
			contentType = 'image/png';
			break;
	}

	fs.readFile(filePath, function (error, content) {
		if (error) {
			if (error.code == 'ENOENT') {
				fs.readFile(fallbackPath, function (error, content) {
					response.writeHead(200, {
						'Content-Type': contentType
					});
					response.end(content, 'utf-8');
					console.log(`Error: ${error}. Served fallback image.`);
				});
			} else {
				response.writeHead(500);
				response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
				response.end();
			}
		} else {
			response.writeHead(200, {
				'Content-Type': contentType
			});
			response.end(content, 'utf-8');
		}
	});

	server.listen(port, hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`);
	})
});