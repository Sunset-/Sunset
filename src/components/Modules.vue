<template>
    <sunset-container>
        <sunset-sidebar slot="leftside" :menus="menus"></sunset-sidebar>
        <sunset-header :current-user="currentUser" :menus="headerMenus">
        </sunset-header>
        <sunset-major>
            <router-view></router-view>
        </sunset-major>
    </sunset-container>
</template>
<script>
    import SignStore from './sign/SignStore';

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
                menus: [{
                    title: 'Sunset组件库',
                    icon: 'fa-home',
                    subMenus: [{
                        title: 'CURD',
                        path: '/app/bootstrap/crud'
                    }, {
                        title: 'Tree',
                        path: '/app/bootstrap/tree'
                    }, {
                        title: 'Model',
                        path: '/app/bootstrap/modal'
                    }, {
                        title: '图标',
                        path: '/app/referral/assessmentCase'
                    }]
                }, {
                    title: '系统管理',
                    icon: 'fa-home',
                    permission: 'SYSTEM_MANAGER',
                    subMenus: [{
                        title: '管理帐号',
                        path: '/app/system/account',
                        permission: 'SYSTEM_MANAGER_DICTIONARY'
                    }, {
                        title: '数据字典',
                        path: '/app/system/dictionary',
                        permission: 'SYSTEM_MANAGER_DICTIONARY'
                    }]
                }, {
                    title: '业务管理',
                    icon: 'fa-home',
                    subMenus: [{
                        title: '缴费查询',
                        path: '/app/payment'
                    }]
                }]
            }
        },
        ready() {
            SignStore.currentUser().then(user => {
                this.currentUser = user;
            })
        }
    }
</script>