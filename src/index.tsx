import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import store from "src/redux/configureStore";
import reportWebVitals from "src/reportWebVitals";
import { theme } from "src/theme";
import config from "src/utils/env.config";
import { AuthProvider, AuthService } from "src/utils/oauth2-pkce";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const isLocal = window.location.hostname.match(/localhost/);

const authService = new AuthService({
  clientId: config.REACT_APP_AWS_CLIENT_ID,
  location: window.location,
  provider: `${config.REACT_APP_AWS_URL}/oauth2`,
  redirectUri: isLocal ? `${window.location.origin}/` : config.REACT_APP_REDIRECT_URI,
  scopes: ["openid", "profile"],
  logoutUri: `${config.REACT_APP_LOGOUT_URL}`,
  logoutEndpoint: `${config.REACT_APP_AWS_URL}/logout`,
});

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider authService={authService}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
