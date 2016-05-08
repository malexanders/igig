"use strict";

var MyGlobal = {};

$(document).on('ready', function(){

	var search = new MapSearch();

	search.init();

	$('#calculate-route').off('reset').on('reset', function(){
		console.log('reset');
		search.init();
		search.boxes.clear();
	})

	$('#calculate-route').off('submit').on('submit', function(event){
		event.preventDefault();
		console.log('submit');
		search.query = document.getElementById("search").value;

		var routeSearch = new MyGlobal.findRoutes({
			originPlaceId: search.placeInputIds.originPlaceId,
			destinationPlaceId: search.placeInputIds.destinationPlaceId,
			directionsService: search.directionsService,
			directionsDisplay: search.directionsDisplay,
			travel_mode: search.travel_mode
		})
		.then(function(response){
			var routeBoxes = new MyGlobal.routeBoxes({
				radius: parseFloat(document.getElementById("radius").value),
				path: response.routes[0].overview_path,
				map: search.map
			});
			routeBoxes.draw();
			var radarSearch = new MyGlobal.radarSearch(search.placesService);
			var radarPromise = MyGlobal.radarSearchByBoxes(routeBoxes.bounds, search.query, radarSearch)
		.then(function(places){
			alert("done");
		});

		});

	});
});

function MapSearch(config){
	this.map;
	this.query;
	this.places = [];
	this.placeInputIds;
	this.routeRequest;
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
		this.directionsInitialize();
		this.placeInputIds = new MyGlobal.inputAutocomplete(this.map, this.originInputElement, this.destinationInputElement);
		this.placesService = new google.maps.places.PlacesService(this.map);
	},
	initializeMap: function(){
		this.map = MyGlobal.map();
	},
	directionsInitialize: function(){
		this.directionsDisplay = new google.maps.DirectionsRenderer();
		this.directionsDisplay.setMap(this.map);
		this.directionsService = new google.maps.DirectionsService();
	},
	resetPlaceIds: function(){
		this.placeInputs.destinationPlaceId = null;
		this.placeInputs.originPlaceId = null;
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
//     route(originPlaceId, destinationPlaceId, travel_mode,
//           directionsService, directionsDisplay);
//   });
// }

// setupClickListener('changemode-walking', google.maps.TravelMode.WALKING);
// setupClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
// setupClickListener('changemode-driving', google.maps.TravelMode.DRIVING);

// }
