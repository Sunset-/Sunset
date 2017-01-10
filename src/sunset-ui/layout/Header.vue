<template>
	<nav class="navbar user-info-navbar wrapper-y-sm wrapper-r-md" role="navigation">
		<ul class="user-info-menu right-links list-inline list-unstyled m-r-lg">
			{{currentUser.nickname}}
			<!--<dropdown>-->
				<a href="javascript:;" data-toggle="dropdown">
					<img src="/assets/xenon-img/user-4.png" alt="user-image" class="img-circle img-inline userpic-32" width="28" />
					<span>
						{{currentUser.nickname}}
						<i class="fa-angle-down"></i>
					</span>
				</a>
				<ul slot="dropdown-menu" class="dropdown-menu">
					<!--<li><a href="javascript:;" @click="showUpdatePassword">修改密码</a></li>-->
					<!--<li role="separator" class="divider"></li>-->
					<li><a href="javascript:;" @click="logout">安全退出</a></li>
				</ul>
			<!--</dropdown>-->
		</ul>
	</nav>
	<!-- 修改密码 -->
	<!--<modal-form title="修改密码" :form-options="passwordModalOptions" @saved="updatePassword()"></modal-form>-->
</template>

<script>

	export default{
		data(){
			return {
				currentUser : {},
				//快递表单
				passwordModalOptions : {
					options : {
						fields : [{
							label : '原密码',
							name : 'oldPwd',
							type : 'password',
							enum : 'expressCompany',
							validate : {
								required : true,
								maxlength: 32
							}
						},{
							label : '新密码',
							name : 'newPwd',
							type : 'password',
							validate : {
								required : true,
								maxlength: 32
							}
						}],
						method : 'updatePassword',
						format : (model)=>{
							model.id = this.currentUser.id;
							return model;
						}
					},
					store : null//SignStore
				}
			}
		},
		methods : {
			showUpdatePassword(){
				this.$broadcast('MODEL_FORM_SHOW');
			},
			updatePassword(){

			},
			logout(){
				// SignStore.logout().then(data=>{
				// 	Router.go('/sign');
				// });
			}
		},
		ready(){
			this.currentUser = SignStore.currentUserCache||{};
		}
	};

</script>