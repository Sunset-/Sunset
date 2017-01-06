<template>
	
	<ul class="ztree"></ul>

</template>


<script>

	var treeCounter = 0;

	import treeStyle from '../../vendor/ztree/zTreeStyle/zTreeStyle.css';
	import treeScript from '../../vendor/ztree/jquery.ztree.all-3.5.min.js';

	var extractAttrs = ['id','name','title','type'];
	
	export default {
		props:{
			check : {
				type : String,
				default : ''
			},
			options : {
				type : Object,
				requied : true
			},
			nodes : {
			},
			selected : {
				type : Object
			},
			checked : {
				type : Array
			},
			expandAll : {
				type : Boolean,
				default : false
			}
		},
		data(){
			return {
				ztreeObj : null
			};
		},
		computed : {
			idPlace(){
				return Sunset.getAttribute(this.options,'data.simpleData.idKey','id');
			},
			pIdPlace(){
				return Sunset.getAttribute(this.options,'data.simpleData.pIdKey','pId');
			},
			namePlace(){
				return Sunset.getAttribute(this.options,'data.simpleData.name','name');
			},
			typePlace(){
				return Sunset.getAttribute(this.options,'data.simpleData.type','type');
			},
			titlePlace(){
				return Sunset.getAttribute(this.options,'data.simpleData.title','title');
			},
			setting(){
				var self = this;
				var config = this.options;
				//check
				var check = this.check;
				if(check=='single'||check=='multi'){
					var checkConfig = config.check||{};
					checkConfig.enable = true;
					checkConfig.chkStyle = check=='single'?'radio':'checkbox';
					config.check = checkConfig;
				}else{
					config.check = {enable : false};
				}

				//callback
				var callbackConfig = config.callback||{};
				//click
				var originOnClick = callbackConfig.onClick;
				callbackConfig.onClick = function(event, treeId, treeNode, clickFlag){
					var res = originOnClick&&originOnClick.apply(this,[event, treeId, treeNode, clickFlag]);
					self.selectNode(treeNode, clickFlag);
					return res;
				}
				//checked
				var originOnCheck = callbackConfig.onCheck;
				callbackConfig.onCheck = function(event, treeId, treeNode){
					var res = originOnCheck&&originOnCheck.apply(this,[event, treeId, treeNode]);
					self.checkedNode();
					return res;
				}

				config.callback = callbackConfig;
				return config;
			},
			initNodes(){
				return null;
			},
			format(){
				return this.options&&this.options.format||{};
			},
			nodeToValue(){
				return this.format&&this.format.nodeToValue||this.nullFunction;
			}
		},
		methods : {
			init(){
				this.$el.id = 'sunset-tree-'+(++treeCounter);
				var initNodes = this.nodes;
				if(Sunset.isFunction(this.nodes)){
					initNodes = this.nodes();
				}
				if(initNodes&&initNodes.then){
					initNodes.then(nodes=>{
						this.ztreeObj = $.fn.zTree.init($(this.$el),this.setting,nodes);
						this.expand();
						this.$dispatch('TREE_INITED');
					});
				}else{
					this.ztreeObj = $.fn.zTree.init($(this.$el),this.setting,initNodes);
					this.expand();
					this.$dispatch('TREE_INITED');
				}
			},
			expand(){
				var ztreeObj = this.ztreeObj,
				rootPId = this.setting.data.simpleData.rootPId,
				roots = ztreeObj.getNodesByParam('pId',rootPId,null);
				roots&&roots.forEach(root=>ztreeObj.expandNode(root,true));
				if(this.expandAll){
					ztreeObj.expandAll(true);
				}
			},
			nullFunction(data){
				return data;
			},
			selectNode(treeNode, clickFlag){
				var node;
				switch(clickFlag){
					case 1:node = treeNode;
					break;
					case 0:node = null;
					break;
				}
				var currentNodeData = node&&node.data||node,
				parentNode = node&&node.getParentNode(),
				parentNodeData = parentNode&&parentNode.data||parentNode;
				this.selected =currentNodeData;
				this.$dispatch('sunset-tree-selected',currentNodeData,parentNodeData);
			},
			checkedNode(){
				var nodes = this.ztreeObj.getCheckedNodes();
				this.checked = nodes&&nodes.map(node =>(node&&node.data||node));
			},
			getNodeByData(data){
				var idPlace =  this.idPlace;
				return this.ztreeObj.getNodesByFilter(function(node){
					var idEqual = node[idPlace] == data[idPlace];
					if(data.type){
						return idEqual&&node.type==data.type;
					}
					return idEqual;
				},true);
			},
			extractNode(node,data){
				if(node&&data){
					extractAttrs.forEach(attr=>{
						var place = this[attr+'Place']||attr;
						node[attr] = data[attr];
						node.icon= data.icon;
						node.data = data;
					})
				}
				return node;
			}
		},
		events : {
			//增加子节点
			TREE_ADD_NODE(parentData,childs,clear){
				if(parentData){
					var parentNode = this.getNodeByData(parentData);
					if(clear===true){
						this.ztreeObj.removeChildNodes(parentData);
					}else if(Sunset.isFunction(clear)){
						if(parentNode.children){
							var remoceNodes = parentNode.children.filter(clear);
							remoceNodes.forEach(n=>this.ztreeObj.removeNode(n));
						}
					}
					if(childs){
						if(!Sunset.isArray(childs)){
							childs = [childs];
						}
						var newNodes = childs.map(child=>{
							var newNode = {};
							this.extractNode(newNode,child);
							newNode[this.pIdPlace]= parentNode[this.idPlace];
							return newNode;
						});
						this.ztreeObj.addNodes(parentNode,newNodes);
					}	
				}
			},
			//更新节点
			TREE_REFRESH_NODE(data){
				if(data){
					var treeNode = this.getNodeByData(data);
					if(treeNode){
						this.extractNode(treeNode,data);
						this.ztreeObj.updateNode(treeNode);
					}
				}
			},
			//删除节点
			TREE_REMOVE_NODE(data){
				if(data){
					this.ztreeObj.removeNode(this.getNodeByData(data));
				}
			},
			//刷新节点选择
			TREE_REFRESH_CHECK(checkedIds){
				if(!this.ztreeObj){
					return;
				}
				checkedIds = checkedIds?(checkedIds+''):'';
				var idPlace = this.idPlace,
				ztreeObj = this.ztreeObj;
				//移除所有选择
				var oldCheckeds = ztreeObj.getCheckedNodes(true);
				oldCheckeds&&oldCheckeds.forEach(node=>{
					ztreeObj.checkNode(node,false);
				});
				//勾选新节点
				if(checkedIds){
					var nodes = [];
					checkedIds.split(',').forEach(id=>{
						var res = ztreeObj.getNodeByParam(idPlace,id);
						if(res){
							nodes.push(res);
						}
					});
					nodes&&nodes.forEach(node=>{
						ztreeObj.checkNode(node,true);
					});
				}
			},
			//刷新树全部节点
			TREE_REFRESH_NODES(nodes){
				this.nodes = nodes||[];
				this.ztreeObj.destroy();
				this.init();
			}
		},
		ready(){
			this.init();
		}
	}

</script>