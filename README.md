# leafly
Leafly API client for leafly.com

## Examples

```javascript
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

	// Examples of the Location API

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
```

## Strains API
This API uses Promises/A+ - see here: http://promisesaplus.com/ 

### .search(api, options)
This function searches all available strains with the given search
filters. The api parameter must be 'strains' to access this specific
API. Required options are app_key, app_id, page and take. App key and id
can be retrieved in the developer section of leafly, which is required to 
use this API. Page represents the pagination context (0-based), which is 
included in each result to indicate if there are any more results. Take 
represents the amount of results to retrieve, the max is 50 for this specific 
endpoint. See above for an example on how to use, and see below for specific 
search filters.

### .strain(strain_name, options)
This function returns high-level information about each strain. Details 
include a description, number of reviews, overall review score (out of 10), 
flavors, and effect information. The strain_name parameter can be any known 
strain name. Required options are app_key and app_id. App key and id
can be retrieved in the developer section of leafly, which is required to use 
this API. See above for an example.

### .reviews(api, strain_name, options)
This function retrieves user reviews for the specified strain. The api parameter
can must be 'strains' to access this specific API. The strain_name parameter can 
be any known strain name. Required options are app_key, app_id, page and take. App 
key and id can be retrieved in the developer section of leafly, which is required to 
use this API. Page represents the pagination context (0-based), which is included in each 
result to indicate if there are any more results. Take represents the amount of results to 
retrieve, the max is 20 for this specific endpoint. There is one optional parameter which is 
sort. Sort can represent either 'date' or 'rating', the default if not defined is 'date'. 
See above for an example.

### .review(strain_name, options)
This function gets more detailed information about a single review. The strain_name parameter 
can be any known strain name. Required options are reviewid, app_key and app_id. The reviewid
option represents the id of user review you wish to access more detailed information on. App 
key and id can be retrieved in the developer section of leafly, which is required to use this 
API. See above for an example.

### .pictures(strain_name, options)
This function retrieves pictures of specified strain. The strain_name parameter can be any known 
strain name. Required options are app_key, app_id, page and take. App key and id can be retrieved 
in the developer section of leafly, which is required to use this API. Page represents the pagination 
context (0-based), which is included in each result to indicate if there are any more results. Take 
represents the amount of results to retrieve, the max is 20 for this specific endpoint. See above for 
an example.

### .availability(strain_name, options)
This function finds dispensaries and retail locations that have the strain on their menu. The strain_name 
parameter can be any known strain name. Required options are app_key, app_id, lat and lon. App key and id 
can be retrieved in the developer section of leafly, which is required to use this API. The lat option 
represents the latitude (float). The lon option represents the longitude (float). There are two optional
parameters, radius and filter. Radius by default if not defined searches up to 20 miles away from the given
latitude and longitude coordinates. Filter represents what type of product you are looking for, which can be
'flower', 'clone', 'preroll', 'seeds', 'edible', 'concentrate', and 'other'. See above for an example.

## Locations API
This API uses Promises/A+ - see here: http://promisesaplus.com/ 

### .search(api, options)
This function searches for dispensaries, deliveries, and retail stores within 20 miles of provided 
latitude & longitude. The api parameter must be 'locations' to access this specific API. Required options
are app_key, app_id, page, take, latitude, longitude. App key and id can be retrieved in the developer section 
of leafly, which is required to use this API. Page represents the pagination context (0-based), which is included 
in each result to indicate if there are any more results. Take represents the amount of results to retrieve, the max 
is 50 for this specific endpoint. The latitude option represents the latitude (float). The longitude option represents 
the longitude (float). There are various optional parameters such as storefront, delivery, retail, medical, creditcards,
hasclones, hasconcentrates, hasedibles, veterandiscount and strainIds. All of these optional parameters aside from 
strainIds are either true/false values to indicate whether to include them in the search or not. Strain ids are comma
seperated and are OR'd together when multiple values are provided. See above for an example.

### .location(location_name, options)
This function returns information about a dispensary or retail location. The location_name parameter 
can be any known location name of a dispensary or retail store. Required options are app_key and app_id.
App key and id can be retrieved in the developer section of leafly, which is required to use this API.
See above for an example.

### .menu(location_name, options)
This function returns a list of items on the menu for the given location. The location_name parameter 
can be any known location name of a dispensary or retail store. Required options are app_key and app_id.
App key and id can be retrieved in the developer section of leafly, which is required to use this API.
See above for an example.

### .reviews(api, location_name, options)
This function returns a list of reviews for the given location. The api parameter must be 'locations' to
access this specific API. The location_name parameter can be any known location name of a dispensary or retail 
store. Required options are app_key, app_id, skip and take. App key and id can be retrieved in the 
developer section of leafly, which is required to use this API. Skip parameter is used to skip any number of
results from the list. Page represents the pagination context (0-based), which is included in each result to 
indicate if there are any more results. See above for an example.

### .specials(location_name, options)
This function returns a list of specials for the given location. The location_name parameter can be any
known location name of a dispensary or retail store. Required options are app_key and app_id.
App key and id can be retrieved in the developer section of leafly, which is required to use this API.
See above for an example. 

For more detailed information, refer to developers docs: https://developer.leafly.com/docs

## Appendix A: Strain Search Filters
### Categories
	hybrid, indica, sativa

### Flavors
	ammonia, apple, apricot, berry, bluecheese, blueberry, butter, cheese, chemical, chestnut, citrus, coffee, diesel, earthy, flowery, grape, grapefruit, honey, lavender, lemon, lime, mango, menthol, mint, minty, nutty, orange, peach, pear, pepper, pine, pineapple, plum, pungent, rose, sage, skunk, spicyherbal, strawberry, sweet, tar, tea, tobacco, treefruit, tropical, vanilla, violet, woody

### Conditions
	addadhd, alzheimers, anorexia, anxiety, arthritis, asthma, bipolardisorder, cachexia, cancer, crohnsdisease, epilepsy, fibromyalgia, gastrointestinaldisorder, glaucoma, hivaids, hypertension, migraines, multiplesclerosis, musculardystrophy, parkinsons, phantomlimbpain, pms, ptsd, spinalcordinjury, tinnitus, tourettessyndrome

### Symptoms
	cramps, depression, eyepressure, fatigue, headaches, inflammation, insomnia, lackofappetite, musclespasms, nausea, pain, seizures, spasticity, stress

### Tags
	anxious, aroused, creative, dizzy, dryeyes, drymouth, energetic, euphoric, focused, giggly, happy, hungry, paranoid, relaxed, sleepy, talkative, tingly, uplifted

## Bugs/Errors
Please submit any issues or pull requests if you encounter an error, issue or missing feature with the module. 

## License
Copyright (c) 2014 OPFL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
