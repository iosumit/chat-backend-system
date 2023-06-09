const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);

const port = process.env.port || 8300;
server.listen(port);