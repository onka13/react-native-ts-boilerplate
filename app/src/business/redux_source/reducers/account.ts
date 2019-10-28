import { ACCOUNT_LOGIN_SUCCESS, ACCOUNT_LOGIN_LOGOUT, ACCOUNT_EMAIL_CONFIRMED } from '../actions/types';

const INITIAL = {
	isLoggedIn: false,
	email: '',
	emailConfirmed: false,
};

export default function myReducer(state = INITIAL, action: any = { type: '', payload: {} }) {
	switch (action.type) {
		case ACCOUNT_LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				email: action.payload.email,
				emailConfirmed: action.payload.emailConfirmed,
			};
		case ACCOUNT_LOGIN_LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				email: '',
				emailConfirmed: false,
			};
		case ACCOUNT_EMAIL_CONFIRMED:
			return {
				...state,
				emailConfirmed: action.payload,
			};
		default:
			return state;
	}
}
