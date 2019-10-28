import React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isIphoneX } from 'react-native-iphone-x-helper';

export interface Prop {
	style: ViewStyle;
}

export default class MyContent extends React.Component {
	style!: ViewStyle;
	scroll!: any;
	constructor(props: any) {
		super(props);
		this.init(props);
	}
	componentWillReceiveProps(props: any) {
		this.init(props);
	}
	init(props: Prop) {
		this.style = {
			...{
				flex: 1,
				padding: 15,
				//borderWidth: 2,
				//borderColor: "yellow"
			},
			...props.style,
		};
	}
	scrollToPosition(x: number, y: number) {
		this.scroll.props.scrollToPosition(x, y);
	}
	scrollToFocusedInput(reactNode: any) {
		this.scroll.props.scrollToFocusedInput(reactNode);
	}
	renderInner() {
		return (
			<KeyboardAwareScrollView
				innerRef={ref => {
					this.scroll = ref;
				}}
				automaticallyAdjustContentInsets={false}
				{...this.props}
				style={this.style}
			>
				{this.props.children}
			</KeyboardAwareScrollView>
		);
	}
	render() {
		if (isIphoneX) return <SafeAreaView style={{ flex: 1 }}>{this.renderInner()}</SafeAreaView>;
		return this.renderInner();
	}
}
