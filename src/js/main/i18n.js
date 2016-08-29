import _ from 'lodash';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

i18n
	.use(XHR)
	.use(LanguageDetector)
	.init({
		debug: false,
		fallbackLng: false,
		keySeparator: false,
		nsSeparator: false,
		ns: ['common'],
		load: 'languageOnly',
		defaultNs: 'common',
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;