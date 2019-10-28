import { Platform } from 'react-native';
// @ts-ignore
import Upload from 'react-native-background-upload';
import { merge } from 'lodash';
import StorageManager from './StorageManager';
import Globals from '../../data/config/Globals';
import { apiResponseCodes } from '../../data/models/enums';

export default class RequestManager {
	_tryCount = 0;
	_timeouts: { [key: string]: number } = {};
	_defaultOptions = {
		method: 'POST',
		timeout: 30000,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Device: Platform.OS == 'ios' ? 1 : 2,
		},
	};
	_clearTimer = (endpoint: string) => {
		var timerId = this._timeouts[endpoint];
		if (!timerId) return;
		try {
			console.log('timer cleared');
			clearTimeout(timerId);
			delete this._timeouts[endpoint];
		} catch (error) {
			// ignore
		}
	};
	_startTimer = (request: XMLHttpRequest, endpoint: string) => {
		var timerId = setTimeout(() => {
			//console.log("makeRequest setTimeout", endpoint, request.readyState);
			if (request && request.readyState !== XMLHttpRequest.DONE) {
				request.abort();
			}
		}, request.timeout);
		this._timeouts[endpoint] = timerId;
	};
	makeRequest(url: string, endpoint: string, body: any, options?: any): Promise<XMLHttpRequest> {
		let finalUrl = url + '/' + endpoint;
		options = merge({}, this._defaultOptions, options);
		options.body = JSON.stringify(body || {});
		console.log('options', options);

		return new Promise((resolve, reject) => {
			if (options.method.toLowerCase() == 'get') {
				const queryString = new URLSearchParams(body).toString();
				if (finalUrl.indexOf('?') == -1) finalUrl += '?';
				finalUrl += queryString;
			}
			console.log('finalUrl', finalUrl);

			var request = new XMLHttpRequest();
			request.open(options.method, finalUrl, true);
			request.timeout = options.timeout;
			for (const key in options.headers) {
				request.setRequestHeader(key, options.headers[key]);
			}
			request.onreadystatechange = e => {
				console.log('onreadystatechange', endpoint, request.status, 'state:' + request.readyState);
				if (request.readyState !== XMLHttpRequest.DONE) {
					return;
				}
				this._clearTimer(endpoint);

				resolve(request);
			};
			request.ontimeout = e => {
				console.log('ontimeout', endpoint);
				//LogManager.report(e, 2);
				this._clearTimer(endpoint);
				reject({ code: apiResponseCodes.Error });
			};
			request.onabort = e => {
				console.log('onabort', endpoint);
				//LogManager.report(e, 3);
				this._clearTimer(endpoint);
				reject({ code: apiResponseCodes.Error });
			};
			request.send(options.body);
			this._startTimer(request, endpoint);
		});
	}
	uploadFile(
		url: string,
		endpoint: string,
		parameters2: any,
		opts: { file: string },
	): Promise<{
		httpStatus: number;
		responseText: string;
	}> {
		return new Promise((resolve, reject) => {
			url += '/' + endpoint;

			var parameters = { ...parameters2 };
			for (const key in parameters) {
				parameters[key] = parameters[key] ? parameters[key] + '' : ''; // make string
				if (parameters[key] == '') parameters[key] = undefined;
			}

			if (!opts.file) {
				return reject('No file');
			}

			if (opts.file.indexOf('file:///') == 0) {
				opts.file = decodeURIComponent(opts.file).replace('file://', '');
			}
			console.log('uploadFile', url, opts.file, parameters);
			const options = {
				url: url,
				path: opts.file,
				method: 'POST',
				field: 'File',
				type: 'multipart',
				parameters: parameters,
				headers: {
					//'Content-Type': 'image/jpeg',
					Token: StorageManager.getToken(),
					Accept: 'application/json',
					//'Content-Type': 'application/json',
					Authorization: 'Bearer ' + StorageManager.getAccessToken(),
					Device: Platform.OS == 'ios' ? '3' : '2',
				},
				// Below are options only supported on Android
				notification: {
					enabled: true,
					autoClear: false,
					notificationChannel: 'channel' + Globals.APP_ID,
					onProgressTitle: 'Uploading',
					onProgressMessage: 'Uploading new file',
					onCompleteTitle: 'Upload finished',
					onCompleteMessage: 'Your file has been uploaded',
					onErrorTitle: 'Upload error',
					onErrorMessage: 'An error occured while uploading a file',
				},
			};

			//console.log("options", options)

			Upload.startUpload(options)
				.then((uploadId: any) => {
					console.log('Upload started');
					Upload.addListener('progress', uploadId, (data: any) => {
						console.log(`Progress: ${data.progress}%`);
					});
					Upload.addListener('error', uploadId, (data: any) => {
						console.log(`Error: ${data.error}%`);
						reject(data.error);
					});
					Upload.addListener('cancelled', uploadId, (data: any) => {
						console.log(`Cancelled!`, uploadId, data);
					});
					Upload.addListener('completed', uploadId, (data: any) => {
						console.log('Completed!', uploadId, data);
						resolve({
							httpStatus: data.responseCode,
							responseText: data.responseBody,
						});
					});
				})
				.catch((err: any) => {
					console.log('Upload error!', err);
					reject(err.message);
				});
		});
	}
}
