<template>

	<validator name="validation">
		<div :class="['form-group',invalid?'has-error':'']">
			<label class="control-label col-xs-1">{{options.label}}</label>
			<div class="input-group col-xs-11" style="width:86.11111111111111%;">
				<textarea class="form-control" :placeholder="options.placeholder" :maxlength="maxlength" :rows="rows" field="field" v-model="value" v-validate="options.validate">
				</textarea>
				<i v-show="invalid" class="glyphicon glyphicon-exclamation-sign text-danger sunset-pop" :data-content="invalidMsg"></i>
			</div>
		</div>
	</validator>

</template>

<script>
	
	export default {
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
			rows(){
				return this.options.rows||5;
			},
			maxlength(){
				return this.options.maxlength||this.options.validate&&this.options.validate.maxlength&&this.options.validate.maxlength.rule;
			},
			invalid(){
				return this.options.validate&&this.$validation.field&&this.$validation.field.invalid;
			},
			invalidMsg(){
				return this.options.validate&&this.$validation.field&&this.$validation.field.errors&&this.$validation.field.errors.length&&this.$validation.field.errors[0].message;
			}
		}
	};

</script>