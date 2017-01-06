import Store from './Store';
import link from './link';


export default (store, map) => (target, name, desc) => {
	var mapType = typeof map;
	if (!(store instanceof Store)) {
		throw new Error("store must be a sunset-flux Store, use sunset-flux : createStore");
	} else if (mapType != "string" && mapType != "object") {
		throw new Error("mapping must be a string or a object");
	}
	var vueVM = desc.value();
	//link
	link(store, map, function(dataToState) {
		Object.assign(vueVM, dataToState)
	});
	//初始化数据
	var initData = {};
	if (mapType == "string") {
		initData[map] = store.get();
	} else {
		for (var key in map) {
			if (map.hasOwnProperty(key)) {
				initData[key] = store.get(map[key]);
			}
		}
	}
	Object.assign(vueVM, initData);

	vueVM.testProp = 123;
	desc.value = function() {
		return vueVM;
	}
	return desc;
}