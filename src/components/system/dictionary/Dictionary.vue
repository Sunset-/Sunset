<template>
	<sunset-layout title="字典管理">
		<sunset-crud :options="options"></sunset-crud>
	</sunset-layout>
	<dictionary-enum></dictionary-enum>
</template>
<script>

	import DictionaryEnum from './DictionaryEnum';
	import DictionaryStore from './DictionaryStore';
	
	export default {
		components : {
			DictionaryEnum
		},
		data(){
			return {
				options : {
					title : '数据字典',
					store : DictionaryStore,
					tableOptions : {
						showIndex : true,
						columns : [{
							title : '字典名称',
							name : 'name'
						},{
							title : '类型',
							name : 'type'
						},{
							title: '是否评测项目',
							name : 'isAccessmentCase',
							format : (v)=>{
								return v?'是':'否';
							}
						}],
						pageSize : 10,
						localPage : false,
						format:{
							list : 'rows',
							count  : 'count',
							pageSize : 'pageSize',
							currentPage : 'pageNumber'
						},
						filters : [{
							label : '搜索',
							type : 'search',
							name : 'keyword',
							placeholder:'字典类型'
						}],
						tools:[{
							label : '新增',
							icon : 'glyphicon glyphicon-plus',
							type : 'success',
							permission : 'SYSTEM_MANAGER_DICTIONARY_ADD',
							operate : 'CRUD_OPERATE_ADD'
						}],
						recordTools:[{
							label : '枚举',
							icon : 'glyphicon glyphicon-upload',
							permission : 'SYSTEM_MANAGER_STORE_ROUGHLY',
							type : 'pink',
							operate:(record)=>{
								this.$broadcast('DICTIONARY_ENUM_SHOW',record);
							},
							permission : 'SYSTEM_MANAGER_DICTIONARY_UPDATE',
							useRecord : true,
							idKey : 'id'
						},{
							label : '修改',
							icon : 'glyphicon glyphicon-edit',
							type : 'warning',
							operate : 'CRUD_OPERATE_MODIFY',
							permission : 'SYSTEM_MANAGER_DICTIONARY_UPDATE',
							useRecord : true,
							idKey : 'id'
						},{
							label : '删除',
							icon : 'glyphicon glyphicon-remove',
							type : 'danger',
							operate : 'CRUD_OPERATE_DELETE',
							permission : 'SYSTEM_MANAGER_DICTIONARY_DELETE',
							useRecord : true,
							idKey : 'id'
						}]
					},
					formOptions : {
						fields : [{
							label : '字典名称',
							name : 'name',
							type : 'input',
							validate : {
								required : true,
								maxlength: 32
							}
						},{
							label : '字典类型',
							name : 'type',
							type : 'input',
							validate : {
								required : true,
								maxlength: 32
							}
						},{
							label : '评测项目',
							name : 'isAccessmentCase',
							type : 'switch'
						}],
						format : (model)=>{
							if(model.isAccessmentCase){
								model.desc = 'ACCESSMENT_CASE';
							}else{
								model.desc = model.desc == 'ACCESSMENT_CASE'?'':model.desc;
							}
							return model;
						}
					}
				}
			}
		}
	};

</script>