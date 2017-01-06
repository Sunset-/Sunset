import React from 'react';
import Store from './Store';


function before(target, method, aop) {
	var originMethod = target[method];
	target[method] = function(...args) {
		aop.apply(this, args);
		originMethod && originMethod.apply(this, args);
	}
}

function after(target, method, aop) {
	var originMethod = target[method];
	target[method] = function(...args) {
		originMethod && originMethod.apply(this, args);
		aop.apply(this, args);
	}
}

function link(store, map, func) {
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

function adapter(store, map) {
	var mapType = typeof map;
	if (!(store instanceof Store)) {
		throw new Error("store must be a sunset-flux Store, use sunset-flux : createStore");
	} else if (mapType != "string" && mapType != "object") {
		throw new Error("mapping must be a string or a object");
	}
	return function(target) {
		var prototype = target.prototype,
			unLinkStore;
		//监听store
		before(prototype, 'componentWillMount', function() {
			var self = this;
			unLinkStore = link(store, map, function(dataToState) {
				self.setState(dataToState);
			});
			//初始化数据
			var initData = {};
			if(mapType == "string"){
				initData[map] = store.get();
			}else{
				for(var key in map){
					if(map.hasOwnProperty(key)){
						initData[key] = store.get(map[key]);
					}
				}
			}
			self.setState(initData);
		});
		//移除监听
		after(prototype,'componentWillUnmount',function(){
			unLinkStore();
		});

	}
}

var Connect = adapter;

export default Connect;

