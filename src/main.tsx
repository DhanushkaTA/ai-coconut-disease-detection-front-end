import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { persistor } from "./store/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import i18n from "./i18n";
import LanguageInitializer from "./view/loca/LanguageInitializer.tsx";
import { AlertProvider } from "./context/AlertContext";

const currentLang = store.getState().language.language;
i18n.changeLanguage(currentLang);

createRoot(document.getElementById("root")!).render(
  <FluentProvider theme={webLightTheme}>
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LanguageInitializer>
              <AlertProvider>
                <App />
              </AlertProvider>
            </LanguageInitializer>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  </FluentProvider>,
);
