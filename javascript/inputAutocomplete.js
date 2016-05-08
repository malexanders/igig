$(document).on('ready', function(){
	MyGlobal.inputAutocomplete = function (map, originInputElement, destinationInputElement){
		var me = this;
		this.originPlace;
		this.originPlaceId;
		this.destinationPlace;
		this.destinationPlaceId;

		var originAutocomplete = new google.maps.places.Autocomplete(originInputElement);

		originAutocomplete.bindTo('bounds', map);
		originAutocomplete.addListener('place_changed', function() {
			var place = originAutocomplete.getPlace();
			if (!place.geometry) {
				window.alert("Autocomplete's returned place contains no geometry");
				return;
			}
			MyGlobal.zoom(map, place);
			me.originPlace = place;
			me.originPlaceId = place.place_id;
		});

		var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInputElement);

		destinationAutocomplete.bindTo('bounds', map);
		destinationAutocomplete.addListener('place_changed', function() {
			var place = destinationAutocomplete.getPlace();
			if (!place.geometry) {
				window.alert("Autocomplete's returned place contains no geometry");
				return;
			}
			// If the place has a geometry, store its place ID and route if we have
			// the other place ID
			MyGlobal.zoom(map, place);
			me.destinationPlace = place;
			me.destinationPlaceId = place.place_id;
		});
	}
})
