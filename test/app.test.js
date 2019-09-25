const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

//testing to make sure that /apps doesnt load anything

describe('Express App', () => {
    it('should say please enter a valid param', () => {
        return supertest(app)
          .get('/apps')
          .expect(400).send('Please enter a valid param');
      });
  });


  //testing for the genre section

  describe('Genre search', () => {
    it('should return array of genre apps', () => {
      return supertest(app)
        .get('/apps')
        .query({genre: 'Arcade'})
        .expect(200)
        .expect('Content-Type', /json/)
        .send('Array of Arcade games')
    });

    it('should NOT return array of genre apps', () => {
      return supertest(app)
        .get('/apps')
        .query({genre: ''})
        .expect(400, 'Enter a valid genre');
    });
  })

  //testing the sort section

  describe('Sorting Apps', () => {
    it('should return apps sorted by App name', () => {
      return supertest(app)
        .get('/apps')
        .query({
          genre: 'Arcade',
          sort: 'App'})
        .expect('Content-Type', /json/)
        .expect(200).send('Array of sorted by App name');
    });

    it('should return sorted by Rating', () => {
      return supertest(app)
        .get('/apps')
        .query({
          genre: 'Arcade',
          sort: 'Rating'})
        .expect('Content-Type', /json/)
        .expect(200).send('Array of sorted by Rating');
    });

    it('should return an error because no genre selected', () => {
      return supertest(app)
        .get('/apps')
        .query({sort: 'App'})
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(400).send('No genre selected');
    });

    it('should return an error because no genre selected', () => {
      return supertest(app)
        .get('/apps')
        .query({sort: 'Rating'})
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(400).send('No genre selected');
    });
  })