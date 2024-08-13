import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n.ts";
import store, { persistor } from "./app/store.ts";
import App from "./containers/App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from '@mui/material/styles'; 

const theme = createTheme({
  breakpoints: {
      values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1366,  
          xl: 1920, 
      },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}> 
          <App />
        </ThemeProvider>
      </I18nextProvider>
    </PersistGate>
  </Provider>
);

