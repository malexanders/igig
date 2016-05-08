$(document).on('ready', function(){
	MyGlobal.radarSearch = function(placesService){
		var me = this;
		this.places = [];
		this.placesService = placesService;
		this.execute = function(bound, query){
			var p1 = new Promise(function(resolve, reject) {
				me.placesService.radarSearch({
					bounds: bound,
					keyword: query
				}, function(results, status){
					if (status !== google.maps.places.PlacesServiceStatus.OK) {
						console.error(status);
						resolve();
						return;
					}
					for (var i = 0; i < results.length; i++) {
						// Go through each result from the search and if the place exist already in our list of places then done push it in to the array
						// if (!placeExists(result.id)) {
						var result = results[i];
						me.places.push(result);
						resolve();
						console.log(result);
						// }

						// Last result
						// if ((results.length - 1) === i) {
						// 	// resolve(me.places);
						// 	return me.places
						// 	// me.addMarkers(this.places);
						// }

					}
				});
			})
			return p1;
		}
	}
})
