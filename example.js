(function() {
	'use strict';

	var leafly = require('leafly');
	
	var APP_KEY = 'YOUR_APP_KEY', APP_ID = 'YOUR_APP_ID';

	// Examples of the Strains API

	// Search for strains with specific properties or text in the name
	// Find recently added blueberry-flavored strains
	// Returns a specified list of strains according to search values
	// See Appendix A below for full list of filter values
	leafly.search('strains', 
	{ 
		page: 0, // required
		take: 20, // required - how many results to return - max amount that can be taken is 50
		search: 'blue', // optional - text to search for in strain name
		sort: 'newest', // optional - sort by rating, alpha, newest, popular
		filters: { // optional - filters
			flavors: ['blueberry'],
			category: ['hybrid'],
			exclude: ['dry-mouth'],
			conditions: ['anxiety'],
			tags: ['anxious'],
			symptoms: ['stress']
		},
		app_key: APP_KEY, // required
		app_id: APP_ID // required
	}).then(function(strains) {
		console.log(strains);
	}).catch(function(err) {
		console.error(err);
	}); 
 	
	// This operation returns high-level information about each strain.
	// Details include a description, number of reviews, overall review score (out of 10), flavors, and effect information.
	leafly.strain('girl scout cookie', 
	{ 
		app_key: APP_KEY, // required
		app_id: APP_ID  // required
	}).then(function(strain) {
		console.log(strain);
	}).catch(function(err) {
		console.error(err);
	}); 

	// Retrieve user reviews for specified strain.
	// Returns a list of reviews
	leafly.reviews('strains', 'pineapple express', 
	{
		page: 0, // required
		take: 20, // required - how many results to return - max amount that can be taken is 20
		sort: 'rating', // optional - can be 'date' or 'rating' - defaults to 'date' if not defined
		app_key: APP_KEY, // required
		app_id: APP_ID // required
	}).then(function(reviews) {
		console.log(reviews);
	}).catch(function(err) {
		console.error(err);
	}); 

	// Get more detailed information about a single review
	// Returns a detailed review object
	leafly.review('pineapple express', 
	{
		reviewid: 13072, // required  
		app_key: APP_KEY, // required
		app_id: APP_ID // required
	}).then(function(review) {
		console.log(review);
	}).catch(function(err) {
		console.error(err);
	}); 

	// Retrieve pictures of specified strain
	// Returns a list of pictures
	leafly.pictures('gods gift',
	{
		page: 0, // required
		take: 20, // required - how many results to return - max amount that can be taken is 20
		app_key: APP_KEY, // required
		app_id: APP_ID // required
	}).then(function(pictures) {
		console.log(pictures);
	}).catch(function(err) {
		console.error(err);
	});
	
	// Find dispensaries and retail locations that have the strain on their menu.
	// Returns a list of available dispensaries and locations or [] if not found
	leafly.availability('ak-47', 
	{
		lat: 32.7150, // required - latitude
		lon: -117.1625, // required - longitude
		radius: 50, // optional - in miles, default is 20
		filter: 'flower', // optional - filter by type 'flower', 'clone', 'preroll', 'seeds', 
		// 'edible', 'concentrate', 'other'
		app_key: APP_KEY, // required
		app_id: APP_ID // required
	}).then(function(locations) {
		console.log(locations);
	}).catch(function(err) {
		console.error(err);
	}); 

	// Examples of the Locations API

	// Search for dispensaries, deliveries, and retail stores within 20 miles of provided latitude & longitude.
	// Returns a specific list of locations according to search values
	leafly.search('locations', 
	{
		page: 0, // required
		take: 10, // required - how many results to return - max amount that can be taken is 50
		latitude: 47.607, // required 
		longitude: -122.333, // required
		storefront: false, // optional - Only return results with physical locations 
		delivery: false, // optional - Only return delivery services 
		retail: false, // optional - Only return retail locations (for CO & WA) 
		medical: false, // optional - Only return medical dispensaries
		creditcards: false, // optional - Return locations that accept credit cards on site
		hasclones: false, // optional - Only locations with clones available
		hasconcentrates: false, // optional - Only locations with concentrates on the menu
		hasedibles: false, // optional - Only locations with edibles on the menu
		veterandiscount: false, // optional - Only locations that offer a discount for veterans
		// strainIds: '14201,12322' // optional - Returns only locations that have specific strains on the menu. If multiple strains 
		// are specified, results are OR'd together. 
		app_key: APP_KEY, // required
		app_id: APP_ID  // required
	}).then(function(locations) {
		console.log(locations);
	}).catch(function(err) {
		console.error(err);
	}); 
	
	// Information about dispensary or retail locations
	// Returns a location object with details about the dispensary or location
	leafly.location('denver relief',
	{
		app_key: APP_KEY,
		app_id: APP_ID 
	}).then(function(location) {
		console.log(location);
	}).catch(function(err) {
		console.error(err);
	}); 

	// Get the menu of specified location
	// Returns the entire menu of the specified location
	leafly.menu('denver relief',
	{
		app_key: APP_KEY,
		app_id: APP_ID 
	}).then(function(location) {
		console.log(location);
	}).catch(function(err) {
		console.error(err);
	}); 
	
	// List of reviews for location
	// Returns a list of reviews for the specified location
	leafly.reviews('locations', 'denver relief',
	{
		skip: 0, // required
		take: 10, // required - max amount that can be taken is 20
		app_key: APP_KEY, // required
		app_id: APP_ID // required
	}).then(function(reviews) {
		console.log(reviews);
	}).catch(function(err) {
		console.error(err);
	}); 
	
	// List of specials for location
	// Returns a list of specials for the specified location
	leafly.specials('denver relief',
	{
		app_key: APP_KEY, // required
		app_id: APP_ID // required
	}).then(function(specials) {
		console.log(specials);
	}).catch(function(err) {
		console.error(err);
	});

})();