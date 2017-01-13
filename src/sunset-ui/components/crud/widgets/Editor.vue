<template>
	<div :class="['sunset-field-wrap',invalid?'field-invalid':'']">
		<label class="sunset-field-label">{{options.label}}</label>
		<div class="sunset-field">
			<editor :value.sync="value"></editor>
		</div>
	</div>
</template>
<script>
	import Editor from '../../editor/Editor';

	export default {
		components: {
			Editor
		},
		props: {
			options: {
				type: Object
			},
			value: {}
		},
		data() {
			return {};
		},
		created() {

		},
		events: {
			REFRESH_WIDGET_VALUE() {
				this.$broadcast('REFRESH_VALUE');
			}
		}
	};
</script>