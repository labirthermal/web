import { createContext } from "@lit/context";
import i18next from "i18next";

export type Locales = "en"|"cs"|"fr"|"cy"|"de";

export const localeContext = createContext<Locales>("localeContext");

export interface IWithlocale {
    locale: Locales;
}

export const initLocalesInTopLevelElement = ( element: IWithlocale ) => {
    i18next.on( "languageChanged", locale => {
        element.locale = locale as Locales;
    } );
    if ( element.locale === undefined ) {
        element.locale = i18next.language as Locales;
    } else {
        i18next.changeLanguage( element.locale );
    }
}

const localeMap = {
    cs: ['cs', 'cz', 'cs_CZ', 'cs_CS'],
    fr: ['fr', 'fr_FR', 'fr_CA'],
    de: ['de', 'de_DE', 'de_AT', 'de_CH'],
    cy: ['cy', 'cy_GB', "cy"],
    en: ['en', 'en_US', 'en_GB', 'en_CA', 'en_AU', 'en_NZ', 'en_IE', 'en_ZA']
}

export const localeConverter = {
    fromAttribute: (value: string) => {
        let safe: string|undefined = undefined;
        let index = 0;
        while ( index < Object.keys( localeMap ).length && safe === undefined ) {
            const key = Object.keys( localeMap )[index] as keyof typeof localeMap;
            if ( localeMap[key].includes( value ) ) {
                safe = key;
            }
            index++;
        }
        return safe ?? "en";
    },
    toAttribute: (value: string) => {
        return value;
    }
}