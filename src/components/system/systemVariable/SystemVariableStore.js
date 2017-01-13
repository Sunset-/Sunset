class SystemVariableStore extends Sunset.Service.Store {

	constructor() {
		super();
	}

	URLS = {
		LIST: '/service/system/systemVariable',
		SAVE: '/service/system/systemVariable',
		DELETE: '/service/system/systemVariable/{id}',
	}

}

export default new SystemVariableStore();