<template>
    <sunset-container>
        <sunset-sidebar slot="leftside" :menus="menus"></sunset-sidebar>
        <sunset-header></sunset-header>
        <sunset-major>
            <router-view></router-view>
        </sunset-major>
    </sunset-container>
</template>
<script>
    export default {
        data() {
            return {
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
                }]
            }
        }
    }
</script>