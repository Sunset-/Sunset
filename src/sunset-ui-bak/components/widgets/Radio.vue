<style lang="sass">
    .sunset-field-wrap {
        .radio-group-wrap.radio-pd {
            .ivu-radio-group {
                padding-top: 6px;
            }
        }
        .ivu-radio-group {
            height: 32px;
        }
    }
</style>
<template>
    <div :class="['sunset-field-wrap',invalid?'field-invalid':'']">
        <label :class="['sunset-field-label',options.label?'':'sunset-field-label-empty']">{{options.label}}</label>
        <div :class="['sunset-field radio-group-wrap',options.type=='button'?'':'radio-pd']">
            <Radio-group :type="options.type" :size="options.size" :model.sync="value">
                <Radio v-for="item in items" :value="item.value" :disabled="item.disabled">
                    <span>{{item.text}}</span>
                </Radio>
            </Radio-group>
        </div>
    </div>
</template>
<script>
    import Utils from '../Helper.js';

    export default {
        props: {
            options: {
                type: Object
            },
            value: {}
        },
        data() {
            return {
                items: []
            };
        },
        computed: {
            type() {
                return this.options.type == 'input' ? 'text' : this.options.type;
            }
        },
        methods: {
            init() {
                Utils.generateItems(this.options).then(items => {
                    this.items = items;
                    if (this.options.defaultFirst && this.value === void 0) {
                        this.value = this.items[0].value;
                    }
                    this.refreshValue();
                    this.$emit('ready', this.options.name);
                });
            },
            refreshValue() {
                var temp = this.value;
                this.value = '';
                this.$nextTick(() => {
                    this.value = temp;
                });
            }
        },
        ready() {
            this.init();
        }
    };
</script>