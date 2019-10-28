import React from 'react';
import { StyleSheet, View, BackHandler, Platform, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import Constants from 'expo-constants';
import BaseSaltComponent from './BaseSaltComponent';

export interface Props {
	navigation?: any;
	addControl?: any;
	removeControl?: any;
	addToast?: any;
}

interface State {}

export default class BaseInfraComponent<T, S> extends BaseSaltComponent<T & Props, S & State> {
	backEvent() {
		console.log(this.constructor.name, 'backEvent');
		return false; // go back
	}
	getParam(name: string) {
		return this.getNavigationParam(name);
	}
	getNavigationParam(name: string) {
		if (this.props.navigation) return this.props.navigation.getParam(name, '');
		//if (this.props.navigation.state && this.props.navigation.state.params) return this.props.navigation.state.params[name]
		return null;
	}
	canGoBack() {
		return !!this.getParent();
	}
	close() {
		this.goBack();
	}
	back() {
		this.goBack();
	}
	goBack() {
		this.props.navigation.goBack();
	}
	goBackAndBack() {
		this.goBackFrom(this.getParent().getStateKey());
	}
	goBackFrom(stateKey: string) {
		const backAction = NavigationActions.back({
			key: stateKey,
		});
		this.props.navigation.dispatch(backAction);
	}
	goToPage(routeName: string, params?: any, options?: any) {
		if (!params) params = {};
		if (!options) options = {};
		params.getControl = this.getControl;
		if (!params.transition) params.transition = 'ios';
		if (options.push) this.props.navigation.push(routeName, params);
		else this.props.navigation.navigate(routeName, params);

		/* 
        const navigateToScreen = NavigationActions.navigate({
            routeName: routeName,
            params: params
        })
        this.props.navigation.dispatch(navigateToScreen)        

        const setParamsAction = NavigationActions.setParams({
            params: { title: 'Hello' },
            key: 'screen-123',
            })
            this.props.navigation.dispatch(setParamsAction)
        */
	}
	goToPageAndResetAll(routeName: string, params?: any) {
		if (!params) params = {};
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: routeName, params: params })],
		});
		this.props.navigation.dispatch(resetAction);
	}
	gotoFirst() {
		this.props.navigation.dispatch(StackActions.popToTop());
	}
	gotoPageCloseCurrent(routeName: string, params: any) {
		StackActions.replace({ routeName, params });
	}
	getStateKey() {
		console.log('getStateKey', this.props.navigation.state.key);
		return this.props.navigation.state.key;
		//let parent = this.props.navigation.state.params.getControl()
	}
	getControl = () => {
		return this;
	};
	getParent() {
		if (!this.props.navigation || !this.props.navigation.state || !this.props.navigation.state.params || !this.props.navigation.state.params.getControl)
			return null;
		let parent = this.props.navigation.state.params.getControl();
		return parent;
	}
	displayLoading(show: boolean, bgColor: string, color: string) {
		//console.log('displayLoading', show)
		if (show)
			this.addControl(
				'loading',
				<View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }]}>
					<ActivityIndicator color={color} />
				</View>,
				{},
			);
		else this.removeControl('loading');
	}
	addControl(
		id: string,
		comp: any,
		options: {
			overlay?: boolean;
			overlayClose?: boolean;
			overlayColor?: string;
			nativeEvent?: {
				pageX: number;
				pageY: number;
				locationX: number;
				locationY: number;
				width: number;
				height: number;
			};
			itemPosition?: 1 | 2 | 3 | 4;
		},
	) {
		if (!options) options = {};
		const hide = () => this.removeControl(id);
		if (options.overlay) {
			comp = (
				<View
					style={[
						StyleSheet.absoluteFillObject,
						{ justifyContent: 'center', alignItems: 'center', backgroundColor: options.overlayColor || '#00000099' },
					]}
				>
					{comp}
				</View>
			);
		}
		if (options.overlayClose) {
			comp = <TouchableWithoutFeedback onPress={hide}>{comp}</TouchableWithoutFeedback>;
		}
		if (options.nativeEvent) {
			const nativeEvent = options.nativeEvent;
			var x = nativeEvent.pageX - nativeEvent.locationX;
			var y = nativeEvent.pageY - nativeEvent.locationY - Constants.statusBarHeight;
			var width = nativeEvent.width;
			var height = nativeEvent.height;
			var styles = {};
			if (options.itemPosition == 3) {
				styles = { left: 0, top: y + height, width: x + width, alignItems: 'flex-end' };
			} else if (options.itemPosition == 1) {
				styles = { left: 0, top: 0, height: y, width: x, alignItems: 'flex-end', justifyContent: 'flex-end' };
			} else if (options.itemPosition == 2) {
				styles = { top: 0, height: y, left: x + width, justifyContent: 'flex-end' };
			} else {
				styles = { left: x, top: y + height };
			}
			comp = (
				<TouchableWithoutFeedback onPress={hide}>
					<View style={{ ...StyleSheet.absoluteFillObject, zIndex: 30 }}>
						<View
							style={[
								{
									position: 'absolute',
									zIndex: 31,
								},
								styles,
							]}
						>
							{comp}
						</View>
					</View>
				</TouchableWithoutFeedback>
			);
		}
		this.props.addControl({ id: id, control: { comp, options } });
		this._handleBackPressFuncs[id] = () => {
			this.removeControl(id);
			return true;
		};
		this.addBackHandler(this._handleBackPressFuncs[id]);
	}
	removeControl(id: string, delay = 0) {
		this.removeBackHandler(this._handleBackPressFuncs[id]);
		if (delay > 0) {
			setTimeout(() => {
				this.props.removeControl({ id: id });
			}, delay);
			return;
		}
		this.props.removeControl({ id: id });
	}
	_handleBackPressFuncs: { [key: string]: () => void } = {};
	addBackHandler(func: () => void) {
		BackHandler.addEventListener('hardwareBackPress', func);
	}
	removeBackHandler(func: () => void) {
		BackHandler.removeEventListener('hardwareBackPress', func);
	}
	displayError(options: any) {
		if (typeof options != 'object') options = { text: options };
		options.type = 'error';
		this.displayToast(options);
	}
	displayMessage(options: any) {
		if (typeof options != 'object') options = { text: options };
		options.type = 'success';
		this.displayToast(options);
	}
	displayToast(options: any) {
		this.props.addToast({
			text: options.text,
			type: options.type,
			position: options.position,
			duration: options.type == 'error' ? 0 : options.duration,
		});
	}
}
