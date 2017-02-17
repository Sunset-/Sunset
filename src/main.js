import config from './config';
import Base from './base';

import Vue from 'vue';
import Router from 'vue-router';
import VueTouch from 'vue-touch';
import SunsetUI from 'sunset-ui';
import SunsetUIExt from './sunset-ui-ext';

Vue.use(Router);
Vue.use(VueTouch);
Vue.use(SunsetUI);


import App from './components/App.vue';
import Modules from './components/Modules.vue';
import MenuStore from './components/system/menu/MenuStore';

import Sign from './components/sign/Sign.vue';
import SignStore from './components/sign/SignStore';

//模块
import {
	moduleComponent
} from './modules';

var router = new Router();

window.Router = router;


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

MenuStore.getAllMenus().then(res => {
	var mountedModule = {};
	res && res.forEach(menu => {
		if (menu.module) {
			mountedModule[menu.module] = true;
		}
	});

	router.map({
		'/sign': {
			component: Sign
		},
		'/': {
			component: Modules,
			subRoutes: (function () {
				var map = {};
				for (var key in moduleComponent) {
					if (mountedModule[key] && moduleComponent.hasOwnProperty(key)) {
						map[`/app/${key}`] = {
							component: moduleComponent[key]
						};
					}
				}
				return map;
			})()
		}
	});

	router.start(App, 'app');
})