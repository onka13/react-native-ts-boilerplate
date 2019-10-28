import React from 'react';
import { View } from 'react-native';
import { FadeInOutViewControl } from 'infra/components/anim/FadeInOutViewControl';
import { SlideUpDownViewControl } from 'infra/components/anim/SlideUpDownViewControl';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from '../../business/redux_source/ReduxHelper';
import { myTheme } from '../../data/config/myStyles';

interface Prop {
	dynamic: any;
	removeToast: any;
}
interface State {
	controls: any;
	toasts: any;
}

class DynamicControl extends React.Component<Prop, State> {
	_defaultOptions = {};
	shouldUpdate = true;
	state = {
		controls: {},
		toasts: [],
	};
	constructor(props: any) {
		super(props);
		this.state.toasts = this.props.dynamic.toasts || [];
	}
	_getControls(controlsState: any) {
		var arr = [];
		for (var key in controlsState) {
			if (!Object.prototype.hasOwnProperty.call(controlsState, key)) continue;
			var cs = controlsState[key];
			if (cs.options.animationX || cs.options.animationY) {
				arr.push(
					<SlideUpDownViewControl ref={key} key={key} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} options={cs.options}>
						{cs.comp}
					</SlideUpDownViewControl>,
				);
			} else {
				arr.push(
					<View ref={key} key={key} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
						{cs.comp}
					</View>,
				);
			}
		}
		//console.log('DynamicControl controls', Object.keys(controlsState))
		return arr;
	}
	_getToasts(toasts: any) {
		var arrTop = [];
		var arrBottom = [];
		const icons: any = {
			error: 'error',
			success: 'check-circle',
			info: 'info',
			warning: 'warning',
		};
		for (var i in toasts) {
			const toast = toasts[i];
			const themeColor = myTheme[toast.type] || myTheme.info;
			const iconName = icons[toast.type] || icons.info;
			const comp = (
				<FadeInOutViewControl key={toast.id} ref={'toast' + toast.id} type="fadeIn">
					<ListItem
						leftIcon={{ name: iconName, type: 'material', color: themeColor.contrastText }}
						title={toast.text}
						rightElement={
							<Icon
								name="close"
								type="evilicon"
								color={themeColor.contrastText}
								onPress={() => {
									const animComponent: any = this.refs['toast' + toast.id];
									animComponent &&
										animComponent.fadeOut(() => {
											this.props.removeToast({ id: toast.id });
										});
								}}
							/>
						}
						style={{ backgroundColor: themeColor.main, marginVertical: 7 }}
						titleStyle={{ color: themeColor.contrastText }}
						{...toast.props}
					/>
				</FadeInOutViewControl>
			);
			if (toast.position == 'top') arrTop.push(comp);
			else arrBottom.push(comp);
		}

		return (
			<React.Fragment>
				<View style={{ position: 'absolute', left: 0, right: 0, top: 0, paddingHorizontal: 10 }}>{arrTop}</View>
				<View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 10 }}>{arrBottom}</View>
			</React.Fragment>
		);
	}
	componentDidMount() {
		//console.log('DYNMAIC componentDidMount')
	}
	shouldComponentUpdate() {
		return this.shouldUpdate;
	}
	componentWillReceiveProps(nextProps: any) {
		//console.log('DYNMAIC componentWillReceiveProps', nextProps.dynamic)
		if (!nextProps.dynamic) return;
		if (
			nextProps.dynamic.toasts.length == this.props.dynamic.toasts.length &&
			nextProps.dynamic.action == 'removed' &&
			nextProps.dynamic.lastOptions &&
			(nextProps.dynamic.lastOptions.animationX || nextProps.dynamic.lastOptions.animationY)
		) {
			this.shouldUpdate = false;
			// @ts-ignore
			this.refs[nextProps.dynamic.lastId].slideReverse(finished => {
				this.shouldUpdate = true;
				this.setState({
					controls: nextProps.dynamic.controls,
				});
			});
			return;
		}
		this.shouldUpdate = true;
		this.setState({
			controls: nextProps.dynamic.controls,
			toasts: nextProps.dynamic.toasts,
		});
	}
	_overlayClicked() {
		//this.props.removeAllControls()
	}
	render() {
		//console.log('DynamicControl render', this.state.action, this.state.lastId)
		return (
			<View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
				{this._getControls(this.state.controls)}
				{this._getToasts(this.state.toasts)}
			</View>
		);
	}
}

export default connect(
	DynamicControl,
	'dynamic',
	'toasts'
);
