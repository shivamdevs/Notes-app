import Language, { selectedLanguage, languageOptions, ChangeLanguage, currentLanguage } from "./languages/all";

const lang = Language;
const current = currentLanguage;
const options = languageOptions;
const selected = selectedLanguage;

document.title = 'Private Note - ' + lang.tagline;

function update(language) {
    return ChangeLanguage(language).type === "success";
}

export default lang;

export {
    options,
    selected,
    update,
    current,
}