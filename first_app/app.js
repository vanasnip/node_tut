const { log, emitter } = require('./logger');

// Register a listener
emitter.on('logging', ({message}) => {
  // wont work because the instance of emitter in logger is different
  // from the instance of logger in this module
  console.log(`logging from listener. ${message}`);
});

log('message');
