import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/es/integration/react";

import "font-awesome/css/font-awesome.css";
import { RefreshContextProvider } from "./context/RefreshContext";
import Updater from "./app/Updater";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RefreshContextProvider>
          <Updater />
          <App />
        </RefreshContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
