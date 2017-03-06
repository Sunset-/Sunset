<style lang="sass">
    .sunset-view-modal {
        .ivu-select-dropdown {
            position: absolute !important;
        }
    }
</style>
<template>
    <Modal class-name="sunset-view-modal" :visible.sync="visible" :title="options.title" :width="options.width||700">
        <slot></slot>
        <div slot="footer">
            <i-button type="success" @click="cancel">{{options.okText||'确定'}}</i-button>
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
                this.visible = true;
            },
            cancel() {
                this.visible = false;
                this.modal_loading = false;
                this.options.cancel && this.options.cancel();
            }
        }
    };
</script>