class InfraCommonManager {
	static myInstance: InfraCommonManager;
	static instance() {
		if (this.myInstance == null) this.myInstance = new InfraCommonManager();
		return this.myInstance;
	}
	private constructor() {
	}

	initAll() {
		return Promise.all([]);
	}
}

export default InfraCommonManager.instance();
