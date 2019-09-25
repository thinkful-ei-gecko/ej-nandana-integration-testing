
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const storeApps = require('./playstore.js');

app.get('/apps',(req,res) =>{
  const { sort, genres } = req.query;
 
  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app');
    }
  }
  if (genres) {
    if (!['action', 'puzzle','strategy','casual','arcade','card'].includes(genres.toLowerCase())) {
      return res
        .status(400)
        .send('Genre must be Action,Puzzle,strategey,Casual,Arcade,Card');
    }
  }

  let results = storeApps
    .filter(game =>
    {
      if(genres) {
        return game.Genres.toLowerCase().includes(genres.toLowerCase());
      } else {
        return true;
      }
    });

  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
     
  }
 
  res
    .json(results);
});

module.exports = app;




