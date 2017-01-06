import {
	Cache,
	Singleton
} from 'Decorators';

@Singleton
class DictionaryStore extends Sunset.Service.Store {

	constructor() {
		super();
		this.getAll();
	}

	URLS = {
		LIST: '/service/system/dictionaryType',
		SAVE: '/service/system/dictionaryType',
		DELETE: '/service/system/dictionaryType/{id}',
		ALL: '/service/system/dictionaryItem/use/all',
		LOAD_ENUM: '/service/system/dictionaryItem/getByType/{type}',
		SAVE_ENUM: '/service/system/dictionaryItem',
		DELETE_ENUM: '/service/system/dictionaryItem/{id}'
	}

	callbacks = {
		afterList: (data)=>{
			data&&data.rows&&data.rows.forEach(item=>{
				item.isAccessmentCase = item.desc=='ACCESSMENT_CASE';
			});
			return data;
		}
	}

	getAll() {
		$http({
			url: this.URLS.ALL,
			async : false,
			success:(data)=>{
				this.cacheDictionary(data.data);
			}
		});
	}

	cacheDictionary(data) {
		if (data && data.length) {
			var ENUMS = {},
				ENUM_MAP = {};
			//按type分类
			data.forEach(item=>{
				var enums = ENUMS[item.type]||(ENUMS[item.type]=[]),
					enumMap = ENUM_MAP[item.type]||(ENUM_MAP[item.type]={});
				enums.push({
					key : item.value,
					value : item.name
				});
				enumMap[item.value] = item.name;
			});
			//按value排序
			for(var type in ENUMS){
				ENUMS[type].sort((o1,o2)=>{
					if(isNaN(o1.key)||isNaN(o2.key)){
						return o1.key==o2.key?0:(o1.key<o2.key?-1:1);
					}else{
						return +o1.key==+o2.key?0:(+o1.key<+o2.key?-1:1);
					}
					
				});
			}
			//挂载到全局业务对象中
			Base.ENUMS = ENUMS;
			Base.ENUM_MAP = ENUM_MAP;
		}
	}

	/**
	 * 获取某类型的字典
	 * @param  {String} type 字典类型
	 * @return {[type]}      [description]
	 */
	getEnums(type){
		return this.ENUMS[type]||[];
	}

	/**
	 * 转码
	 * @param  {String} type 字典类型
	 * @param  {String} key  字典key
	 * @return {[type]}      [description]
	 */
	transcode(type,key){
		return this.ENUM_MAP[type]&&this.ENUM_MAP[type][key];
	}

	loadEnums(type){
		return $http({
			url: this.URLS.LOAD_ENUM.replace(/\{type\}/,type),
		});
	}

	saveEnum(model){
		return $http({
			url: this.URLS.SAVE_ENUM,
			type : model.id?'PUT':'POST',
			data : model
		});
	}
	
	removeEnum(id){
		return $http({
			url: this.URLS.DELETE_ENUM.replace(/\{id\}/,id),
			type : 'DELETE'
		});
	}



}

export default new DictionaryStore();