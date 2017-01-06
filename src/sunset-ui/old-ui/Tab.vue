<template>
	<div class="sunset-widget-tabs">
		<div v-for="tab in tabs" @click="change($index)" :class="['sunset-widget-tab',$index==index?'active':'']">{{label==''?tab:tab[label]}}</div>
		<div :style="noniusStyle" class="sunset-widget-tabs-nonius"></div>
	</div>

</template>


<script>
	export default{
		props : {
			tabs : {
				type :Array
			},
			label : {
				type : String,
				default : ''
			},
			index : {
				type : Number, 
				default : 0
			}
		},
		data(){
			return {
				tabWidth : 100
			}
		},
		computed : {
			noniusStyle(){
				var {index,tabWidth} = this;
				return {
					width: `${tabWidth}px`,
					left: `${tabWidth*index}px`
				}
			}
		},
		methods:{
			change : function(index){
				this.index = index;
				this.$dispatch('change', this.tabs[index]);
			}
		}
	};
</script>