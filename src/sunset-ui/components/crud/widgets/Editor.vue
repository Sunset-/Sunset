<template>
	
	<validator name="validation">
		<div :class="['form-group',invalid?'has-error':'']">
			<label class="control-label col-xs-1">{{options.label}}</label>
			<div class="input-group col-xs-11" style="width:86.11111111111111%;">
				<editor :value.sync="value"></editor>
				<i v-show="invalid" class="glyphicon glyphicon-exclamation-sign text-danger sunset-pop" :data-content="invalidMsg"></i>
			</div>
		</div>
	</validator>

</template>

<script>

	import {Editor} from 'sunset-ui';
	
	export default {
		components : {
			Editor
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
		created(){

		},
		events:{
			REFRESH_WIDGET_VALUE(){
				this.$broadcast('REFRESH_VALUE');
			}
		}
	};

</script>