const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
	/*
	if (req.url == '/') {
		fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
			if(err) 
				throw err;
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(content);
			console.log('Loaded home page.');
		})
		//res.writeHead(200, {'Content-Type': 'text/html'});
		//res.end('<h1>Home Page</h1>');
	}
	//res.write('Hello world');
	//res.end();
	if (req.url === '/about') {
		fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
			if (err) 
				throw err;
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(content);
			console.log('Loaded about page.');
		})
	}

	if (req.url == '/api/users') {
		const users = [
			{ name: 'Bob Smith', age: 30},
			{ name: 'John Doe', age: 30}
		];
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(users))
	}
	*/
	//console.log(req.url);
	// Build file path
	let filePath = path.join(
		__dirname,
		'public', 
		req.url === '/' ? 'index.html' : req.url
	); 
	console.log('GET: ' + filePath);

	let extname = path.extname(filePath);	// extension of the file
	let contentType = 'text/html';	// Inital content type

	// Check ext and set content type
	switch(extname) {
		case '.js': 	contentType = 'text/javascript'; break;
		case '.css': 	contentType = 'text/css'; break;
		case '.json': 	contentType = 'application/json'; break;
		case '.png': 	contentType = 'image/png'; break;
		case '.jpg': 	contentType = 'image/jpg'; break;
	}

	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code == 'ENOENT') {
				// page not found
				fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(content, 'utf8');
				})
			} else {
				// some server error
				res.writeHead(500);
				res.end(`Server Error: ${err.code}`);
			}
		} else {
			// success
			res.writeHead(200, {'Content-Type': contentType});
			res.end(content, 'utf8')
		}
	})
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running on port', PORT + '...'));
