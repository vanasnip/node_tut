const express = require('express');
const app = express();

app.get('/',(req,res)=>{
  let message = `Hello World`;
  res.send(message); // client o
  console.log(`logged ${message}`);
});
app.get('/api/courses', (req,res)=>{
  res.send([1,2,3]);
});

app.get('/api/courses/:id',(req,res)=>{
  let id = req.params.id;
  res.send(id);
  console.log(`logging message: ${id}`);
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`listening on port ${port}...`)); // server o
