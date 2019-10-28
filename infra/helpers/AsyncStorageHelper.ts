import { AsyncStorage } from 'react-native';
import { promiseTimeout } from './utils';

export default class AsyncStorageHelper {
	timers = {};
	processing = {};
	timers2 = {};
	processing2 = {};
	storage: AsyncStorage;
	static myInstance: AsyncStorageHelper;
	private constructor() {
		this.storage = AsyncStorage;
	}
	static instance() {
		if (this.myInstance == null) this.myInstance = new AsyncStorageHelper();
		return this.myInstance;
	}
	getStorage() {
		return this.storage;
	}
	/**
	 * Get all keys from storage
	 * @returns {Promise.<Array.<String>>} A promise that resolves with an array of keys
	 */
	getAllKeys() {
		return new Promise((resolve, reject) => {
			this.storage.getAllKeys((err, keys) => {
				if (err) {
					return reject(err);
				}
				return resolve(keys);
			});
		});
	}

	/**
	 * Get the value of a key
	 * @param {String} name The key name
	 * @returns {Promise.<String>} A promise that resolves with the value
	 */
	getValue(name: string) : any {
		console.log('AsyncStorage get', name);
		return promiseTimeout(
			5000,
			eventDone => {
				this.storage.getItem(name).then(value => {
					console.log('AsyncStore', name, value);
					try {
						if (value) eventDone(JSON.parse(value).a);
					} catch (error) {
						console.log('AsyncStorage err', error);
					}
					eventDone(value);
				});
			},
			'AsyncStorage_get_' + name,
		);
	}

	/**
	 * Remove a key from the storage
	 * @param {String} key The key to remove
	 * @returns {Promise} A promise that resolves once the item has been removed
	 */
	removeKey(key: string) {
		return new Promise((resolve, reject) => {
			this.storage.removeItem(key, err => {
				if (err) {
					return reject(err);
				}
				return resolve();
			});
		});
	}

	/**
	 * Set the value for a key
	 * @param {String} name The key name
	 * @param {String} value The value to set
	 * @returns {Promise} A promise that resolves when the value is set
	 */
	setValue(name: string, value: any) {
		//console.log('AsyncStorage set', name);
		return new Promise((resolve, reject) => {
			const content = JSON.stringify({ a: value });
			this.storage.setItem(name, content, err => {
				if (err) {
					//console.log('AsyncStorage error', name, value);
					return resolve(err);
				}
				//console.log('AsyncStorage success', name);
				return resolve(true);
			});
		});
	}
	/**
	 * Batch operation for storing multiple key-value pairs
	 * @param {Array<Array<string>>} nameValuesArr - sample; [['k1', 'val1'], ['k2', 'val2']]
	 */
	multiSetValue(nameValuesArr: Array<Array<string>>) {
		for (let index = 0; index < nameValuesArr.length; index++) {
			nameValuesArr[index][1] = JSON.stringify({ a: nameValuesArr[index][1] });
		}
		return this.storage.multiSet(nameValuesArr);
	}
}
