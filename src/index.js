import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "react-bootstrap";

import { createMuiTheme } from "@material-ui/core/styles";

import * as serviceWorker from "./serviceWorker";
import { configureStore, history } from "./store";
import ThemeColors from "./constants/ThemeColors";
import App from "./App";

import "./index.scss";

const store = configureStore();
const theme = createMuiTheme({
  palette: {
    primary: ThemeColors.primary,
    secondary: ThemeColors.secondary,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
