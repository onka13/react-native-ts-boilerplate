// @ts-ignore
import CryptoJS from 'crypto-js';

export const getHash = (msg: string, key: string) :string => {
	if (!key) key = (msg + msg).substring(0, 13);
	var hash = CryptoJS.HmacSHA256(msg, key);
	return CryptoJS.enc.Base64.stringify(hash);
};
