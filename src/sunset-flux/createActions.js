export default function createActions(actions){

	var ActionHolder = {
		actions  : actions
	};

	actions.forEach((action)=>{
		ActionHolder[action] = function(...args){
			args.unshift(action);
			this.__store&&this.__store.publish.apply(this.__store,args);
		}
	});

	return ActionHolder;
}