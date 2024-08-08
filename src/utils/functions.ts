import { languages } from "./constants";

export function searchLanguageInLanguages(langAcronym: string) {

    for (let index = 0; index < languages.length; index++) {
        const element = languages[index];
        if (element.value === langAcronym) return element.label
    }
    return ""
}