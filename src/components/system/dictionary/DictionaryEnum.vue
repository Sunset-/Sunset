<template>
	<Modal :visible.sync="show" title="字典枚举" :width="800">
		<sunset-table v-ref:table :options="tableOptions"></sunset-table>
		<h5>添加枚举</h5>
		<sunset-form v-ref:form :options="formOptions" @signal="operateSignal"></sunset-form>
		<div slot="footer">
		</div>
	</Modal>
</template>
<script>
	import DictionaryStore from './DictionaryStore';

	export default {
		data() {
			return {
				tableOptions: {
					columns: [{
						title: '枚举名称',
						name: 'name'
					}, {
						title: '枚举值',
						name: 'value'
					}],
					showIndex: true,
					pageSize: 10,
					localPage: true,
					multiCheck: true,
					sortable: true,
					format: {
						list: '',
						count: 'length',
						pageSize: 'pageSize',
						currentPage: 'pageNumber'
					},
					//表格工具栏
					toolbar: [],
					//表格搜索
					filter: false,
					deleteMethod : 'removeEnum',
					//数据条目操作
					recordTools: [{
						label: '修改',
						icon: 'edit',
						color: 'warning',
						permission: 'SYSTEM_MANAGER_DICTIONARY_UPDATE',
						operate: (record) => {
							this.edit(record);
						}
					}, {
						label: '删除',
						icon: 'trash-a',
						color: 'error',
						permission: 'SYSTEM_MANAGER_DICTIONARY_DELETE',
						signal: 'DELETE'
					}],
					datasource: () => {
						return this.record ? DictionaryStore.loadEnums(this.record.type).then(data => {
							return data || [];
						}) : [];
					},
					store : DictionaryStore
				},
				formOptions: {
					cols : 2,
					fields: [{
						label: '枚举名称',
						name: 'name',
						type: 'input',
						validate: {
							required: true
						}
					}, {
						label: '枚举值',
						name: 'value',
						type: 'input',
						validate: {
							required: true
						}
					}],
					format: (model) => {
						model.type = this.record.type;
						return model;
					},
					hideBtns: true,
					store: DictionaryStore,
					method: 'saveEnum'
				},
				show: false,
				record: null
			};
		},
		methods: {
			loadEnums() {
				this.$refs.table.refresh(1, true);
			},
			edit(item) {
				this.$refs.form.reset(Object.assign({}, item));
			},
			operateSignal(signal) {
				if (signal == 'SAVED') {
					this.$refs.form.reset();
					this.loadEnums();
				}
			}
		},
		events: {
			DICTIONARY_ENUM_SHOW(record) {
				this.record = record;
				this.loadEnums();
				this.show = true;
			}
		}
	}
</script>