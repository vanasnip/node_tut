const startUpDebugger = require('debug')('app:startup');// DEBUG=app:startup
const dbDebugger = require('debug')('app:db');// DEBUG=app:db
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();
const Joi = require('joi');


app.set('view engine', 'pug'); // express will automatically load, no need to require pug
app.set('views', './views'); // default views // optional
//Environment variables
console.log(`app env: ${app.get('env')}`);
if (app.get('env') === 'development') {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  app.use(morgan('short'));
  startUpDebugger(`Morgan enabled...`);
}
startUpDebugger(`Morgan enabled...`);
//DB work
dbDebugger('connected to the database..');
// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ?key=value&key=value  // populates  req.body
app.use(express.static('public'));
app.use('/', home);
app.use('/api/courses', courses);

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
console.log(`Mail Server Password: ${config.get('mail.password')}`);

app.use(logger);
app.use(authenticate);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`)); // server o
