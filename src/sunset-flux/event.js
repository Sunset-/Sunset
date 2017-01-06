import Store from './Store';

export default (store,event)=>(target,name,desc)=>{
	if (!(store instanceof Store)) {
		throw new Error("store must be a sunset-flux Store, use sunset-flux : createStore");
	} else if (typeof event != "string") {
		throw new Error("event must be a string");
	}
	store.subscribe(event,desc.value);
}