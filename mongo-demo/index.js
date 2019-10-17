const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground') // this conenct method returns a promise
.then(()=> console.log(`Conencted to MongoDB...`))
.catch(err => console.error(`Could not connect to the MongoDB... ${err}`));

