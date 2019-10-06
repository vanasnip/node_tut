//(function (exports, require, module, __filename, __dirname){
// this is what a module looks like under the hood;
console.log(__filename);
console.log(__dirname);
var url = 'http://mylogger.io/log';

function log(message){
  //send an http req
  console.log(message);
}

module.exports = log;

//});
