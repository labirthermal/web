import i18next from 'i18next';
import { initLitI18n } from 'lit-i18n';
import LanguageDetector from 'i18next-browser-languagedetector';

import { en } from './languages/en';
import { fr } from './languages/fr';
import { cs } from './languages/cs';
import { cy } from './languages/cy';
import { de } from './languages/de';

/** initialise the I18n object */
i18next
    .use(initLitI18n)
    .use(LanguageDetector)
    .init(
    {
        // lng: 'de',
        fallbackLng: "en",
        resources: {
            
            cs: {
                translation: cs,
            },
            cy: {
                translation: cy
            },
            de: {
                translation: de
            },
            en: {
                translation: en,
            },
            fr: {
                translation: fr,
            },
        },
    }
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).i18next = i18next;