// LanguageInitializer.tsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import i18n from "./i18n";
import type { RootState } from "../../store/store";
import i18n from "../../i18n";

const LanguageInitializer = ({ children }: any) => {
  const language = useSelector(
    (state: RootState) => state.language.language
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return children;
};

export default LanguageInitializer;