import DeviceHelper from 'infra/helpers/DeviceHelper';
import { apiResponseCodes } from '../../data/models/enums';
import StorageManager from '../managers/StorageManager';
import { Platform } from 'react-native';
import { merge } from 'lodash';
import Globals from '../../data/config/Globals';
import RequestManager from '../managers/RequestManager';
import { getHash } from '../managers/CryptoManager';

export default class BusinessLogicBase {
	requestManager: RequestManager;
	registerTryCount = 0;
	constructor() {
		this.requestManager = new RequestManager();
	}
	getRequestManager() {
		return this.requestManager;
	}
	bridge(endpoint: string, body: any, options?: any) {
		var tryCount = 0;
		const retryFunc = () => {
			tryCount++;
			if (tryCount >= 3) {
				return Promise.reject({ code: apiResponseCodes.BridgeError });
			}
			options = merge(options, {
				headers: {
					token: StorageManager.getToken(),
					authorization: 'Bearer ' + StorageManager.getAccessToken(),
				},
			});
			return this.requestManager.makeRequest(Globals.API_URL, endpoint, body, options).then(request => {
				return this.processResponse(request.responseText, request.status, retryFunc);
			});
		};
		return retryFunc();
	}
	bridgeUploadFile(endpoint: string, body: any, options: any) {
		const retryFunc = () => {
			return this.requestManager
				.uploadFile(Globals.API_URL, endpoint, body, options)
				.then(request => {
					return this.processResponse(request.responseText, request.httpStatus, () => {
						return retryFunc();
					});
				})
				.catch(err => {
					return Promise.reject({ code: apiResponseCodes.Error, message: err });
				});
		};
		return retryFunc();
	}
	processResponse = (responseText: string, httpStatus: number, retryFunc: Function): Promise<any> => {
		if (httpStatus == 0) {
			return Promise.reject({ code: apiResponseCodes.Error, message: responseText, status: httpStatus });
		}

		if (httpStatus === 429) {
			return Promise.reject({ code: apiResponseCodes.Throttling, message: responseText, status: httpStatus });
		}

		var json = null;
		try {
			json = JSON.parse(responseText);
		} catch (error) {
			// ignore
		}

		if (json) {
			// check response object, if necessery call register device|token
			if (json.code == apiResponseCodes.NewToken) {
				return this.registerDevice().then(() => {
					return new Promise(resolve => setTimeout(() => resolve(retryFunc()), 1000));
				});
			}

			if (httpStatus == 200 && json.success) {
				return json.value;
			}
		}

		return Promise.reject(json || responseText);
	};
	cryptoHash(parameters: any) {
		var registerKey = parameters.registerKey || Globals.APP_ID;
		var msg = registerKey + '_' + Globals.APP_ID + '.' + parameters.appVersion + '.' + parameters.osVersion + '.' + parameters.osType;
		return getHash(msg, Globals.JKEY);
	}
	registerDevice() {
		return new Promise((resolve, reject) => {
			const parameters: any = {
				deviceId: StorageManager.getDeviceId(),
				osVersion: Platform.Version,
				appVersion: DeviceHelper.getBuildNumber(),
				culture: DeviceHelper.getDeviceLocale(),
				brand: DeviceHelper.getDeviceName(),
				model: DeviceHelper.getSystemVersion(),
				osType: this.requestManager._defaultOptions.headers.Device,
				appId: Globals.APP_ID,
				registerKey: StorageManager.getRegisterKey(),
			};
			parameters.hash = this.cryptoHash(parameters);
			this.requestManager
				.makeRequest(Globals.API_URL, 'mobile/device/register', parameters)
				.then(response => {
					if (!response || response.status != 200) {
						console.log('Device register request failed!');
						return Promise.reject({ code: apiResponseCodes.Error });
					}
					return JSON.parse(response.responseText);
				})
				.then(response => {
					if (response.success) {
						Promise.all([
							StorageManager.setRegisterId(response.value.registerId),
							StorageManager.setRegisterKey(response.value.registerKey),
							StorageManager.setToken(response.value.token),
						])
							.then(resolve)
							.catch(reject);
						return;
					}
					if (response.code == apiResponseCodes.InvalidRegisterKey) {
						// register key is invalid. so save returned key then start over.
						StorageManager.setRegisterKey(response.value.registerKey).then(() => {
							// if server returns same response
							if (!this.registerTryCount) this.registerTryCount = 0;
							this.registerTryCount++;
							if (this.registerTryCount >= 3) {
								this.registerTryCount = 0;
								reject({ code: apiResponseCodes.BridgeError });
								return;
							}
							setTimeout(() => {
								this.registerDevice()
									.then(resolve)
									.catch(reject);
							}, 1000);
						});
					} else if (response.code == apiResponseCodes.InvalidHash) {
						// invalid hash
						//TODO: error log
						reject(response);
					} else {
						reject(response);
					}
				})
				.catch(error => {
					console.log('err 0006', error);
					reject(error);
				});
		});
	}
}
