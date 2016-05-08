$(document).on('ready', function(){
	MyGlobal.radarSearchByBoxes = function(bounds, query, radarSearch){
		var me = this;
		this.query = query;
		this.radarSearch = radarSearch;
		this.bounds = bounds;
		var p1 = new Promise(function(resolve, reject) {
			for (var i = 0; i < me.bounds.length; i++) {
				(function(i) {
					setTimeout(function() {

						// Perform search on the bound and save the result
						// Places are saved to the radarSearch object
						me.radarSearch.execute(me.bounds[i], query)
						.then(function(){
							// If the last box
							if ((me.bounds.length - 1) === i) {
								// Return places from radarSearch object
								resolve(me.radarSearch.places);
							}
						});

					}, 1000 * i);
				}(i));
			}
		});
		return p1;
	}
})
