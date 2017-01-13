import config from './config';

import Vue from 'vue';
import Router from 'vue-router';
import VueTouch from 'vue-touch';
import SunsetUI from 'sunset-ui';

Vue.use(Router);
Vue.use(VueTouch);
Vue.use(SunsetUI);

import App from './components/App.vue';
import Modules from './components/Modules.vue';


import Sign from './components/sign/Sign.vue';
import SignStore from './components/sign/SignStore';

//模块
//import {moduleInstanceMap} from './modules';

import Crud from './components/bootstrap/crud/Crud.vue';
import Modal from './components/bootstrap/modal/Modal.vue';
import Tree from './components/bootstrap/tree/Tree.vue';
import View from './components/bootstrap/view/View.vue';

//系统管理
import Account from './components/system/account/Account.vue';
import Dictionary from './components/system/dictionary/Dictionary.vue';
import SystemVariable from './components/system/systemVariable/SystemVariable.vue';

//业务
import Payment from './components/business/payment/Payment.vue';


var router = new Router();

window.Router = router;

router.map({
	'/sign': {
		component: Sign
	},
	'/app': {
		component: Modules,
		subRoutes: {
			'/system/account': {
				component: Account
			},
			'/system/dictionary': {
				component: Dictionary
			},
			'/system/systemVariable': {
				component: SystemVariable
			},
			'/bootstrap/crud': {
				component: Crud
			},
			'/bootstrap/modal': {
				component: Modal
			},
			'/bootstrap/tree': {
				component: Tree
			},
			'/bootstrap/view': {
				component: View
			},
			'/payment': {
				component: Payment
			}
		}
	}
});

router.beforeEach(function (transition) {
	if (transition.to.path != '/sign') {
		SignStore.currentUser().then(data => {
			transition.next();
		}, err => {
			transition.abort();
			router.go('/sign');
		});
	} else {
		transition.next();
	}
})


router.start(App, 'app');