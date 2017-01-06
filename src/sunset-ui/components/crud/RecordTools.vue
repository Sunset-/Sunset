<style lang="sass">
	.record-swtich {
		display: inline;
		margin: 0px 10px;
		vertical-align: middle;
		position: relative;
		top: 7px;
	}
</style>
<template>
	<template v-for="tool in showTools" v-permission="tool.permission">
		<div v-if="tool.type=='switch'" class="record-swtich">
			<input class="sunset-switch sunset-switch-anim" type="checkbox" @change="tool.change($event,record)" :checked="tool.value(record)"
			/>
		</div>
		<label :for="tool.uid+'_'+index" v-if="tool.file" :class="['m-r-sm','btn  btn-xs','btn-'+(tool.type||'primary')]" @click="operate(tool)">
			<i v-if="tool.icon" :class="[tool.icon,'m-r-xs']"></i>{{tool.label}}
			<span style="position:relative;width:0px;height:0px;display:inline-block;overflow:hidden;">
				<form :id="'FORM_'+tool.uid+'_'+index">
					<input :id="tool.uid+'_'+index" type="file" :name="tool.fileName" @change="submitForm(tool)" />
				</form>
			</span>
		</label>
		<button v-if="tool.type!='switch'&&!tool.file" :class="['m-r-sm btn btn-xs','btn-'+(tool.type||'primary')]" @click="operate(tool)"
						type="button">
			<i v-if="tool.icon" :class="[tool.icon,'m-r-xs']" style="font-size:12px;"></i>{{tool.label}}
		</button>
	</template>
</template>
<script>

	export default {
		props : {
			tools : {
				type : Array
			},
			record : {

			},
			store:{

			},
			index:{

			}
		},
		computed : {
			showTools(){
				var tools = this.tools,
					record = this.record;
				return  tools.filter(tool=>(tool.premise?tool.premise(record):true));
			}
		},
		methods : {
			operate(tool){
				switch(tool.operate){
					case 'CRUD_OPERATE_VIEW':
					this.$dispatch('CRUD_OPERATE_VIEW',this.record,tool);
					break;
					case 'CRUD_OPERATE_DELETE':
					this.remove(tool);
					break;
					default:
					if(Sunset.isFunction(tool.operate)){
						tool.operate(this.record,this.$dispatch.bind(this));
					}else{
						this.$dispatch(tool.operate,this.record,tool);
					}
				}
			},
			remove(tool){
				var record = this.record,
				store = this.store,
				self = this;
				Sunset.confirm({
					msg : '确定删除此条目',
					ensure(){
						store.removeById(record[tool.idKey||'id']).then(res=>{
							self.$dispatch('CRUD_TABLE_REFRESH',true);
						});
					}
				});
			},
			submitForm(tool){
				$(`#${'FORM_'+tool.uid+'_'+this.index}`).ajaxSubmit({
					url : tool.url,
					type : 'POST',
					data : tool.formData&&tool.formData(this.record)||{},
					success(data){
						tool.onSuccess&&tool.onSuccess(data);
					},
					error(err){
						tool.onError&&tool.onError(err);
					}
				});
			}
		}

	}

</script>