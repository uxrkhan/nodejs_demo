# NODE.JS DEMO

## WHY USE NODE?

- fast, efficient and highly scalable
- event driven, non-blocking I/O model
- popular in the industry
- same language on the front and backend

## NON-BLOCKING IO

- works on a single thread using non-blocking IO calls
- supports tens of thousands concurrent connections
- optimizes throughput and scalability in apps with many IO operations
- all of this makes Node.js apps very fast and efficient

Imp: NODE.JS IS A SINGLE THREADED MODEL THAT USES NON-BLOCKING I/O CALLS.

## NODE'S EVENT LOOP

- single threaded 
- supports concurrencyu via events and callbacks
- EventEmmiter class is used to bind events and listeners

## WHAT IS NODE.JS GOOD FOR

- REST API and Microservices
- Real Time Services (chat, live, updates)
- CRUD Apps - Blogs, Shopping Carts, Social Networks
- Tools and Utilities

short answer - ANYTHING THAT IS NOT CPU INTENSIVE.


## NODE PACKAGE MANAGER

- installs 3rd party packages (frameworks, libraries, tools, etc)
- packages get stored in the node_modules folder
- all dependecies are listed in a package.json file
- npm scripts can be created to run certain tasks such as run a server

- common commands:
```
npm init			// generates a package.json file 
npm install express		// installs a package locally 
npm install -g nodemon		// installs a package globally
npm install 			// installs all the packages listed in package.json
```

## NPM USAGE

```
npm init
npm install uuid
npm install -D nodemon	// installs as dependency for developer

rm -rf node_modules
npm install				// this command is useful for installing all the dependencies at once

npm run dev		// for running nodemon everytime the main file is saved
```

- package-lock.json contains the details of all the dependencies installed
- nodemon is a useful developer tool for monitoring node server. it makes debugging easy

- NOTE: for nodemon to work, edit the package.json file as follows:

```json
{
	"main": "index.js",
	"scripts": {
		"start": "node index",
		"dev": "nodemon index"
	}
}
```

## NODE MODULES

- node core modules (path, fs, http, etc) [in-built]
- 3rd party modules/packages [installed via NPM]
- custom modules [files]

```js
const path = require('path');
const myFile = require('./myFile');
``` 

## CREATING MODULES

```js
    // in person.js
	const person = {
		name: 'John Doe',
		age: 30
	}

	module.exports = person;
	
	// in index.js
	const person = require('./person');

	console.log('person');
```

NOTE: all .js files are wrapped around a modules function that consists of the following parameters:
	function (exports, require, module, __filename, __dirname) {
	}
	
NOTE: in node you cannot do 
```js
	import Person from './person' 
```
This is because node hasn't implemented this yet.
You have to use ES5 syntax :
```js
	const Person = require('./person');
```

## PATH MODULE

```js
	const path = require('path')
	
	__filename // file path  

	path.basename(__filename)	// base file name 
	path.dirname((__filename)	// directory name 
	path.extname(__filename)	// file extension 
	
	// all details of the file in an object form 
	console.log(path.parse(__filename));

	// op > 
	{
	  root: '/',
	  dir: '/home/user/Desktop/files',
	  base: 'node.js',
	  ext: '.js',
	  name: 'node'
	}

	// concatenate (join) paths
	console.log(path.join(__dirname, 'test', 'hello.html'));

	//op > /home/user/Desktop/files/test/hello.html
```

## FS (FILE SYSTEM) MODULE

```js
	const fs = require('fs');
	const path = require('path');

	// Create a folder
	fs.mkdir(path.join(__dirname, 'test'), {}, function(err) {
		if (err) throw err;
		console.log('folder created.');
	});
	/* 
		fs.mkdir(path, {}, callback) {}
	*/

	// Create and write to file
	fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'Hello world' , err => {
		if(err) throw err;
		console.log('file created');
	});
	/*
		fs.writeFile(path, content, callback) {}
	*/

	fs.appendFile(path, content, callback)           	// append file
	fs.readFile(path, 'utf8', (err,data) => { ... } );	// read file
	fs.rename(path, newnamepath, callback)            	// rename file
	
```

## OS MODULE

```js
	const os = require('os');
	
	os.platform();	// platform 
	os.arch();		// cpu architecture
	os.cpus();		// cpu core info
	os.freemem();	// free memory
	os.totalmem();	// total memory
	os.homedir();	// home directory
	os.uptime();	// uptime in seconds
```

## URL MODULE

```js
	const url = require('url');
	
	const myUrl = new URL('https://www.google.com');
	
	myUrl.href	// href link
	myUrl.host	// host 
	myUrl.hostname	// hostname (same as host but doesn't contain port)
	myUrl.pathname	// just gives the path of the file
	myUrl.search	// queries
	myUrl.searchParams	// query params
	
	myUrl.searchParams.append('abc', '123');	// adding params
	
	// loop through params
	myUrl.searchParams.forEach((value, name)=> console.log(`${name}: ${value}`);
```

## EVENTS

```js
	const EventEmitter = require('events');
	
	// Create emitter class
	class MyEmitter extends EventEmitter {}	

	// Init object
	const myEmitter = new MyEmitter();
	
	// Event listener
	myEmitter.on('event', {} => console.log('event fired!');
	
	// Fire event
	myEmitter.emit('event');	// emits the 'event' event

```

### Practical example of Events

```js
	const EventEmitter = require('events');
	const uuid = require('uuid');
	
	class Logger extends EventEmitter {
		log(msg) {
			this.emit('message', {id: uuid.v4, msg});
		}
	}

	const logger = new Logger();
	
	logger.on('message', data => console.log('Called listener, data:', data));
	logger.msg('Hello world');

```

# HTTP MODULE

```js
	const http = require('http');

	// Create a server
	http.createServer((req, res) => {
		// Write response
		res.write('Hello world');
		res.end();	
	}).listen(5000, () => console.log('server running...'));

	// the above code creates a simple webserver on localhost:5000 saying 'Hello world'
	
```

### Loading HTML pages

```js
	const http = require('http');
	const path = require('path');
	const fs = require('fs');

	const server = http.createServer((req, res) => {
		// index.html (home)
		if (req.url == '/') {
			fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(content);		
			})
		}
		// about page
		if (req.url == '/about') {
			fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(content);		
			})
		}
		// json application
		if (req.url == '/api/users') {
			const users = [ 
				{ name: 'John Doe', age: 30 },
				{ name: 'Bob Smith', age: 30 }
			];
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(JSON.stringify(users));
		}
	});
```

### A better and more generalised approach

The procedure used above is very basic and can be improved be adding a switch statement for checking the file extension names.

```js
	const http = require('http');
	const path = require('path');
	const fs = require('fs');

	const server = http.createServer((req, res) => {

		let filePath = path.join(
			__dirname,
			'public',
			req.url === '/' ? 'index.html' : req.url
		);
		console.log('GET: ' + filePath);

		let extname = path.extname(filePath);
		let contentType = 'text/html';

		switch(extname) {
			case '.css': 	contentType = 'text/css'; break;
			case '.json':	contentType = 'application/json'; break;
			case '.png':	contentType = 'image/png'; break;
			case '.jpg':	contentType = 'image/jpg'; break;
			case '.js':  	contentType = 'text/js'; break;
		}

		fs.readFile(filePath, (err, content) => {
			if (err) {
				if (err.code == 'ENOENT') {
					// page not found
					fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.end(content, 'utf8');
					});
				} else {
					// some server error
					res.writeHead(500);
					res.end(content, 'utf8');
				}
			} else {
				// success
				res.writeHead(200, {'Content-Type': contentType});
				res.end(content, 'utf8');
			}
		 });
		 
	});

	const PORT = process.env.PORT || 5000;
	server.listen(PORT, () => console.log('server running on port ' + PORT + '...'));
```

