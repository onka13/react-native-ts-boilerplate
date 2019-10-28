import BusinessLogicBase from './BusinessLogicBase';
import StorageManager from '../managers/StorageManager';

class AccountBusinessLogic extends BusinessLogicBase {
	isLoggedIn() {
		return StorageManager.getUser() && StorageManager.getUser().id > 0;
	}
	async logout() {
		StorageManager.logout();
	}
	login(email: string, password: string) {
		return super.bridge('user/account/login', { email, password }).then(this._loginAndRegister);
	}
	signup(name: string, email: string, password: string) {
		return super.bridge('user/account/register', { name, email, password }).then(this._loginAndRegister);
	}
	_loginAndRegister(data: any) {
		return Promise.all([
			StorageManager.setUser({
				id: data.userId,
				email: data.email,
				emailConfirmed: data.emailConfirmed,
			}),
			StorageManager.setAccessToken(data.access_token),
		]).then(() => {
			return data;
		});
	}
	me() {
		return super.bridge('user/user/me', {}, { method: 'get' });
	}
}

export default new AccountBusinessLogic();
