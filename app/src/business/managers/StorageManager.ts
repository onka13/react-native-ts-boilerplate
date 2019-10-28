import SecureStoreHelper from 'infra/helpers/SecureStoreHelper';
import AsyncStorageHelper from 'infra/helpers/AsyncStorageHelper';
import Constants from 'expo-constants';
import { User } from '../../data/models/user';

class StorageManager {
	_installDate!: string;
	_registerId!: string;
	_user!: any;
	_token!: string;
	_access_token!: string;
	_lang!: string;
	_registerKey!: string;
	_deviceId!: string;
	static myInstance: StorageManager;
	static instance() {
		if (this.myInstance == null) this.myInstance = new StorageManager();
		return this.myInstance;
	}
	constructor() {
		console.log('StorageManager constructor called!');
	}
	initAll() {
		console.log('StorageManager initALL!');
		return Promise.all([
			this._getValueAndSetLocalValue(AsyncStorageHelper.instance(), 'installDate'),
			this._getValueAndSetLocalValue(SecureStoreHelper.instance(), 'registerId'),
			this._getValueAndSetLocalValue(SecureStoreHelper.instance(), 'registerKey'),
			this._getValueAndSetLocalValue(SecureStoreHelper.instance(), 'deviceId'),
			this._getValueAndSetLocalValue(AsyncStorageHelper.instance(), 'user'),
			this._getValueAndSetLocalValue(SecureStoreHelper.instance(), 'token'),
			this._getValueAndSetLocalValue(SecureStoreHelper.instance(), 'access_token'),
			this._getValueAndSetLocalValue(SecureStoreHelper.instance(), 'lang'),
		]);
	}
	_getValueAndSetLocalValue(storage: AsyncStorageHelper | SecureStoreHelper, key: string) {
		return new Promise((resolve, reject) => {
			storage
				.getValue(key)
				.then((value: any) => {
					(this as any)['_' + key] = value;
				})
				.finally(() => resolve());
		});
	}
	getInstallDate(): string | undefined {
		return this._installDate;
	}
	setInstallDate(value: string) {
		this._installDate = value;
		return AsyncStorageHelper.instance().setValue('installDate', value);
	}
	getDeviceId(): string {
		return this._deviceId || Constants.deviceId || '';
	}
	setDeviceId(value?: string | undefined) {
		if (!value) value = this.getDeviceId();
		this._deviceId = value;
		return SecureStoreHelper.instance().setValue('deviceId', value);
	}
	getRegisterKey(): string | undefined {
		return this._registerKey;
	}
	setRegisterKey(value: string) {
		this._registerKey = value;
		return SecureStoreHelper.instance().setValue('registerKey', value);
	}
	getRegisterId(): string | undefined {
		return this._registerId;
	}
	setRegisterId(value: string) {
		this._registerId = value;
		return SecureStoreHelper.instance().setValue('registerId', value);
	}
	getToken(): string | undefined {
		return this._token;
	}
	setToken(value: string) {
		this._token = value;
		return SecureStoreHelper.instance().setValue('token', value);
	}
	getAccessToken(): string | undefined {
		return this._token;
	}
	setAccessToken(value: string) {
		this._token = value;
		return SecureStoreHelper.instance().setValue('token', value);
	}
	getLang(): string | undefined {
		return this._lang;
	}
	setLang(value: string) {
		this._lang = value;
		return SecureStoreHelper.instance().setValue('lang', value);
	}
	getUser(): User {
		return this._user;
	}
	setUser(value: User) {
		this._user = { ...this._user, value };
		return AsyncStorageHelper.instance().setValue('user', value);
	}
	async logout() {
		await AsyncStorageHelper.instance().removeKey('user');
		await SecureStoreHelper.instance().removeKey('token');
	}
}

export default StorageManager.instance();
