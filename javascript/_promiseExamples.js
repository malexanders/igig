function testPromiseRev0() {
	var log = document.getElementById('log');

	var p1 = new Promise(
		function(resolve, reject) {

			var routeSearch = new MyGlobal.findRoutes({
				originPlaceId: search.placeInputIds.originPlaceId,
				destinationPlaceId: search.placeInputIds.destinationPlaceId,
				directionsService: search.directionsService,
				directionsDisplay: search.directionsDisplay,
				travel_mode: search.travel_mode
			}, function(){resolve(routeSearch.response)});
		}
	);

	p1.then(
		// Log the fulfillment value
		function(val) {
			log.insertAdjacentHTML('beforeend', val +
				') Promise fulfilled (<small>Async code terminated</small>)<br/>');
		})
	.catch(
		// Log the rejection reason
		function(reason) {
			console.log('Handle rejected promise ('+reason+') here.');
		});
}

function testPromiseRev1() {
	var log = document.getElementById('log');

	var routeSearch = new MyGlobal.findRoutes({
		originPlaceId: search.placeInputIds.originPlaceId,
		destinationPlaceId: search.placeInputIds.destinationPlaceId,
		directionsService: search.directionsService,
		directionsDisplay: search.directionsDisplay,
		travel_mode: search.travel_mode
	});

	// We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
	var p1 = new Promise(
		// The resolver function is called with the ability to resolve or
		// reject the promise
		function(resolve, reject) {
			// This is only an example to create asynchronism
			window.setTimeout(
				function() {
					// We fulfill the promise !
					resolve(routeSearch.response);
				}, Math.random() * 2000 + 1000);
		}
	);

	// We define what to do when the promise is resolved/fulfilled with the then() call,
	// and the catch() method defines what to do if the promise is rejected.
	p1.then(
		// Log the fulfillment value
		function(val) {
			log.insertAdjacentHTML('beforeend', val +
				') Promise fulfilled (<small>Async code terminated</small>)<br/>');
		})
	.catch(
		// Log the rejection reason
		function(reason) {
			console.log('Handle rejected promise ('+reason+') here.');
		});

}
