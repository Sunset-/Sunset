<style lang="sass">

	$treeWrapWidth : 240px;
	.sunset-layout-container{
		position:absolute;
		bottom:0px;
		left:0px;
		right:0px;
		top:105px;
		padding:20px;
		overflow-x: hidden;
		overflow-y: auto;
		.sunset-layout-content{
			min-height: 100%;
		}
	}
</style>

<!-- 简单数据表布局 -->
<template>
	<sunset-title :title="title" :page.sync="PAGE"></sunset-title>
	<div class="sunset-layout-container">
		<div class="sunset-layout-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>

	import SunsetTitle from './Title';

	export default {
		components : {
			SunsetTitle
		},
		props : {
			title:{
				type : String
			}
		},
		data(){
			return {
				PAGE : 'CRUD_TABLE'
			}
		}
	};

</script>