const startUpDebugger = require('debug')('app:startup');// DEBUG=app:startup
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
]

router.get('/', (req, res) => {
  res.send(courses); // courses
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course); // return id of the post to client | this is how post req are handled
});

router.put('/:id', (req, res) => {
  const course = findCourse(req.params.id);
  if (!course) return res.status(404).send(`The course with the given ID: ${req.params.id} was not found.`);// 404 not found
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  course.name = req.body.name;
  res.send(course);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const course = findCourse(id);
  if (!course) return res.status(404).send(`The course with the given ID: ${id} was not found.`);// 404 not found
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);

});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`The course with the given ID: ${req.params.id} was not found.`);// 404 not found
  res.send(course); // else
});

module.exports = router;

function findCourse(id) {
  // testFind(); //TEST

  return courses.find(c => c.id === parseInt(id));

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
