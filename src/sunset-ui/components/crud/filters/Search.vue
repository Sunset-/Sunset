<template>
	<div class="form-group" style="margin:0px;">
		<div class="input-group" style="display: inline-table !important;">
			<input type="text" class="form-control" class="form-control" :placeholder="options.placeholder" :maxlength="maxlength" field="field"
							v-model="value" />
			<span class="input-group-btn">
					<button class="btn btn-white" @click="search" type="button">搜索</button>
				</span>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			options: {
				type: Object
			},
			value: {}
		},
		data() {
			return {};
		},
		computed: {
			type() {
				return this.options.type == 'input' ? 'text' : this.options.type;
			},
			maxlength() {
				return this.options.maxlength || this.options.validate && this.options.validate.maxlength && this.options.validate.maxlength
					.rule;
			}
		},
		methods: {
			search() {
				this.$dispatch('FIELD_SEARCH');
			}
		}
	};
</script>