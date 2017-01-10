<template>
	<div class="sunset-toolbar">
		<template v-for="tool in options" v-permission="tool.permission">
			<template v-if="!tool.type">
				<button :class="['m-r-sm','btn',btnClass,'btn-'+(tool.color||'primary')]" type="button" @click="operate(tool)"><i v-if="tool.icon" :class="[tool.icon,'m-r-xs']"></i>&nbsp;{{tool.label}}</button>
			</template>
			<template v-if="tool.type=='file'">
				<tool-file :options="tool" :ctx="ctx"></tool-file>
			</template>
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