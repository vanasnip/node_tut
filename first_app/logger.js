const EventEmitter = require('events');
const emitter = new EventEmitter();

function log(message) {
  //send an http req
  console.log(`message: ${message}`);
  emitter.emit('logging', { message });
}

module.exports = log;


