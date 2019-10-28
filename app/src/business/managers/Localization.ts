import StorageManager from './StorageManager';
import DeviceHelper from 'infra/helpers/DeviceHelper';

export const langs: any = {
	EN: require('../../data/l10n/en').default,
	TR: require('../../data/l10n/tr').default,
};

class LocalizationHelper {
	getLangs = (x: string) => {
		return x ? langs[x] : langs;
	};
	getCurrentStore() {
		return this.getStore(this.getLocale());
	}
	getStore(lang: string) {
		return this.getLangs(lang) || this.getLangs('EN');
	}
	setLocale(lang: string) {
		return StorageManager.setLang(lang);
	}
	getLocale() : string {
		var lang = StorageManager.getLang() || DeviceHelper.getDeviceLocale()
			.split(/[_-]/g)[0]
			.toLocaleUpperCase();
		//console.log("getCurrentLocale", lang)
		if (this.getLangs(lang)) return lang;

		return 'EN';
	}
	translate = (key: string, defaultLabel?: string) => {
		return this.getStore(this.getLocale())[key] || defaultLabel;
	};
}

const Localization = new LocalizationHelper();
const translate = Localization.translate;
export { translate };
export default Localization;
