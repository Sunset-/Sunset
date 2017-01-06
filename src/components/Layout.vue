<template>
	<div class="page-container">
		<sunset-sidebar></sunset-sidebar>
		<div class="main-content">
			<sunset-nav></sunset-nav>
			<sunset-major>
			<router-view></router-view>
		</sunset-major>
	</div>
</div>
</template>

<script>

	import {SunsetHeader,SunsetFooter,SunsetMajor,SunsetNav,SunsetSidebar} from './layout/api';	

	export default {
		components : {
			SunsetFooter,
			SunsetMajor,
			SunsetNav,
			SunsetSidebar
		}
	};

</script>