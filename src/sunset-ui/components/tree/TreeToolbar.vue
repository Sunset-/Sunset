<template>
	
	<div class="sunset-crud-tree-toolbar">
	<button v-for="tool in tools" v-permission="tool.permission" :class="['m-r-sm btn btn-xs','btn-'+(tool.type||'primary')]" @click="operate(tool)">
			<i v-if="tool.icon" :class="[tool.icon,'m-r-xs']"></i>{{tool.label}}
		</button>
	</div>

</template>

<script>
	
	export default {
		props : {
			tools : {
				type : Array
			}
		},
		computed : {
		},
		methods : {
			operate(tool){
				if(Sunset.isFunction(tool.operate)){
					tool.operate();
				}
			}
		}

	}

</script>