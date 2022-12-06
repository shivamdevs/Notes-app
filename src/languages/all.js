import languages from './options';

const supportedLanguages = [];

const languageOptions = [];

function validateLanguage(data) {
    return supportedLanguages.includes(data);
}

function getCookie() {
    if (window.localStorage) {
        let found = window.localStorage.getItem("language");
        if (found !== null) {
            if (validateLanguage(found)) {
                return found;
            }
        }
        window.localStorage.setItem("language", supportedLanguages[0]);
    }
    return supportedLanguages[0];
}
function setCookie(data) {
    if (window.localStorage) {
        window.localStorage.setItem("language", data);
        return true;
    }
    return false;
}

let selectedLanguage, Language;

for (const lang in languages) {
    if (Object.hasOwnProperty.call(languages, lang)) {
        supportedLanguages.push(lang);
    }
}

const currentLanguage = getCookie();

for (const lang in languages) {
    if (Object.hasOwnProperty.call(languages, lang)) {
        const option = {
            label: languages[lang].name,
            value: lang
        }
        languageOptions.push(option);
        if (lang === currentLanguage) {
            selectedLanguage = option;
            Language = languages[lang].data;
        }
    }
}

function ChangeLanguage(data) {
    if (validateLanguage(data)) {
        if (setCookie(data)) {
            return {
                action: 'language-update',
                type: 'success',
                message: 'changed-to-' + data,
            }
        } else {
            return {
                action: 'language-update',
                type: 'error',
                message: 'cookie-access-denied',
            }
        }
    } else {
        return {
            action: 'language-update',
            type: 'error',
            message: 'invalid-language',
        }
    }
}

export default Language;
export {
    Language,
    ChangeLanguage,
    supportedLanguages,
    selectedLanguage,
    currentLanguage,
    languageOptions,
};