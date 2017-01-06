<style lang="sass">
	.sunset-form-modal{
		.ivu-select-dropdown{
			position: absolute !important;
		}
	}
</style>
<template>
	<Modal class-name="sunset-form-modal" :visible.sync="visible" :title="options.title" @on-ok="ok" @on-cancel="cancel" :width="options.width||700">
		<sunset-form v-ref:form :options="options.formOptions" @signal="operateSignal"></sunset-form>
		<div slot="footer">
			<i-button type="ghost" @click="cancel">{{options.cancelText||'取消'}}</i-button>
			<i-button type="success" :loading="modal_loading" @click="ok">{{options.okText||'确定'}}</i-button>
		</div>
	</Modal>
</template>
<script>
	export default {
		components: {},
		props: {
			visible: {},
			options: {}
		},
		data() {
			return {
				modal_loading: false
			}
		},
		computed: {},
		methods: {
			open() {
				this.$refs.form.reset();
				this.visible = true;
			},
			ok() {
				this.modal_loading = true;
				this.$refs.form.submit();
			},
			cancel() {
				this.visible = false;
				this.modal_loading = false;
				this.options.cancel && this.options.cancel();
			},
			operateSignal(signal) {
				switch (signal) {
					case 'SAVED':
						this.cancel();
						break;
					case 'SAVE-ERROR':
						this.modal_loading = false;
						break;
					case 'CANCEL':
						this.cancel();
						break;
				}
			}
		}
	};
</script>