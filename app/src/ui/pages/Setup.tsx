import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../../business/redux_source/ReduxHelper';
import FirstStack from '../components/navigation';
import BaseComponent from '../components/BaseComponent';
import { ThemeProvider } from 'react-native-elements';
import { getTheme } from '../../data/config/myStyles';
import DynamicControl from '../components/DynamicControl';
import MyContainer from '../components/myComponents/MyContainer';

export default class SetupComponent extends BaseComponent<{}, {}> {
	render() {		
		return (
			<Provider store={createStore()}>				
				<ThemeProvider theme={getTheme()}>
					<MyContainer>
						<FirstStack />
						<DynamicControl />
					</MyContainer>
				</ThemeProvider>
			</Provider>
		);
	}
}
