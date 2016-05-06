$(document).on('ready', function(){
	MyGlobal.searchByBoxes = function(bounds){
		var me = this;
		for (var i = 0; i < bounds.length; i++) {
			(function(i) {
				setTimeout(function() {
					// Perform search on the bound and save the result
					me.radarSearch(bounds[i]);
					//If the last box
					if ((bounds.length - 1) === i) {
						me.addMarkers(this.places);
					}
				}, 1000 * i);
			}(i));
		}
	}
})
