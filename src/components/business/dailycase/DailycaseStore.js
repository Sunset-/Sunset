import SignStore from '../../sign/SignStore';

class DailycaseStore extends Sunset.Service.Store {

	constructor() {
		super();
	}

	callbacks = {
		beforeList(params) {
			params.data = {
				select: JSON.stringify(params.data)
			};
			return params;
		}
	}

	METHODS = {
		DELETE: 'POST'
	}

	URLS = {
		LIST: '/manage-service/discoveries/list',
		SAVE: '/manage-service/discoveries/add',
		UPDATE: '/manage-service/discoveries/update',
		DELETE: '/manage-service/discoveries/delete',
		LISTCOMMIT: '/manage-service/comment/list',
		DELETECOMMIT: '/manage-service/comment/delete'
	}


	/**
	 * 覆盖保存
	 * @param  {[type]} model [description]
	 * @return {[type]}       [description]
	 */
	save(model) {
		model.createBy = 'peaimage';
		return $http(this._triggerEvent('beforeSave', {
			url: this.URLS[model.id ? 'UPDATE' : 'SAVE'],
			type: 'POST',
			data: model
		})).then(res => {
			this._triggerEvent('dataDirty', model);
			return this._triggerEvent('afterSave', res);
		});
	}
}

export default new DailycaseStore();