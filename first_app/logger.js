const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    //send an http req
    console.log(`message from emitter: ${message}`);
    this.emit('logging', { message });
  }
}


module.exports = Logger;


