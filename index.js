module.exports = (function() {
	'use strict';

	var util = require('util'), hyperquest = require('hyperquest'), Promise = require('promise');

	var API_URL = 'http://data.leafly.com';

	// Quick function to replace all spaces with dashes
	function dashify(str) {
		if(str.indexOf(' ') === -1) return str;

		str = str.replace(' ', '-');
		return dashify(str);
	}

	// Quick function to make requests
	function request(url, options) {
		return new Promise(function(resolve, reject) {
  			var cb = function(err, res) {
				if(res && res.statusCode === 301 || res.statusCode === 302) 
				return hyperquest(res.headers.Location, options, cb);
			}, req = hyperquest(url, options, cb), body = '';

			if(options.method === 'POST' && options.body) {
				req.write(options.body);
				req.end();
			}
			
			req.on('response', function(res) {
				if(res && res.statusCode !== 200) reject(new Error('Response code: ' + res.statusCode)); 

				res.on('data', function(chunk) {
					body += chunk.toString();
				});
		
				res.on('end', function() {
					resolve(body);
				});
			});
			
			req.on('error', function(err) {
				if(err) reject(err);
			});
		});
	}

	return {
		// Searchs all available strains or locations 
		search: function(api, options) {
			if(!options.app_id) return Promise.reject(new Error('App ID must be defined to use this API'));
			if(!options.app_key) return Promise.reject(new Error('App Key must be defined to use this API'));
			if(options.page < 0) return Promise.reject(new Error('Invalid page value. It must be greater than 0'));
			if(options.take <= 0 || options.take > 50) return Promise.reject(new Error('Invalid take value. It must be greater than 0' + 
					'and less than or equal to 50'));

			if(api.toLowerCase() === 'strains') {
				var body = JSON.stringify(options);

				return request(util.format('%s/%s', API_URL, api), { method: 'POST', body: body, headers: { app_id: 
					options.app_id, app_key: options.app_key, 'Content-Type': 'application/json', 
					'Content-Length' : body.length } }).then(JSON.parse); 
			}
			else if(api.toLowerCase() === 'locations') {
				if(!options.latitude) return Promise.reject(new Error('Latitude must be defined to use this API'));
				if(!options.longitude) return Promise.reject(new Error('Longitude must be defined to use this API'));

				// TODO: Ugly, fix ASAP
				var body = util.format('page=%d&take=%d&latitude=%d&longitude=%d&storefront=%s&delivery=%s&retail=%s&medical=%s&creditcards=%s'
					+ '&hasclones=%s&hasconcentrates=%s&hasedibles=%s&veterandiscount=%s', options.page, options.take, 
					options.latitude, options.longitude, (options.storefront || ''), (options.delivery || ''),(options.retail || ''), 
					(options.medical || ''), (options.creditcards || ''), (options.hasclones || ''), (options.hasconcentrates || ''), 
					(options.hasedibles || ''), (options.veterandiscount || '')); 

				if(options.strainIds) { // Append strain ids only if present
					body += util.format('&strainIds=%s', options.strainIds);
				}

				return request(util.format('%s/%s', API_URL, api), { method: 'POST', body: body, headers: { app_id: options.app_id, 
					app_key: options.app_key, 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length' : body.length } 
				}).then(JSON.parse); 
			} 
			else Promise.reject(new Error('Unknown API for search'));
		},
		// Searches specific strain information
		strain: function(slug, options) {
			if(!options.app_id) return Promise.reject(new Error('App ID must be defined to use this API'));
			if(!options.app_key) return Promise.reject(new Error('App Key must be defined to use this API'));

			return request(util.format('%s/strains/%s', API_URL, dashify(slug)), { method: 'GET', headers: { app_id: options.app_id, 
				app_key: options.app_key } }).then(JSON.parse);	
		},
		// Searches user reviews on specific strains or locations
		reviews: function(api, slug, options) { 
			if(!options.app_id) return Promise.reject(new Error('App ID must be defined to use this API'));
			if(!options.app_key) return Promise.reject(new Error('App Key must be defined to use this API'));
			if(options.take <= 0 || options.take > 20) return Promise.reject(new Error('Invalid take value. It must be greater than 0' + 
					'and less than or equal to 20'));

			// Determine if we're looking up the strains or locations api
			if(api.toLowerCase() === 'strains') {
				if(options.page < 0) return Promise.reject(new Error('Invalid page value. It must be greater than 0'));
				
				return request(util.format('%s/strains/%s/reviews?page=%d&take=%d&sort=%s', API_URL, dashify(slug), options.page, options.take, 
					(options.sort || '')), { method: 'GET', headers: { app_id: options.app_id, app_key: options.app_key } }).then(JSON.parse);
			}
			else if(api.toLowerCase() === 'locations') {
				if(options.skip < 0) return Promise.reject(new Error('Invalid skip value. It must be greater than 0'));

				return request(util.format('%s/locations/%s/reviews?skip=%d&take=%d', API_URL, dashify(slug), options.skip, options.take), 
					{ method: 'GET', headers: { app_id: options.app_id, app_key: options.app_key } }).then(JSON.parse);
			}
			else return Promise.reject(new Error('Unknown API for reviews'));
		},
		// Get more detailed information about a single review
		review: function(slug, options) {
			if(!options.app_id) return Promise.reject(new Error('App ID must be defined to use this API'));
			if(!options.app_key) return Promise.reject(new Error('App Key must be defined to use this API'));
			if(!options.reviewid) return Promise.reject(new Error('Review ID must be defined to use this API'));

			return request(util.format('%s/strains/%s/reviews/%d', API_URL, dashify(slug), options.reviewid), { method: 'GET', 
				headers: { app_id: options.app_id, app_key: options.app_key } }).then(JSON.parse);
		},
		// Retrieve pictures of specified strain
		pictures: function(slug, options) {
			if(!options.app_id) return Promise.reject(new Error('App ID must be defined to use this API'));
			if(!options.app_key) return Promise.reject(new Error('App Key must be defined to use this API'));
			if(options.page < 0) return Promise.reject(new Error('Invalid page value. It must be greater than 0'));
			if(options.take <= 0 || options.take > 20) return Promise.reject(new Error('Invalid take value. It must be greater than 0' + 
				'and less than or equal to 20'));
				
			return request(util.format('%s/strains/%s/photos?page=%d&take=%d', API_URL, dashify(slug), options.page, options.take), 
				{ method: 'GET', headers: { app_id: options.app_id, app_key: options.app_key } }).then(JSON.parse);
		},
		// Find dispensaries and retail locations that have the strain on their menu.
		availability: function(slug, options) {
			if(!options.app_id) return Promise.reject(new Error('App ID must be defined to use this API'));
			if(!options.app_key) return Promise.reject(new Error('App Key must be defined to use this API'));
			if(!options.lat) return Promise.reject(new Error('Latitude must be defined to use this API'));
			if(!options.lon) return Promise.reject(new Error('Longitude must be defined to use this API'));
				
			return request(util.format('%s/strains/%s/availability?lat=%d&lon=%d&radius=%d&filter=%s', API_URL, dashify(slug), options.lat, 
				options.lon, (options.radius || 20), (options.filter || '')), { method: 'GET', headers: { app_id: options.app_id, 
				app_key: options.app_key } }).then(JSON.parse);
		},
		// Information about dispensary or retail locations
		location: function(slug, options) {
			if(!options.app_id) return Promise.reject(new Error('App ID must be defined to use this API'));
			if(!options.app_key) return Promise.reject(new Error('App Key must be defined to use this API'));
	
			return request(util.format('%s/locations/%s', API_URL, dashify(slug)), { method: 'GET', headers: { app_id: options.app_id, 
				app_key: options.app_key } }).then(JSON.parse);
		},
		// Get the menu of specified location
		menu: function(slug, options) {
			if(!options.app_id) return Promise.reject(new Error('App ID must be defined to use this API'));
			if(!options.app_key) return Promise.reject(new Error('App Key must be defined to use this API'));

			return request(util.format('%s/locations/%s/menu', API_URL, dashify(slug)), { method: 'GET', headers: { app_id: options.app_id, 
				app_key: options.app_key } }).then(JSON.parse);
		},
		// List of specials for location
		specials: function(slug, options) {
			if(!options.app_id) return Promise.reject(new Error('App ID must be defined to use this API'));
			if(!options.app_key) return Promise.reject(new Error('App Key must be defined to use this API'));

			return request(util.format('%s/locations/%s/specials', API_URL, dashify(slug)), { method: 'GET', headers: { app_id: options.app_id, 
				app_key: options.app_key } }).then(JSON.parse);
		}
	};
})();

