var count = 0;

function ReplaceFirstUper(str) {
	return str.replace(/\b(\w)|\s(\w)/g, function(m) {
		return m.toUpperCase();
	});
}

//获取命名空间下属性
function getAttribute(parent, namespace) {
	if (parent && namespace) {
		var ns = namespace.split(".");
		var obj = parent;
		for (var i = 0, l = ns.length; i < l; i++) {
			if (typeof obj == "object") {
				obj = obj[ns[i]];
				if (obj == null || obj == void 0) {
					return obj;
				}
			} else {
				return null;
			}
		}
		return obj;
	}
	return null;
};

//设置命名空间下的属性
function setAttribute(parent, namespace, value) {
	var lio,
		obj = parent;
	if (lio = namespace.lastIndexOf(".")) {
		var ns = namespace.split("."),
			obj = parent,
			attrName = namespace.substring(lio + 1);
		for (var i = 0, l = ns.length - 1; i < l; i++) {
			if (obj[ns[i]] == null || obj[ns[i]] === void 0) {
				obj[ns[i]] = {};
			}
			obj = obj[ns[i]];
		}
		obj[attrName] = value;
	} else {
		obj[namespace] = value;
	}
}

function warning(message) {
	if (typeof console !== 'undefined' && typeof console.error === 'function') {
		console.error(message)
	}
	try {
		throw new Error(message)
	} catch (e) {}
}

class Store {

	listeners = []

	topicListeners = []

	data = {}

	singleData = null

	constructor(actions) {
		//绑定事件
		actions && actions.forEach((actionHolder) => {
			this.subscribeActions(actionHolder);
		});
	}

	/**
	 * 安装远程请求插件
	 * @param  {[type]} requester [description]
	 * @return {[type]}           [description]
	 */
	static setup(requester,name){
		if(name===void 0){
			Store.prototype.$http = requester;
		}else{
			Store.prototype[name] = requester;
		}
	}

	subscribeActions(actionHolder) {
		var self = this;
		actionHolder.actions.forEach(action => {
			var callback = `on${ReplaceFirstUper(action)}`;
			if (self[callback]) {
				this.subscribe(action, function(...args) {
					self[callback].apply(self,args);
				});
			}
		});
		actionHolder.__store = this;
	}

	publish(event, ...args) {
		var self = this,
			afterListeners = [];
		this.listeners.forEach((l,i) => {
			if (l.__sunset_pubsub_event == event) {
				try {
					l.apply(self, args);
				} catch (e) {
					warning(e.toString());
				}
				if(!l.__sunset_pubsub_once){
					afterListeners.push(l);
				}
			}else{
				afterListeners.push(l);
			}
		});
	}

	subscribe(event, listener) {
		if (typeof event != 'string') {
			throw new Error('event must be a string');
		} else if (typeof listener != "function") {
			throw new Error('listener must be a function');
		}
		if (!listener.__sunset_pubsub_id) {
			listener.__sunset_pubsub_event = event;
			listener.__sunset_pubsub_id = `SUNSET_PUBSUB_${++count}`;
			this.listeners.push(listener);
		}
		return listener.__sunset_pubsub_id;
	}

	once(event, listener){
		listener&&(listener.__sunset_pubsub_once = true);
		this.subscribe(event, listener)
	}

	unSubscribe(id) {
		var ls = this.listeners;
		for (var i = 0, item; item = ls[i]; i++) {
			if (item.__sunset_pubsub_id == id) {
				ls.splice(i, 1);
				break;
			}
		}
	}

	/**
	 * 触发数据变更
	 * @param  {[type]} topic [description]
	 * @param  {[type]} data  [description]
	 * @return {[type]}       [description]
	 */
	trigger(updateData, topic) {
		//1.修改存储数据
		var data = this.data;
		if (arguments.length == 2) {
			this.singleData = "@@SUNSET_STORE_NULL_DATA@@";
			setAttribute(this.data, topic, updateData);
		} else {
			this.singleData = updateData;
		}
		var rootData = this.singleData == "@@SUNSET_STORE_NULL_DATA@@" ? data : this.singleData;
		//触发变更
		this.topicListeners.forEach((l) => {
			var lTopic = l.__sunset_pubsub_topic,
				all = topic === void 0,
				isChange = all || lTopic == null || lTopic == topic || ((lTopic + '.').indexOf(topic) == 0) || ((topic + '.').indexOf(lTopic) == 0);
			if (isChange) {
				try {
					var value = lTopic == null ? rootData : getAttribute(rootData, lTopic);
					l.call(null, value);
				} catch (e) {
					warning(e.toString());
				}
			}
		});
	}

	/**
	 * 监听主题
	 * @param  {[type]} topic [description]
	 * @return {[type]}       [description]
	 */
	listen(topic, listener) {
		if (typeof topic == 'function') {
			listener = topic;
			topic = null;
		}
		if (typeof listener != 'function') {
			throw new Error('listener must be a function');
		} else if (topic != null && typeof topic != 'string') {
			throw new Error('topic must be a string');
		}
		if (!listener.__sunset_pubsub_id) {
			listener.__sunset_pubsub_topic = topic;
			listener.__sunset_pubsub_id = `SUNSET_PUBSUB_${++count}`;
			this.topicListeners.push(listener);
		}
		return listener.__sunset_pubsub_id;
	}


	unListen(id) {
		var ls = this.topicListeners;
		for (var i = 0, item; item = ls[i]; i++) {
			if (item.__sunset_pubsub_id == id) {
				ls.splice(i, 1);
				break;
			}
		}
	}

	get(ns) {
		var rootData = this.singleData == "@@SUNSET_STORE_NULL_DATA@@" ? this.data : this.singleData;
		return !!ns ? getAttribute(rootData, ns) : rootData;
	}

}

export default Store;
