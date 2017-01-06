<template>
	<div class="sunset-pullrefresher">
		<div class="sunset-pullrefresher-scroll" @touchStart="touchStartHandle" @touchMove="touchMoveHandle" @touchEnd="touchEndHandle">
			<div class="sunset-pullrefresher-tip">
				<i></i>
				{{text}}
			</div>
			<div class="sunset-pullrefresher-scroll-content">
				<slot></slot>
				<div class="sunset-pullrefresher-more-tip" v-if="moreStatus=='LOADING'||moreStatus=='END'">
					{{moreText}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	var count = 0;

	const TIP_HEIGHT = 50;
	const LOADING_START_TOP = 5;
	const LOADING_START_BOTTOM = 50;

	export default{
		props :{
			tip : {
				type : String,
				default : '下拉刷新'
			},
			loadingTip : {
				type : String,
				default : '加载中...'
			},
			readyTip : {
				type : String,
				default : '释放刷新'
			}
		},
		data(){
			return {
				status : 'NORMAL',
				moreStatus : 'NORMAL',
				trace : {}
			};
		},
		computed:{
			text(){
				switch(this.status){
					case 'NORMAL' :
					return this.tip;
					case 'READY' :
					return this.readyTip;
					case 'LOADING' :
					return this.loadingTip;
				}
			},
			moreText(){
				switch(this.moreStatus){
					case 'LOADING' :
					return '正在加载...';
					case 'END' :
					return '已无更多数据';
				}
			}
		},
		ready(){
			var self = this;

			this.$container = $(this.$el);
			this.$scroll = $(".sunset-pullrefresher-scroll",this.$el);
			this.trace.INIT_Y = this.$scroll.offset().top;

			$('.sunset-pullrefresher-scroll-content',this.$scroll).scroll(function(){
				var $this = $(this),
				bottom = $this[0].scrollHeight-$this.scrollTop()-$this.height();
				if(bottom<=LOADING_START_BOTTOM){
					self.loadMore();
				}
			})
		},
		events : {
			FINISH_REFRESH : function(){
				this.back();
			},
			FINISH_MORE : function(isEnd){
				this.moreStatus = isEnd ? 'END':'NORMAL';
			}
		},
		methods : {
			touchStartHandle(event) {
				var touch = event.touches ? event.touches[0] : event.mouse;
				this.trace.domY = parseInt(this.$scroll.css('top'));
				this.trace.touchStartY = this.trace.touchLastY = touch.clientY;
			},
			touchMoveHandle(event) {
				if (this.status=='LOADING') {
					return;
				}
				var offsetY = this.$scroll.offset().top - this.trace.INIT_Y;

				var trace = this.trace,
				touch = event.touches ? event.touches[0] : event.mouse,
				touchChangeY = touch.clientY - this.trace.touchLastY;
				if(touchChangeY>=0){
					if(offsetY>=-5){
						touchChangeY = 3 * ((80 - (this.trace.domY + TIP_HEIGHT)) / 80.0);
						this.$scroll.css('top',(this.trace.domY = this.trace.domY + touchChangeY)+'px');

					}
				}else{
					if(offsetY>0){
						this.$scroll.css('top',(this.trace.domY = this.trace.domY + touchChangeY)+'px');
						event.stopPropagation();
						event.preventDefault();
					}
				}
				this.trace.touchLastY = touch.clientY;
				if (this.trace.domY > LOADING_START_TOP) {
					this.status = 'READY';
				}else{
					this.status = 'NORMAL';
				}
			},
			touchEndHandle(event) {
				if (this.status=='LOADING') {
					return;
				}
				var lastY = this.trace.domY;
				if (lastY >= LOADING_START_TOP) {
					this.loading();
				} else {
					this.back();
				}
			},
			loading() {
				var self = this;
				this.status = 'LOADING';
				this.$scroll.animate({
					top: '0px'
				}, 'fast', function() {
					self.$dispatch('refresh');
				});
			},
			loadMore(){
				if(this.moreStatus=='NORMAL'){
					this.moreStatus = 'LOADING';
					this.$dispatch('more');
				}
			},
			back() {
				this.status = 'NORMAL';
				this.$scroll.animate({
					top: `-${TIP_HEIGHT}px`
				}, 'fast');
			}
		}
	}
</script>