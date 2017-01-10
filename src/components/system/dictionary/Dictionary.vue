<template>
	<sunset-layout title="数据字典管理">
		<sunset-crud :options="options"></sunset-crud>
	</sunset-layout>
	<dictionary-enum></dictionary-enum>
</template>
<script>
	import DictionaryEnum from './DictionaryEnum';
	import DictionaryStore from './DictionaryStore';

	export default {
		components: {
			DictionaryEnum
		},
		data() {
			return {
				options: {
					title: '数据字典',
					tableOptions: {
						store: DictionaryStore,
						showIndex: true,
						columns: [{
							title: '字典名称',
							name: 'name'
						}, {
							title: '类型',
							name: 'type'
						}, {
							title: '是否评测项目',
							name: 'isAccessmentCase',
							format: (v) => {
								return v ? '是' : '否';
							}
						}],
						pageSize: 10,
						localPage: false,
						format: {
							list: 'rows',
							count: 'count',
							pageSize: 'pageSize',
							currentPage: 'pageNumber'
						},
						filter: {
							align : 'right',
							fields: [{
								label: '搜索',
								name: 'keyword',
								widget: 'search',
								placeholder: '字典类型'
							}]
						},
						toolbar: [{
							label: '新增',
							icon: 'glyphicon glyphicon-plus',
							color: 'success',
							signal: 'ADD'
						}],
						recordTools: [{
							label: '枚举',
							icon: 'glyphicon glyphicon-upload',
							color: 'pink',
							operate: (record) => {
								this.$broadcast('DICTIONARY_ENUM_SHOW', record);
							}
						}, {
							label: '修改',
							icon: 'glyphicon glyphicon-edit',
							color: 'warning',
							signal: 'MODIFY'
						}, {
							label: '删除',
							icon: 'glyphicon glyphicon-remove',
							color: 'danger',
							signal: 'DELETE'
						}]
					},
					formOptions: {
						fields: [{
							label: '字典名称',
							name: 'name',
							type: 'input',
							validate: {
								required: true,
								maxlength: 32
							}
						}, {
							label: '字典类型',
							name: 'type',
							type: 'input',
							validate: {
								required: true,
								maxlength: 32
							}
						}, {
							label: '评测项目',
							name: 'isAccessmentCase',
							type: 'switch'
						}],
						format: (model) => {
							if (model.isAccessmentCase) {
								model.desc = 'ACCESSMENT_CASE';
							} else {
								model.desc = model.desc == 'ACCESSMENT_CASE' ? '' : model.desc;
							}
							return model;
						}
					}
				}
			}
		}
	};
</script>