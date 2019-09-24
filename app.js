'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const storeApps = require('./playstore.js');

app.get('/apps', (req, res) => {
  const {genre, sort} = req.query;

  if(!genre){
    return res
      .status(400)
      .send('Enter a valid genre');
  }

  let appsByGenre = storeApps.filter(storeApp => storeApp.Genres.toLowerCase().includes(genre.toLowerCase()));
  
  if(sort){
    if (!['App', 'Rating'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of App or Rating');
    }
  }

  if (sort === 'Rating') {
    appsByGenre.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    }); 
  }
  
  if (sort === 'App') {
    appsByGenre.sort((a, b) => {
      return a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 0;
    }); 
  }

  res
    .json(appsByGenre);
});

app.listen(8000, () => {
  console.log('Server is running on port 8000!');
});




