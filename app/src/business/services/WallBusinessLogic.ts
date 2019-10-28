import BusinessLogicBase from './BusinessLogicBase';

class WallBusinessLogic extends BusinessLogicBase {
	list(page: number) {
		return super.bridge('wall/post/list', { page }, { method: 'get' });
	}
}

export default new WallBusinessLogic();
