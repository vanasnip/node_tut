var url = 'http://mylogger.io/log';

function log(message){
  //send an http req
  console.log(message);
}

module.exports.log = log;

