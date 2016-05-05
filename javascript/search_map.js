"use strict";

var MyGlobal = {};

$(document).on('ready', function(){

	var search = new MapSearch({
		Boxes: Boxes
	});

	search.init();
	// var testing = new MyGlobal.originAutocomplete();

	$('#calculate-route').off('reset').on('reset', function(){
		console.log('reset');
		search.init();
		search.boxes.clear();
	})

	$('#calculate-route').off('submit').on('submit', function(event){
		event.preventDefault();
		console.log('submit');
		search.boxes.radius = parseFloat(document.getElementById("radius").value);
		search.query = document.getElementById("search").value
		search.generateRoute();
	})
})

function MapSearch(config){
	this.boxes = config.Boxes;
	this.map;
	this.originPlace;
	this.origin_place_id;
	this.destination_place_id;
	this.directionsDisplay;
	this.query;
	this.places = [];
}

MapSearch.prototype = {
	originInputElement: document.getElementById('from'),
	destinationInputElement: document.getElementById('to'),
	directionsService: {},
	placesService: {},
	travel_mode: google.maps.TravelMode.DRIVING,
	init: function() {
		var me = this;
		this.initializeMap();
		this.origin_autocomplete();
		// MyGlobal.originAutocomplete(this.map, this.originInputElement);
		this.destination_autocomplete();
		this.directionsInitialize();
		this.placesService = new google.maps.places.PlacesService(this.map);
	},
	initializeMap: function(){
		this.map = MyGlobal.map();
	},
	origin_autocomplete: function(){
		var origin_autocomplete = new google.maps.places.Autocomplete(this.originInputElement);
		origin_autocomplete.bindTo('bounds', this.map);

		var me = this;
		origin_autocomplete.addListener('place_changed', function() {
			var place = origin_autocomplete.getPlace();
			if (!place.geometry) {
				window.alert("Autocomplete's returned place contains no geometry");
				return;
			}
			// If the place has a geometry, store its place ID and route if we have
			// the other place ID
			me.origin_place_id = place.place_id;
			me.zoom(place);
		});
	},
	destination_autocomplete: function(){
		var destination_autocomplete = new google.maps.places.Autocomplete(this.destinationInputElement);
		destination_autocomplete.bindTo('bounds', this.map);

		var me = this;
		destination_autocomplete.addListener('place_changed', function() {
			var place = destination_autocomplete.getPlace();
			if (!place.geometry) {
				window.alert("Autocomplete's returned place contains no geometry");
				return;
			}
			// If the place has a geometry, store its place ID and route if we have
			// the other place ID
			me.destination_place_id = place.place_id;
			me.zoom(place);
		});
	},
	directionsInitialize: function(){
		this.directionsDisplay = new google.maps.DirectionsRenderer();
		this.directionsDisplay.setMap(this.map);
		this.directionsService = new google.maps.DirectionsService();
	},
	zoom: function(place){
		if (place.geometry.viewport) {
			this.map.fitBounds(place.geometry.viewport);
		} else {
			this.map.setCenter(place.geometry.location);
			this.map.setZoom(17);
		}
	},
	resetPlaceIds: function(){
		this.destination_place_id = null;
		this.origin_place_id = null;
	},
	grabFirstRoute: function(response){
		return response.routes[0].overview_path; // first route from directions service response
	},
	initBoxes: function(path, map){
		this.boxes.setBounds(path);
		this.boxes.draw(map);
	},
	generateRoute: function(){
		var me = this;
		// me.origin_place_id = MyGlobal.originPlaceId;
		if (!me.origin_place_id || !me.destination_place_id) {
			return;
		}

		me.directionsService.route({
			origin: {'placeId': me.origin_place_id},
			destination: {'placeId': me.destination_place_id},
			travelMode: me.travel_mode
		}, function(response, status){
			if (status === google.maps.DirectionsStatus.OK) {
				me.directionsDisplay.setDirections(response);

				// Box Around the overview path of the first route
				if (me.origin_place_id && me.destination_place_id) {
					var path = me.grabFirstRoute(response);
					me.initBoxes(path, me.map);
					me.searchByBoxes(me.boxes.bounds);
				}
			} else {
				window.alert('Directions request failed due to ' + status);

			}
		});
	},
	searchByBoxes: function(bounds){
		var me = this;
		for (var i = 0; i < bounds.length; i++) {
		   (function(i) {
			   setTimeout(function() {
				   // Perform search on the bound and save the result
				   me.radarSearch(bounds[i]);
				   //If the last box
				   if ((bounds.length - 1) === i) {
					me.addMarkers(this.places);
				   }
			   }, 1000 * i);
		   }(i));
		}
	},
	radarSearch: function(bound){
		var me = this;
		var request = {
			bounds: bound,
			keyword: me.query
		};
		me.placesService.radarSearch(request, function(results, status){
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
				console.error(status);
				return;
			}
			for (var i = 0; i < results.length; i++) {
			// Go through each result from the search and if the place exist already in our list of places then done push it in to the array
			// if (!placeExists(result.id)) {
				var result = results[i];
				me.places.push(result);
			// }
			}
		});
	},
	addMarkers: function (){
		var me = this;
	    for (var j = 0; j < me.places.length; j++){
	        console.log(me.places.length);

	        (function(j) {

	        setTimeout(function() {

	            me.placesService.getDetails({
	              placeId: me.places[j].place_id
	            }, function(result, status){
	                console.log(status);
	                console.log(result);

	                if(status == google.maps.places.PlacesServiceStatus.OK){
	                    var marker = new google.maps.Marker({
	                        map: me.map,
	                        place: {
	                            placeId: result.place_id,
	                            location: result.geometry.location
	                        }
	                    })
	                }
	            })

	        }, 1000 * j);

	        }(j));

	    };
	}
}

var Boxes = {
	radius: null,
	boxpolys: null,
	bounds: null,
	routeBoxer: new RouteBoxer(),
	setBounds: function(path){
		this.bounds = this.routeBoxer.box(path, Boxes.radius);
		this.boxpolys = new Array(this.bounds.length);
	},
	draw: function(map){
		for (var i = 0; i < this.bounds.length; i++) {
			this.boxpolys[i] = new google.maps.Rectangle({
				bounds: this.bounds[i],
				fillOpacity: 0,
				strokeOpacity: 1.0,
				strokeColor: '#000000',
				strokeWeight: 1,
				map: map
			});
		}
	},
	clear: function(){
		if (this.boxpolys != null) {
			for (var i = 0; i < this.boxpolys.length; i++) {
				this.boxpolys[i].setMap(null);
			}
		}
		this.boxpolys = null;
	}
}


function placeExists(placeID){
}



// put everything into the MapSearch Class
// Organize
// Make it work within the scope of the MapSearch class
// Management
// Scalability
// Dependency injection
// * never hardcord anything
// * pass config parameters during instantiation
// * can even pass functions
// * mind set
// 	*
// *

// var modes = document.getElementById('mode-selector');

// Turn an input into maps control
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

// function setupClickListener(id, mode) {
//   var radioButton = document.getElementById(id);
//   radioButton.addEventListener('click', function() {
//     travel_mode = mode;
//     route(origin_place_id, destination_place_id, travel_mode,
//           directionsService, directionsDisplay);
//   });
// }

// setupClickListener('changemode-walking', google.maps.TravelMode.WALKING);
// setupClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
// setupClickListener('changemode-driving', google.maps.TravelMode.DRIVING);

// }
