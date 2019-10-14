const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const message = `Hello World`;
  const title = "Ivan's express app";
  res.render('index',{message, title}); // client o
});

module.exports = router;
