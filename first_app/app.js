const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('', ({message}) => {
  // wont work because the instance of emitter in logger is different
  // from the instance of logger in this module
  console.log(`listener called. ${message}`);
});

const log = require('./logger');
log('message');
