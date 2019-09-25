const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');


//testing for the data display

describe('Genre search', () => {
  it('should return array of genre apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });

  //testing for sort query parameter
  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'MISTAKE' })
      .expect(400).send('Sort must be one of App or Rating');
  });

  //testing the sort section
  ['App','Rating'].forEach(validSort =>{
    it(`should return apps sorted by ${validSort}`, () => {
      return supertest(app)
        .get('/apps')
        .query({sort: validSort})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          let i=0,sorted=true;
          while(sorted && i<res.body.length-1){
            sorted=sorted && res.body[i][validSort]<=res.body[i+1][validSort];
            i++;
          }
          expect(sorted).to.be.true ;
        });
    });
  });
 

  it('should return an error because invalid genre', () => {
    return supertest(app)
      .get('/apps')
      .query({genres: 'drama'})
      .expect(400).send('Genre must be Action,Puzzle,strategey,Casual,Arcade,Card');
  });
  
});


 

