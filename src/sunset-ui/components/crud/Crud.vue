<style lang="sass">
	.sunset-crud-container {
		.panel {
			margin-bottom: 0px;
			.panel-body {
				padding: 15px 0px;
			}
		}
	}
</style>
<!-- 数据表布局（标准增删改查） -->
<template>
	<div class="sunset-crud-container">
		<!-- 数据表格 -->
		<div v-show="PAGE=='CRUD_TABLE'" class="panel panel-default">
			<div class="panel-heading">
				{{options.title+'列表'}}
			</div>
			<sunset-table v-ref:table :options="options.tableOptions" @signal="operateSignal"></sunset-table>
		</div>
		<!-- 编辑表单 -->
		<div v-show="PAGE=='CRUD_FORM'" class="panel panel-default">
			<div class="panel-heading">
				{{options.title+' - '+PAGE_DETAIL}}
			</div>
			<div class="panel-body">
				<sunset-form v-ref:form :options="options.formOptions" @signal="operateSignal"></sunset-form>
			</div>
		</div>
	</div>
</template>
<script>
	import SunsetTable from './Table';
	import SunsetForm from './Form';
	import Store from './Store';

	export default {
		components: {
			SunsetTable,
			SunsetForm
		},
		props: {
			options: {
				type: Object
			}
		},
		data() {
			return {
				PAGE: 'CRUD_TABLE',
				PAGE_DETAIL: '',
				store: (this.options.store instanceof Store ? this.options.store : new Store(this.options.store))
			}
		},
		computed: {},
		methods: {
			operateSignal(signal, record) {
				switch (signal) {
					case 'SAVED':
						this.$refs.table.refresh(void 0, true);
						this.PAGE = 'CRUD_TABLE';
						Sunset.tip('保存成功', 'success');
						break;
					case 'ADD':
						this.$refs.form.reset({});
						this.PAGE = 'CRUD_FORM';
						this.PAGE_DETAIL = '新增';
						break;
					case 'MODIFY':
						this.$refs.form.reset(Object.assign({}, record));
						this.PAGE = 'CRUD_FORM';
						this.PAGE_DETAIL = '编辑';
						break;
					case 'CANCEL':
						this.PAGE = 'CRUD_TABLE';
						break;
				}
			}
		}
	};
</script>