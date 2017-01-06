<template>

	<ul v-show="totalPage>1" class="pagination m-no wrapper-no">
		<li>
			<a href="javascript:;" aria-label="Previous" @click="go('prev')">
				<span aria-hidden="true">&laquo;</span>
			</a>
		</li>
		<li v-for="n in showPages" :class="{'active':n==pageNumber}">
			<a href="javascript:;" @click="go(n)">{{n}}</a>
		</li>
		<li>
			<a href="javascript:;" aria-label="Next" @click="go('next')">
				<span aria-hidden="true">&raquo;</span>
			</a>
		</li>
	</ul>

</template>

<script>
	
	export default {
		props :{
			pageNumber : {
				type : Number,
				required : true
			},
			pageSize : {
				type:Number,
				required : true
			},
			total : {
				type : Number
			},
			showSize : {
				type : Number,
				default : 5
			}
		},
		data(){
			return {
				index : 1
			}
		},
		computed : {
			totalPage(){
				return this.total%this.pageSize==0?(this.total/this.pageSize):(parseInt(this.total/this.pageSize)+1);
			},
			showPages(){
				var showSize = this.showSize,
				currentPage = this.pageNumber,
				totalPage = this.totalPage,
				pages = [],
				offset = 0,
				prevPage,
				nextPage;
				if(showSize>0){
					pages.push(currentPage);
				}
				var go = !isNaN(totalPage)&&!isNaN(totalPage)&&currentPage;
				while(go){
					offset++;
					prevPage = currentPage-offset;
					if(prevPage>0&&pages.length<showSize){
						pages.unshift(prevPage);
					}
					nextPage = currentPage+offset;
					if(nextPage<=(totalPage)&&pages.length<showSize){
						pages.push(nextPage);
					}
					if((prevPage<=0&&nextPage>this.totalPage)||pages.length==showSize){
						break;
					}
				}
				return pages;
			}
		},
		methods : {
			go(type,force){
				var index = this.pageNumber;
				switch(type){
					case 'prev':
					index = Math.max(index-1,1);
					break;
					case 'next':
					index = Math.min(index+1,this.totalPage);
					break;
					default:
					index = isNaN(type)?this.index:type;
				}
				if(this.pageNumber != index){
					this.$dispatch('change',index);
				}
			}
		}
	}

</script>