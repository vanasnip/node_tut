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
  // eq -> equal // ne -> not equal // gt -> greater than // gte -> greater than or equal to
  // lt -> less than // lte -> less than or equal to // in // nin -> not in

  // or // and
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course
  .find({author: /^Ivan/})
  .or([{name: /Mams$/i}, {author: /.*Ivan.*/i}])
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize)
  .sort({name: 1})
  .count();
  console.log(courses);
}


async function updateCourse(id) {
  // Approach: Query first
  // findById()
  console.log('function running');
  const course = await Course.findById(id);
  if(!course) {
    console.log('no course found');
    return;
  }
  const printBf = {
    name : course.get('name'),
    author: course.get('author')
  }
   console.log(`After: ${printBf.name} by ${printBf.author}`);
  // Modify its properties
  course.set({
    isPublished: true,
    author: 'Ivano'
  });
  // course.isPublished = true;
  // course.author = 'Another Athor';

  // save()
   const result = await course.save();
    const printAt = {
    name : result.get('name'),
    author: result.get('author')
  }
   console.log(`After: ${printAt.name} by ${printAt.author}`);

  //__________________________________________________
  // Approach: Update first
  // Update directly
  // Optionaly: get the updated document
}

updateCourse('5da83fb64c270ce2050f5642');

