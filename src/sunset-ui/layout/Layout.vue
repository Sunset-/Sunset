<style lang="sass">

	@import '../style/index.scss';

	.sunset-layout-content {
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		top: 50px;
		padding: 15px;
		background: #eeeeee;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
<!-- 简单数据表布局 -->
<template>
	<sunset-title :title="title" :page.sync="PAGE"></sunset-title>
	<!-- 简单数据表布局 -->
	<template v-if="layoutType=='content'">
		<div class="sunset-layout-content">
			<slot></slot>
		</div>
		</div>
	</template>
</template>
<script>
	import SunsetTitle from './Title';

	const type = {
		'content': 'content',
		'leftside-content': 'leftside-content'
	};

	export default {
		components: {
			SunsetTitle
		},
		props: {
			title: {
				type: String
			},
			type: {}
		},
		data() {
			return {
				PAGE: 'CRUD_TABLE'
			}
		},
		computed: {
			layoutType() {
				return type[this.type] || 'content';
			}
		}
	};
</script>