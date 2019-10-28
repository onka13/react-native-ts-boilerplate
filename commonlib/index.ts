import { NativeModules } from 'react-native';
const { ToolsModule } = NativeModules;

export default class Commonlib {
	static updateTaskDescription = (name: string, androidTaskColor: string) => {
		ToolsModule && ToolsModule.updateTaskDescription(name, androidTaskColor);
	};
}
