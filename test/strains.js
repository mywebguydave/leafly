// Tests various functions of the Strains API for input errors
var assert = require('assert'), leafly = require('../index');

// Warning: You will need your own app id and key to test these functions
// For mocking purposes, I've used a fake app id and key 
// TODO: Add mock data
var APP_ID = 'YOUR_APP_ID', APP_KEY = 'YOUR_APP_KEY';

// Search
describe('Strains API: Search for strains', function() {
  describe('#search(api, options)', function() {
    it('should return error on missing app key and id', function() {
      	assert.throws(leafly.search('strains', { page: 0, take: 10 }).then(function(strains) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid page value. It must be greater than 0', function() {
      	assert.throws(leafly.search('strains', { page: -10, take: 10, app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' })
      	.then(function(strains) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid take value. It can only have a max of 50', function() {
      	assert.throws(leafly.search('strains', { page: 0, take: 55, app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' })
      	.then(function(strains) {}).catch(function(err) { throw err; }));
    });
  });
});

// Strain
describe('Strains API: Get detailed information about a strain', function() {
  describe('#strain(strain_name, options)', function() {
  	it('should return error on missing app key and id', function() {
      	assert.throws(leafly.strain('blue dream', {}).then(function(strain) {}).catch(function(err) { throw err; }));
    });
  });
});

// Reviews
describe('Strains API: Retrieve user reviews for a strain', function() {
  describe('#reviews(api, strain_name, options)', function() {
  	it('should return error on missing app key and id', function() {
      	assert.throws(leafly.reviews('strains', 'blue dream', {}).then(function(reviews) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid page value. It must be greater than 0', function() {
      	assert.throws(leafly.reviews('strains', 'blue dream', { page: -10, take: 10, app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' 
  		}).then(function(reviews) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid take value. It can only have a max of 20', function() {
     	 assert.throws(leafly.reviews('strains', 'blue dream', { page: 0, take: 25, app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' })
      	.then(function(reviews) {}).catch(function(err) { throw err; }));
    });
  });
});

// Review
describe('Strains API: Retrieves detailed information about a review', function() {
  describe('#review(strain_name, options)', function() {
  	it('should return error on missing app key and id', function() {
      	assert.throws(leafly.review('blue dream', {}).then(function(review) {}).catch(function(err) { throw err; }));
    });
    it('should return error on missing reviewid value', function() {
      	assert.throws(leafly.review('blue dream', { app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD'})
      	.then(function(review) {}).catch(function(err) { throw err; }));
    });
  });
});

// Pictures
describe('Strains API: Retrieve pictures of specified strain', function() {
  describe('#pictures(strain_name, options)', function() {
  	it('should return error on missing app key and id', function() {
      	assert.throws(leafly.pictures('blue dream', {}).then(function(pictures) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid page value. It must be greater than 0', function() {
      	assert.throws(leafly.pictures('blue dream', { page: -10, take: 10, app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' 
  		}).then(function(pictures) {}).catch(function(err) { throw err; }));
    });
    it('should return error on invalid take value. It can only have a max of 20', function() {
      	assert.throws(leafly.pictures('blue dream', { page: 0, take: 25, app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' })
      	.then(function(pictures) {}).catch(function(err) { throw err; }));
    });
  });
});

// Availability
describe('Strains API: Find dispensaries and retail locations that have the strain on their menu', function() {
  describe('#availability(strain_name, options)', function() {
  	it('should return error on missing app key and id', function() {
      	assert.throws(leafly.availability('blue dream', {}).then(function(locations) {}).catch(function(err) { throw err; }));
    });
    it('should return error on missing latitude and longitude', function() {
    	assert.throws(leafly.availability('blue dream', { app_id: '188edud9as', app_key: '28ehdCjD73837sjs99uduasi9nHD' })
    	.then(function(locations) {}).catch(function(err) { throw err; }));
    });
  });
});