// Tests various functions of the Locations API for input errors
var assert = require('assert'), leafly = require('../index');

// Warning: You will need your own app id and key to test these functions
// For mocking purposes, I've used a fake app id and key 
// TODO: Add mock data
var APP_ID = 'YOUR_APP_ID', APP_KEY = 'YOUR_APP_KEY';

// Search
describe('Locations API: Search for locations', function() {
  describe('#search(api, options)', function() {
    it('should return error on missing app key and id', function() {
      	assert.throws(leafly.search('locations', { page: 0, take: 10 }).then(function(locations) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid page value. It must be greater than 0', function() {
      	assert.throws(leafly.search('locations', { page: -10, take: 10, app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' })
      	.then(function(locations) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid take value. It can only have a max of 50', function() {
      	assert.throws(leafly.search('locations', { page: 0, take: 55, app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' })
      	.then(function(locations) {}).catch(function(err) { throw err; }));
    });
    it('should return error on missing latitude and longitude values', function() {
      	assert.throws(leafly.search('locations', { page: 0, take: 45, app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' })
      	.then(function(locations) {}).catch(function(err) { throw err; }));
    });
  });
});

// Location
describe('Locations API: Information about dispensary or retail locations', function() {
  describe('#location(location_name, options)', function() {
  	it('should return error on missing app key and id', function() {
      	assert.throws(leafly.location('denver relief', {}).then(function(location) {}).catch(function(err) { throw err; }));
    });
  });
});

// Menu
describe('Locations API: Get the menu of specified location', function() {
  describe('#menu(location_name, options)', function() {
  	it('should return error on missing app key and id', function() {
      	assert.throws(leafly.menu('blue dream', {}).then(function(menu) {}).catch(function(err) { throw err; }));
    });
  });
});

// Reviews
describe('Locations API: Retrieves detailed information about a review', function() {
  describe('#reviews(api, strain_name, options)', function() {
  	it('should return error on missing app key and id', function() {
      	assert.throws(leafly.reviews('locations', 'blue dream', {}).then(function(reviews) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid skip value', function() {
      	assert.throws(leafly.reviews('locations', 'blue dream', { skip: -1, take: 10, app_id: '188edud9as', 
      		app_key: '28ehdCjD73837sjs99uduasi9nHD' }).then(function(reviews) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid page value', function() {
      	assert.throws(leafly.reviews('locations', 'blue dream', { skip: 0, take: 30, app_id: '188edud9as', 
      		app_key: '28ehdCjD73837sjs99uduasi9nHD' }).then(function(reviews) {}).catch(function(err) { throw err; }));
    });
  });
});

// Specials
describe('Locations API: Retrieve pictures of specified strain', function() {
  describe('#specials(strain_name, options)', function() {
  	it('should return error on missing app key and id', function() {
      	assert.throws(leafly.specials('denver relief', {}).then(function(specials) {}).catch(function(err) { throw err; }));
    });
  });
});
