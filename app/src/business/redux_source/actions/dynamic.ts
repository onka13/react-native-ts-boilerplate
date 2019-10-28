import { createAction } from "redux-actions";
import {
	DYNAMIC_CONTROL_ADDED,
	DYNAMIC_CONTROL_REMOVED,
	DYNAMIC_CONTROL_REMOVE_ALL,
	DYNAMIC_TOAST_ADDED,
	DYNAMIC_TOAST_REMOVED,
	DYNAMIC_TOAST_REMOVE_ALL
} from "./types";

export const addControl = createAction(DYNAMIC_CONTROL_ADDED);
export const removeControl = createAction(DYNAMIC_CONTROL_REMOVED);
export const removeAllControls = createAction(DYNAMIC_CONTROL_REMOVE_ALL);
export const addToast = createAction(DYNAMIC_TOAST_ADDED);
export const removeToast = createAction(DYNAMIC_TOAST_REMOVED);
export const removeAllToasts = createAction(DYNAMIC_TOAST_REMOVE_ALL);
