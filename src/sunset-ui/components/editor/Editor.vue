<style lang="sass">
	.sunset-editor-container {
		width: 100%;
		.edui-editor {
			z-index: 800 !important;
		}
	}
</style>
<template>
	<div class="sunset-editor-container">
		<script :id="id" type="text/plain">
			我是编辑器
		</script>
	</div>
</template>
<script>
	import UEditorConfig from '../../vendor/ueditor/ueditor.config.js';
	import UEditor from '../../vendor/ueditor/ueditor.all.js';

	var uid = 0;

	export default {
		props: {
			toolbar: {

			},
			value: {

			}
		},
		data() {
			return {
				id: '',
				pending: false
			};
		},
		methods: {
			init() {
				var editor = this.editor;
				//初始化值
				editor.ready(() => {
					editor.setContent(this.value || '');
					//监听
					editor.addListener('contentChange', () => {
						this.pending || this.setValueSilent(editor.getContent());
					});
					editor.addListener('focus', () => {
						this.pending || this.setValueSilent(editor.getContent());
					});
				});
			},
			setValueSilent(value) {
				this.pending = true;
				this.value = value;
				this.$nextTick(() => {
					this.pending = false;
				})
			},
			setWidth(w) {
				$(`#${this.id} .edui-editor`).css('width', w);
			}
		},
		ready() {
			this.id = `sunset-editor-${++uid}`;
			this.$nextTick(() => {
				//挂载插件
				var opts = {
					initialContent: '',
					saveInterval: 9999999999
				};
				if (this.toolbar) {
					opts.toolbars = [this.toolbar.split(',').map((item) => item.trim())];
				}
				this.editor = UE.getEditor(this.id, opts);
				this.init();
			});
		},
		watch: {
			value(v) {
				if (!this.pending) {
					this.editor.setContent(v || '');
					this.editor.focus(true);
				}
			}
		}
	};
</script>