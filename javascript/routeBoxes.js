$(document).on('ready', function(){
	MyGlobal.routeBoxes = function(config){
		this.radius = config.radius;
		this.path = config.path;
		this.map = config.map;
		this.routeBoxer = new RouteBoxer();

		this.draw = function(){
			var bounds = this.routeBoxer.box(this.path, this.radius);
			this.boxpolys = new Array(bounds.length);
			for (var i = 0; i < bounds.length; i++) {
				this.boxpolys[i] = new google.maps.Rectangle({
					bounds: bounds[i],
					fillOpacity: 0,
					strokeOpacity: 1.0,
					strokeColor: '#000000',
					strokeWeight: 1,
					map: this.map
				});
			}
		};
		this.clear = function(){
			if (this.boxpolys != null) {
				for (var i = 0; i < this.boxpolys.length; i++) {
					this.boxpolys[i].setMap(null);
				}
			}
			this.boxpolys = null;
		};

	}

	// Box Around the overview path of the first route
	// if (originPlaceId && destinationPlaceId) {
	// 	var path = me.grabFirstRoute(response);
	// 	me.initBoxes(path, me.map);
	// 	me.searchByBoxes(me.boxes.bounds);
	// }
})

// var Boxes = {
// 	radius: null,
// 	boxpolys: null,
// 	bounds: null,
//
//
// 	draw: function(map){
//
// 	},
// 	clear: function(){
//
// 	}
// }
