<template>
	<div class="sunset-photo sunset-paper sunset-paper-3x">
		<img :class="photoClass" :src="src" @click="show" />
	</div>
</template>

<script>

//图片查看器
import photoswipSkinCss from './vendor/photoswipe/dist/default-skin/default-skin.css';
import photoswipCss from './vendor/photoswipe/dist/photoswipe.css';
import PhotoSwipe from './vendor/photoswipe/dist/photoswipe.min.js';
import PhotoSwipeUI_Default from './vendor/photoswipe/dist/photoswipe-ui-default.min.js';

var dom = document.querySelectorAll('.pswp')[0];

function viewPhoto(items) {
	var gallery = new PhotoSwipe(dom, PhotoSwipeUI_Default, items, {
		history: false,
		focus: false,
		showAnimationDuration: 0,
		hideAnimationDuration: 0,
		bgOpacity : 0.9,
		index: 0
	});
	gallery.init();
	gallery.framework.bind(gallery.scrollWrap, 'pswpTap', function(e) {
		if (e.target.className.indexOf('pswp__button--fs') < 0) {
			gallery.close();
		}
	});
}

var singleId = 0;


export default {
	props :{
		src : {
			type : String
		},
		group:{
			type : String
		}
	},
	data(){
		return {};
	},
	computed:{
		photoClass(){
			if(this.group){
				return `sunset-photo-${this.group}`;
			}else{
				return `sunset-photo-${++singleId}`;
			}
		}
	},
	methods : {
		show(ev){
			var className = ev.target.className;
			var photos = $(`.${className}`),
				items = [],
				count = photos.length;
			for(var i=0,img;img=photos[i++];){
				(img=>{
					var p = new Image();
					p.src=img.src;
					p.onload = ev=>{
						items.push({
							src : ev.target.src,
							w : ev.target.width,
							h : ev.target.height
						});
						count--;
						if(count==0){
							viewPhoto(items);
						}
						p.onerror = null;
						p.onload = null;
					};
					p.onerror = err=>{
						viewPhoto
						p.onerror = null;
						p.onload = null;
					};
				})(img);
			}
			// viewPhoto([{
			// 	src: this.src,
			// 	w: 200,
			// 	h: 200
			// },{
			// 	src: this.src,
			// 	w: 200,
			// 	h: 200
			// }],0)

		}
	}
}

</script>