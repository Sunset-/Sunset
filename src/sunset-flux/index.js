import createActions from './createActions';
import Store from './Store';
import Connect from './vueAdapter';
import Event from './event';
//import Connect from './reactAdapter';


var e = {
	createActions,
	Connect,
	Event,
	Store
};

module.exports = e;


//使用说明：
/* 

 var Actions1 = createActions(['look','sing']);
 var Actions2 = createActions(['say','jump']);

class CustomStore extends Store{
	constructor(){
		super([Actions1,Actions2]);
	}
 	onLook : function(name){
 	},
 	onSing : function(){
 	},
 	onSay : function(){
 	},
 	onJump : function(){
 	}
 });

 @Connect(Store,$mapping)
 class ReactComponent{}	

 $mapping说明：
 1.string:会把store中的根对象以$mapping名字映射到state中
 example:@Connect(Store,"taskData")

 2.object:会把store中的命名空间下的数据以$mapping的key映射到state中
 example:@Connect(Store,{tasks : "taskData.tasks",taskCount : "taskData.count"})

 */