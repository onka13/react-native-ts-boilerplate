export const enums = {
	getValue: (obj:any, val:any) : any => {
		return Object.keys(obj).filter(x => obj[x] == val)[0];
	},
	Status: {
		Active: 1,
		Passive: 2
	},
};

export const apiResponseCodes = {
	Throttling: 50,	
	Error: -1,
	ServerError: -2,
	NoPermission: -3,
	BridgeError: -3,
	EmptyModel: -10,
	InvalidModel: -11,
	NotFound: -12,
	TransactionError: -13,
	NewToken: -20,
	RefreshToken: -21,
	LoginUser: -30,
	ForceUpdate: -40,
	DeviceBlocked: -41,
	InvalidRegisterKey: -50,
	InvalidHash: -51,
};

export default enums;
