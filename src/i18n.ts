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
          createAlert: "Create New Alert",
          updateAlert: "Update Alert",
          description: "Description",
          login: "Login",
          logout: "Logout",
          addNew: "Add New",
          rowPrePage: "Rows per page:",
          page: "Page",
          of: 'of',
          next: "Next",
          prev: "Prev",
          chat: "Chat",
          users: "Users",
          posts:"Posts",
          alerts:"Alerts",
          notificationMan: "Notification Manager",
          postMan: "Post Manager",
          userMan: "User Manager",
          loginStatus: "Login to your account",
          loginStatement: "Join our global network of coconut merchants. Stay updated with industry news, connect with buyers, and protect your crops with advanced AI diagnostics.",
          dnuhAcc: "Don't have account?",
          register: "Register",
          sUser: "Search by : full name, username, email & phone number",
          sPost :"Search by content or user name...",
          sAlert: "Search by title or description...",
          forgotPass: "forgot Password?",
        },
      },
      si: {
        translation: {
          welcome: "සාදරයෙන් පිළිගනිමු",
          createAlert: "නව නිවේදන සාදන්න",
          updateAlert: "නිවේදන යාවත්කාලීන කරන්න",
          description: "විස්තර",
          login: "ඇතුළුවන්න",
          logout: "ඉවත් වන්න",
          addNew: "නව",
          rowPrePage: "වාර්තා ගණන:",
          page: "පිටු",
          of: 'න්',
          next: "ඊළග",
          prev: "පෙර",
          chat: "පණිවිඩ",
          users: "පුද්ගලයින්",
          posts:"පෝස්ට්",
          alerts:"නිවේදන",
          notificationMan: "නිවේදන කළමණාකරනය",
          postMan: "පෝස්ට් කළමණාකරනය",
          userMan: "පුද්ගල කළමණාකරනය",
          loginStatus: "ඔබේ ගිණුමට ඇතුළුවන්න",
          loginStatement: "අපගේ ගෝලීය පොල් වෙළෙන්දන්ගේ ජාලයට සම්බන්ධ වන්න. කර්මාන්ත පුවත් සමඟ යාවත්කාලීනව සිටින්න, ගැනුම්කරුවන් සමඟ සම්බන්ධ වන්න, සහ උසස් AI රෝග විනිශ්චය සමඟ ඔබේ බෝග ආරක්ෂා කරන්න.",
          dnuhAcc: "ඔබට ගිණුමක් නැද්ද?",
          register: "ලියාපදිංචි වීමට",
          sUser: "සම්පූර්ණ නම, පරිශීලක නාමය, විද්‍යුත් තැපෑල සහ දුරකථන අංකය අනුව සොයන්න.",
          sPost :"අන්තර්ගතය හෝ පරිශීලක නාමය අනුව සොයන්න...",
          sAlert: "මාතෘකාව හෝ විස්තරය අනුව සොයන්න...",
          forgotPass: "මුරපදය අමතක වුණා ද?",
        },
      },
    },
  });

export default i18n;