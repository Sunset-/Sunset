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
import Layout from './components/Layout.vue';

//登陆
import Sign from './components/sign/Sign.vue';
import SignStore from './components/sign/SignStore';

//系统管理
import ManagerAccount from './components/system/managerAccount/ManagerAccount.vue';
import Dictionary from './components/system/dictionary/Dictionary.vue';


var router = new Router();

window.Router = router;

router.map({
	'/sign': {
		component: Sign
	},
	'/': {
		component: Layout,
		subRoutes: {
			'/app/system/managerAccount': {
				component: ManagerAccount
			},
			'/app/system/dictionary': {
				component: Dictionary
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