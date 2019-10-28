import {
	DYNAMIC_CONTROL_ADDED,
	DYNAMIC_CONTROL_REMOVED,
	DYNAMIC_CONTROL_REMOVE_ALL,
	DYNAMIC_TOAST_ADDED,
	DYNAMIC_TOAST_REMOVED,
	DYNAMIC_TOAST_REMOVE_ALL
} from "../actions/types";

const INITIAL: any = {
	controls: {},
	toasts: {
		// 0: { id: 0, text: "My First Toast" },
		// 1: { id: 1, text: "My sec Toast", type: "error" },
		// 2: { id: 2, text: "top warn", type: "warning", position: "top" },
		// 3: { id: 3, text: "sucess", type: "success", position: "top" }
	},
	action: "added",
	lastId: null,
	lastOptions: {}
};

export default function myReducer(state = INITIAL, action: any = { type: '', payload: {} }) {
	switch (action.type) {
		case DYNAMIC_CONTROL_ADDED:
			var id = action.payload.id;
			var control = action.payload.control;
			if (state.controls[id]) return state;
			state.lastId = id;
			state.lastOptions = control.options;
			state.controls[id] = control;
			return { ...state, controls: state.controls, lastId: id, action: "added" };
		case DYNAMIC_CONTROL_REMOVED:
			id = action.payload.id;
			var lastOptions = state.controls[id] ? state.controls[id].options : null;
			//state.lastId = null
			delete state.controls[id];
			return { ...state, controls: state.controls, lastId: id, lastOptions: lastOptions, action: "removed" };
		case DYNAMIC_CONTROL_REMOVE_ALL:
			return { ...state, controls: {}, lastId: null, action: "removeAll" };
		case DYNAMIC_TOAST_ADDED:
			var toast = action.payload;
			toast.id = new Date().getTime();
			state.toasts[toast.id] = toast;
			return { ...state, toasts: state.toasts };
		case DYNAMIC_TOAST_REMOVED:
			delete state.toasts[action.payload.id];
			return { ...state, toasts: state.toasts };
		case DYNAMIC_TOAST_REMOVE_ALL:
			return { ...state, toasts: {} };
		default:
			return state;
	}
}
