<style lang="sass">
	.sunset-editor-container {
		width: 100%;
		.edui-editor{
			z-index:800 !important;
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
						this.setValueSilent(editor.getContent());
					});
					editor.addListener('focus', () => {
						this.setValueSilent(editor.getContent());
					});
				});
			},
			setValueSilent(value) {
				this.pending = true;
				this.value = value;
				setTimeout(() => {
					this.pending = false;
				}), 0;
			}
		},
		ready() {
			this.id = `sunset-editor-${++uid}`;
			setTimeout(() => {
				this.editor = UE.getEditor(this.id);
				this.init();
			}, 0)
		},
		events: {
			REFRESH_VALUE() {
				this.value = this.editor.getContent();
			}
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