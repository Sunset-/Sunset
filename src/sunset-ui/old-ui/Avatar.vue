<template>
	<div :class="['sunset-avatar','circle',size]">
		<img :src="imgSrc" />
	</div>

</template>

<script>
	
	export default {
		props :{
			src : {
				type : String
			},
			defaultSrc : {
				type : String
			},
			size:{
				type : String
			}
		},
		computed : {
			imgSrc(){
				return this.src||this.defaultSrc;
			}
		}
	}

</script>