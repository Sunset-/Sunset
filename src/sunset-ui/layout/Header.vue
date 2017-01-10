<style lang="sass" rel="stylesheet/scss">

	@import '../style/index.scss';

	.sunset-header {
		height: 60px;
		.ivu-dropdown {
			float: right;
			margin-top: 15px;
			margin-right: 15px;
		}
		.avator-link{
			cursor:pointer;
		}
	}
</style>
<template>
	<header class="sunset-header">
		<Dropdown>
			<span class="avator-link">
				<img src="/assets/xenon-img/user-4.png" alt="user-image" class="img-circle img-inline userpic-32" width="28" /> 下拉菜单
				<Icon type="arrow-down-b"></Icon>
			</span>
			<Dropdown-menu slot="list">
				<Dropdown-item>个人信息</Dropdown-item>
				<Dropdown-item>修改密码</Dropdown-item>
				<Dropdown-item divided>安全退出</Dropdown-item>
			</Dropdown-menu>
		</Dropdown>
	</header>
</template>
<script>
	export default {
		data() {
			return {
				currentUser: {},
				//快递表单
				passwordModalOptions: {
					options: {
						fields: [{
							label: '原密码',
							name: 'oldPwd',
							type: 'password',
							enum: 'expressCompany',
							validate: {
								required: true,
								maxlength: 32
							}
						}, {
							label: '新密码',
							name: 'newPwd',
							type: 'password',
							validate: {
								required: true,
								maxlength: 32
							}
						}],
						method: 'updatePassword',
						format: (model) => {
							model.id = this.currentUser.id;
							return model;
						}
					},
					store: null //SignStore
				}
			}
		},
		methods: {
			showUpdatePassword() {
				this.$broadcast('MODEL_FORM_SHOW');
			},
			updatePassword() {

			},
			logout() {
				// SignStore.logout().then(data=>{
				// 	Router.go('/sign');
				// });
			}
		},
		ready() {
			//this.currentUser = SignStore.currentUserCache || {};
		}
	};
</script>