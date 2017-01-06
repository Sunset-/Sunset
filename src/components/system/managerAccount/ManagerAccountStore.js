import {
	Cache,
	Singleton
} from 'Decorators';

@Singleton
class DictionaryStore extends Sunset.Service.Store {

	constructor() {
		super();
	}

	URLS = {
		LIST: '/service/manage/account',
		SAVE: '/service/manage/account',
		DELETE: '/service/manage/account/{id}',
	}

	callbacks = {
		afterList(data){
			data&&data.rows&&data.rows.forEach(item=>{
				delete item.password;
			})
			return data;
		}
	}

}

export default new DictionaryStore();