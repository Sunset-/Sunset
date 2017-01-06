<style lang="sass">
	.page-container .main-content .page-title.sunset-layout-module-title{
		margin-bottom: 17px;
	}
</style>

<template>
	
	<div class="page-title sunset-layout-module-title">

		<div class="title-env">
			<h1 class="title">{{title}}</h1>
		</div>

		<div class="breadcrumb-env">
			<ol class="breadcrumb bc-1">
				<li>
					<a href="javascript:;"><i class="fa-home"></i>{{module.title}}</a>
				</li>
				<li :class="{'active text-bold':page=='CRUD_TABLE'}">
					<a href="javascript:;" @click="go('CRUD_TABLE')">数据列表</a>
				</li>
				<li  :class="{'active text-bold':page=='CRUD_FORM'}" v-if="page=='CRUD_FORM'">
					<a href="javascript:;">条目编辑</a>
				</li>
			</ol>
		</div>
	</div>

</template>

<script>

	export default{
		props : {
			title : {

			},
			page:{

			}
		},
		computed:{
			module(){
				return Base.currentModule();
			}
		},
		methods : {
			go(page){
				this.page = page;
			}
		}

	}

</script>