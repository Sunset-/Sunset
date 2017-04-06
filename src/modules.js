//系统管理
import Account from './components/system/account/Account.vue';
import Dictionary from './components/system/dictionary/Dictionary.vue';
import SystemVariable from './components/system/systemVariable/SystemVariable.vue';
import Menu from './components/system/menu/Menu.vue';
import Permission from './components/system/permission/Permission.vue';

//业务
import Doctor from './components/business/doctor/Doctor.vue';
import Hospital from './components/business/hospital/Hospital.vue';
import Team from './components/business/team/Team.vue';
import Customer from './components/business/customer/Customer.vue';
import Template from './components/business/template/Template.vue';

import Reporting from './components/business/reportCenter/Reporting.vue';
import Reported from './components/business/reportCenter/Reported.vue';

import DicomImage from './components/business/dicomImage/DicomImage.vue';
import Dailycase from './components/business/dailycase/Dailycase.vue';

import PlatformStatistics from './components/business/reportStatistics/PlatformStatistics.vue';
import TeamStatistics from './components/business/reportStatistics/TeamStatistics.vue';
import CustomerStatistics from './components/business/reportStatistics/CustomerStatistics.vue';

let permissions = {
    VIEW: '查看',
    ADD: '新增',
    MODIFY: '修改',
    DELETE: '删除',
    RESET_PASSWORD: '重置密码',
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
    //系统模块
    {
        group: '系统模块',
        name: 'Account',
        title: '管理账户',
        permission: ['ADD', 'MODIFY', 'DELETE', 'RESET_PASSWORD', 'ROLE'],
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
    },
    //业务模块
    {
        group: '业务模块',
        color: 'warning',
        name: 'Doctor',
        title: '医生管理',
        permission: ['ADD', 'MODIFY'],
        component: Doctor
    }, {
        group: '业务模块',
        color: 'warning',
        name: 'Hospital',
        title: '医院管理',
        permission: ['ADD', 'MODIFY', 'DELETE'],
        component: Hospital
    }, {
        group: '业务模块',
        color: 'warning',
        name: 'Team',
        title: '团队管理',
        permission: ['ADD', 'MODIFY'],
        component: Team
    }, {
        group: '业务模块',
        color: 'warning',
        name: 'Customer',
        title: '站点管理',
        permission: ['ADD', 'MODIFY', 'ADDREL', 'DELETEREL'],
        component: Customer
    }, {
        group: '业务模块',
        color: 'warning',
        name: 'Template',
        title: '诊断模板',
        permission: ['ADD', 'MODIFY', 'DELETE'],
        component: Template
    }, {
        group: '业务模块',
        color: 'warning',
        name: 'DicomImage',
        title: 'Dicom影像',
        permission: ['ADD', 'MODIFY', 'DELETE'],
        component: DicomImage
    }, {
        group: '业务模块',
        color: 'warning',
        name: 'Dailycase',
        title: '每日一例',
        permission: ['ADD', 'MODIFY', 'DELETE'],
        component: Dailycase
    }, {
        group: '业务模块',
        color: 'warning',
        name: 'Reporting',
        title: '诊断中心',
        permission: ['VIEW', 'DELETE'],
        component: Reporting
    }, {
        group: '业务模块',
        color: 'warning',
        name: 'Reported',
        title: '归档报告',
        permission: ['VIEW', 'DELETE'],
        component: Reported
    }, {
        group: '统计模块',
        color: 'success',
        name: 'PlatformStatistics',
        title: '平台统计',
        permission: [],
        component: PlatformStatistics
    }, {
        group: '统计模块',
        color: 'success',
        name: 'TeamStatistics',
        title: '团队统计',
        permission: [],
        component: TeamStatistics
    }, {
        group: '统计模块',
        color: 'success',
        name: 'CustomerStatistics',
        title: '医院申请数',
        permission: [],
        component: CustomerStatistics
    }
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