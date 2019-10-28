class StaticManager {
	static myInstance: StaticManager;
	static instance() {
		if (this.myInstance == null) this.myInstance = new StaticManager();
		return this.myInstance;
	}
}

export default StaticManager.instance();
