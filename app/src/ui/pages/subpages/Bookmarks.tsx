import React from 'react';
import { Text, Header, Avatar } from 'react-native-elements';
import MyBody from '../../components/myComponents/MyBody';
import MyContainer from '../../components/myComponents/MyContainer';
import BaseComponent from '../../components/BaseComponent';
import { View } from 'react-native';

export default class Bookmarks extends BaseComponent<{}, {}> {
	render() {
		console.log('Bookmarks', this.props);		
		return (
			<MyContainer>
				<Header>
					<Avatar
						rounded
						source={{
							uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
						}}
						size="small"
						onPress={() => {
							this.props.navigation.openDrawer();
						}}						
					/>
					<Text>Bookmarks</Text>
					<View>
					</View>
				</Header>
				<MyBody>
					<Text>Bookmarks</Text>
					<Text>{new Date().toString()}</Text>
				</MyBody>
			</MyContainer>
		);
	}
}
