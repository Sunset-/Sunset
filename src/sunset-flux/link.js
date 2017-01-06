export default function link(store, map, func) {
	var topic,
		listenerIds = [];
	if (typeof map == "object") {
		for (var k in map) {
			if (map.hasOwnProperty(k)) {
				(function(k) {
					topic = map[k];
					listenerIds.push(store.listen(topic, function(data) {
						var dataToState = {};
						dataToState[k] = data;
						func(dataToState);
					}));
				})(k);
			}
		}
	} else {
		listenerIds.push(store.listen(function(data) {
			var dataToState = {};
			dataToState[map] = data;
			func(dataToState);
		}));
	}
	return function(){
		listenerIds.forEach(id=>store.unListen(id));
	}
}