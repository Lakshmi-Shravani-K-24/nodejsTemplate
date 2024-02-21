const assert = require('assert');
const request = require('supertest');
const app = require('../index.js').app;

describe('CRUD operations and routes', function() {
  let batteryId;

  // Test create battery
  it('should create a new battery', function(done) {
    request(app)
        .post('/batteries')
        .send({
          batteryname: 'Test Battery',
          temperature: 25,
          soc: 80,
          chargerate: 0.2,
          description: 'Test battery description',
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert(res.body._id);
          batteryId = res.body._id;
          done();
        });
  });

  // Test get batteries
  it('should get all batteries', function(done) {
    request(app)
        .get('/batteries')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert(Array.isArray(res.body));
          done();
        });
  });

  // Test update battery
  it('should update an existing battery', function(done) {
    request(app)
        .put(`/batteries/${batteryId}`)
        .send({
          temperature: 30,
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(res.body.modifiedCount, 1);
          done();
        });
  });

  // Test delete battery
  it('should delete an existing battery', function(done) {
    request(app)
        .delete(`/batteries/${batteryId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(res.body.message, 'Battery deleted successfully');
          done();
        });
  });
});
