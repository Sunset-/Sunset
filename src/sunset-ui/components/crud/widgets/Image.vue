<style lang="sass">
    .widget-upload-btn.btn{
        width:80px;
        height: 30px;
        line-height: 29px;
        padding:0px;
    }
</style>
<template>
    <validator name="validation">
        <div class="form-group">
            <label :class="['control-label',`col-xs-${options.labelCols}`]">{{options.label}}</label>
            <div :class="['input-group',`col-xs-${options.widgetCols}`]">
                <div :id="id" class="btn btn-info widget-upload-btn">上传图片</div>
                <span class="inline wrapper-x-sm" v-if="options.sizeTip">建议尺寸：{{options.sizeTip}}</span>
                <br/>
                <upload-item v-for="item in queue" :data.sync="item" :size="options.size"></upload-item>
            </div>
        </div>
    </validator>
    <uploader :id="id" :queue.sync="queue" :max="max"></uploader>
</template>
<script>

    import {Uploader,UploadItem} from '../../uploader/index';

    var uid = 0;

    export default{
        components : {
            Uploader,
            UploadItem
        },
        props : {
            options : {
                type : Object
            },
            value : {

            }
        },
        data(){
            return{
                id : `sunset-widget-uploader-${++uid}`,
                pending : false,
                queue : []
            };
        },
        computed:{
            max(){
                return this.options.max||1;
            }
        },
        methods:{
            refreshValue(){
                var srcs = [];
                this.queue.forEach(item=>{
                    item.src&&(srcs.push(item.src));
                });
                this.pending = true;
                this.value = srcs.join(',');
            }
        },
        events : {
            WIDGET_RESET(){
                this.$broadcast('UPLOADER_REFRESH');
            },
            SUNSET_UPLOAD_SUCCESS(){
                this.refreshValue();
            },
            SUNSET_IMAGE_REMOVE(data){
                var queue = this.queue;
                for(var i=0,item;item=queue[i];i++){
                    if(item==data){
                        this.queue.splice(i,1);
                        break;
                    }
                }
                this.refreshValue();
            }
        },
        watch:{
            value(value){
                if(!this.pending){
                 var queue = this.queue;
                 queue.splice(0,queue.length);
                 if(value&&value.length){
                    value.split(',').forEach(src=>{
                        queue.push({
                            src : src
                        });
                    });
                    this.pending = false;
                }    
            }
        }
    }
}
</script>