console.ignoredYellowBox = ["Require cycle:"];
console.disableYellowBox = true;

const originalLog = console.log;
console.log = function log(...args) {
    // https://github.com/WebReflection/circular-json
    // import { inspect } from 'util'
    // https://nodejs.org/api/util.html#util_util_inspect_object_options
	for (const key in args) {
		// args[key]; // do something
	}
	originalLog.apply(console, args);
};

if (!__DEV__) {
	console.log = () => {};
}

export const init = () => {};
