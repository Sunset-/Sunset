<style lang="sass">

	.modal-body{
		.panel-body{
			padding:15px 0px;
		}
		.form-group{
			margin-right:0px;
		}
	}
	.crud-table-selector-selecteds{
		padding-top:5px;
		span{
			display: inline-block;
			padding: 5px 10px;
			margin-right: 5px;
			margin-bottom:5px;
			font-size: 100%;
			i{
				margin-left: 2px;
				&:hover{
					color:#efefef;
				}
			}
		}
		button{
			height: 24px;
			margin: 0px;
			line-height: 1;
			vertical-align: top;
			width: 50px;
		}
	}

</style>

<template>
	
	<modal :show.sync="show" :large="true" effect="fade" ok-text="保存" cancel-text="取消">
		<div slot="modal-header" class="modal-header">
			<h4 class="modal-title">{{title}}</h4>
		</div>
		<div slot="modal-body" class="modal-body wrapper-y-no">
			<div class="crud-table-selector-selecteds" v-show="multi&&checkeds.length">
				<span class="label label-md label-info" v-for="item in checkeds">{{item[label]}}<i class="glyphicon glyphicon-remove" @click="removeItem($index)"></i></span>
				<button type="button" class="btn btn-xs btn-danger" @click="removeAll">清空</button>
			</div>
			<sunset-table :options="tableOptions" :checkeds.sync="checkeds" :store="options.store"></sunset-table>
		</div>
		<div slot="modal-footer" class="modal-footer">
			<button v-if="multi" type="button" class="btn btn-success" @click='ensure'>确定</button>
			<button type="button" class="btn btn-white" @click='show = false'>取消</button>
		</div>
	</modal>
	

</template>

<script>

	import {modal} from 'vue-strap';
	import SunsetTable from './Table';

	export default{
		components : {
			modal,
			SunsetTable
		},
		props : {
			multi : {
				type : Boolean,
				default : false
			},
			max : {
				type : Number,
				default : 999999
			},
			title : {
				type : String
			},
			options : {
				type : Object
			},
			show : {
				default : false
			}
		},
		data(){
			return {
				checkeds : []
			}
		},
		computed : {
			tableOptions(){
				var tableOptions = this.options.options;
				//多选
				if(this.multi){
					tableOptions.multiCheck = true;
					tableOptions.recordTools = [];
				}else{
					tableOptions.multiCheck = false;
					tableOptions.recordTools = [{
						label : '选择',
						type : 'info',
						operate:(record)=>{
							this.checkeds = [record];
							this.ensure();
						}	
					}];
				}
				tableOptions.condensed = true;
				return tableOptions;
			},
			label(){
				return this.options.label||'name';
			}
		},
		methods : {
			ensure(){
				if(this.checkeds.length>this.max){
					Sunset.tip(`最多选择${this.max}个`);
					return;
				}
				this.$emit('modal-select-ensure',this.checkeds);
				this.$dispatch('CRUD_TABLE_SELECTOR_ENSURE',this.checkeds);
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
			MODEL_TABLE_SELECTOR_SHOW(checkeds){
				this.checkeds = checkeds||[];
				this.$broadcast('CRUD_TABLE_FILTER_RESET');
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