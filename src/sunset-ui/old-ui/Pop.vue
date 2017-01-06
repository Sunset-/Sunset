<template>
	
</template>

<script>

		$('body').on('mouseenter','.sunset-pop',function(){
			var $this = $(this),
				popData = $this.attr('data-content')||'格式不合法';
			var $pop = $('.sunset-pop-wrap');
			if(!$pop.length){
				$pop = $('<div class="sunset-pop-wrap">'+popData+'</div>');
			}else{
				$pop.html(popData);
			}
			$pop.appendTo($('body')).show();
			var offset = $this.offset();
			$pop.css({
				left : offset.left-$pop.width()+16,
				top : offset.top-46
			});
		});
		$('body').on('mouseleave','.sunset-pop',function(){
			$('.sunset-pop-wrap').hide();
		});

</script>