$(document).on('ready', function(){
	MyGlobal.radarSearch = function(bound){
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
	}
})
