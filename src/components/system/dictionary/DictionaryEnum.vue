<template>
	<modal :show.sync="show" :large="true" effect="fade" ok-text="保存" cancel-text="取消">
		<div slot="modal-header" class="modal-header">
			<h4 class="modal-title">会员卡号段</h4>
		</div>
		<div slot="modal-body" class="modal-body wrapper-y-no">
			<table class="table table-bordered table-striped table-condensed">
				<thead>
					<tr>
						<th class="text-center" style="width:60px;">序号</th>
						<th class="text-center">枚举名称</th>
						<th class="text-center">枚举值</th>
						<th class="text-center">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in enums">
						<td class="text-center">{{$index+1}}</td>
						<td class="text-center">{{item.name}}</td>
						<td class="text-center">{{item.value}}</td>
						<td class="text-center">
							<button class="btn btn-xs btn-warning" @click="edit(item)"><i class="glyphicon glyphicon-edit m-r-xs"></i>修改</button>
							 <button class="btn btn-xs btn-danger" @click="remove(item)"><i class="glyphicon glyphicon-remove m-r-xs"></i>删除</button> 
						</td>
					</tr>
				</tbody>
				<tfoot></tfoot>
			</table>
			<h5>添加号段</h5>
			<sunset-form :options="formOptions" :store="store" status="EDIT" @saved="sectionSaved"></sunset-form>
			<div class="wrapper-y-sm text-center" v-if="!hideBtns">
				<button class="btn btn-white m-x-sm" type="button" @click="reset">新增</button>
				<button class="btn btn-success m-x-sm" type="button" @click="save">保存</button>
			</div>
		</div>
		<div slot="modal-footer" class="modal-footer">
			<button type="button" class="btn btn-success" @click='show = false'>确定</button>
		</div>
	</modal>
</template>

<script>

	import {modal} from 'vue-strap';
	import DictionaryStore from './DictionaryStore';

	export default {
		components : {
			modal
		},
		data(){
			return {
				formOptions : {
					fields : [{
						label : '枚举名称',
						name : 'name',
						type : 'input',
						validate : {
							required : true
						}
					},{
						label : '枚举值',
						name : 'value',
						type : 'input',
						validate : {
							required : true
						}
					}],
					format : (model)=>{
                        model.type = this.record.type;
						return model;
					},
					hideBtns : true,
					method : 'saveEnum'
				},
				store : DictionaryStore,
				show : false,
				enums : [],
				record : null
			};
		},
		methods:{
			loadEnums(){
				DictionaryStore.loadEnums(this.record.type).then(data=>{
					this.enums = data||[];
				});
			},
			edit(item){
				this.$broadcast('CRUD_FORM_RESET','EDIT',Object.assign({},item));
			},
			remove(item){
				Sunset.confirm({
					msg : '确定删除此条目',
					ensure :()=>{
						DictionaryStore.removeEnum(item.id).then(data=>{
							var enums = this.enums;
							enums.splice(enums.indexOf(item),1);
						});
					}
				});
			},
			save(){
				this.$broadcast('CRUD_FORM_SAVE');
			},
			reset(){
				this.$broadcast('CRUD_FORM_RESET');
			},
			sectionSaved(){
				this.$broadcast('CRUD_FORM_RESET');
			},
			ensure(){

			},
			approveConvert(item){
				var html;
				switch(item.approveStatus){
					case '1' : 
					html = '<font color="gray">待审核</font>';
					break;
					case '2' : 
					html = '<font color="success">审核通过</font>';
					break;
					case '3' : 
					html = `<font color="red">审核驳回（${item.suggest}）</font>`;
					break;
					default :
					html = '-';
				}
				return html;
			}
		},
		events : {
			DICTIONARY_ENUM_SHOW(record){
				this.record = record;
				this.loadEnums();
				this.show = true;
			},
			CRUD_OPERATE_HOME(){

			},
			CRUD_FORM_SAVED(model){
				this.loadEnums();
			}
		}
	}
</script>