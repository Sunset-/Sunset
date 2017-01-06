<template>
	
	<validator name="validation">
		<div :class="['form-group']">
			<label class="control-label col-xs-3">{{options.label}}</label>
			<div class="input-group col-xs-7">
				<input type="text" class="form-control" readonly v-model="text" />
				<span class="input-group-btn">
					<button class="btn btn-white" @click="select" type="button">选择</button>
				</span>
			</div>
		</div>
		<modal-table :options="options.table" :title="options.label" :multi="multi"></modal-table>
	</validator>
	
</template>

<script>

	import ModalTable from '../ModalTableSelector';
	
	export default {
		components : {
			ModalTable
		},
		props : {
			options : {
				type : Object
			},
			value : {
			}
		},
		data(){
			return {
			};
		},
		computed : {
			multi(){
				return !!this.options.multi;
			},
			idKey(){
				return this.options.idKey||'id';
			},
			nameKey(){
				return this.options.nameKey||'name';
			},
			text : {
				get(){
					return this.options.text||'';
				},
				set(v){
					this.options.text = v;
				}
			}
		},
		methods : {
			select(){
				this.$broadcast('MODEL_TABLE_SELECTOR_SHOW')
			}
		},
		events : {
			CRUD_TABLE_SELECTOR_ENSURE(records){
				var val = null,
				text ='',
				idKey = this.idKey,
				nameKey = this.nameKey;
				if(records&&records.length){
					val =  this.multi?records.map(item=>item[idKey]).join(','):records[0][idKey];
					text =  this.multi?records.map(item=>item[nameKey]).join(','):records[0][nameKey];
				}
				this.value = val;
				this.text = text;
			},
			WIDGET_RESET(){
				this.text = '';
			}
		}
	};

</script>