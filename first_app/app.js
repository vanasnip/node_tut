const Logger = require('./logger');
const logger = new Logger();

// Register a listener
logger.on('logging', ({message}) => {
  console.log(`logging from listener. ${message}`);
});

logger.log('message');
