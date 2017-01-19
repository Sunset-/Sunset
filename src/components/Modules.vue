<template>
    <sunset-container>
        <sunset-sidebar v-ref:sidebar slot="leftside" :menus="menus" logo="Sunset管理框架"></sunset-sidebar>
        <sunset-header :current-user="currentUser" :menus="headerMenus">
        </sunset-header>
        <sunset-major>
            <router-view></router-view>
        </sunset-major>
    </sunset-container>
</template>
<script>
    import SignStore from './sign/SignStore';
    import MenuStore from './system/menu/MenuStore';
    import {
        modules
    } from '../modules.js';

    export default {
        data() {
            return {
                currentUser: null,
                headerMenus: [{
                    title: '安全退出',
                    operate() {
                        SignStore.logout().then(data => {
                            Router.go('/sign');
                        });
                    }
                }],
                menus: []
            }
        },
        ready() {
            //模块
            let moduleMap = {};
            modules && modules.forEach(m => {
                moduleMap[m.name] = m;
            });
            //菜单
            MenuStore.getAllMenus().then(res => {
                res && res.sort(function (o1, o2) {
                    if ((o1.parentId == '0' || o2.parentId == '0') && o1.parentId != o2.parentId) {
                        return o1.parentId == '0' ? -1 : (o2.parentId == '0' ? 1 : 0);
                    } else {
                        let f1 = +o1.orderField,
                            f2 = +o2.orderField;
                        return f1 < f2 ? -1 : (f1 > f2 ? 1 : 0);
                    }
                });
                let menus = [];
                let menuMap = {};
                res && res.forEach(m => {
                    if (m.parentId == '0') {
                        let parentMenu = {
                            title: m.name,
                            icon: m.icon,
                            path: m.module ? (`/app/${m.module}`) : null,
                            subMenus: m.module ? null : [],
                            permission: m.module
                        };
                        menus.push(parentMenu);
                        menuMap[m.id] = parentMenu;
                    } else {
                        menuMap[m.parentId].subMenus.push({
                            title: m.name,
                            icon: m.icon,
                            path: `/app/${m.module}`,
                            permission: m.module
                        })
                    }
                });
                this.menus = menus;
                this.$nextTick(() => {
                    this.$refs.sidebar.init();
                });
            });
            //登录用户
            SignStore.currentUser().then(user => {
                this.currentUser = user;
            });
        }
    }
</script>