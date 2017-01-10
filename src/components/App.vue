<template>
	<div class="page-container">
		<sunset-sidebar></sunset-sidebar>
		<div class="main-content">
			<sunset-header></sunset-header>
			<sunset-major>
				<router-view></router-view>
			</sunset-major>
		</div>
	</div>
</template>
<script>
	import SignStore from './sign/SignStore'

	export default {
		ready() {
			SignStore.currentUser().then(data => {}, err => {
				Router.go('/sign');
			});
		}
	}
</script>