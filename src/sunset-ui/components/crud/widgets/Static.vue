<template>

	<validator name="validation">
		<div class="form-group">
			<label class="control-label col-xs-3">{{options.label}}</label>
			<div class="input-group col-xs-7">
				<p class="form-control-static">{{value||text}}</p>
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
			text(){
				if(Sunset.isFunction(this.options.text)){
					return this.options.text();
				}
				return this.options.text;
			},
			invalid(){
				return false;
			}
		}
	};

</script>