import { applyMiddleware, bindActionCreators, createStore as reduxCreateStore } from 'redux';
import thunk from 'redux-thunk';
import { connect as reduxConnect } from 'react-redux';

import ActionCreators from './actions/';
import rootReducer from './reducers/';

const store = reduxCreateStore(rootReducer, applyMiddleware(thunk));

export function createStore() {
	return store;
}

export function connect(page: any, ...args:any) {
	return reduxConnect(
		(state: any) => {
			if (args.length > 1) {
				var obj: any = {};
				for (let i = 0; i < args.length; i++) {
					const prop = args[i];
					//obj[prop] = state[prop]
					obj[prop] = state.get(prop);
				}
				return obj;
			}
			//return {...state}
			return { none: undefined };
		},
		dispatch => bindActionCreators(ActionCreators, dispatch),
	)(page);
}

export default {
	createStore,
	connect,
};
