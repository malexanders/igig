$(document).on('ready', function(){
	MyGlobal.zoom = function (map, place){
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}
	}

})
