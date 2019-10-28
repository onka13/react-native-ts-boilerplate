
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { init } from './src/business/managers/ConsoleManager';

init();

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App);

//AppRegistry.registerComponent(appName, () => App)