<style lang="sass">
	.sunset-toolbar-item {
		display: inline-block;
		padding: 0px 3px;
	}
</style>
<template>
	<div class="sunset-toolbar">
		<template v-for="tool in options">
			<div v-permission="tool.permission" class="sunset-toolbar-item">
				<template v-if="!tool.type">
					<i-button :size="size" :type="tool.color||'primary'" :icon="tool.icon" @click="operate(tool)">{{tool.label}}</i-button>
				</template>
				<template v-if="tool.type=='file'">
					<tool-file :options="tool" :ctx="ctx"></tool-file>
				</template>
			</div>
		</template>
	</div>
</template>
<script>
	import jqueryForm from '../../vendor/jquery/jquery.form';
	import ToolFile from './tools/File.vue';

	export default {
		components: {
			ToolFile
		},
		props: {
			options: {
				type: Array
			},
			ctx: {},
			size: {}
		},
		computed: {
			btnClass() {
				if (this.size == "small") {
					return 'btn-xs';
				}
			}
		},
		methods: {
			operate(tool) {
				if (tool.signal) {
					this.$emit('signal', tool.signal, this.ctx);
				} else if (Sunset.isFunction(tool.operate)) {
					tool.operate(this.ctx);
				}
			}
		}

	}
</script>