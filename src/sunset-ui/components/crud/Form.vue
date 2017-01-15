<style lang="sass">
	.sunset-form {
		.group-title {
			font-size: 16px;
			padding: 5px 15px;
		}
	}
</style>
<template>
	<form class="sunset-form form-horizontal">
		<Row>
			<template v-for="field in fields" v-ref:fields>
				<i-col v-if="field.group" :span="24">
					<div class="group-title">{{field.group}}</div>
				</i-col>
				<i-col :span="computedFieldClass(field)">
					<sunset-field v-ref:field :options="field" :value.sync="model[field.name]" :model="model"></sunset-field>
				</i-col>
			</template>
		</Row>
		<sunset-toolbar v-if="options.tools!==false" :options="tools" @signal="operateSignal" style="text-align:center;"></sunset-toolbar>
	</form>
</template>
<script>
	import SunsetField from './Field';
	import SunsetToolbar from './Toolbar.vue';
	import Pop from '../pop';

	const FULL_COLS = 24;
	const DEFAULT_COLS = 3;

	export default {
		components: {
			SunsetField,
			SunsetToolbar
		},
		props: {
			options: {
				type: Object
			}
		},
		data() {
			return {
				record: null,
				model: {},
				hasModel: false
			}
		},
		computed: {
			cols() {
				return this.options.cols || DEFAULT_COLS;
			},
			fields() {
				var fields = this.options && this.options.fields || [],
					record = this.record;
				fields = fields.filter(field => !!field.name && (field.premise ? field.premise(this.model) : true));
				//初始化
				if (record) {
					fields = fields.map(f => {
						if (Sunset.isFunction(f.init)) {
							f = f.init(this.hasModel ? record : null) || f;
						}
						return f;
					});
				}
				return fields;
			},
			tools() {
				return this.options.tools || [{
					label: '保存',
					color: 'success',
					signal: 'SUBMIT'
				}, {
					label: '取消',
					color: 'ghost',
					signal: 'CANCEL'
				}];
			},
			formValid() {
				var fields = this.$refs.fields;
				if (fields) {
					for (var i = 0, field; field = fields[i++];) {
						if (field.$children && field.$children.length && field.$children[0].invalid) {
							return false;
						}
					}
				}
				return true;
			}
		},
		methods: {
			computedFieldClass(field) {
				if (field.monopolize) {
					return FULL_COLS;
				} else if (field.cols) {
					return field.cols;
				} else {
					return FULL_COLS / this.cols;
				}
			},
			generateModel() {
				if (!this.formValid) {
					throw new Error('校验不通过');
					return;
				}
				var model = Object.assign({}, this.model);
				if (Sunset.isFunction(this.options.format)) {
					model = this.options.format && this.options.format(model) || model;
				}
				if (Sunset.isFunction(this.options.validate) && (!this.options.validate(model))) {
					throw new Error('校验不通过');
					return;
				}
				return model;
				//this.$broadcast('REFRESH_WIDGET_VALUE');
				//if (this.formValid) {
				// if (Sunset.isFunction(this.options.save)) {
				// 	this.options.save(model);
				// } else {
				// 	this.store[this.options.method || 'save'](model).then(res => {
				// 		Sunset.tip('保存成功', 'success');
				// 		this.$dispatch('saved');
				// 		this.$dispatch('CRUD_OPERATE_HOME');
				// 		this.$dispatch('CRUD_FORM_SAVED', res, model);
				// 	});
				// }
				//}
			},
			operateSignal(signal) {
				switch (signal) {
					case 'SUBMIT':
						try {
							this.submit();
						} catch (e) {}
						break;
					default:
						this.$emit.apply(this, ['signal'].concat([].slice.call(arguments)));
				}
			},
			submit() {
				try {
					var model = this.generateModel();
					if (Sunset.isFunction(this.options.submit)) {
						this.options.submit(model);
					} else if (this.options.store) {
						this.options.store[this.options.method || 'save'](model).then(res => {
							Sunset.tip('保存成功', 'success');
							this.$emit('signal', 'SAVED', res, model);
						}).catch(e => {
							this.$emit('signal', 'SAVE-ERROR', e);
						});
					}
				} catch (e) {
					this.$emit('signal', 'SAVE-ERROR', e);
				}
			},
			reset(record) {
				this.hasModel = !!record;
				this.record = record;
				var model = this.cast(record || {});
				if (Sunset.isFunction(this.options.cast)) {
					model = this.options.cast(model) || model;
				}
				this.model = model;
			},
			cast(model) {
				this.fields && this.fields.forEach(f => {
					if (model[f.name] != null && f.dataType) {
						switch (f.dataType) {
							case String:
								model[f.name] = String(model[f.name]);
						}
					}
				});
				return model;
			}
		}
	}
</script>