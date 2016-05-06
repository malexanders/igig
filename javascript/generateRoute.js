$(document).on('ready', function(){
	MyGlobal.generateRoute = function(request){
		var me = this;
		this.response;

		if (!request.originPlaceId || !request.destinationPlaceId) {
			return;
		}

		request.directionsService.route({
			origin: {'placeId': request.originPlaceId},
			destination: {'placeId': request.destinationPlaceId},
			travelMode: request.travel_mode
		}, function(response, status){
			if (status === google.maps.DirectionsStatus.OK) {
				me.response = response;

				// Box Around the overview path of the first route
				// if (originPlaceId && destinationPlaceId) {
				// 	var path = me.grabFirstRoute(response);
				// 	me.initBoxes(path, me.map);
				// 	me.searchByBoxes(me.boxes.bounds);
				// }
			} else {
				window.alert('Directions request failed due to ' + status);

			}
		});

	}
})
