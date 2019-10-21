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
    .find({isPublished: true, tags:'backend'})
    .sort({name:1})
    .select({name:1, author: 1})
}
async function run(){
  const courses = await getCourses();
  console.log(courses);
}

run();
