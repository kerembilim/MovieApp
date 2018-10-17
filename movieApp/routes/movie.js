const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');


router.post('/', function(req, res, next) {
   movie=new Movie({
      title:req.body.title,
      category:req.body.category,
      country:req.body.country,
      year:req.body.year,
      imdb_score:req.body.imdb_score
  });
  movie.save((err,data)=>{
    if(err)
      res.json(err);
    res.json(data);
  })
});

module.exports = router;
