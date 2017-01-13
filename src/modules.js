let modules = [
    //组件库
    {
        group: '组件库',
        name: 'Crud',
        title: '增删改查',
        component: './components/bootstrap/crud/Crud.vue'
    }, {
        group: '组件库',
        name: 'Modal',
        title: '模态窗',
        component: './components/bootstrap/modal/Modal.vue'
    }, {
        group: '组件库',
        name: 'Tree',
        title: '树',
        component: './components/bootstrap/tree/Tree.vue'
    }, {
        group: '组件库',
        name: 'View',
        title: '视图组件',
        component: './components/bootstrap/view/View.vue'
    },
    //系统模块
    {
        group: '系统模块',
        name: 'Account',
        title: '关系账户',
        component: './components/system/account/Account.vue'
    }, {
        group: '系统模块',
        name: 'Dictionary',
        title: '字典管理',
        component: './components/system/dictionary/Dictionary.vue'
    }, {
        group: '系统模块',
        name: 'SystemVariable',
        title: '系统变量',
        component: './components/system/systemVariable/SystemVariable.vue'
    },
    //业务模块
    {
        group: '业务模块',
        name: 'Payment',
        title: '停车缴费',
        component: './components/business/payment/Payment.vue'
    }
];

var moduleInstanceMap = {};

modules.forEach(m => {
    moduleInstanceMap[m.name] = require(m.component);
})

module.exports = {
    moduleInstanceMap: moduleInstanceMap,
    modules: modules
};