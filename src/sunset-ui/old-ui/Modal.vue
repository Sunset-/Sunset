<template>
	<div v-show="show" class="sunset-widget-modal" transition="modalanimate">
		<div class="sunset-widget-modal-shim" @click="hideModal"></div>
		<div :style="positionStyle" class="sunset-widget-modal-wrap">
			<header v-if="title!=null">{{title}}<span class="close fa fa-close" v-touch:tap="hideModal"></span></header>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	
function caculateSize(width) {
	var widthNumber = 0,
		leftNumber = 0;
	if (width === void 0) {
		return {
			width: `60%`,
			left: `20%`
		};
	} else if (typeof width == "number" || (typeof width == "string" && (width.substr(-2, 2) == "px"))) {
		widthNumber = parseInt(width);
		leftNumber = (document.body.clientWidth - widthNumber) / 2;
		return {
			width: `${widthNumber}px`,
			left: `${leftNumber}px`
		};
	} else if (typeof width == "string" && (width.charAt(width.length - 1)) == "%") {
		widthNumber = Math.min(parseFloat(width), 100);
		leftNumber = (100 - widthNumber) / 2;
		return {
			width: `${widthNumber}%`,
			left: `${leftNumber}%`
		};
	}
	throw new Error(`modal width must be a number or number% ,${width} is not valid`);
}

export default {
	props :{
		width : {
			default : '80%'
		},
		height : {
			default : 'auto'
		},
		title : {
			default : null
		}
	},
	data(){
		return {
			show : false
		};
	},
	computed:{
		positionStyle(){
			var style =  caculateSize(this.width)||{};
			style.height = this.height;
			return style;
		}
	},
	methods : {
		hideModal(){
			this.show = false;
		}
	},
	events : {
		openModal(){
			this.show = true;
		},
		closeModal(){
			this.show = false;
		}
	}
}


</script>