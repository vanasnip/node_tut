const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
  {id:1, name: 'thriller'},
  {id:2, name: 'romance'},
  {id:3, name: 'action'},
]
router.get('/',(req, res)=>{
  res.send(genres);
  console.log('all genres');
});
router.post('/', (req, res)=>{
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const {name} = req.body;
  const exists = genres.find(c => c.name.toLowerCase() === name.toLowerCase());
  if(exists) return res.send(`A genre ${name} already exists.`);
  const genre = {
    id: genres.length + 1,
    name
  }
  genres.push(genre);
  res.send(genre);
});
router.put('/:id', (req, res)=> {
  const { id } = req.params;
  const genre = findGenre(id);
  if(!genre) return res.status(404).send(`Genre with id ${id} was not found`);
  const { name }  = req.body;
  const valid = validateGenre(req.body);
  if(valid.error) return res.status(400).send(valid.error);
  genre.name = name;
  res.send(genre)
  console.log(`added genre ${name}`);
});
router.delete('/:id', (req,res)=> {
  const { id } = req.params;
  const genre = findGenre(id);
  if(!genre) return res.status(404).send(`Genre with id ${id} was not found`);
  const index = genres.indexOf(genre);
  res.send(genre);
  genres.splice(index, 1);
  console.log(`deleted genre ${genre.name}`);

});
router.get('/:id',(req,res)=>{
  const { id } = req.params;
  const genre = findGenre(id);
  if(!genre) return res.status(404).send(`Genre with id ${id} was not found`);
  res.send(genre);
  console.log(`got genres ${genre.name}`);
})


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

module.exports = router;
