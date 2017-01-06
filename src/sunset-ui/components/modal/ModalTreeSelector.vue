<style lang="sass">
	
	.modal-body.crud-tree-selector-content{
		min-height: 300px;
	}

</style>

<template>
	
	<modal :show.sync="show" :large="true" effect="fade" ok-text="保存" cancel-text="取消">
		<div slot="modal-header" class="modal-header">
			<h4 class="modal-title">{{title}}</h4>
		</div>
		<div slot="modal-body" class="modal-body crud-tree-selector-content wrapper-y-no">
			<sunset-tree :options="options.options" :checked.sync="checkeds" :nodes="options.nodes" :expand-all="options.expandAll" :check="check"></sunset-tree>
		</div>
		<div slot="modal-footer" class="modal-footer">
			<button type="button" class="btn btn-success" @click='ensure'>确定</button>
			<button type="button" class="btn btn-white" @click='show = false'>取消</button>
		</div>
	</modal>
	

</template>

<script>

	import {modal} from 'vue-strap';
	import SunsetTree from './Tree';

	export default{
		components : {
			modal,
			SunsetTree
		},
		props : {
			title : {
				type : String
			},
			multi : {
				type : Boolean,
				default : false
			},
			options : {
				type : Object
			}
		},
		data(){
			return {
				show : false,
				checkeds : []
			}
		},
		computed : {
			check(){
				return this.multi?'multi':'single';
			}
		},
		methods : {
			ensure(){
				this.$dispatch('CRUD_TREE_SELECTOR_ENSURE',this.checkeds);
				this.show = false;
			},
			removeItem(index){
				this.checkeds.splice(index,1);
			},
			removeAll(){
				this.checkeds=[];
			}
		},
		events : {
			MODEL_TREE_SELECTOR_SHOW(checkeds){
				this.checkeds = checkeds||[];
				this.show = true;
			},
			//阻止向下传播的刷新列表数据
			CRUD_TABLE_REFRESH(){
				
			},
			CRUD_OPERATE_SEARCH(){
				
			},
			CRUD_TABLE_FILTER_RESET(){
				
			}
		}
	};
</script>