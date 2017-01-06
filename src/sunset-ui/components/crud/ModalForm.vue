<template>
	<modal :show.sync="show" :large="true" effect="fade" ok-text="保存" cancel-text="取消">
		<div slot="modal-header" class="modal-header">
			<h4 class="modal-title">{{title}}</h4>
		</div>
		<div slot="modal-body" class="modal-body">
			<sunset-form :options="formOptions.options" :store="formOptions.store" status="EDIT"></sunset-form>
		</div>
		<div slot="modal-footer" class="modal-footer">
			<button type="button" class="btn btn-success" @click='save'>{{ensureText}}</button>
			<button type="button" class="btn btn-white" @click='show = false'>取消</button>
		</div>
	</modal>
</template>

<script>

	import {modal} from 'vue-strap';
	import SunsetForm from './Form';

	export default{
		components : {
			modal,
			SunsetForm
		},
		props : {
			title : {
				type : String
			},
			name : {
				type : String
			},
			formOptions : {
				type : Object,
				required : true,
				coerce(formOptions){
					formOptions.options&&(formOptions.options.hideBtns = true);
					return formOptions;
				}
			}
		},
		data(){
			return {
				show : false
			};
		},
		computed : {
			ensureText(){
				return this.formOptions.ensureText||'保存';
			}
		},
		methods : {
			save(){
				this.$broadcast('CRUD_FORM_SAVE');
			}
		},
		events : {
			MODEL_FORM_SHOW(record,modalName){
				if(modalName&&modalName!=this.name){
					return;
				}
				this.$broadcast('CRUD_FORM_RESET','EDIT',record);
				this.show = true;
			},
			CRUD_OPERATE_HOME(){
				this.show = false;
			}
		}
	};
	

</script>