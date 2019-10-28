import React from 'react';
import { BackHandler } from 'react-native';

export interface Props {
	componentDidMount?: Function;
	onRef?: (c: React.Component) => {};
}

interface State {}

export default class BaseSaltComponent<T, S> extends React.Component<Props & T, State & S> {
	_mounted: boolean = false;
	constructor(props: any) {
		super(props);
		props.onRef && props.onRef(this);
	}
	componentWillMount() {
		console.log(this.constructor.name, 'componentWillMount');
	}
	componentDidMount() {
		this._mounted = true;
		if (this.props.componentDidMount) this.props.componentDidMount();
		console.log(this.constructor.name, 'componentDidMount');
	}
	componentWillUnmount() {
		this._mounted = false;
		console.log(this.constructor.name, 'componentWillUnmount');
	}
	componentDidFocus() {
		console.log(this.constructor.name, 'componentDidFocus');
	}
	componentDidBlur() {
		console.log(this.constructor.name, 'componentDidBlur');
	}
	componentDidUpdate() {
		//console.log(this.constructor.name, "componentDidUpdate")
	}
	// static getDerivedStateFromError(error) {
	// 	// Update state so the next render will show the fallback UI.
	// 	return { hasError: true }
	// }

	// componentDidCatch(error, info) {
	// 	// You can also log the error to an error reporting service
	//     console.log('ErrorControl componentDidCatch',error, info)
	//     this.setState({hasError: true});
	// }
	setState(state: any, callback?: () => void) {
		if (!this._mounted) {
			return;
		}
		super.setState(state, callback);
	}
	addBackHandler(func: () => void) {
		BackHandler.addEventListener('hardwareBackPress', func);
	}
	removeBackHandler(func: () => void) {
		BackHandler.removeEventListener('hardwareBackPress', func);
	}
}
