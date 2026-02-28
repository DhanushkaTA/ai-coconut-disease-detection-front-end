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

createRoot(document.getElementById("root")!).render(
  <FluentProvider theme={webLightTheme}>
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  </FluentProvider>,
);
