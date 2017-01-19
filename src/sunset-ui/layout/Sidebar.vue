<style lang="sass">
	.sunset-sidebar {
		height: 100%;
		display: table-cell;
		position: relative;
		width: 300px;
		background: #2c2e2f;
		z-index: 1;
		.sidebar-menu-inner {
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			width: inherit;
			overflow: hidden;
		}
		.logo-env {
			display: block;
			padding: 25px 35px;
			border-bottom: 1px solid #313437;
			&:before {
				content: " ";
				display: table;
			}
			&:after {
				content: " ";
				display: table;
				clear: both;
			}
			.logo {
				float: left;
				&:after {
					content: " ";
					display: table;
					clear: both;
				}
				.logo-text {
					float: left;
					color: #40bbea;
					font-size: 23px;
				}
			}
		}
		.main-menu {
			padding-left: 30px;
			padding-right: 30px;
			margin-top: 15px;
			margin-bottom: 15px;
			list-style: none;
			li {
				&.has-sub>a:before {
					position: relative;
					display: inline-block;
					font-family: FontAwesome;
					content: '\F107';
					float: right;
					color: #6d747a;
					margin-left: 10px;
					-webkit-transform: rotate(-90deg);
					transform: rotate(-90deg);
					-webkit-transition: all .15s ease-in-out;
					transition: all .15s ease-in-out;
				}
				&.has-sub.expanded>a:before {
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
				}
			}
			a {
				color: #979898;
				text-decoration: none;
				display: block;
				padding: 13px 5px;
				border-bottom: 1px solid #313437;
				-webkit-transition: all .22s ease-in-out;
				transition: all .22s ease-in-out;
				&>span {
					display: inline-block;
				}
				&:hover {
					color: #FFF;
				}
			}
			ul {
				display: block;
				display: none;
				margin: 0;
				padding: 0;
				overflow: hidden;
				list-style: none;
				li {
					position: relative;
					opacity: 1;
					margin-left: 0px;
					a {
						padding-left: 35px;
					}
					&.active {
						a {
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="sunset-sidebar sidebar-menu toggle-others fixed">
		<div class="sidebar-menu-inner">
			<header class="logo-env">
				<!-- logo -->
				<div class="logo">
					<span class="logo-text">{{logo}}</span>
				</div>
			</header>
			<ul id="main-menu" class="main-menu">
				<li v-permission="menu.permission" v-for="menu in menus" :class="{'has-sub':menu.subMenus,expanded : openedMenu==menu}">
					<a :class="'menu-'+$index" href="javascript:;" @click="toggleMenu(menu,$index,true)">
						<Icon v-if="menu.icon" :type="menu.icon" :size="14"></Icon>
						<span class="title">{{menu.title}}</span>
					</a>
					<ul v-if="menu.subMenus">
						<li v-for="subMenu in menu.subMenus" v-permission="subMenu.permission" :class="{'active':activeMenu==subMenu}">
							<a href="javascript:;" @click="go(subMenu.path)">
								<Icon v-if="subMenu.icon" :type="subMenu.icon" :size="14"></Icon>
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
		props: {
			logo: {},
			menus: {}
		},
		data() {
			return {
				openedMenu: null,
				activeMenu: null
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
			};
			//路由监听
			Router.afterEach(() => {
				this.init();
			});
		}
	};
</script>