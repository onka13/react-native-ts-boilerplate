import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import InitPage from '../pages/InitPage';
import Test from '../pages/subpages/Test';
import Login from '../pages/subpages/account/Login';
import { Icon } from 'react-native-elements';
import LeftComponent from './LeftComponent';
import Wall from '../pages/subpages/Wall';
import Signup from '../pages/subpages/account/Signup';
import Bookmarks from '../pages/subpages/Bookmarks';
import { myTheme } from '../../data/config/myStyles';

const homeTabNavigator = createBottomTabNavigator(
	{
		Wall: { screen: Wall },
		Tab1: { screen: Test('Tab 1') },
		Tab2: { screen: Test('Tab 2') },
	},
	// @ts-ignore
	{
		initialRouteName: 'Wall',
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }: any) => {
				const { routeName } = navigation.state;
				let iconName: string;
				if (routeName === 'Wall') {
					iconName = `home${focused ? '' : '-outline'}`;
				} else if (routeName === 'Tab1') {
					iconName = `email${focused ? '' : '-outline'}`;
				} else if (routeName === 'Tab2') {
					iconName = `camera${focused ? '' : '-outline'}`;
				} else {
					iconName = 'exclamation';
				}
				return <Icon name={iconName} color={tintColor} type="material-community" />;
			},
		}),
		tabBarOptions: {
			showLabel: false,
			activeTintColor: myTheme.primary.main,
			inactiveTintColor: '#fff',
			style: {
				backgroundColor: myTheme.secondary.main,
			},
		},
	},
);

const drawerNavigator = createDrawerNavigator(
	{
		HomeTab: { screen: homeTabNavigator },
		Profile: { screen: Test('Profile') },
		Bookmarks: { screen: Bookmarks },
		Test3: { screen: Test('Test 3') },
		Test4: { screen: Test('Test 4') },
	},
	// @ts-ignore
	{
		initialRouteName: 'HomeTab',
		contentComponent: LeftComponent,
	},
);

const FirstStack = createStackNavigator(
	{
		InitPage: { screen: InitPage },
		Home: { screen: drawerNavigator },
		Test1: { screen: Test('Test 1') },
		Test2: { screen: Test('Test 2') },
		Lists: { screen: Test('Lists') },
		Login: { screen: Login },
		SignUp: { screen: Signup },
	},
	{
		initialRouteName: 'InitPage',
		defaultNavigationOptions: () => ({
			header: null,
			headerMode: 'none',
		}),
		cardStyle: {
			backgroundColor: '#FFFFFF00', // transparent not working!
		},
		transitionConfig: () => ({
			containerStyle: {
				backgroundColor: 'transparent',
			},
		}),
	},
);

function getActiveRouteName(navigationState: any): string {
	if (!navigationState) return '';
	const route = navigationState.routes[navigationState.index];
	// Parse the nested navigators
	if (route.routes) return getActiveRouteName(route);
	return route.routeName;
}
var prevScreenName = '';
let defaultGetStateForAction = FirstStack.router.getStateForAction;
FirstStack.router.getStateForAction = (action, state) => {
	const currentScreen = getActiveRouteName(state);
	if (currentScreen && currentScreen != prevScreenName) {
		//LogManager.setCurrentScreen(currentScreen);
	}
	prevScreenName = currentScreen;
	//console.log("getStateForAction", currentScreen);
	/*if (state && state.routes) {
		for (const key in state.routes) {
			var a = state.routes[key];
		}
		//console.log('routes', state.routes)
	}*/

	if (action.type === NavigationActions.NAVIGATE && action.params && action.params.closeCurrent) {
		const newRoutes = state.routes.slice(0, -1); //.filter(r => r.routeName !== "Login")
		const newIndex = newRoutes.length - 1;
		return defaultGetStateForAction(action, { index: newIndex, routes: newRoutes });
	}

	return defaultGetStateForAction(action, state);
};

export default createAppContainer(FirstStack);
