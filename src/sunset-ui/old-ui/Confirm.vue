<template>
	<div v-if="show" :class="['sunset-confirm',type]" transition="bounce">
		<div class="sunset-confirm-shim"></div>
		<div class="sunset-confirm-wrap">
			<header>
				<i class="fa fa-times" v-touch:tap="cancel"></i>
			</header>
			<div class="wrapper-y-xl text-center">{{msg}}</div>
			<footer>
				<button :class="['btn','btn-info']" type="button" v-touch:tap="ensure" style="margin-right:10px;">确定</button>
				<button :class="['btn','btn-white']" type="button" v-touch:tap="cancel">取消</button>
			</footer>
		</div>
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				msg : '',
				type: 'danger',
				show : false
			};
		},
		methods : {
			ensure(){
				this.show = false;
				this.ensureCallback&&this.ensureCallback();
			},
			cancel(){
				this.show = false;
				this.cancelCallback&&this.cancelCallback();
			}
		},
		events : {
			confirm(desc){
				if(!this.show){
					desc = desc||{};
					this.msg = desc.msg||'';
					this.type = desc.type||'info';
					this.ensureCallback = desc.ensure;
					this.cancelCallback = desc.cancel;
					this.show = true;
				}
			}
		}
	}

</script>