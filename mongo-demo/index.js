const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground') // this conenct method returns a promise
  .then(() => console.log(`Conencted to MongoDB...`))
  .catch(err => console.error(`Could not connect to the MongoDB... ${err}`));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Classes, objects
// Human, john
// Course, nodeCourse

const Course = mongoose.model('Course', courseSchema);

async function CreateCourse() {
  const course = new Course({
    name: 'Angular',
    author: 'Ivano',
    tags: ['angular', 'frontend'],
    isPublished: true
  });

  const result = await course.save()
  console.log(result);
}

//CreateCourse();

async function getCourses(){
  const courses = await Course
  .find({ author: 'Ivano', isPublished: true});
  console.log(courses);
}

getCourses();

