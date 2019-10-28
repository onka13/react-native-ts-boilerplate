import React from 'react';
import { ActivityIndicator } from 'react-native';
import BaseInfraComponent from 'infra/components/BaseInfraComponent';
import { myTheme } from '../../data/config/myStyles';
import { apiResponseCodes } from '../../data/models/enums';
import { translate } from '../../business/managers/Localization';
import MyIcon from './myComponents/MyIcon';

interface Prop {
	navigation?: any;
}
interface State {}

export default class BaseComponent<T, S> extends BaseInfraComponent<T & Prop, S & State> {
	_navListener: any;
	constructor(props: any) {
		super(props);
		this.apiReject = this.apiReject.bind(this);
	}
	componentWillMount() {
		super.componentWillMount();
		if (__DEV__) {
			const newRender = this.render.bind(this);
			this.render = () => {
				console.log(this.constructor.name, 'render');
				return newRender();
			};
		}
	}
	componentDidMount() {
		super.componentDidMount();
		if (this.props.navigation)
			this._navListener = this.props.navigation.addListener('didFocus', () => {
				console.log(this.constructor.name, 'focused');
				this.componentDidFocus();
			});
	}
	componentWillUnmount() {
		super.componentWillUnmount();
		this._navListener && this._navListener.remove();
	}
	apiReject(error: any) {
		console.log('apiReject', error);
		var code, msg;
		if (error && typeof error == 'object') {
			code = error.code;
			msg = error.message;
		} else {
			code = error;
		}
		if (code == apiResponseCodes.LoginUser) {
			super.goToPageAndResetAll('Login');
		}
		if (code == apiResponseCodes.ForceUpdate) {
			this.goToPageAndResetAll('ForceUpdate');
		}
		var txt = translate('apiError' + code);
		if (txt) {
			super.displayError({ text: txt + ' ' + (msg || '') });
		} else if (msg) {
			super.displayError({ text: msg });
		}
		return code;
	}
	displayLoading(show: boolean) {
		super.displayLoading(show, myTheme.mix.overlay, myTheme.primary.main);
	}
	renderLoading() {
		return <ActivityIndicator color={myTheme.primary.main} />;
	}
	renderBack() {
		if (!this.canGoBack()) return null;
		return <MyIcon name="arrow-back" mode="reverse" onPress={() => this.goBack()} />;
	}
}
