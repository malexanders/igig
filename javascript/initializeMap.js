$(document).on('ready', function(){
	MyGlobal.map = function(){
		var map = new google.maps.Map(document.getElementById('map'), {
			center: new google.maps.LatLng(0,0),
			zoom: 1,
			scrollwheel: false,
			zoomControl: true,
			mapTypeControl: true,
			scaleControl: true,
			streetViewControl: true,
			rotateControl: true,
			fullscreenControl: true
		});
		return map;
	}
})
