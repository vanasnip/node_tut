const http = require('http');


const server = http.createServer(); // event emitter **
server.on('connection', (socket)=> {
  console.log('New connections');
})
server.listen(3000);

console.log(`listening on port 3000...`);
