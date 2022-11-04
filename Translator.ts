import en from "./src/locales/en.json";
import fr from "./src/locales/fr.json";

const locales: any = {
    en,
    fr
};

export function t(text: string, locale: string = "en"): string {
    return locales[locale][text] || text;
}