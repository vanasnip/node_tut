const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

// 1 DONE list of genres
const genres = [
  {id:1, name: 'thriller'},
  {id:2, name: 'romance'},
  {id:3, name: 'action'},
]
// 2 TODO get all genres
app.get('/api/genres',(req, res)=>{
  //NOTE concerned about how to send JSON
  //NOTE - added app.use(express.json); should be express.json
  res.send(genres);
  console.log('all genres');
});
// 3 TODO - create a new genre & working
app.post('/api/genres', (req, res)=>{
  //DONE/ validate genre
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const {name} = req.body;
  //DONE check if exists
  const exists = genres.find(c => c.name.toLowerCase() === name.toLowerCase());
  //DONE if so RETURN send('genre already exists')
  if(exists) return res.send(`A genre ${name} already exists.`);
  //DONE else make genre
  const genre = {
    id: genres.length + 1,
  //DONE generate id,
    name
  }
  //DONE push genre to genres
  genres.push(genre);
  //DONE send.res(genre)
  res.send(genre);
});
// 4 TODO - update a genre
app.put('/api/genres/:id', (req, res)=> {
  //DONE/ get passed id
  const { id } = req.params;
  //DONE/ find genre
  const genre = findGenre(id);
  //DONE/ if doesnt exist RETURN send(404 not found);
  if(!genre) return res.status(404).send(`Genre with id ${id} was not found`);
  //DONE/ validate name param
  const { name }  = req.body;
  const valid = validateGenre(req.body);
  //DONE/ if valid.error RETURN status 400 send(valid.error)
  if(valid.error) return res.status(400).send(valid.error);
  //DONE/ else edit genre - in this instance give the genre a new name
  genre.name = name;
  //DONE/ send(edited genre);
  res.send(genre)
  console.log(`added genre ${name}`);
});
// 5 TODO - delete a genre
app.delete('/api/genres/:id', (req,res)=> {
  //DONE/ get id
  const { id } = req.params;
  //DONE/ find getGenre
  const genre = findGenre(id);
  //DONE/ if not found return 404 not found
  if(!genre) return res.status(404).send(`Genre with id ${id} was not found`);
  //DONE/ find index of genre
  const index = genres.indexOf(genre);
  //DONE/ splice index out, splice mutates the array
  res.send(genre);
  genres.splice(index, 1);
  console.log(`deleted genre ${genre.name}`);

});
app.get('/api/genres/:id',(req,res)=>{
  //DONE/ get id
  const { id } = req.params;
  //DONE/ find getGenre
  const genre = findGenre(id);
  //DONE/ if not found return 404 not found
  if(!genre) return res.status(404).send(`Genre with id ${id} was not found`);
  //DONE/ send client genre
  res.send(genre);
  console.log(`got genres ${genre.name}`);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateGenre(genre){
  const schema = {
    id: Joi.number(),
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}
function findGenre(id){
 return genres.find(g => g.id === parseInt(id));
}
