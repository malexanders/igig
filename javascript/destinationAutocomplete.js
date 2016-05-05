// MyGlobal.destinationAutocomplete = function(map, inputElement){
// 	var destination_autocomplete = new google.maps.places.Autocomplete(inputElement);
// 	destination_autocomplete.bindTo('bounds', map);
// 	destination_autocomplete.addListener('place_changed', function() {
// 		var place = destination_autocomplete.getPlace();
// 		if (!place.geometry) {
// 			window.alert("Autocomplete's returned place contains no geometry");
// 			return;
// 		}
// 		// If the place has a geometry, store its place ID and route if we have
// 		// the other place ID
// 		MyGlobal.destinationPlace = place;
// 		MyGlobal.destinationPlaceId = place.place_id;
// 		MyGlobal.zoom(map, place);
// 	});
// }
