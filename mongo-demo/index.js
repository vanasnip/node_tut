const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground') // this conenct method returns a promise
.then(()=> console.log(`Conencted to MongoDB...`))
.catch(err => console.error(`Could not connect to the MongoDB... ${err}`));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now },
  isPublished: Boolean
});

// Classes, objects
// Human, john
// Course, nodeCourse

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
  name: 'Node.js',
  author: 'Ivano',
  tags: ['node', 'backend'],
  isPublished: true
})
