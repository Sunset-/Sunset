<template>
	
	<div :class="['sunset-radios',vertical?'radios-vertical':'']">
		<span v-for="r in data">
			<input :checked="value==r[valueplace]" @click="checked(r)" id="{{id+r[valueplace]}}" class="sunset-radio"  type="radio" />
			<label for="{{id+r[valueplace]}}" >{{r[labelplace]}}</label>
		</span>
	</div>

</template>

<script>

	var id = 0;
	
	export default {
		props :{
			data :{
				type : Array,
				required : true
			},
			labelplace:{
				type : String,
				default : 'name'
			},
			valueplace:{
				type : String,
				default : 'value'
			},
			value:{
				default : ''
			},
			vertical:{
				type : Boolean,
				default : false
			}
		},
		data(){
			return {
				id : `sunset-radio-${++id}`
			}
		},
		methods : {
			checked(r){
				this.value = r[this.valueplace];
				this.$dispatch('radioschange',r);
			}
		}
	}
</script>