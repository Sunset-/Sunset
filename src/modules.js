import Crud from './components/bootstrap/crud/Crud.vue';
import Modal from './components/bootstrap/modal/Modal.vue';
import Tree from './components/bootstrap/tree/Tree.vue';
import View from './components/bootstrap/view/View.vue';

//系统管理
import Account from './components/system/account/Account.vue';
import Dictionary from './components/system/dictionary/Dictionary.vue';
import SystemVariable from './components/system/systemVariable/SystemVariable.vue';
import Menu from './components/system/menu/Menu.vue';
import Permission from './components/system/permission/Permission.vue';

//业务

let permissions = {
    ADD: '新增',
    MODIFY: '修改',
    DELETE: '删除',
    ENUM_UPDATE: '枚举修改',
    ENUM_DELETE: '枚举删除',
    ENUM_ORDER: '枚举排序',
    ROLE: '分配角色',
    ENUM: '枚举管理',
    MOUNT_MENU: '挂载菜单',
    AUTHORIZATION: '授权',
    ADDREL: '添加关联关系',
    DELETEREL: '删除关联关系'
};

let modules = [
    //组件库
    {
        group: '组件库',
        color: 'success',
        name: 'Crud',
        title: '增删改查',
        permission: [],
        component: Crud
    }, {
        group: '组件库',
        color: 'success',
        name: 'Modal',
        title: '模态窗',
        component: Modal
    }, {
        group: '组件库',
        color: 'success',
        name: 'Tree',
        title: '树',
        component: Tree
    }, {
        group: '组件库',
        color: 'success',
        name: 'View',
        title: '视图组件',
        component: View
    },
    //系统模块
    {
        group: '系统模块',
        name: 'Account',
        title: '管理账户',
        permission: ['ADD', 'MODIFY', 'DELETE', 'ROLE'],
        component: Account
    }, {
        group: '系统模块',
        name: 'Dictionary',
        title: '字典管理',
        permission: ['ADD', 'MODIFY', 'DELETE', 'ENUM', 'ENUM_UPDATE', 'ENUM_DELETE', 'ENUM_ORDER'],
        component: Dictionary
    }, {
        group: '系统模块',
        name: 'SystemVariable',
        title: '系统变量',
        permission: ['ADD', 'MODIFY', 'DELETE'],
        component: SystemVariable
    }, {
        group: '系统模块',
        name: 'Menu',
        title: '菜单配置',
        permission: ['ADD', 'MODIFY', 'DELETE', 'MOUNT_MENU'],
        component: Menu
    }, {
        group: '系统模块',
        name: 'Permission',
        title: '权限管理',
        permission: ['ADD', 'MODIFY', 'DELETE', 'AUTHORIZATION'],
        component: Permission
    }
    //业务模块
    
];

var moduleComponent = {};
modules.forEach(m => {
    moduleComponent[m.name] = m.component;
});

module.exports = {
    moduleComponent: moduleComponent,
    modules: modules,
    permissions: permissions
};