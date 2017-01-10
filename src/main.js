import config from './config';

import Vue from 'vue';
import Router from 'vue-router';
import VueTouch from 'vue-touch';
import SunsetUI from 'sunset-ui';

Vue.use(Router);
Vue.use(VueTouch);
Vue.use(SunsetUI);


import Filters from './common/filters';
import Directives from './common/directives';
import Validators from './common/validators';

import App from './components/App.vue';

//组件库示例
import Crud from './components/bootstrap/crud/Crud.vue';
import Modal from './components/bootstrap/modal/Modal.vue';
import Tree from './components/bootstrap/tree/Tree.vue';

//登陆
import Sign from './components/sign/Sign.vue';
import SignStore from './components/sign/SignStore';

//系统管理
import Dictionary from './components/system/dictionary/Dictionary.vue';


var router = new Router();

window.Router = router;

router.map({
	'/sign': {
		component: Sign
	},
	'/app/system/dictionary': {
		component: Dictionary
	},
	'/app/bootstrap/crud': {
		component: Crud
	},
	'/app/bootstrap/modal': {
		component: Modal
	},
	'/app/bootstrap/tree': {
		component: Tree
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