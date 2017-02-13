<style lang="sass">
    @import '../../../style/index.scss';
    .widget-upload-btn {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 29px;
        padding: 0px;
        border: 2px solid $border;
        background: #FFF;
        color: #FFF;
        overflow: hidden;
        &:before {
            content: '';
            position: absolute;
            z-index: 0;
            left: 10%;
            width: 80%;
            top: 50%;
            margin-top: -2px;
            height: 4px;
            background: $border;
            cursor: pointer;
        }
        &:after {
            content: '';
            position: absolute;
            z-index: 0;
            left: 50%;
            margin-left: -2px;
            top: 10%;
            height: 80%;
            width: 4px;
            background: $border;
            cursor: pointer;
        }
    }
</style>
<template>
    <div :class="['sunset-field-wrap']">
        <label class="sunset-field-label">{{options.label}}</label>
        <div class="sunset-field">
            <upload-item v-for="item in queue" :data.sync="item" :size="options.size"></upload-item>
            <div :id="id" class="widget-upload-btn">占位符占位符占位符占位符占位符</div>
            <span class="inline wrapper-x-sm" v-if="options.sizeTip">建议尺寸：{{options.sizeTip}}</span>
            <uploader v-ref:uploader :id="id" :url="options.url" :queue.sync="queue" :max="max"></uploader>
        </div>
    </div>
</template>
<script>
    import {
        Uploader,
        UploadItem
    } from '../../uploader/index';

    var uid = 0;

    export default {
        components: {
            Uploader,
            UploadItem
        },
        props: {
            options: {
                type: Object
            },
            value: {

            }
        },
        data() {
            return {
                id: `sunset-widget-uploader-${++uid}`,
                pending: false,
                queue: []
            };
        },
        computed: {
            max() {
                return this.options.max || 1;
            }
        },
        methods: {
            refreshValue() {
                var srcs = [];
                this.queue.forEach(item => {
                    item.src && (srcs.push(item.src));
                });
                this.pending = true;
                this.value = srcs.join(',');
            }
        },
        events: {
            REFRESH_WIDGET_VALUE() {
                this.$refs.uploader.init();
            },
            SUNSET_UPLOAD_SUCCESS() {
                this.refreshValue();
            },
            SUNSET_IMAGE_REMOVE(data) {
                var queue = this.queue;
                for (var i = 0, item; item = queue[i]; i++) {
                    if (item == data) {
                        this.queue.splice(i, 1);
                        break;
                    }
                }
                this.refreshValue();
            }
        },
        watch: {
            value(value) {
                if (!this.pending) {
                    var queue = this.queue;
                    queue.splice(0, queue.length);
                    if (value && value.length) {
                        value.split(',').forEach(src => {
                            queue.push({
                                src: src
                            });
                        });
                        this.pending = false;
                    }
                }
            }
        }
    }
</script>