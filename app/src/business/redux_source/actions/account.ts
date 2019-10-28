import { createAction } from "redux-actions";
import { ACCOUNT_LOGIN_SUCCESS, ACCOUNT_LOGIN_LOGOUT, ACCOUNT_EMAIL_CONFIRMED } from "./types";

export const loginSuccess = createAction(ACCOUNT_LOGIN_SUCCESS);
export const loginLogout = createAction(ACCOUNT_LOGIN_LOGOUT);
export const accountEmailConfirmed = createAction(ACCOUNT_EMAIL_CONFIRMED);
