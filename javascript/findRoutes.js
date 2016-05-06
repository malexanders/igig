$(document).on('ready', function(){
	MyGlobal.findRoutes = function(config){
		var me = this;
		this.response;
		this.directionsService = config.directionsService;
		this.originPlaceId = config.originPlaceId;
		this.destinationPlaceId = config.destinationPlaceId
		this.travel_mode = config.travel_mode;
		this.grabFirstRoute = function(){
			return this.response.routes[0].overview_path; // first route from directions service response
		};

		if (!config.originPlaceId || !config.destinationPlaceId) {
			return;
		}
		var p1 = new Promise(function(resolve, reject) {
			config.directionsService.route({
				origin: {'placeId': config.originPlaceId},
				destination: {'placeId': config.destinationPlaceId},
				travelMode: config.travel_mode
			}, function(response, status){
				if (status === google.maps.DirectionsStatus.OK) {
					me.response = response;
					config.directionsDisplay.setDirections(response);
					resolve(response);
				} else {
					window.alert('Directions config failed due to ' + status);
				}
			});
		});
		return p1
	}
})
