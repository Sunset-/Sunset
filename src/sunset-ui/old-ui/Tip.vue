<template>
	<div v-show="show" :class="['sunset-tip',type]" transition="sunsettip">
		<i :class="icon"></i>
		<span>{{msg}}</span>
	</div>
</template>

<script>
	
	var ICON_CLASS = {
		'info' : 'fa fa-info',
		'success' : 'fa fa-check',
		'danger' : 'fa fa-exclamation'
	};

	export default{
		data(){
			return {
				type : 'info',
				msg : '报告发送成功',
				show : false,
				list : []
			}
		},
		computed:{
			icon(){
				return ICON_CLASS[this.type]||ICON_CLASS.DEFAULT;
			}
		},
		events:{
			tip(msg,type,delay){
				var tipDesc = {
					type:type||'info',
					msg : msg||'',
					show : true,
					delay : 2500
				},
				tipDescJson = JSON.stringify(tipDesc);
				if(this.list.length){
					if(JSON.stringify(this.list[this.list.length-1])==tipDescJson){
						return;
					}
				}
				if(this.currentTipDesc){
					if(JSON.stringify(this.currentTipDesc)==tipDescJson){
						return;
					}
				}
				this.list.push({
					type:type||'info',
					msg : msg||'',
					show : true,
					delay : 2500
				});
				this.tick();
			}
		},
		methods:{
			tick(){
				if(!this.show){
					var desc = this.list.shift();
					if(desc){
						this.type= desc.type;
						this.msg = desc.msg;
						this.show = true;
						this.currentTipDesc = desc;
						setTimeout(()=>{
							this.currentTipDesc = null;
							this.show = false;
							setTimeout(()=>{
								this.tick();
							},500);
						},desc.delay);
					}
				}
			}
		}
	}

</script>