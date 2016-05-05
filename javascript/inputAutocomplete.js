$(document).on('ready', function(){
	MyGlobal.originAutocomplete = function(map, inputElement){
		var origin_autocomplete = new google.maps.places.Autocomplete(inputElement);
		origin_autocomplete.bindTo('bounds', map);
		origin_autocomplete.addListener('place_changed', function() {
			var place = origin_autocomplete.getPlace();
			if (!place.geometry) {
				window.alert("Autocomplete's returned place contains no geometry");
				return;
			}
			MyGlobal.originPlace = place;
			MyGlobal.originPlaceId = place.place_id;
			MyGlobal.zoom(map, place);
		});
	}

	MyGlobal.destinationAutocomplete = function(map, inputElement){
		var destination_autocomplete = new google.maps.places.Autocomplete(this.destinationInputElement);
		destination_autocomplete.bindTo('bounds', map);
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
	}


})


// destination_autocomplete: function(){

// },
