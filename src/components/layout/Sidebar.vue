<template>
	<div class="sidebar-menu toggle-others fixed">
		<div class="sidebar-menu-inner">
			<header class="logo-env">
				<!-- logo -->
				<div class="logo">
					<a href="javascript:;" class="logo-expanded">
						<h3 class="text-info">妇产转诊后台管理</h3>
					</a>
					<a href="javascript:;" class="logo-collapsed">
					</a>
				</div>
			</header>
			<ul id="main-menu" class="main-menu">
				<li v-permission="menu.permission" v-for="menu in menus" :class="{'has-sub':menu.subMenus,expanded : openedMenu==menu}">
					<a :class="'menu-'+$index" href="javascript:;" @click="toggleMenu(menu,$index,true)"> <i v-if="menu.icon" :class="menu.icon"></i>
						<span class="title">{{menu.title}}</span>
					</a>
					<ul v-if="menu.subMenus">
						<li v-for="subMenu in menu.subMenus" v-permission="subMenu.permission" :class="{'active':activeMenu==subMenu}">
							<a href="javascript:;" @click="go(subMenu.path)">
								<span class="title">{{subMenu.title}}</span>
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				openedMenu: null,
				activeMenu: null,
				menus: [{
					title: '系统管理',
					icon: 'fa-home',
					permission: 'SYSTEM_MANAGER',
					subMenus: [{
						title: '管理帐号',
						path: '/app/system/managerAccount',
						permission: 'SYSTEM_MANAGER_DICTIONARY'
					}, {
						title: '数据字典',
						path: '/app/system/dictionary',
						permission: 'SYSTEM_MANAGER_DICTIONARY'
					}]
				}, {
					title: '业务管理',
					icon: 'fa-home',
					permission: 'SYSTEM_MANAGER',
					subMenus: [{
						title: '医院管理',
						path: '/app/hospital',
						permission: 'SYSTEM_MANAGER_USER'
					}, {
						title: '测题管理',
						path: '/app/referral/assessmentCase',
						permission: 'SYSTEM_MANAGER_USER'
					}]
				}, {
					title: 'Sunset组件库',
					icon: 'fa-home',
					subMenus: [{
						title: 'CURD',
						path: '/app/hospital'
					}, {
						title: 'Model',
						path: '/app/referral/assessmentCase'
					}, {
						title: '图标',
						path: '/app/referral/assessmentCase'
					}]
				}]
			}
		},
		methods: {
			toggleMenu(menu, index, toggle) {
				var $subMenu = $(`.menu-${index} + ul`);
				if ($subMenu.length) {
					if (this.openedMenu != menu) {
						if (this.openedMenu) {
							this.closeSubMenu(this.openedMenu.$subMenu);
						}
						this.openedMenu = menu;
						this.openSubMenu(menu.$subMenu = $subMenu);
					} else if (toggle) {
						this.closeSubMenu(this.openedMenu.$subMenu);
						this.openedMenu = null;
					}
				} else {
					this.activeMenu = menu;
					this.go(menu.path);
				}
			},
			activeSubMenu(subMenu) {
				this.activeMenu = subMenu;
			},
			openSubMenu($subMenu) {
				var subMenuHeight = $subMenu.outerHeight();
				$subMenu.css({
					height: 0
				}).show().animate({
					height: subMenuHeight
				}, 200);
				var $lis = $subMenu.children().css({
					opacity: 0,
					marginLeft: '-20px'
				});
				$lis.each((index, item) => {
					setTimeout(() => {
						$(item).animate({
							opacity: 1,
							marginLeft: '0px'
						}, 300);
					}, 80 * index);
				});
			},
			closeSubMenu($subMenu) {
				var subMenuHeight = $subMenu.outerHeight();
				$subMenu.animate({
					height: 0
				}, 200, function () {
					$subMenu.hide().css({
						height: subMenuHeight
					});
				});
				var $lis = $subMenu.children().css({
					opacity: 1,
					marginLeft: '0px'
				});
				$lis.each((index, item) => {
					setTimeout(() => {
						$(item).animate({
							opacity: 0,
							marginLeft: '-20px'
						}, 300);
					}, 80 * index);
				});
			},
			go(path) {
				Router.go(path);
			},
			init() {
				var path = this.$route.path;
				this.menus.forEach((menu, index) => {
					if (menu.path === path) {
						this.toggleMenu(menu, index);
					} else if (menu.subMenus) {
						menu.subMenus.forEach((subMenu) => {
							if (subMenu.path == path) {
								this.toggleMenu(menu, index);
								this.activeSubMenu(subMenu);
							}
						});
					}
				});
			}
		},
		ready() {
			this.init();
		},
		created() {
			//将路径解析挂载到Base中
			Base.currentModule = () => {
					if (this.activeMenu) {
						return {
							title: this.activeMenu.title,
							icon: this.activeMenu.icon
						};
					}
					return {};
				}
				//路由监听
			Router.afterEach(() => {
				this.init();
			});
		}
	};
</script>