$(document).on('ready', function(){
	MyGlobal.autocomplete = function (map, originInputElement, destinationInputElement){
		var me = this;
		this.originPlace;
		this.originPlaceId;
		this.destinationPlace;
		this.destinationPlaceId;

		var origin_autocomplete = new google.maps.places.Autocomplete(originInputElement);
		origin_autocomplete.bindTo('bounds', map);
		origin_autocomplete.addListener('place_changed', function() {
			var place = origin_autocomplete.getPlace();
			if (!place.geometry) {
				window.alert("Autocomplete's returned place contains no geometry");
				return;
			}
			// MyGlobal.originPlace = place;
			// MyGlobal.originPlaceId = place.place_id;
			MyGlobal.zoom(map, place);
			me.originPlace = place;
			me.originPlaceId = place.place_id;
		});

		var destination_autocomplete = new google.maps.places.Autocomplete(destinationInputElement);
		destination_autocomplete.bindTo('bounds', map);
		destination_autocomplete.addListener('place_changed', function() {
			var place = destination_autocomplete.getPlace();
			if (!place.geometry) {
				window.alert("Autocomplete's returned place contains no geometry");
				return;
			}
			// If the place has a geometry, store its place ID and route if we have
			// the other place ID
			// MyGlobal.destinationPlace = place;
			// MyGlobal.destinationPlaceId = place.place_id;
			MyGlobal.zoom(map, place);
			me.destinationPlace = place;
			me.destinationPlaceId = place.place_id;
		});

	}

})


// destination_autocomplete: function(){

// },
