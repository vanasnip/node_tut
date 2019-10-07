const path = require('path'); //build in module no ./
const log  = require('./logger'); // custom module has ./
const os = require('os');

log('ivanao');

let pathObj = path.parse(__filename);
console.log(pathObj);

let totalMem = os.totalmem();
console.log(`total memmory ${totalMem}`);

let totalFreeMem = os.freemem();
console.log(`free memory ${totalFreeMem}`);
