import iView from 'iview';
import 'iview/dist/styles/iview.css';

const prefix = 'Sunset';

import Sunset from './common/sunset';

import Crud from './components/crud/Crud.vue';
import Filter from './components/crud/SearchForm.vue';
import Toolbar from './components/crud/Toolbar.vue';
import Table from './components/crud/Table.vue';
import Form from './components/crud/Form.vue';

import Layout from './layout/ContentLayout.vue';

import Store from './components/crud/Store';


const components = {
    Crud: Crud,
    Filter: Filter,
    Table: Table,
    Form: Form,
    Toolbar: Toolbar
}
const Layouts = {
    Layout: Layout
}
const Services = {
    Store: Store
}

window.Sunset = Sunset;
//服务
Sunset.Service = Sunset.service || {};
Object.keys(Services).forEach(s => {
    Sunset.Service[s] = Services[s];
});

exports.install = function install(Vue, options) {
    Vue.use(iView);
    //布局
    Object.keys(Layouts).forEach(c => {
        Vue.component(`${prefix}${c}`, Layouts[c]);
    });
    //组件
    Object.keys(components).forEach(c => {
        Vue.component(`${prefix}${c}`, components[c]);
    });
    //全局提示
    var tipType = {
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'error',
        loading: 'loading'
    };
    Sunset.tip = function (message, type, duration) {
        return Vue.prototype.$Message[tipType[type] || 'info'](message, duration);
    };
    Sunset.notice = function (title, desc, type, duration) {
        return Vue.prototype.$Notice[tipType[type] || 'info']({
            title,
            desc,
            duration
        });
    };
    Sunset.confirm = function(option){
        Vue.prototype.$Modal.confirm(option);
        return ()=>{
            Vue.prototype.$Modal.remove();
        }
    }//(config)
    // Vue.prototype.$Loading = LoadingBar;
    // Vue.prototype.$Message = Message;
    // Vue.prototype.$Modal = Modal;
    // Vue.prototype.$Notice = Notice;
}