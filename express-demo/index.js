const startUpDebugger = require('debug')('app:startup');// DEBUG=app:startup
const dbDebugger = require('debug')('app:db');// DEBUG=app:db
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const logger = require('./logger');
const authenticate = require('./auth');
const app = express();
const Joi = require('joi');

app.set('view engine', 'pug'); // express will automatically load, no need to require pug
app.set('views', './views'); // default views // optional
//Environment variables
//NOTE if process.env.NODE_ENV is not set //undefined
//NOTE app.get('env') defaults to development
console.log(`app env: ${app.get('env')}`);
//NOTE allow logging only in dev environment
if (app.get('env') === 'development') {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  app.use(morgan('short'));
  startUpDebugger(`Morgan enabled...`);
}
//NOTE/ 03 to export both startup & db -> export DEBUG=app:startup,app:db or for all use wildcars app:*
//NOTE/ short hand -> DEBUG=app:db nodemon index.js
startUpDebugger(`Morgan enabled...`);
//DB work
dbDebugger('connected to the database..');
//NOTE 04 if just one name the debugger just debug, with it's environment variables still
// Middleware
//NOTE built-in
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ?key=value&key=value  // populates  req.body
app.use(express.static('public'));

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
console.log(`Mail Server Password: ${config.get('mail.password')}`);

//NOTE custom
app.use(logger);
app.use(authenticate);

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
]

//DONE
app.get('/', (req, res) => {
  const message = `Hello World`;
  const title = "Ivan's express app";
  res.render('index',{message, title}); // client o
});

//DONE
app.get('/api/courses', (req, res) => {
  res.send(courses); // courses
});

//DONE
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`The course with the given ID: ${req.params.id} was not found.`);// 404 not found
  res.send(course); // else
});

//DONE
app.get('/api/courses/:year/:month', (req, res) => {
  let { year, month } = req.params; // params required
  let query = req.query; //opitonal
  res.send(query);
  console.log(`logging message: year - ${year} | month - ${month} | query - ${query || 'none'}`);
});

//DONE
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course); // return id of the post to client | this is how post req are handled
});

//DONE
app.put('/api/courses/:id', (req, res) => {
  const course = findCourse(req.params.id);
  if (!course) return res.status(404).send(`The course with the given ID: ${req.params.id} was not found.`);// 404 not found
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  course.name = req.body.name;
  res.send(course);
});

//DONE - Delete course endpoint
app.delete('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  const course = findCourse(id);
  if (!course) return res.status(404).send(`The course with the given ID: ${id} was not found.`);// 404 not found
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);

  //NOTE array methods ->
  //NOTE        find: (callback(elem[,index[,array]])[, thisArg])
  //NOTE        splice: mutates the array, (start[,deteleCount[, item1[, item2[, ...]]]])
});

function findCourse(id) {
  // testFind(); //TEST

  return courses.find(c => c.id === parseInt(id));

  //NOTE what if more than one is found? does it return on it's first instance or carries on?
  //NOTE: I suspect it return on the first one -> testFind();
  function testFind() {
    const val = [1, 2, 3, 1, 3, 2, 2, 2].find(num => num === 2);
  }
}

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(course, schema);
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`)); // server o

