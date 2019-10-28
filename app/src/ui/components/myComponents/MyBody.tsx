import React from 'react';
import { View, ViewStyle } from 'react-native';
import { createStyles } from '../../../data/config/myStyles';

export interface Prop {
	style?: ViewStyle;
}

export default class MyBody extends React.Component<Prop> {
	style!: ViewStyle;
	constructor(props: any) {
		super(props);
		this.init(props);
	}
	componentWillReceiveProps(props: Prop) {
		this.init(props);
	}
	init(props: Prop) {
		this.style = {
			...styles.centerAll,
			...props.style,
		};
	}
	render() {
		return (
			<View {...this.props} style={this.style}>
				{this.props.children}
			</View>
		);
	}
}

const styles = createStyles({});
