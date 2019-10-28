import React from 'react';
import { Text, Header } from 'react-native-elements';
import MyBody from '../../components/myComponents/MyBody';
import MyContainer from '../../components/myComponents/MyContainer';
import { View } from 'react-native';
import BaseComponent from '../../components/BaseComponent';

class Test extends BaseComponent<
	{
		no: number;
	},
	{}
> {
	render() {
		return (
			<MyContainer>
				<Header>
					{this.renderBack()}
					<Text>Test - {this.props.no}</Text>
					<View></View>
				</Header>
				<MyBody>
					<Text>Test {this.props.no}</Text>
					<Text>{new Date().toString()}</Text>
				</MyBody>
			</MyContainer>
		);
	}
}

export default (no: any) => (props: any) => {
	return <Test no={no} {...props} />;
};
