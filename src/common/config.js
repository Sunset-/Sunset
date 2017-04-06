import FontAwesome from 'font-awesome';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

window.$http = function (...args) {

	var promise = $.Deferred();

	$.ajax.apply($, args).then((res) => {
		if (typeof res == 'object' && res.code) {
			if (res.code == 200) {
				promise.resolve(res.data);
			} else if (res.code == 401) {
				Router.go('/sign');
				promise.reject(res);
			} else {
				Sunset.tip && Sunset.tip(res.message || '服务异常', 'warning')
			}
		}
		promise.reject(res);
	}, (err) => {
		console.log(err.message || err);
		promise.reject(err);
	});

	return promise;
}
