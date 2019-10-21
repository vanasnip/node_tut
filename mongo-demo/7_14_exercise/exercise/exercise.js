const mongoose = require('mongoose');
const db = 'mongo-exercises';
mongoose.connect(`mongodb://localhost/${db}`)
  .then(() => console.log(`Connected to mongo-exercises ${db}`))
  .catch(err => console.error(`Error: could not connect to ${db} - ${err}`));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})

const Course = mongoose.model('courses', courseSchema);
function getCourses() {
  return Course
    // Exercise 1
    // .find({isPublished: true, tags:'backend'})
    // .sort({name:1})
    // .select({name:1, author: 1})

    // Exercise 2
    .find({ isPublished: true})
    .or([{tags: 'frontend'}, {tags: 'backend'}])
    .sort('-price')
    .select({ name: 1, author: 1, price: 1 })
}
async function run() {
  const courses = await getCourses();
  console.log(courses.map(crs => ({
      name: crs.get('name'),
      author: crs.get('author'),
      price: crs.get('price')
    })
  ))
  // console.log(courses);
}

run();
