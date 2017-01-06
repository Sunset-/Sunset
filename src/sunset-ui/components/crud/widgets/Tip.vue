<style lang="sass">

    .tip-content{
        padding:10px;
        border-radius: 3px;
        &.info{
            background: #d9edf7;
            border:1px solid darken(#d9edf7,10%);
        }
        &.warning{
            background: #fcf8e3;
            border:1px solid darken(#fcf8e3,10%);
        }
        &.danger{
            background: #f2dede;
            border:1px solid darken(#f2dede,10%);
        }
        &.success{
            background: #dff0d8;
            border:1px solid darken(#dff0d8,10%);
        }
    }

</style>
<template>

	<validator name="validation">
		<div :class="['form-group',invalid?'has-error':'']">
			<label class="control-label col-xs-1">{{options.label}}</label>
			<div class="input-group col-xs-11" style="width:86.11111111111111%;">
                <div :class="['tip-content', options.level||'']">{{{options.text||''}}}</div>
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