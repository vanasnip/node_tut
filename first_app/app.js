const path = require('path'); //build in module no ./
const log = require('./logger'); // custom module has ./
const os = require('os');
const fs = require('fs'); // all either sync/blocking or async/non-blocking
const EventEmitter = require('events');
const emitter = new EventEmitter();

log('ivanao');

let pathObj = path.parse(__filename);
console.log(pathObj);

let totalMem = os.totalmem();
console.log(`total memmory ${totalMem}`);

let totalFreeMem = os.freemem();
console.log(`free memory ${totalFreeMem}`);
//sync should be avoided, mostly used for simiplicity ... blocking is the enemy!?
const files = fs.readdirSync('./');
console.log(`sync files: ${files}`);

//all async take a function as last param // did somebody say call back?
const asyncFiles = fs.readdir('./', function (error, files) {
  error ?
    console.error(`Error: ${error}`) :
    console.log(`async files: ${files}`);
});

// Register a listener
emitter.on('messageLogged', function () {
  console.log('listener called');
});
// raise an event singmalling
setTimeout(() => {
  emitter.emit('messageLogged');
}, 500)
