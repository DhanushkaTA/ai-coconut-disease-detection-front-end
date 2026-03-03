import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          createAlert: "Create Alert",
          description: "Description",
          logout: "Logout"
        },
      },
      si: {
        translation: {
          welcome: "සාදරයෙන් පිළිගනිමු",
          createAlert: "ඇලර්ට් සාදන්න",
          description: "විස්තර",
          logout: "ඉවත් වන්න"
        },
      },
    },
  });

export default i18n;