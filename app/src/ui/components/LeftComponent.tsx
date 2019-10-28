import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { myTheme, mySizes, createStyles } from '../../data/config/myStyles';
import MyIcon from './myComponents/MyIcon';
import BaseComponent from './BaseComponent';
import AccountBusinessLogic from '../../business/services/AccountBusinessLogic';

export default class LeftComponent extends BaseComponent<
	{
		navigation: any;
		items: [any];
	},
	{}
> {
	items = [
		{ route: 'Profile', title: 'Profile', icon: 'person-outline', iconType: 'material' },
		{ route: 'Test3', title: 'Test 3', icon: 'launch', iconType: 'material' },
		{ route: 'Lists', title: 'Lists', icon: 'assignment', iconType: 'material' },
		{ route: 'Bookmarks', title: 'Bookmarks', icon: 'bookmark-border', iconType: 'material' },
	];
	// props => navigation, items, activeItemKey
	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.header, styles.shadow]}>
					<Avatar
						rounded
						source={{
							uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
						}}
						size="large"
					/>
					<Text h4>Neque porro</Text>
					<Text>Lorem ipsum dolor sit amet</Text>
				</View>
				<View style={styles.list}>
					<ScrollView>
						{this.items.map((x, i) => (
							<ListItem
								key={i}
								leftIcon={{ name: x.icon, type: x.iconType }}
								title={x.title}
								onPress={() => {
									this.goToPage(x.route);
									this.props.navigation.closeDrawer();
								}}
							/>
						))}
					</ScrollView>
				</View>
				<View style={styles.footer}>
					<MyIcon
						name="logout"
						type="material-community"
						theme="primary"
						onPress={async () => {
							await AccountBusinessLogic.logout();
							this.goToPageAndResetAll('Login');
						}}
					/>
					<MyIcon name="sc-telegram" type="evilicon" theme="secondary" onPress={() => console.log('hello')} />
				</View>
			</View>
		);
	}
}

const styles = createStyles({
	container: {
		flex: 1,
		backgroundColor: myTheme.mix.leftBg,
	},
	header: {
		padding: 15,
		marginLeft: 5,
		marginBottom: 10,
	},
	list: {
		flex: 1,
		alignSelf: 'stretch',
		borderTopColor: myTheme.mix.border,
		borderTopWidth: mySizes.border,
		borderBottomColor: myTheme.mix.border,
		borderBottomWidth: mySizes.border,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
});
