<style lang="sass">
	.sunset-search-form-container {
		.sunset-search-form {
			.search-form-button {
				margin-bottom: 0px;
			}
		}
		&:after {
			content: '';
			display: block;
			clear: both;
		}
	}
</style>
<template>
	<div class="sunset-search-form-container">
		<form :class="['sunset-search-form form-inline form-horizontal',right?'pull-right':'left-search-form']" onsubmit="return false">
			<sunset-filter v-for="field in fields" :options="field" :value.sync="filter[field.name]"></sunset-filter>
			<button v-if="searchButton" class="btn btn-info btn-sm search-form-button" @click="searchClick">{{searchButton}}</button>
		</form>
	</div>
</template>
<script>
	import SunsetFilter from './Filter';

	export default {
		components: {
			SunsetFilter
		},
		props: {
			options: {}
		},
		computed: {
			fields() {
				return this.options && this.options.fields || [];
			},
			right() {
				return this.options && this.options.align == 'right';
			},
			searchButton() {
				return this.options && this.options.searchButton || '';
			}
		},
		data() {
			return {
				filter: {}
			};
		},
		methods: {
			generateLocalFilter() {
				var localFilterFields = this.fields.filter(item => Sunset.isFunction(item.localFilter)) || [],
					data = Object.assign({}, this.filter);
				return function (record) {
					for (var i = 0, field; field = localFilterFields[i++];) {
						if (!field.localFilter.call(field, record, data[field.name])) {
							return false;
						}
					}
					return true;
				}
			},
			searchClick() {
				this.search()
			},
			search() {
				var filter = Object.assign({}, this.filter);
				if (Sunset.isFunction(this.options.format)) {
					filter = this.options.format(filter) || filter;
				}
				this.$emit('filter', filter, this.generateLocalFilter());
			}
		},
		events: {
			FIELD_SEARCH() {
				this.search()
			},
			CRUD_TABLE_FILTER_RESET() {
				this.filter = {};
				this.search()
			}
		}
	}
</script>