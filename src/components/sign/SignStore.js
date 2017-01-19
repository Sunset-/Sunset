import Vue from 'vue';

const URLS = {
	LOGIN: '/service/manage/sign/login',
	LOGOUT: '/service/manage/sign/logout',
	CURRENT: '/service/manage/sign/currentUser',
	FORGET: '/service/system/user/member/findPwd',
	UPDATE_PASSWORD: '/service/system/user/member/updatePwd'
};

export default {
	currentUserCache: null,
	login(model) {
		return $http({
			url: URLS.LOGIN,
			type: 'POST',
			data: model
		}).then(data => {
			this.updatePermission(data.permissions);
			return this.currentUserCache = data;
		});
	},
	logout() {
		return $http({
			url: URLS.LOGOUT
		}).then(data => {
			return this.currentUserCache = null;
		});
	},
	currentUser() {
		return Promise.resolve().then(res => {
			if (this.currentUserCache) {
				return this.currentUserCache;
			} else {
				return $http({
					url: URLS.CURRENT
				}).then(data => {
					this.updatePermission(data.permissions);
					return this.currentUserCache = data;
				});
			}
		});
	},
	updatePassword(model) {
		return $http({
			url: URLS.UPDATE_PASSWORD,
			data: model
		});
	},
	updatePermission(permissions) {
		var cache = {};
		permissions && permissions.split(',').forEach(item => {
			cache[item] = true;
		});
		Base.permissions = cache;
		Vue.directive('permission', {
			update: function (newValue, oldValue) {
				if (newValue && !(Base && Base.permissions[newValue])) {
					this.el.remove();
				}
			}
		})
	}
}


Vue.directive('permission', {
	update: function (newValue, oldValue) {}
})