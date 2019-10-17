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
  // eq -> equal
  // ne -> not equal
  // gt -> greater than
  // gte -> greater than or equal to
  // lt -> less than
  // lte -> less than or equal to
  // in
  // nin -> not in

  const courses = await Course
  // .find({ author: 'Ivano', isPublished: true})
  .find({ price: 10})
  .limit(10)
  .sort({name: 1})
  .select({ name: 1, tags: 1});
  console.log(courses);
}

getCourses();

